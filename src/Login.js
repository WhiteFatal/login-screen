import React from 'react'
import './App.css'
import { loginInfo } from './loginInfo.js'
import Leaf from './Leaf.js'

export default function Login( { user } ) {
  
  const [login, setLogin] = React.useState({
    login: '',
    password: '',
    mailCorrect: true,
    passCorrect: true,
    loggedIn: false,
  })

  function checkMatch() {
    
    let response = loginInfo.filter(log => {
      return log.login === login.login && log.password === login.password
    })
    if (response.length > 0) {
      return {
        login: response[0].login,
        password: response[0].password,
        state:true,
      }
    }
    
    let emailVerification = loginInfo.filter(log => {      
      return log.login === login.login
    })
    if (emailVerification.length === 0) {
      return {
          login: 'Invalid e-mail',
          password: '',
          state:false,
        }
    } else return {
        login: login.login,
        password: 'Incorrect password',
        state:false,
      }
  }

  function handleSubmit (e) {
    e.preventDefault();
    if (login.login ==='' || login.password ==='') {
      return
    }
    if (!login.mailCorrect && !login.passCorrect) {
      return
    }
    if (checkMatch().state) {
      console.log('SUCCESS')
      setLogin(prevState => {
          return {...prevState, loggedIn: true}
      })  
    } else {
      console.log('FAIL');
      if (checkMatch().login !== login.login) {
        setLogin(prevState=> {
          return {...prevState, mailCorrect: false}
        })
      }
      if (checkMatch().login === login.login && checkMatch().password !== login.password) {
        setLogin(prevState=> {
          return {...prevState, passCorrect: false}
        })
      } 
    }    
  }

  function handleChange (e) {
    const {name, value} = e.target
    setLogin(prevData => {
      return (
          {...prevData,
            [name]: value,
            mailCorrect: true,
            passCorrect: true,
          }
      )
    })
  } 
  
  function loginSuccessScreen() {
    if (!login.loggedIn) {
      return (
        <form className='input_form' onSubmit={handleSubmit}>     
            <div className={`input-field ${login.mailCorrect ? '' : 'error' }`} >
              <label for='email'>E-Mail</label>
              <input 
                autoComplete='off'
                type='email'
                value={login.login}
                name='login'
                className='input-element'
                onChange={handleChange}
              />
              <span className='msg'>{checkMatch().login}</span>
            </div>
            
            <div className={`input-field ${login.passCorrect ? '' : 'error' }`}>
              <label for='password'>Password</label>
              <input 
                autoComplete='off'
                type='password'
                name='password'
                className='input-element'
                onChange={handleChange}
              />
              <span className='msg error'>{checkMatch().password}</span>
            </div>

            <button type='submit' className='login-btn'>Log In</button>  
        </form>
      )
    } else {
      return (
        <h2 className='login_header'>SUCCESSFULLY LOGGED IN!</h2>
      )
    }
  }

  return (
    <div className="full-screen-container">    
      <div className="login-screen-container">
        <h1 className='login-header'>Valley of Sorrows</h1>
        {loginSuccessScreen()}        
        <Leaf />
        <p className="registration-link" onClick={user}>Click here if you want to register new account</p>
      </div>   
    </div>
  );
}
