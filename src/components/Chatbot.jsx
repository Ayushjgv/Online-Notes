import { React, useState, useEffect } from 'react';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SendIcon from '@mui/icons-material/Send';
import { useFirebase } from '../context/Firebase';

const Chatbot = (props) => {
    const firebase = useFirebase();
    const [showChatbot, setShowChatbot] = useState(false);
    const [fileContent, setfileContent] = useState(null);

    useEffect(() => {
        if (firebase.isLoggedIn && props.file) {
            setfileContent(props.file.note.content);
        }
    }, [firebase.isLoggedIn, firebase.User, props.file, showChatbot]);

    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };

    const handleChatBot = () => {

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
                    {/* Chatbot content will go here */}
                    <div className="chatbot-display gap-2 flex-1 overflow-y-auto overflow-x-hidden mb-2 pr-1">
                        <div className='flex justify-start items-center'>
                            <SmartToyIcon className='w-10 h-10 text-blue-500 p-1' />
                            <p className='text-sm text-gray-800 p-2 rounded-lg font-medium break-words'>Hello! How can I help you today?</p>
                        </div>
                        <div className='flex justify-end items-center'>
                            <p className='text-sm text-gray-800 p-2 rounded-lg font-medium break-words'>Hello! How can I help you today?</p>
                        </div>
                    </div>

                    {/* input by user */}
                    <div className='flex w-full h-10 rounded-lg border border-white/40 bg-white/50 p-2 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all'>
                        <input type="text" placeholder="Type a message..." className='w-full h-full focus:outline-none' />
                        <button onClick={handleChatBot} className='h-full w-10 flex justify-center items-center transition-all duration-300 ease-in-out hover:scale-110'>
                            <SendIcon className='w-full h-full text-blue-500 p-1' fontSize='large' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chatbot