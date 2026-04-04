import { React, useEffect, useState } from 'react';
//icons
import { FaBeer } from "react-icons/fa";
import DehazeIcon from '@mui/icons-material/Dehaze';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import EditIcon from '@mui/icons-material/Edit';
import SyncIcon from '@mui/icons-material/Sync';

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [currFile, setcurrFile] = useState(null);
  const [editorText, setEditorText] = useState("");
  const [fileType, setFileType] = useState("note");
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [allFiles, setallFiles] = useState([]);




  const handleAddButton = () => {
    setShowPopup(!showPopup);
  }

  const toggleSidebar = () => {
    setShowPopup(false);
    setShowSidebar((prev) => !prev);
  };

  const handleCreateNew = () => {
    if (fileName.trim() === "") {
      alert("Please enter a file name");
      return;
    }
    const newFile = {
      id: Date.now(),
      name: fileName,
      type: fileType,
      content: ""
    };
    setallFiles((prev) => [newFile, ...prev]);
    setFileName("");
    setFileType("note");
    setShowPopup(false);
  };

  const handleFileClick = (file) => {
    setcurrFile(file);
    setEditorText(file.content || "");
  };



  return (
    // container
    <div className='flex w-full h-screen overflow-hidden bg-gray-100 font-sans text-gray-800 tracking-tight'>

      {/* //left sidebar */}
      <div
        className={`left-sidebar flex flex-col h-screen shrink-0 bg-white border-r border-gray-200 shadow-sm z-10 transition-all duration-500 ease-in-out
        ${showSidebar ? "w-[320px] md:w-[380px] opacity-100 visible" : "w-0 opacity-0 invisible overflow-hidden border-none"}
      `}>
        {/* header */}
        <div className='relative h-[64px] min-h-[64px] px-4 flex items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50'>
          <button onClick={toggleSidebar} className="p-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
            <DehazeIcon className="transition-transform group-hover:scale-110" />
          </button>
          <span className="font-semibold text-gray-700 tracking-wide text-lg">All Notes</span>
          <div className="relative flex items-center">
            <button onClick={handleAddButton} className='p-2.5 text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500/50'>
              <AddIcon />
            </button>

            {showPopup && (
              <div className='popup absolute top-full right-0 mt-3 w-80 bg-white border border-black rounded-2xl shadow-xl z-50 text-left cursor-default'>
                {/* Header */}
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-base font-bold text-gray-900 tracking-tight'>Create New</h2>
                  <button onClick={() => { setShowPopup(false) }} className='p-1 text-gray-400 hover:text-gray-900 hover:bg-black/5 rounded-lg transition-colors cursor-pointer'>
                    <CloseIcon fontSize="small" />
                  </button>
                </div>

                <form action="#" className="flex flex-col gap-4">
                  {/* Type Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Select Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="flex items-center gap-2 p-2.5 border border-gray-200/60 rounded-xl cursor-pointer hover:bg-white/60 transition-colors">
                        <input type="radio" name="itemType" onChange={(e) => { setFileType(e.target.value) }} value="note" defaultChecked className="w-4 h-4 cursor-pointer accent-indigo-600" />
                        <span className="text-sm font-medium text-gray-700">Note</span>
                      </label>
                      <label className="flex items-center gap-2 p-2.5 border border-gray-200/60 rounded-xl cursor-pointer hover:bg-white/60 transition-colors">
                        <input type="radio" name="itemType" onChange={(e) => { setFileType(e.target.value) }} value="task" className="w-4 h-4 cursor-pointer accent-indigo-600" />
                        <span className="text-sm font-medium text-gray-700">Task</span>
                      </label>
                    </div>
                  </div>

                  {/* Name Input */}
                  <div className="space-y-2 mt-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">File Name</label>
                    <input type="text" value={fileName} onChange={(e) => { setFileName(e.target.value) }} className="w-full px-3 py-2 text-sm text-gray-800 border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 bg-white/60 focus:bg-white transition-all placeholder-gray-400" placeholder="Enter name..." />
                  </div>

                  <button type="button" onClick={handleCreateNew} className="mt-2 w-full py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer">
                    Create
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>


        {/* //search */}
        <div className='p-3 border-b border-gray-100 bg-gray-50/50'>
          <div className='flex items-center w-full bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm transition-shadow focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:shadow-md'>
            <SearchIcon className="text-gray-400 w-5 h-5 flex-shrink-0" />
            <input
              type="text"
              className='w-full bg-transparent outline-none placeholder-gray-400 text-sm text-gray-800 ml-2 focus:outline-none focus:ring-0'
              placeholder='Search notes and tags...'
            />
          </div>
        </div>

        {/* //list */}
        <div className='flex-1 overflow-y-auto bg-white p-3 space-y-2'>
          {/* Example empty state or list container */}
          {
            allFiles.length > 0 ? allFiles.map((file) => {
              return (
                <div onClick={() => handleFileClick(file)} key={file.id} className="list-items flex items-center justify-between p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="text-sm font-medium text-gray-700">{file.name}</span>
                  <button onClick={() => handleFileClick(file)} className="text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors cursor-pointer">
                    <SyncIcon />

                  </button>
                </div>
              )
            }) : <div className="flex items-center justify-center h-full">
              <span className="text-sm font-medium text-gray-700">No files Yet</span>
            </div>
          }
        </div>
      </div>

      {/* //right main content */}
      <div className='flex flex-col flex-1 h-screen bg-white'>
        {/* //header */}
        <div className='h-14 px-4 mt-2 flex items-center justify-between sticky top-0'>
          {/* left */}
          <div>
            <button onClick={toggleSidebar} className="px-3 py-1.5 text-sm text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-150 cursor-pointer flex items-center justify-center focus:outline-none">
              {
                !showSidebar ? <DehazeIcon /> : <></>
              }
            </button>

          </div>
          {/* middle */}
          <div>
            {currFile ? currFile.name : "New Note"}
          </div>

          {/* right */}
          <div className='flex items-center gap-1'>
            <button className='px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-150 cursor-pointer focus:outline-none'>
              Share
            </button>
            <button className='px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-150 cursor-pointer focus:outline-none hidden sm:block'>
              Export
            </button>
            <button className='px-4 py-1.5 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md transition-colors duration-150 cursor-pointer shadow-sm focus:outline-none ml-2'>
              Save
            </button>
          </div>
        </div>

        {/* //editor */}
        <div className='flex-1 px-8 md:px-16 pt-4 pb-20 overflow-y-auto'>
          <div className='mx-auto w-full'>
            <textarea
              name="editor"
              id="editor"
              value={editorText}
              onChange={(e) => { setEditorText(e.target.value) }}
              className='w-full min-h-[800px] bg-transparent outline-none resize-none text-gray-800 text-[16px] leading-[1.8] placeholder-gray-300 focus:outline-none focus:ring-0 selection:bg-gray-200'
              placeholder="Press Enter to continue typing..."
              defaultValue="D"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
