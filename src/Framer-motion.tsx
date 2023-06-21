import React, { useState } from 'react';
import {motion, AnimatePresence} from 'framer-motion';

type Message = {
  id: number;
  sender: string;
  content: string;
};

const FramerMotion: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([{id: 1, sender: 'me', content: 'hey'},{id: 2, sender: 'me', content: 'hey'}]);

  const deleteMessage = (id: number) => {
    const updatedMessages = messages.filter((message) => message.id !== id);
    setMessages(updatedMessages);
  };

  const addMessage = () => {
    const newMessage: Message = {
      id: Date.now(),
      sender: 'me',
      content: 'New message content',
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className='relative my-10'>
      <AnimatePresence initial={false}>
        {messages.map((message) => (
          <motion.div
          initial={{opacity: 0, scale: 0.5, height: 0}}
          animate={{opacity: 1, scale: 1, height: "auto"}}
          exit={{opacity: 0, scale: 0.5, height: 0}}
          transition={{opacity: {duration: .2}}}
          key={message.id}>
            <div className='flex py-1'>
              <button className={`text-lg w-full text-start ${message.sender === 'me' ? "bg-stone-200" : "bg-stone-200"}`} onClick={() => deleteMessage(message.id)}>
              <strong>{message.sender}: </strong>
              {message.content}
              </button>
            </div>
          </motion.div>
        ))}
        <button className='p-4 bg-blue-400 absolute -top-10 right-56' onClick={addMessage}>add</button>
      </AnimatePresence>
    </div>
  );
};

