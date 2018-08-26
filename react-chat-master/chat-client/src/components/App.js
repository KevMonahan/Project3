import React, { Component } from 'react'
import ChatApp from './ChatApp'
import Logo from '../styles/logo.svg'
import '../styles/App.css'
import '../styles/Login.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { username: '' }

    this.usernameChangeHandler = this.usernameChangeHandler.bind(this)
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this)
  }

  usernameChangeHandler = event => {
    this.setState({ username: event.target.value })
  }
  usernameSubmitHandler = event => {
    event.preventDefault()
    this.setState({ submitted: true, username: this.state.username })
  }

  render() {
    if (this.state.submitted) {
      return <ChatApp username={this.state.username} />
    }
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={Logo} className='App-logo' alt='logo' />
          <h2>CHAT</h2>
        </div>
        <form
          className='username-container'
          onSubmit={this.usernameSubmitHandler}
        >
          <div>
            <input
              type='text'
              onChange={this.usernameChangeHandler}
              placeholder='Enter a username...'
              required
            />
          </div>
        </form>
      </div>
    )
  }
}
App.defaultProps = {}

export default App
