import React from 'react'

const Home = () => {




  


  return (
    // container
    <div className='text-2xl font-bold text-center flex align-items-center justify-content text-white w-full h-screen overflow-hidden'>
      
      
      {/* //left */}
      <div className='h-screen w-2/6 bg-gray-50 text-black border-r-1 border-gray-400 max-w-[520px] min-w-[320px]'>
        {/* header */}
        <div className='h-10 bg-gray-50 text-lg flex items-center border-gray-400 border-b-1 justify-between'>
          <button className="border border-gray-900 px-4 py-2 rounded hover:bg-cyan-400 w-20 cursor-pointer transition duration-1000">-></button>
          <span>All Notes</span>
          <button className='border border-gray-900 px-4 py-2 rounded hover:bg-cyan-400 w-20 cursor-pointer transition duration-1000'>+</button>
        </div>
        {/* //search */}
        <div className='flex w-full h-10 bg-gray-50 overflow-hidden'>
          <button className='hover:bg-gray-200 w-1/6 border-b-1 border-gray-400 cursor-pointer'>🔍</button>
          <input type="text" className='w-5/6 border-b-1 border-gray-400 placeholder-gray-400 text-lg' placeholder='Search All Notes And Tags'  />
        </div>
        {/* //list */}
        <div className=''></div>
      </div>




      {/* //right */}
      <div className='h-screen w-full bg-gray-50 flex-col items-center text-black'>
        {/* //header */}
        <div className='h-10 bg-gray-50 text-lg flex items-center justify-between border-b-1 border-gray-400'>
          {/* left */}
          <button className="px-4 py-2 rounded text-black w-15 pl-10 border-black border-1 hover:bg-cyan-400 cursor-pointer transition duration-1000"> ← </button>
          {/* right */}
          <div className='flex items-center justify-between mr-20'>
            <span className='px-4 py-2 rounded text-black ml-20 w-15 pl-10 border-black border-1 hover:bg-cyan-400 cursor-pointer transition duration-1000'>F</span>
            <span className='px-4 py-2 rounded text-black ml-20 w-15 pl-10 border-black border-1 hover:bg-cyan-400 cursor-pointer transition duration-1000'>G</span>
            <span className='px-4 py-2 rounded text-black ml-20 w-15 pl-10 border-black border-1 hover:bg-cyan-400 cursor-pointer transition duration-1000'>H</span>
          </div>
        </div>
        {/* //editor */}
        <textarea name="editor" id="editor" className='w-full p-4 h-screen text-lg text-black'>D</textarea>
      </div>


    </div>
  )
}

export default Home
