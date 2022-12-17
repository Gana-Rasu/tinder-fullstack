import React from 'react'
import ChatDisplay from './ChatDisplay'
import ChatHeader from './ChatHeader'
import MatchesDisplay from './MatchesDisplay'

function ChatContainer({user}) {
  return (
    <div className='chat-container'>

      <ChatHeader user={user} />

        <div>
          <button className='option' >Matched</button>
          <button className='option' >Chat</button>
        </div>

        <MatchesDisplay/>
        <ChatDisplay/>

    </div>
  )
}

export default ChatContainer