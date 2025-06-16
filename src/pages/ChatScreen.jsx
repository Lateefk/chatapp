import React from 'react'
import { Login } from './Login'
import {ChatArea} from "../components/ChatArea"
import {ChatInput} from "../components/ChatInput"

const ChatScreen = () => {
  return (
    <div>
      <ChatArea/>
      <ChatInput/>
      
    </div>
  )
}

export default ChatScreen