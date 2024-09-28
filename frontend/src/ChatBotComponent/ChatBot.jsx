import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import ChatBotImg from '../img/chatBot.svg';
import './ChatBot.css';
import { IoSend } from 'react-icons/io5';
import Navbar from '../Navbar';
import { motion } from 'framer-motion';


const ChatBot = () => {
   const [messages, setMessages] = useState([]);
   const [inputMessage, setInputMessage] = useState('');
   const [loading, setLoading] = useState(false);
   const [isTyping, setIsTyping] = useState(false); // State to track typing status
   const chatContentRef = useRef(null);
   const lastMessageRef = useRef(null);

   // Auto-scroll while typing and stop after
   useEffect(() => {
      chatContentRef.current.scrollTo({
         top: chatContentRef.current.scrollHeight,
         behavior: 'smooth',
      });
   }, [isTyping]); // Track typing status

   const handleSendMessage = async () => {
      if (!inputMessage) return;
      const question = inputMessage;
      setInputMessage('');
      setLoading(true);
      try {
         const response = await axios({
            method: 'POST',
            url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDYuRJ9qvb47Q0Jspl1g3Ey4jNrRHTUe9g',
            data: {
               contents: [
                  {
                     parts: [{ text: question + ' within 200 words' }],
                  },
               ],
            },
         });

         const botMessage = response.data.candidates[0].content.parts[0].text.replace(/\*/g, '');

         setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'user', text: question },
            { sender: 'bot', text: botMessage },
         ]);
      } catch (error) {
         console.error('Error generating response:', error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <>
         <Navbar />
         <div className='chatbot-main-main'>
            <motion.div 
               initial={{ opacity: 0, x: -100 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6 }}
               className='chat-bot-img'
            >
               <img src={ChatBotImg} alt="chatBotImg" />
            </motion.div>
            <motion.div 
               className="chatbot-main"
               initial={{ opacity: 0, x: 100 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6 }}
            >
               <header>Autism Compass Chatbot</header>
               <div className="chat-content" ref={chatContentRef}>
                  {messages.map((message, index) => (
                     <div
                        key={index}
                        className={`message-${message.sender}`}
                        ref={index === messages.length - 1 ? lastMessageRef : null}
                     >
                        <p>
                           {message.sender === 'bot' && (
                              <Typewriter
                                 words={[message.text]}
                                 typeSpeed={15}
                                 onType={() => setIsTyping(true)} // Set typing state to true when typing starts
                                 // onDone={() => setIsTyping(false)} 
                                 onLoopDone={() => setIsTyping(false)}
                              />
                           )}
                           {message.sender === 'user' && message.text}
                        </p>
                     </div>
                  ))}
               </div>
               <div className="input-content">
                  <textarea
                     disabled={loading}
                     placeholder="Ask me anything.."
                     value={inputMessage}
                     onChange={(e) => setInputMessage(e.target.value)}
                     onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  ></textarea>
                  <div className="send-loading">
                     {loading && (
                        <div className='loader-div'>
                           <div className='loader-animation'></div>
                        </div>
                     )}
                     {!loading && (
                        <IoSend className="chatbot-button" onClick={handleSendMessage} />
                     )}
                  </div>
               </div>
            </motion.div>
         </div>
      </>
   );
};

export default ChatBot;
