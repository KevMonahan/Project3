import React from 'react'

class ChatInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { chatInput: '' }
    this.textChangeHandler = this.textChangeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  textChangeHandler = event => {
    this.setState({
      chatInput: event.target.value
    })
  }
  submitHandler = event => {
    event.preventDefault()
    this.props.onSend(this.state.chatInput)
    this.setState({
      chatInput: ''
    })
  }

  render() {
    return (
      <form className='chat-input' onSubmit={this.submitHandler}>
        <input
          type='text'
          onChange={this.textChangeHandler}
          value={this.state.chatInput}
          placeholder='Write a message...'
          required
        />
      </form>
    )
  }
}

ChatInput.defaultProps = {}

export default ChatInput
