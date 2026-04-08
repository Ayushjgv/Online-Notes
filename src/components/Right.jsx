import React from 'react';
import DehazeIcon from '@mui/icons-material/Dehaze';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import ShareIcon from '@mui/icons-material/Share';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import DownloadIcon from '@mui/icons-material/Download';
import LogoutIcon from '@mui/icons-material/Logout';
import AddTaskIcon from '@mui/icons-material/AddTask';
import SyncIcon from '@mui/icons-material/Sync';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';

const Right = ({
    showSidebar,
    toggleSidebar,
    currFile,
    align,
    setAlign,
    handleOpenFile,
    setisDownload,
    handleLogout,
    editorText,
    handleEditor,
    taskInputs,
    setTaskInputs,
    syncTasks,
    handleDone,
    handleDeleteTask
}) => {
    return (
        <div className='flex flex-col flex-1 h-screen bg-white'>
            {/* //header */}
            <div className='h-14 px-4 mt-2 flex items-center justify-between sticky top-0 border-b border-gray-400'>
                {/* left */}
                <div className='flex'>
                    <button onClick={toggleSidebar} className="px-3 py-1.5 text-sm text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-150 cursor-pointer flex items-center justify-center focus:outline-none">
                        {
                            !showSidebar ? <DehazeIcon fontSize='small' /> : <></>
                        }
                    </button>
                    <div className='flex items-center gap-1'>
                        {currFile ? currFile.note.name : "New Note"}
                    </div>
                </div>
                {/* middle */}
                <div>
                    <button onClick={() => setAlign("left")}><FormatAlignLeftIcon fontSize='small' /></button>
                    <button onClick={() => setAlign("center")}><FormatAlignCenterIcon fontSize='small' /></button>
                    <button onClick={() => setAlign("right")}><FormatAlignRightIcon fontSize='small' /></button>
                </div>

                {/* right */}
                <div className='flex items-center gap-1'>
                    <button className='px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 rounded-md transition-colors duration-150 cursor-pointer focus:outline-none'>
                        <ShareIcon fontSize='small' />
                    </button>
                    <button onClick={() => { handleOpenFile() }} className='px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-black rounded-md transition-colors duration-150 cursor-pointer  focus:outline-none ml-2'>
                        <FileOpenIcon fontSize='small' />
                    </button>
                    <button onClick={() => { setisDownload(true) }} className='px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-black rounded-md transition-colors duration-150 cursor-pointer focus:outline-none ml-2'>
                        <DownloadIcon fontSize='small' />
                    </button>
                    <button onClick={() => { handleLogout() }} className="px-4 py-1.5 text-sm font-medium text-red-600 hover:text-black rounded-md transition-colors duration-150 cursor-pointer focus:outline-none ml-2">
                        <LogoutIcon fontSize='small' />
                    </button>
                </div>
            </div>

            {/* //editor */}
            {
                currFile && (currFile.note.type == "note" || !currFile.note.type) ? (
                    <div className='flex-1 flex flex-col px-8 md:px-16 pt-4 pb-12 overflow-y-auto'>
                        <div className='mx-auto w-full flex-1 flex flex-col'>
                            <textarea
                                name="editor"
                                spellCheck="false"
                                id="editor"
                                value={editorText}
                                onChange={(e) => { handleEditor(e) }}
                                className={`flex-1 min-h-[calc(100vh-120px)] bg-transparent outline-none resize-none text-gray-800 text-[16px] leading-[1.8] placeholder-gray-300 focus:outline-none focus:ring-0 selection:bg-gray-200 transition-colors duration-200 ${align === "left" ? "text-left" : align === "center" ? "text-center" : "text-right"}`}
                                placeholder="Press Enter to continue typing..."
                            ></textarea>
                        </div>
                    </div>) : currFile && currFile.note.type == "task" ? (
                        <div className='flex-1 flex flex-col px-8 md:px-16 pt-4 pb-12 overflow-y-auto'>
                            {/* topbar */}
                            <div className='flex items-center justify-between mb-4'>
                                <button onClick={() => { setTaskInputs([...taskInputs, { text: "New Task", done: false }]) }} className='flex bg-blue-300 rounded-sm'><AddTaskIcon fontSize='small' /></button>
                                <button onClick={syncTasks}><SyncIcon fontSize='small' /></button>
                            </div>
                            {/* list */}
                            {
                                taskInputs.length > 0 ?
                                    taskInputs.map((task, index) => {
                                        return (
                                            <div key={index} className='tasks flex p-3 border items-center border-gray-200 rounded-xl hover:bg-gray-50 transition-colors'>
                                                <button onClick={() => handleDone(index)} className="mr-2"><DoneIcon fontSize='small' /></button>
                                                <input
                                                    type="text"
                                                    value={task.text || ""}
                                                    onChange={(e) => {
                                                        const newInputs = [...taskInputs];
                                                        newInputs[index] = { ...newInputs[index], text: e.target.value };
                                                        setTaskInputs(newInputs);
                                                        syncTasks(newInputs);
                                                    }}
                                                    style={{ textDecoration: task.done ? 'line-through' : 'none' }}
                                                    className={`w-full bg-transparent outline-none ${task.done ? 'text-gray-400' : 'text-gray-800'}`}
                                                />
                                                <button onClick={() => {
                                                    if (confirm("Are you sure you want to delete this task?")) {
                                                        handleDeleteTask(index);
                                                    }
                                                }} className="ml-2 text-gray-400 hover:text-red-500 cursor-pointer"><DeleteIcon fontSize='small' /></button>
                                            </div>
                                        );
                                    })
                                    :
                                    (

                                        <div className="flex items-center justify-center h-full">
                                            No Tasks Yet
                                        </div>
                                    )
                            }

                        </div>
                    )

                    : (<div className='flex-1 px-8 md:px-16 pt-4 pb-20 overflow-y-auto flex items-center justify-center'>
                        <div className='mx-auto text-center'>
                            <span className='text-sm font-medium text-gray-400'>No file selected</span>
                        </div>
                    </div>)
            }
        </div>
    );
};

export default Right;
