import React from 'react'

const MessageBubble = () => {
  return (
    <div>
      <div>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src="#" alt="Profile Image" />
          </div>
        </div>
          Johnny Mark
        <div className="chat-header">
          <time className='text-xs opacity-50'>10:20 am</time>
        </div>
        <div className="chat-bubble">This is not a dril..!!!</div>
        <div className="chat-footer">Delivered</div>
      </div>
    </div>
  )
}

export default MessageBubble