import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Settings() {
  // State for color and language settings
  const [selectedColor, setSelectedColor] = useState('defaultColor');
  const [selectedLanguage, setSelectedLanguage] = useState('defaultLanguage');

  // Function to handle color change
  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
    // You can add logic here to apply the selected color to your app
  };

  // Function to handle language change
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    // You can add logic here to apply the selected language to your app
  };
  return (
    <main className="h-screen flex font-sans containerhome overflow-hidden ">
      <div className="h-full w-16 ">
        <nav className="menu">
          <ul className="items">
            <Link href="/home">
              <li className="item ">
                <img width="33" height="33" src="https://img.icons8.com/metro/33/home.png" alt="home" />
              </li>
            </Link>
            <Link href="/friendsmanager">
              <li className="item">
                <img width="33" height="33" src="https://img.icons8.com/ios-glyphs/33/user--v1.png" alt="user--v1" />
              </li>
            </Link>
            <Link href="/conversations">
              <li className="item ">
                <img width="30" height="30" src="https://img.icons8.com/ios/30/comments--v1.png" alt="comments--v1" />
              </li>
            </Link>
            <li className="item item-active">
              <img width="33" height="33" src="https://img.icons8.com/metro/33/settings.png" alt="settings" />
            </li>
          </ul>
        </nav>
      </div>
      <div className='flex-1 p-4'>
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <div>
          {/* Color Settings */}
          <label className="block mb-2">
            Color:
            <select
              value={selectedColor}
              onChange={handleColorChange}
              className="border p-2 focus:outline-none rounded-md"
            >
              <option value="defaultColor">Default</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              {/* Add more color options as needed */}
            </select>
          </label>

          {/* Language Settings */}
          <label className="block mb-2">
            Language:
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="border p-2 focus:outline-none rounded-md"
            >
              <option value="defaultLanguage">Default</option>
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              {/* Add more language options as needed */}
            </select>
          </label>
        </div>
      
      </div>
    </main>
  );
}
