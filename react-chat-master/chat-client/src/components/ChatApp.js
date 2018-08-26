import React, { Component } from 'react'
import io from 'socket.io-client'
import config from '../config/config'

import Messages from './Messages'
import ChatInput from './ChatInput'

import '../styles/ChatApp.css'

class ChatApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
    this.sendHandler = this.sendHandler.bind(this)

    // connect to server
    this.socket = io(config.api, {
      query: `username= ${props.username}`
    }).connect()
    // listen for message from server
    this.socket.on('server:message', message => {
      this.addMessage(message)
    })
  }

  sendHandler = message => {
    const messageObject = {
      username: this.props.username,
      message
    }

    this.socket.emit('client:message', messageObject)
    messageObject.fromMe = true
    this.addMessage(messageObject)
  }

  addMessage = message => {
    const messages = this.state.messages
    messages.push(message)
    this.setState({ message })
  }

  render() {
    return (
      <div className='container'>
        <h3>React chat app</h3>
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
      </div>
    )
  }
}

ChatApp.defaultProps = {
  username: 'Anonymous'
}

export default ChatApp
