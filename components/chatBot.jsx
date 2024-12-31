import React, { useState, FormEvent } from 'react';

type MessageSender = 'user' | 'bot';

interface Message {
  id: number;
  text: string;
  sender: MessageSender;
}

interface Conversation {
  id: number;
  messages: Message[];
}

interface OllamaMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OllamaResponse {
  message: {
    content: string;
  };
}

const ChatBot: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      messages: [
        { id: 1, text: "Hello! I'm Jinu. How can I help you today?", sender: "bot" },
      ]
    }
  ]);
  
  const [currentConversationId, setCurrentConversationId] = useState<number>(1);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startNewChat = (): void => {
    const newConversation: Conversation = {
      id: conversations.length + 1,
      messages: [
        { 
          id: Date.now(), 
          text: "Hello! I'm Jinu. How can I help you today?", 
          sender: "bot" 
        }
      ]
    };
    setConversations([...conversations, newConversation]);
    setCurrentConversationId(newConversation.id);
    setInputMessage("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    const newUserMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: "user"
    };

    const updatedConversations = conversations.map(conv =>
      conv.id === currentConversationId
        ? {
            ...conv,
            messages: [...conv.messages, newUserMessage]
          }
        : conv
    );

    setConversations(updatedConversations);
    setInputMessage("");
    setIsLoading(true);

    try {
      const currentConversation = updatedConversations.find(conv => conv.id === currentConversationId);
      
      if (!currentConversation) {
        throw new Error('Conversation not found');
      }

      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "llama2",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            ...currentConversation.messages.map(msg => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text
            }))
          ] as OllamaMessage[],
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error('Jinus API request failed');
      }

      const data: OllamaResponse = await response.json();

      const botResponse: Message = {
        id: Date.now(),
        text: data.message.content,
        sender: "bot"
      };

      setConversations(prevConversations => 
        prevConversations.map(conv =>
          conv.id === currentConversationId
            ? {
                ...conv,
                messages: [...conv.messages, botResponse]
              }
            : conv
        )
      );
    } catch (error) {
      console.error("Error communicating with Jinu:", error);
      
      const errorMessage: Message = {
        id: Date.now(),
        text: "Sorry, I couldn't process your request. Is Jinu running?",
        sender: "bot"
      };

      setConversations(prevConversations => 
        prevConversations.map(conv =>
          conv.id === currentConversationId
            ? {
                ...conv,
                messages: [...conv.messages, errorMessage]
              }
            : conv
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const currentConversation = conversations.find(conv => conv.id === currentConversationId);
  if (!currentConversation) {
    return <div>Conversation not found</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Banner Image */}
      <div className="w-full h-20 relative">
        <img 
          src="/api/placeholder/1920/80" 
          alt="Chat Banner" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Chat header container */}
      <div className="chat-header-container w-full bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">O</span>
              ChatBot
            </h1>
            <button 
              onClick={startNewChat}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <span className="text-lg">+</span>
              <span>New Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main chat layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r p-4 overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setCurrentConversationId(conv.id)}
              className={`w-full text-left px-4 py-2 rounded-lg mb-2 transition-colors ${
                conv.id === currentConversationId 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'hover:bg-gray-200'
              }`}
            >
              Chat {conv.id}
            </button>
          ))}
        </div>

        {/* Chat main area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-6">
            {currentConversation.messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 mb-6 ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'bot' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-500 text-white'
                }`}>
                  {message.sender === 'bot' ? 'O' : 'U'}
                </div>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'bot' 
                    ? 'bg-white border' 
                    : 'bg-blue-500 text-white'
                }`}>
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                  O
                </div>
                <div className="max-w-[80%] rounded-lg p-3 bg-white border">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input form */}
          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300"
              >
                {isLoading ? '...' : '→'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;