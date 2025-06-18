
// import React, { useState } from 'react'
// import { useAuth } from '../context/AuthContext';
// import { addDoc, serverTimestamp,collection, Timestamp } from 'firebase/firestore';
// import {db} from '../authentication/Firebase'

// export const ChatInput = () => {
//   const [message, setMessage] = useState("");
//   const {currentUser} = useAuth();

//   const {displayName, photoURL, uid} = currentUser;

//   const handleSubmit = async (e)=>{
//     e.preventDefault();
//     console.log(currentUser);

//     if(message.trim() === ""){
//       alert("please type a message first!!");
//     }else{
      
//     }try{
//        // Add a new document with a generated id.
// const docRef = await addDoc(collection(db, "messages"), {
//   message: message,
//   avatar: photoURL,
//   displayName: displayName,
//   time: serverTimestamp()
// });
// console.log("Document written with ID: ", docRef.id);
//     }
//     catch(error){
//    console.log(error)
//     }



//   }
//   return (
//     <div>
//       <form onSubmit={handleSubmit} className='bg-amber-300 fixed bottom-0 w-full py-10 shadow-lg'>

//         <input onChange={(e)=> setMessage(e.target.value)} value={message} type="text"  placeholder='begin banter....' className='input focus:outline-none w-full bg-amber-200 rounded-full'/>

//         <button className='w-auto bg-amber-700 text-white font-bold rounded-r-lg px-5'>Send</button>
//       </form>
//     </div>
//   )
// }














import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../authentication/Firebase';

export const ChatInput = () => {
  const [message, setMessage] = useState('');
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert('Please type a message first!');
      return;
    }

    if (!currentUser) {
      alert('You must be logged in to send a message.');
      return;
    }

    try {
      const { displayName, photoURL, uid } = currentUser;

      // Add a new document with an auto-generated ID
      const docRef = await addDoc(collection(db, 'messages'), {
        message: message,
        avatar: photoURL || '',
        displayName: displayName || 'Anonymous',
        uid: uid,
        time: serverTimestamp(),
      });

      console.log('Document written with ID: ', docRef.id);

      // Clear input
      setMessage('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className='bg-amber-300 fixed bottom-0 w-full py-10 px-4 flex shadow-lg'
      >
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          type='text'
          placeholder='begin banter....'
          className='input focus:outline-none w-full bg-amber-200 rounded-l-full px-4 py-2'
        />

        <button
          type='submit'
          className='bg-amber-700 text-white font-bold rounded-r-full px-5 py-2'
        >
          Send
        </button>
      </form>
    </div>
  );
};
