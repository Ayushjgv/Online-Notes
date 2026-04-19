import { React, useState, useEffect } from 'react';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SendIcon from '@mui/icons-material/Send';
import { useFirebase } from '../context/Firebase';
import ReactMarkdown from "react-markdown";
import fs from "fs";
import path from 'path';

const Chatbot = (props) => {
    const firebase = useFirebase();
    const [showChatbot, setShowChatbot] = useState(false);
    const [fileContent, setfileContent] = useState(null);
    const [Message, setMessage] = useState('');
    const [History, setHistory] = useState([]);

    useEffect(() => {
        if (firebase.isLoggedIn && props.file) {
            setfileContent(props.file.note.content);
        }
    }, [firebase.isLoggedIn, firebase.User, props.file, showChatbot]);

    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };

    const handleChatBot = async () => {
        if (!Message.trim()) return;

        setHistory(prev => [...prev, { role: 'user', content: Message }]);

        console.log("User message:", Message);
        
        const response = await fetch('https://online-notes-fz59.onrender.com/gpt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: Message,
                fileContent: fileContent,
            }),
        });

        setMessage('');

        const data = await response.json();
        console.log("Chatbot response:", data);
        const reply = data?.choices?.[0]?.message?.content;
        console.log("Clean reply:", reply);

        setHistory(prev => [...prev, { role: 'bot', content: reply }]);

    }

    return (
        <div>
            {/* chattbot button? */}
            <button
                onClick={toggleChatbot}
                className={`w-12 h-12 rounded-full flex justify-center items-center z-10 absolute bottom-5 right-5 cursor-pointer bg-white/40 backdrop-blur-md border border-white/40 shadow-lg transition-all duration-300 ease-in-out ${showChatbot ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100 hover:scale-110'}`}
            >
                <SmartToyIcon className='w-full h-full text-blue-500 p-2' fontSize='large' />
            </button>


            {/* //chatbot display */}
            <div className={`h-4/6 w-80 md:w-2/6 backdrop-blur-2xl absolute flex flex-col z-10 bg-white/40 rounded-lg bottom-5 right-5 transition-all duration-300 ease-in-out transform origin-bottom-right overflow-hidden shadow-2xl border border-white/40 ${showChatbot ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
                <div className="flex justify-end p-2 ">
                    <button onClick={toggleChatbot} className='h-10 w-10 flex justify-center items-center transition-all duration-300 ease-in-out hover:scale-110 bg-white/40 rounded-full border border-white/40'>
                        <SmartToyIcon className='w-full h-full text-blue-500 p-1' fontSize='large' />
                    </button>
                </div>
                {/* //reply by bot */}
                <div className="flex-1 p-4 flex flex-col overflow-hidden">

                    {/* SCROLL AREA */}
                    <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                        {
                            History.length > 0 ? History.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}
                                    id='messages'
                                >
                                    {msg.role === 'bot' && (
                                        <SmartToyIcon className='w-8 h-8 text-blue-500 p-1 mt-1' />
                                    )}

                                    {/* MESSAGE BOX */}
                                    <div
                                        className={`rounded-lg p-2 max-w-[80%] break-words overflow-hidden
                                            ${msg.role === 'bot'
                                                ? 'bg-gray-100 rounded-tr-2xl rounded-b-2xl'
                                                : 'bg-green-200 rounded-tl-2xl rounded-b-2xl'
                                            }`}
                                        id='message'
                                    >
                                        <div className="whitespace-pre-wrap break-words">
                                            <ReactMarkdown
                                                components={{
                                                    code({ inline, children }) {
                                                        return inline ? (
                                                            <code className="break-words">
                                                                {children}
                                                            </code>
                                                        ) : (
                                                            <pre className="overflow-x-auto max-w-full bg-black/80 text-white p-2 rounded">
                                                                <code className="whitespace-pre-wrap break-words">
                                                                    {children}
                                                                </code>
                                                            </pre>
                                                        );
                                                    }
                                                }}
                                            >
                                                {msg.content || ""}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className='flex justify-center items-center h-full'>
                                    <p className='text-sm text-gray-500'>
                                        No messages yet. Start the conversation!
                                    </p>
                                </div>
                            )
                        }
                    </div>

                    {/* INPUT */}
                    <div className='flex w-full h-10 rounded-lg border border-white/40 bg-white/50 p-2' id = 'input-area'>
                        <form action="#" className='flex w-full h-full' onSubmit={(e) => { e.preventDefault() }}>
                            <input
                                type="text"
                                value={Message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
                                className='w-full h-full focus:outline-none bg-transparent'
                                id='input-chatbot'
                            />
                            <button onClick={handleChatBot} className='w-10 flex items-center justify-center'>
                                <SendIcon className='text-blue-500' />
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Chatbot