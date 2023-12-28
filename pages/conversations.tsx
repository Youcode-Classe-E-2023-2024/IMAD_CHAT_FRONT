import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
export default function Home() {
  var roomcount = 0;
  const [msg, setMsg] = useState('');
  const [roomnameb, setnameroom] = useState('');
  const [conn, setConn] = useState(null);
  var userid:any = null;
  var roomname = 1;

  useEffect(() => {
    localStorage.setItem('tmproomid','999999')
    if(!localStorage.getItem('token')){
      console.log('not sighned');
  }else{
    
    
  userid = JSON.parse(localStorage.getItem('token')).id 
    
    const fetchRooms = () => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://localhost/chat_app/Back_end/start/middleware.php/rooms/'+ userid, true);
      var at = 0;
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              const data = JSON.parse(xhr.responseText);
              console.log('Parsed Data:', data); // Use data directly
              if(at === 0){
              data.forEach(element => {
                showrooms(element.id,element.name,element.owner)
              }); at++}
            } catch (parseError) {
              console.error('Error parsing JSON:', parseError);
            }
          } else {
            // Handle error
            console.error('Failed to fetch rooms:', xhr.status, xhr.statusText);
          }
        }
      };
    
      xhr.send();
    };
    
    fetchRooms();
    
  }


    const websocket = new WebSocket('ws://localhost:8080');

    websocket.onopen = function (e) {
      console.log('Connection established!');
    };

    websocket.onmessage = function (e) {
      console.log(e.data)
      const data = JSON.parse(e.data);
      
      if(localStorage.getItem('tmproomid') === data.room){
          console.log('msg nfs room')
      
      // Add the new message to the chat
      const conv = document.querySelector('.conversation');
    
      if (conv) {
        const isCurrentUser = data.userId === userid; // Replace '1' with the actual user ID
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('flex', 'items-start', 'mb-4');
        
        messageContainer.innerHTML = `
          <div class="photo h-12 w-12 ${isCurrentUser ? 'ml-auto' : ''} bg-cover bg-center rounded-full" style="background-image: url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')">
            <div class="online"></div>
          </div>
          <div class="message-container bg-${isCurrentUser ? 'blue-500 text-white' : 'gray-100'} p-4 rounded-md ml-4">
            <p class="text">${data.msg}</p>
            <p class="time text-gray-500 text-sm">${data.dt}</p>
          </div>
        `;
    
        conv.appendChild(messageContainer);
      }}else{console.log('machi nfs room')}
      const yourDiv = document.querySelector('.conversation');

// Scroll the div to the end
          yourDiv.scrollTo({
            top: yourDiv.scrollHeight,
            behavior: 'smooth'
          });
    };

    websocket.onclose = function (e) {
      console.log('Connection Closed!');
    };

    setConn(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  const handleSendClick = (element) => {
    
    console.log(roomname + 'ddd')
    const userId = 1;
    var token = JSON.parse( localStorage.getItem('token'))
    if(!token){
      console.log('error gettig token from localstorage')
    }

    const data = {
      userId: token.id,
      msg: msg,
      room: localStorage.getItem('tmproomid'),
    };
    console.log(conn)
    if (conn) {
      conn.send(JSON.stringify(data));
      setMsg(''); // Clear the message input
    }else{
      console.log('no')
    }
  };
  function newroom() {

    var xhr = new XMLHttpRequest();
xhr.open('POST', 'http://localhost/chat_app/Back_end/start/middleware.php/Prooms', true);
    var roomdata = {"name":roomnameb,"owner": JSON.parse(localStorage.getItem('token')).id };// dummmy 
xhr.onreadystatechange = function() {

  if (xhr.readyState === 4 && xhr.status === 200) {

  

    console.log(xhr.responseText);
    console.log(xhr.responseText,"new")
    showrooms(xhr.responseText,roomnameb,1)
  
    
    
  }
};


xhr.send(JSON.stringify(roomdata) );

    
  


}

function showrooms(ele:string,name:string,ownerid:any){
  console.log(ele,name)
  const groupesElement = document.querySelector('.grouupes');

    if (groupesElement) {
      const newDiv = document.createElement('div');
      newDiv.setAttribute('key', ele);
      newDiv.classList.add('flex', 'items-center', 'bg-white', 'h-[90px]', 'border-b', 'px-10', 'border-gray-300');
    
      const innerHTML = `
        <div class="w-1/5">
            <div class="h-16 w-16 bg-cover bg-center rounded-full" style="background-image: url(https://e7.pngegg.com/pngimages/364/836/png-clipart-computer-icons-users-group-others.png)">
                <div class="online"></div>
            </div>
        </div>
        <div class="flex-1 ml-4">
            <p class="text-lg font-semibold text-gray-800">${name}</p>
            <p class="text-sm text-gray-600">Let's meet for a coffee or something today ?</p>
        </div>
        <div class="settigs text-sm text-gray-600 ml-4">3 min</div>
      `;
    
      newDiv.innerHTML = innerHTML;
      var hoverTimeout;

      newDiv.addEventListener('mouseover', () => {
        console.log(String(ownerid) , JSON.parse(localStorage.getItem('token')).id)
        hoverTimeout = setTimeout(() => {
          if(ownerid === JSON.parse(localStorage.getItem('token')).id){
          settings(ele);
          }else{console.log("not room owner")}
          
          
    
  
  
        }, 2000);
      });
      
      newDiv.addEventListener('mouseout', () => {
       
        clearTimeout(hoverTimeout);
      });

      newDiv.addEventListener('click', () => showConversations(ele));
      groupesElement.appendChild(newDiv);
    }
    
}

function settings(id) {
  const header = document.createElement('h1');
header.textContent = 'Block User';
header.style.color = 'red';

// Create a container div
const container = document.createElement('div');
container.style.position = 'fixed';
container.style.top = '50%';
container.style.left = '50%';
container.style.transform = 'translate(-50%, -50%)';
container.style.padding = '20px';
container.style.border = '1px solid #ccc';
container.style.borderRadius = '8px';
container.style.backgroundColor = '#fff';
container.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
container.style.zIndex = '1000';

// Create a div to hold the header and the SVG icon
const headerContainer = document.createElement('div');
headerContainer.style.display = 'flex';
headerContainer.style.justifyContent = 'space-between';
headerContainer.style.marginBottom = '10px';
headerContainer.style.alignItems = 'center';

// Add an SVG icon
const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svgIcon.setAttribute('width', '24');
svgIcon.setAttribute('height', '24');
svgIcon.setAttribute('viewBox', '0 0 24 24');
svgIcon.style.cursor = 'pointer';
svgIcon.innerHTML = '<path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM8 11h8v2H8z"/>';

// Function to be assigned to the SVG icon click event
const quietFunction = () => {
  container.style.display = 'none';
  
};

// Assign the function to the SVG icon click event
svgIcon.addEventListener('click', quietFunction);

// Append elements to the header container
headerContainer.appendChild(header);
headerContainer.appendChild(svgIcon);

// Append the header container to the main container
container.appendChild(headerContainer);

// Create a search input
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search...';
searchInput.style.padding = '10px';
searchInput.style.marginRight = '10px';
searchInput.style.border = '1px solid #ccc';
searchInput.style.borderRadius = '4px';
searchInput.style.width = '200px';
searchInput.style.boxSizing = 'border-box';

// Create a div to show search results
const searchResults = document.createElement('div');
searchResults.id = 'search-results';
searchResults.style.marginTop = '20px';

// Append elements to the container
container.appendChild(searchInput);
container.appendChild(searchResults);

// Append the container to the body
document.body.appendChild(container);


  // Add an event listener to the search input for dynamic search
  searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    
  const xhr = new XMLHttpRequest();

  xhr.open('POST', 'http://localhost/chat_app/Back_end/start/middleware.php/Pusers', true);

  xhr.onload = function () {
    if (xhr.status !== 200) {
      console.error('Error ' + xhr.status + ': ' + xhr.statusText);
    } else {
      const usersSearch = JSON.parse(xhr.responseText);

      
    const filteredUsers = usersSearch;

    // Clear previous search results
    searchResults.innerHTML = '';

    // Display search results
    filteredUsers.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.className = 'user';
      userDiv.textContent = user.name;

      // Add click event listener to each user element
      userDiv.addEventListener('click', function () {
        // Call your function with the user id
        activateFunction(user.id,id);
      });

      searchResults.appendChild(userDiv);
    });
    }
  };

  xhr.onerror = function () {
    console.error('Network error occurred');
  };

  xhr.send(JSON.stringify({ 'id': JSON.parse(localStorage.getItem('token')).id, 'searchval': searchTerm }));
  
  });

  // Function to be called when a user is clicked
  function activateFunction(userId,roomid) {
    
    console.log('User clicked! ID:', userId, roomid);
    const xhr = new XMLHttpRequest();
  
    xhr.open('POST', 'http://localhost/chat_app/Back_end/start/middleware.php/Proomblock', true);
  
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
  
    
    xhr.send(JSON.stringify({ 'userblocked': userId, 'roomid': roomid }));
  }
}

function showConversations(key) {
  localStorage.setItem('tmproomid', key); // tmp
  // Fetch msgs with id key
  console.log(key + 'kkk');

  const fetchMessages = async (key) => {
    try {
      const response = await fetch('http://localhost/chat_app/Back_end/start/middleware.php/Pmessages', {
        method: 'POST',
        body: JSON.stringify({ roomid: key }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Parsed Data:', data);

        const conv = document.querySelector('.conversation');

        if (conv) {
          // Clear previous messages
          conv.innerHTML = '';

          data.forEach((message) => {
            const isCurrentUser = message.userid === userid; // Replace '1' with the actual user ID
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

          // Attach event listener to the button
          const sendButton = document.getElementById('sendButton');
          if (sendButton) {
            sendButton.addEventListener('click', () => handleSendClick(key));
          }
          const yourDiv = document.querySelector('.conversation');

// Scroll the div to the end
          yourDiv.scrollTo({
            top: yourDiv.scrollHeight,
            behavior: 'smooth'
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

const handleKeyUp = (e) => {

  const pressedKey = e.key;


  if (pressedKey === 'Enter') {
    handleSendClick('enter');
    
  
  }
};




  function hideAllBut(id: number) {
    console.log(id);
  }

  return (
    
      <main className=' w-screen h-screen flex containerhome'>
      
         <div className="h-full w-16 ">
         <nav className="menu">
  <ul className="items">
  <Link href="/home">
    <li className="item">
      <img width="33" height="33" src="https://img.icons8.com/metro/33/home.png" alt="home"/>
    </li>
    </Link>
    <Link href="/friendsmanager">
    <li className="item">
    <img width="33" height="33" src="https://img.icons8.com/ios-glyphs/33/user--v1.png" alt="user--v1"/>
    </li>
    </Link>
    <li className="item item-active">
    <img width="30" height="30" src="https://img.icons8.com/ios/30/comments--v1.png" alt="comments--v1"/>
    </li>
    <Link href="/settings">
    <li className="item">
      <img width="33" height="33" src="https://img.icons8.com/metro/33/settings.png" alt="settings"/>
    </li> </Link>
  </ul>
</nav>


         </div>
         <div className="h-full w-5/12 border-2 ml-3">
          <div className=" h-24 w-full border items-center justify-center flex">
          
    <div className="h-12 mx-auto border bg-white w-3/4 px-8 rounded-full flex items-center cursor-pointer">
    <img width="17" height="17" src="https://img.icons8.com/metro/33/search.png" alt="file"/>
      <input type="text" placeholder="Search..." className="ml-4  w-5/6 border-none focus:outline-none" />
    
  </div>
          </div>

          <div className="h-5/6 w-full border">

                    <div className='grouupes   h-full overflow-y-auto gap-2'>
                    
                   
                    </div>
                   
          <div className='absolute  left-1/4 bottom-10'>
          <input
          type="text"
          value={roomnameb}
          onChange={(e) => setnameroom(e.target.value)}
          className="msg flex-1 ml-4 border p-2 focus:outline-none rounded-md"
          placeholder="The group Name?"
        />
          <img onClick={newroom}  width="70" height="70" src="https://img.icons8.com/ultraviolet/70/plus--v1.png" alt="plus--v1"/>
          </div>
          

          </div>
          
         </div>

         <div className="h-full  chat w-6/12 border-2 ml-7">
         <section className="w-full h-full flex flex-col">
         <div className="bg-gray-200 p-4 flex items-center">
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
        onKeyUp={(e) => handleKeyUp(e)}
        className="msg flex-1 ml-4 border p-2 focus:outline-none rounded-md"
        placeholder="Type your message here"
      />

        <button
          key="1" onClick={() => handleSendClick('1')}
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
    </main>
  );
}


