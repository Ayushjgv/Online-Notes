import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
//firebase
import { useFirebase } from '../context/Firebase';

//components
import Left from '../components/Left';
import Right from '../components/Right';
import Chatbot from '../components/Chatbot';

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [currFile, setcurrFile] = useState(null);
  const [editorText, setEditorText] = useState("");
  const [fileType, setFileType] = useState("note");
  const [fileName, setFileName] = useState("");
  const [allFiles, setallFiles] = useState([]);
  const [align, setAlign] = useState("left");
  const [isDownload, setisDownload] = useState(false);
  const [downloadType, setDownloadType] = useState("txt");
  const [search, setSearch] = useState("");
  const [taskInputs, setTaskInputs] = useState([]);

  const firebase = useFirebase();
  const navigate = useNavigate();



  useEffect(() => {
    if (!firebase.isLoggedIn || !firebase.User) {
      navigate("/");
      return;
    }

    const id = firebase.User.uid;
    firebase.getNotes((notes) => {
      if (!notes) return;
      const userNotes = Object.entries(notes).map(([id, data]) => ({
        id,
        ...data
      }));
      setallFiles(userNotes);
    });


  }, [firebase.isLoggedIn, firebase.User, currFile]);


  useEffect(() => {
    if (!currFile && allFiles.length > 0) {
      handleFileClick(allFiles[0]);
    }
  }, [allFiles]);

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

    firebase.addNote(newFile);
  };

  const handleFileClick = async (file) => {
    setcurrFile(file);
    if (!file.note.type || file.note.type === "note") {
      setEditorText(file.note.content || "");
    } else {
      let loadedTasks = [];
      if (file.note.taskinputs && file.note.taskinputs.length > 0) {
        loadedTasks = file.note.taskinputs.map((item) => {
          if (typeof item === 'string') return { text: item, done: false };
          if (typeof item === 'object' && item !== null) return item;
          return { text: "", done: false };
        });
      } else if (file.note.content) {
        loadedTasks = file.note.content.split("\n").filter(t => t.trim() !== "").map(text => ({ text, done: false }));
      }
      setTaskInputs(loadedTasks);
    }
  };

  const handleLogout = () => {
    firebase.logoutUser();
    navigate("/");
  }


  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this file?")) {
      await firebase.deleteNote(id);
      setallFiles((prev) => prev.filter((file) => file.id !== id));
      setcurrFile(null);
      setEditorText("");
    }
  }

  const handleEditor = (e) => {
    setEditorText(e.target.value);
    firebase.updateNote(currFile.id, { note: { name: currFile.note.name, content: e.target.value, type: currFile.note.type } });
  }

  const handleDownload = () => {
    if (downloadType === "txt") {
      const element = document.createElement("a");
      const file = new Blob([editorText], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = currFile.note.name + ".txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
    else if (downloadType === "pdf") {
      const doc = new jsPDF();
      doc.text(editorText, 10, 10);
      doc.save(currFile.note.name + ".pdf");
    }
    else if (downloadType === "md") {
      const element = document.createElement("a");
      const file = new Blob([editorText], { type: "text/markdown" });
      element.href = URL.createObjectURL(file);
      element.download = currFile.note.name + ".md";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }

  const handleOpenFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".txt,.md,.pdf";

    document.body.appendChild(input);

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (file.type === "application/pdf") {
        alert("PDF not supported yet");
        document.body.removeChild(input);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const newFile = {
          id: Date.now(),
          name: file.name,
          type: "note",
          content: content
        };

        setallFiles((prev) => [newFile, ...prev]);
        setcurrFile(newFile);
        setEditorText(content);
        firebase.addNote(newFile);
        document.body.removeChild(input);
        window.location.reload();

      };
      reader.readAsText(file);
    };

    input.click();

  };

  const syncTasks = (tasksToSync = taskInputs) => {
    if (currFile.note.type === "task") {
      firebase.updateNote(currFile.id, { note: { name: currFile.note.name, content: tasksToSync.map(t => t.text).join("\n"), type: "task", taskinputs: tasksToSync } });
    }
  }

  const handleDone = (index) => {
    const newInputs = [...taskInputs];
    newInputs[index] = { ...newInputs[index], done: !newInputs[index].done };
    setTaskInputs(newInputs);
    syncTasks(newInputs);
  };

  const handleDeleteTask = (index) => {
    const newInputs = [...taskInputs];
    newInputs.splice(index, 1);
    setTaskInputs(newInputs);
    syncTasks(newInputs);
  };





  return (
    // container
    <div className='flex w-full h-screen overflow-hidden bg-gray-100 font-sans text-gray-800 tracking-tight'>

      {
        isDownload ? (
          <div className='w-full h-full fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50' id='download'>
            <div className='bg-white p-6 rounded-lg shadow-lg' id='download'>
              <h2 className='text-base font-bold text-gray-900 tracking-tight'>Download</h2>
              <p className='text-sm text-gray-600'>Are you sure you want to download this file?</p>
              <select name="" id="" className='w-full h-10 border-1 border-black rounded-md' onChange={(e) => setDownloadType(e.target.value)}>
                <option value="txt">Text</option>
                <option value="pdf">PDF</option>
                <option value="md">Markdown</option>
              </select>
              <div className='flex justify-end gap-2 mt-4'>
                <button onClick={() => { setisDownload(false) }} className='px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-black rounded-md transition-colors duration-150 cursor-pointer shadow-sm focus:outline-none'>Cancel</button>
                <button onClick={() => { handleDownload(); setisDownload(false) }} className='px-4 py-1.5 text-sm font-medium text-white bg-red-700 hover:bg-gray-800 rounded-md transition-colors duration-150 cursor-pointer shadow-sm focus:outline-none'>Download</button>
              </div>
            </div>
          </div>
        ) : <></>
      }


      <Left
        showSidebar={showSidebar}
        toggleSidebar={toggleSidebar}
        handleAddButton={handleAddButton}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        fileType={fileType}
        setFileType={setFileType}
        fileName={fileName}
        setFileName={setFileName}
        handleCreateNew={handleCreateNew}
        search={search}
        setSearch={setSearch}
        allFiles={allFiles}
        currFile={currFile}
        handleFileClick={handleFileClick}
        handleDelete={handleDelete}
      />

      <Right
        showSidebar={showSidebar}
        toggleSidebar={toggleSidebar}
        currFile={currFile}
        align={align}
        setAlign={setAlign}
        handleOpenFile={handleOpenFile}
        setisDownload={setisDownload}
        handleLogout={handleLogout}
        editorText={editorText}
        handleEditor={handleEditor}
        taskInputs={taskInputs}
        setTaskInputs={setTaskInputs}
        syncTasks={syncTasks}
        handleDone={handleDone}
        handleDeleteTask={handleDeleteTask}
      />

      <Chatbot file={currFile} />
    </div>
  )
}

export default Home;
