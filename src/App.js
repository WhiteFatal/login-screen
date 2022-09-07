import React from 'react'
import './App.css'
//import Leaf from './Leaf.js'
import Login from './Login.js'
import Register from './Register.js'

function App() {
  
  const [newUser, setNewUser] = React.useState(true)

  function registrationScreen() {
    setNewUser(prevState => !prevState)
  }

  return (
    <div>
      
      {newUser ? <Login user={registrationScreen} /> : <Register user={registrationScreen}/>}
      
    </div>
  );
}

export default App;
