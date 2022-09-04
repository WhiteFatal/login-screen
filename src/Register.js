import React from 'react'
import './App.css'
import { loginInfo } from './loginInfo.js'
import Leaf from './Leaf.js'


export default function Register( { user }) {

  const [login, setLogin] = React.useState({
      username: '',
      password: '',
      rePassword: '',
      mailCorrect: true,
      passCorrect: true,
      loggedIn: false,
    })
  
    function checkMatch() {
      let emailVerification = loginInfo.filter(log => {      
        return log.login === login.username
      })
      
      if (emailVerification.length > 0) {
        return {
            login: 'This e-mail is already registered',
            password: '',
            state: false,
          }
      }
      if (login.password !== login.rePassword) {
        return {
          login: login.username,
          password: 'Password doesn\'t match',
          state: false,
        }
      }
      if (emailVerification.length === 0) {
          return {
              login: login.username,
              password: '',
              state: true,
            }
      }
    }  
  
    function handleSubmit (e) {
      e.preventDefault();
      if (login.username ==='' || login.password ==='') {
        return
      }
      if (!login.mailCorrect && !login.passCorrect) {
        return
      }
      if (checkMatch().state) {
        console.log('SUCCESS')
        setLogin(prevState => {
            loginInfo.push(
              {
                id: Date.now(),
                login: login.username,
                password: login.password,
              }
            )
            console.log(loginInfo)
            return {...prevState, loggedIn: true}
        })  
      } else {
        console.log('FAIL');
        if (checkMatch().login !== login.username) {
          setLogin(prevState=> {
            return {...prevState, mailCorrect: false}
          })
        }
        if (checkMatch().login === login.username && checkMatch().password !== login.password) {
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

  return (
      <div className="full-screen-container">
      <div className="login-screen-container">
          <h1 className='login-header'>Register New Account</h1>
          
          <form className='input_form' onSubmit={handleSubmit}>
          
          <div className={`input-field ${login.mailCorrect ? '' : 'error' }`} >
              <label for='email'>Enter your username e-mail</label>
              <input 
                autoComplete='off'
                type='email'
                value={login.username}
                name='username'
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

          <div className={`input-field ${login.passCorrect ? '' : 'error' }`}>
              <label for='password'>Re-enter password</label>
              <input 
                autoComplete='off'
                type='password'
                name='rePassword'
                className='input-element'
                onChange={handleChange}
              />
              <span className='msg error'>{checkMatch().password}</span>
          </div>

          <button type='submit' className='login-btn'>{login.loggedIn ? 'SUCCESSFULLY REGISTERED' : 'Create New Account'}</button>

          </form>
          
          <Leaf />
          <p className="registration-link" onClick={user}>Go back to login screen</p>
      </div>
      
      </div>
  )
}