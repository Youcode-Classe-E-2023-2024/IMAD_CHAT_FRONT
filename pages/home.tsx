import Image from 'next/image';
import Link from 'next/link';
export default function FrontPage() {
  return (
    <main className="h-screen flex font-sans containerhome overflow-hidden ">
         <div className="h-full w-16 ">
         <nav className="menu">
  <ul className="items">
   
    <li className="item item-active">
      <img width="33" height="33" src="https://img.icons8.com/metro/33/home.png" alt="home"/>
    </li>
    <Link href="/friendsmanager">
    <li className="item">
    <img width="33" height="33" src="https://img.icons8.com/ios-glyphs/33/user--v1.png" alt="user--v1"/>
    </li>
    </Link>
    <Link href="/conversations">
    <li className="item ">
    <img width="30" height="30" src="https://img.icons8.com/ios/30/comments--v1.png" alt="comments--v1"/>
    </li>
   </Link>
   <Link href="/home">
    <li className="item">
      <img width="33" height="33" src="https://img.icons8.com/metro/33/settings.png" alt="settings"/>
    </li> </Link>
  </ul>
</nav>


         </div>
        <div className='flex flex-col h-full flex-1'>
        <header className="bg-blue-500 p-4 text-white">
        <div className="container mx-auto flex items-center justify-between">
            <div className='flex items-center gap-4 '>
            <h1 className="text-2xl  font-mono "> Privacy is all </h1>
            <img width="25" height="25" src="https://img.icons8.com/ios/25/check-lock.png" alt="check-lock"/>
            </div>
          
          <button className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-blue-100">Try it </button>
        </div>
      </header>

      <div className="flex md:pl-6 gap-4 flex-1 items-center justify-center px-3 py-3">
        {/* Introduction */}
        <div className="text-2xl font-bold max-w-xl mx-auto animate-toright">
          Our chat app is a shared platform where anyone can talk with anyone.
        </div>

        {/* Shopping image */}
        <div className=" rounded-full center animate-toleft h-full">
          <Image
            className="w-full h-full  rounded-full"
            src="/undraw_Just_saying_re_kw9c.png"
            width="400"
            height="400"
            alt="Shopping Introduction"
          />
        </div>
      </div>

      <footer className="background p-4 px-10 items-center flex pt-4">
        <div className="container mx-auto flex justify-between items-center pt-1">
         
          <div className="flex space-x-4">
            {/* Inline SVG Icons */}
            <a href="your-gmail-link" target="_blank" rel="noopener noreferrer">
            <img width="35" height="35" src="https://img.icons8.com/ios/35/linkedin.png" alt="linkedin"/>
            </a>
            <a href="your-linkedin-link" target="_blank" rel="noopener noreferrer">
            <img width="35" height="35" src="https://img.icons8.com/ios-filled/35/twitterx--v1.png" alt="twitterx--v1"/>
            </a>
            <a href="your-twitter-link" target="_blank" rel="noopener noreferrer">
            <img width="35" height="35" src="https://img.icons8.com/ios-filled/35/github.png" alt="github"/>
            </a>
          </div>
          <div>
            
            <div className="flex w-full ">
              <p className="mb-2 mr-5">
                <span className="font-bold">Email:</span> contact@example.com
              </p>
              <p>
                <span className="font-bold">Phone:</span> 0505343503
              </p>
            </div>
          </div>
        </div>
      </footer>
        </div>
     
    </main>
  );
}
