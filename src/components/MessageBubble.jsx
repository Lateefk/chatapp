// import React from 'react'
// import { useAuth } from '../context/AuthContext'

// const MessageBubble = ({message}) => {
//   const {currentUser} = useAuth();
//   return (
//     <div>
//       <div>
//         <div className={`${currentUser ? 'chat-end'; 'chat-start'} chat-start chat`></div>
//         <div className={`chat-image avatar`}>
//           <div className="w-10 rounded-full">
//             <img src="#" alt="Profile Image" />
//           </div>
//         </div>
//           Johnny Mark
//         <div className="chat-header">
//           <time className='text-xs opacity-50'>{message.time}</time>
//         </div>
//         <div className="chat-bubble">{message.message}</div>
//         <div className="chat-footer">Delivered</div>
//       </div>
//     </div>
//   )
// }

// export default MessageBubble









import React from 'react';
import { useAuth } from '../context/AuthContext';
import { formatRelative } from 'date-fns'; // Optional but nice

const MessageBubble = ({ message }) => {
  const { currentUser } = useAuth();
  const isCurrentUser = currentUser?.uid === message.uid;

  return (
    <div className={`chat ${isCurrentUser ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={message.avatar || '/default-avatar.png'} alt="Profile" />
        </div>
      </div>

      <div className="chat-header">
        {message.displayName || 'Unknown'}
        <time className="text-xs opacity-50 ml-2">
          {message.time?.toDate
            ? formatRelative(message.time.toDate(), new Date())
            : 'Just now'}
        </time>
      </div>

      <div className="chat-bubble">{message.message}</div>
      <div className="chat-footer opacity-50 text-xs">Delivered</div>
    </div>
  );
};

export default MessageBubble;
