import { useState } from 'react'
import './App.css'
import AuthForm from '../components/AuthForm'
import FreelancerRegistrationForm from '../components/FreelancerRegistrationForm'
import Main from '../components/Main'
import Aa from '../components/aa'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Profile from '../components/Profile1'
import CustomerSupport from '../components/CustomerSupport'
import WorkerLoginForm from '../components/workerlogin'
import ProfileWorker from '../components/Sample'
import ChatBot from '../components/chatBot'


function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/main" replace />} /> {/* Redirect root to main */}
        <Route path="/main" element={<Main />} />
        <Route path="/client-login" element={<AuthForm />} />
        <Route path='worker-login' element={<FreelancerRegistrationForm />}/>
        <Route path='worker1-login' element={< WorkerLoginForm/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/csp" element={<CustomerSupport />} />
        <Route path="/aa" element={<Aa />} />
        <Route path="/abcd" element={<ProfileWorker/>}/>
        <Route path="chat" element={<ChatBot/>}/>
  
        <Route path="*" element={<Navigate to="/main" replace />} /> {/* Catch-all route */}
      </Routes>
    </Router>
  )
}

export default App;