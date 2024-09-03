import React from "react";
// import './footer.css';
import { FaGithub, FaLinkedinIn,FaTwitter,FaInstagram} from "react-icons/fa";


const ComponentName = () => {
    const year = new Date().getFullYear();
  return (
    <footer className="relative text-white">
      <div className="absolute top-0 left-0 w-full overflow-hidden fill-primary">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
            className="relative block fill-primary"
          ></path>
        </svg>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-20 p-20 fill-primary">
        <div className="flex flex-col">
               <h2 className="text-2xl text-pink-500 uppercase mb-4">Footer</h2>
               <p>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et tempus nisl. Donec quis nibh et mi fringilla condimentum. Suspendisse eu sodales libero</p>
            </div>
            <div className="flex flex-col">
                <ul>
                    <li className="text-[22px] list-none font-semibold text-pink-500 py-2 uppercase">Creativity</li>
                    <li className="my-4 list-none">Website Guide & Ideas</li>
                    <li className="my-4 list-none">Tips & Tricks</li>
                    <li className="my-4 list-none">Photography</li>
                </ul>
            </div>
            <div className="flex flex-col">
                <ul>
                    <li className="text-[22px] list-none font-semibold text-pink-500 py-2 uppercase">Creativity</li>
                    <li className="my-4 list-none"> Guide & Ideas</li>
                    <li className="my-4 list-none">Tips & Tricks</li>
                    <li className="my-4 list-none">Photography</li>
                </ul>
            </div>
            <div className="flex flex-col">
                <ul>
                    <li className="text-[22px] list-none font-semibold text-pink-500 py-2 uppercase">Creativity</li>
                    <li className="my-4 list-none">Email: yougmail@gmail.com</li>
                    <li className="my-4 list-none">phone: +880 1790009585</li>
                    
                </ul>
                <div className="flex space-x-4">
                    <a className="text-white  hover:text-pink-500 transform hover:scale-150 transition-all duration-150 ease-in-out" href="">
                        <FaGithub/>
                    </a>
                    <a className="text-white  hover:text-pink-500 transform hover:scale-150 transition-all duration-150 ease-in-out" href="">
                        <FaLinkedinIn/>
                    </a>
                    <a className="text-white  hover:text-pink-500 transform hover:scale-150 transition-all duration-150 ease-in-out" href="">
                        <FaTwitter/>
                    </a>
                    <a className="text-white  hover:text-pink-500 transform hover:scale-150 transition-all duration-150 ease-in-out" href="">
                        <FaInstagram/>
                    </a>
                </div>
            </div>
        </div>
        <div>
            <div className="h-full flex items-center justify-center mb-5">
                <form className="w-96 relative" action="">
                    <input className="w-full text-gray-800 p-4 h-10 rounded-full focus:outline-none focus:border border-pink-800" type="email"/>
                    <button className="bg-pink-400 px-8 py-2 rounded-full text-white absolute top-0 right-0" type="submit">Submit</button>
                </form>
            </div>
        </div>
        <h6 className="text-center">&copy; Copy right Dev Pallob {year}</h6>
      </div>
    </footer>
  );
};

export default ComponentName;
