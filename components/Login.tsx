// components/Login.js
import React, { useState } from 'react';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e : any) => {
    e.preventDefault();
   
    console.log('Name:', name);
    console.log('Email:', email);

    var formData = new FormData();

        formData.append('uname',name);
        formData.append('email',email);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost/chat_app/Back_end/backwork/Main/registerlogin.php', true);

        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 400) {
            const response = JSON.parse(xhr.responseText);
            console.log(response.message);
            localStorage.setItem('token',JSON.stringify(response.message));
          } else {
            console.error(xhr.statusText);
          }
        };
        

        xhr.onerror = function () {
            console.error('Request failed');
        };

        xhr.send(formData);
  };

  
  return (
    <form onSubmit={handleSubmit} className="join-room-frm login-form border p-8 rounded-md shadow-md max-w-xs mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
          Name:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
          Email:
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Login
      </button>
    </form>
  );
};

export default Login;

