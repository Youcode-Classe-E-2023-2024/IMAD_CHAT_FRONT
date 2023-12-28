// components/Managerfr.js
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
const Managerfr = () => {
  const [invtations, setinvtations] = useState([]);
  const [friends, setfriends] = useState([]);
  const [msg, setMsg] = useState('');
  const [conn, setConn] = useState(null);

  useEffect(() => {
    localStorage.setItem('tmproomid','999999')
    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost/chat_app/Back_end/start/middleware.php/Pfriends', true);

    xhr.onload = function () {
      if (xhr.status !== 200) {
        console.error('Error ' + xhr.status + ': ' + xhr.statusText);
      } else {
        const parsedResponse = JSON.parse(xhr.responseText);

        // Log each object in the array individually
        parsedResponse.forEach((object, index) => {
          console.log(`Object ${index + 1}:`, object);
        });
        setinvtations(parsedResponse);
      }
    };

    xhr.onerror = function () {
      console.error('Network error occurred');
    };

    xhr.send(JSON.stringify({ 'id': JSON.parse(localStorage.getItem('token')).id  }));

    const xhr3r = new XMLHttpRequest();

    xhr3r.open('POST', 'http://localhost/chat_app/Back_end/start/middleware.php/Pfriendsoffhim', true);

    xhr3r.onload = function () {
      if (xhr3r.status !== 200) {
        console.error('Error ' + xhr3r.status + ': ' + xhr3r.statusText);
      } else {
        const friendofhim = JSON.parse(xhr3r.responseText);

        // Log each object in the array individually
        friendofhim.forEach((object, index) => {
          console.log(`Object ${index + 1}:`, object);
        });
        setfriends(friendofhim);
      }
    };

    xhr3r.onerror = function () {
      console.error('Network error occurred');
    };

    xhr3r.send(JSON.stringify({ 'id': JSON.parse(localStorage.getItem('token')).id  }));


    const websocket = new WebSocket('ws://localhost:8080');

    websocket.onopen = function (e) {
      console.log('Connection established!');
    };

    websocket.onmessage = function (e) {
      console.log(e.data)
      const data = JSON.parse(e.data);
      
    };

    websocket.onclose = function (e) {
      console.log('Connection Closed!');
    };

    setConn(websocket);

  }, []);

  // const handleSendClick = (element) => {
    
    
  //   const userId = 1;
  //   var token = JSON.parse( localStorage.getItem('token'))
  //   if(!token){
  //     console.log('error gettig token from localstorage')
  //   }

  //   const data = {
  //     userId: token.id,
  //     msg: msg,
  //     room: localStorage.getItem('tmproomid'),
  //   };
  //   console.log(conn)
  //   if (conn) {
  //     conn.send(JSON.stringify(data));
  //     setMsg(''); // Clear the message input
  //   }else{
  //     console.log('no')
  //   }
  // };
 
  function showConversations(key) {

    const fetchMessages = async (key) => {
      try {
        const response = await fetch('http://localhost/chat_app/Back_end/start/middleware.php/Pmessages', {
          method: 'POST',
          body: JSON.stringify({ roomid: 8000 }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Parsed Data:', data);
  
          const conv = document.querySelector('.conversation');
  
          if (conv) {
            // Clear previous messages
            conv.innerHTML = '';
            var userid = '1';
            data.forEach((message) => {
              const isCurrentUser = message.userid === userid; 
              console.log(isCurrentUser, message.userid, userid);
              const messageContainer = document.createElement('div');
              messageContainer.classList.add('flex', 'items-start', 'mb-4');
  
              messageContainer.innerHTML = `
                <div class="photo h-12 w-12 ${isCurrentUser ? 'ml-auto' : ''} bg-cover bg-center rounded-full" style="background-image: url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')">
                  <div class="online"></div>
                </div>
                <div class="message-container bg-${isCurrentUser ? 'blue-500 text-white' : 'gray-100'} p-4 rounded-md ml-4">
                  <p class="text">${message.msg}</p>
                  <p class="time text-gray-500 text-sm">${message.created_on}</p>
                </div>
              `;
  
              conv.appendChild(messageContainer);
            });
          }
        } else {
          // Handle error
          console.error('Failed to fetch messages:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };
  
    fetchMessages(key);
  }
  function searchactive(val: string) {
    const xhr = new XMLHttpRequest();
  
    xhr.open('POST', 'http://localhost/chat_app/Back_end/start/middleware.php/Pusers', true);
  
    xhr.onload = function () {
      if (xhr.status !== 200) {
        console.error('Error ' + xhr.status + ': ' + xhr.statusText);
      } else {
        const usersSearch = JSON.parse(xhr.responseText);
  
        // Get the container element
        const usersContainer = document.querySelector('.userssearch');
  
        // Clear previous search results
        usersContainer.innerHTML = '';
  
        // Create and append new elements for each user
        usersSearch.forEach((user) => {
          const listItem = document.createElement('li');
          listItem.className = 'flex items-center justify-between p-4 border-b border-gray-300';
        
          const userContainer = document.createElement('div');
          userContainer.className = 'flex items-center';
        
          const userImage = document.createElement('img');
          userImage.width = 30;
          userImage.height = 30;
          userImage.src = 'https://img.icons8.com/ios-filled/30/user-male-circle.png';
          userImage.alt = 'user-male-circle';
          userImage.className = 'rounded-full';
        
          const userName = document.createElement('span');
          userName.className = 'ml-2';
          userName.textContent = user.name;
        
          userContainer.appendChild(userImage);
          userContainer.appendChild(userName);
        
          const actionContainer = document.createElement('div');
          actionContainer.className = 'flex items-center space-x-2';
        
          const addFriendIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          addFriendIcon.setAttribute('width', '20');
          addFriendIcon.setAttribute('height', '20');
          addFriendIcon.setAttribute('fill', 'none');
          addFriendIcon.setAttribute('viewBox', '0 0 24 24');
          addFriendIcon.setAttribute('stroke', 'green');
        
          const addFriendPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          addFriendPath.setAttribute('stroke-linecap', 'round');
          addFriendPath.setAttribute('stroke-linejoin', 'round');
          addFriendPath.setAttribute('stroke-width', '2');
          addFriendPath.setAttribute('d', 'M12 4v16m8-8H4');
        
          addFriendIcon.appendChild(addFriendPath);
        
          actionContainer.appendChild(addFriendIcon);
        
          // Add click event listener to the addFriendIcon
          addFriendIcon.addEventListener('click', function() {
            addAsFriend(user.id);
          });
        
          listItem.appendChild(userContainer);
          listItem.appendChild(actionContainer);
        
          // Append the new list item to the container
          usersContainer.appendChild(listItem);
        });
      }
    };
  
    xhr.onerror = function () {
      console.error('Network error occurred');
    };
  
    xhr.send(JSON.stringify({ 'id': JSON.parse(localStorage.getItem('token')).id, 'searchval': val }));
  }
  
  function addAsFriend(id){
    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost/chat_app/Back_end/start/middleware.php/Pinvitations', true);

    xhr.onload = function () {
      if (xhr.status !== 200) {
        console.error('Error ' + xhr.status + ': ' + xhr.statusText);
      } else {
      }
    };

    xhr.onerror = function () {
      console.error('Network error occurred');
    };

    xhr.send(JSON.stringify({ 'idsender': JSON.parse(localStorage.getItem('token')).id , 'idreceiver':id }));
  }
  function acceptinvite(id) {
    console.log('Sending acceptinvite request for id:', id);
  
    const xhr = new XMLHttpRequest();
  
    xhr.open('POST', 'http://localhost/chat_app/Back_end/start/middleware.php/PaCCEPTIT', true);
  
    xhr.onload = function () {
      console.log('Request completed.');
  
      if (xhr.status !== 200) {
        console.error('Error ' + xhr.status + ': ' + xhr.statusText);
      } else {
        
      }
    };
  
    xhr.onerror = function () {
      console.error('Network error occurred');
    };
  
    
    xhr.send(JSON.stringify({ 'idsender': JSON.parse(localStorage.getItem('token')).id, 'idreceiver': id }));
  }
  function declineinvite(id){
    const xhr = new XMLHttpRequest();
  
    xhr.open('POST', 'http://localhost/chat_app/Back_end/start/middleware.php/Pdecline', true);
  
    xhr.onload = function () {
      console.log('Request completed.');
  
      if (xhr.status !== 200) {
        console.error('Error ' + xhr.status + ': ' + xhr.statusText);
      } else {
        
      }
    };
  
    xhr.onerror = function () {
      console.error('Network error occurred');
    };
  
    
    xhr.send(JSON.stringify({ 'idsender': JSON.parse(localStorage.getItem('token')).id, 'idreceiver': id }));
  }
  function blockuser(id){
    const xhr = new XMLHttpRequest();
  
    xhr.open('POST', 'http://localhost/chat_app/Back_end/start/middleware.php/Pblock', true);
  
    xhr.onload = function () {
      console.log('Request completed.');
  
      if (xhr.status !== 200) {
        console.error('Error ' + xhr.status + ': ' + xhr.statusText);
      } else {
        
      }
    };
  
    xhr.onerror = function () {
      console.error('Network error occurred');
    };
  
    
    xhr.send(JSON.stringify({ 'blocker': JSON.parse(localStorage.getItem('token')).id, 'blocked': id }));
  }
  return (
    <main className="w-screen h-screen  flex containerhome">
      {/* Sidebar */}
      <div className="w-16 border-0.5 border-gray-200 ">
        <nav className="menu">
          
          <ul className="items flex flex-col">
          <Link href="/home">
            <li className="item">
              <img width="33" height="33" src="https://img.icons8.com/metro/33/home.png" alt="home" />
            </li>
            </Link>
            <li className="item item-active">
              <img width="33" height="33" src="https://img.icons8.com/ios-glyphs/33/user--v1.png" alt="user--v1" />
            </li>
            <Link href="/conversations">
            
            <li className="item ">
              <img width="30" height="30" src="https://img.icons8.com/ios/30/comments--v1.png" alt="comments--v1" />
            </li></Link>
            <Link href="/settings">
            <li className="item">
              <img width="33" height="33" src="https://img.icons8.com/metro/33/settings.png" alt="settings" />
            </li> </Link>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-6/12 border-r border-l border-gray-200 p-4">
    
        
        <section className="w-full h-full flex flex-col">
         <div className="bg-gray-50 rounded-md p-4 flex mb-1 items-center">
    <div className="flex items-center">
      <i className="fa fa-user-o text-gray-300" aria-hidden="true"></i>
      <p className="ml-2 text-2xl font-mono  text-gray-700">Conversation</p>
    </div>
  </div>
<div className=' bg-white border h-full overflow-y-auto rounded-md p-4'>


<div className="bg-white conversation border h-5/6 overflow-y-auto rounded-md p-4 ">
    
    
    <Image 
    className=' m-auto'
          src="/undraw_Just_saying_re_kw9c.png" 
          alt="Description of the image" 
          width={500} 
          height={300} 
        />
      
  
  
    </div>
  
      <div className="bg-white p-4 flex items-center mt-auto">
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="msg flex-1 ml-4 border p-2 focus:outline-none rounded-md"
          placeholder="Type your message here"
        />
        <button
          // key="1" onClick={() => handleSendClick('1')}
          className="send flex-shrink-0 ml-4 border p-2 border-gray-300 rounded-md"
        >
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/ios/50/sent--v1.png"
            alt="sent--v1"
          />
        </button>
      </div>
      </div>
      </section>
      </div>
      <div className="w-3/12 border-r border-l background border-gray-200 p-4">
    
        <h1 className="text-2xl font-bold mb-4">Invitations</h1>
        <div className="group">
  <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
  <input placeholder="Search" type="search" onChange={(e) => searchactive(e.target.value)} className="input"/>
</div>
        <ul className="list-none p-0 userssearch shadow-xl">
          {invtations.map((invite, index) => (
            <li key={invite.id} className="flex items-center justify-between p-4 border-b border-gray-300">
              <div className="flex items-center">
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/ios-filled/30/user-male-circle.png"
                  alt="user-male-circle"
                  className="rounded-full"
                />
                <span className="ml-2">{invite.name}</span>
              </div>
              <div className="flex items-center space-x-2">
              <svg onClick={() => acceptinvite(invite.id)} className="p-1    hover:shadow-md hover:cursor-pointer  hover:ring-2 hover:ring-gray-300 hover:transform hover:scale-125 hover:rounded-md" width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="green">
                {/* Your SVG for "Add Friend" goes here */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>

                <svg onClick={() => declineinvite(invite.id)} className="p-1    hover:shadow-md hover:cursor-pointer  hover:ring-2 hover:ring-gray-300 hover:transform hover:scale-125 hover:rounded-md" width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red">
                  {/* Your SVG for "Block" goes here */}
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Friend List */}
      <div className=" border   w-80 border-gray-200 background rounded-lg p-4">
        <h2 className="text-lg font-bold mb-4 text-center">Friend List</h2>
        <ul className="list-none p-0">
          {friends.map((friend, index) => (
            <li key={friend.id} onClick={() => showConversations(friend.id)} className="  shadow-md flex items-center justify-between p-4 border-b border-gray-300">
              <div className="flex items-center ">
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/ios-filled/30/user-male-circle.png"
                  alt="user-male-circle"
                  className="rounded-full"
                />
                <span className="ml-2">{friend.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="green">
                  {/* Your SVG for "Add Friend" goes here */}
                  
                </svg>
                <svg className="p-1    hover:shadow-md hover:cursor-pointer  hover:ring-2 hover:ring-gray-300 hover:transform hover:scale-125 hover:rounded-md" onClick={() => blockuser(friend.id)} width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red">
                  {/* Your SVG for "Block" goes here */}
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Managerfr;
