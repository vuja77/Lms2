import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark, faFileCircleXmark} from "@fortawesome/free-solid-svg-icons"
import Cloud from "./img/colud.svg";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";
import { useLocation } from "react-router-dom";
import "./UploadForm.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Config from "../Config.js";

function LessonAdd(props) {
    const location = useLocation();
    console.log(location.state);
    const ref = useRef(null);
    useOutsideAlerter(ref);
    const userRole = 1;
    const [Clsd, setCls] = useState([]);
    const [LessonName, setLessonName] = useState();
    const [HomeworkName, setHomeworkName] = useState(props.hmId);
    const [Homeworkdesc, setHomeworkdesc] = useState(props.hmId);
    const [Course, setCourse] = useState();
    const [Ishod, setIshod] = useState();
    const [file, setFile] = useState([]);
    const notify = (text) => toast.success(text);
    const fileTypes = ["JPG", "PNG", "GIF","PPTX", "MP4"];
    const [LessonPopUp, setPopUp] = useState(false);
 
        useEffect(() => {
            const EdPrograms = async () => {
                const className = await fetch(Config.apiUrl+"/getclass/"+props.userId);
                const resCl = await className.json();
                setCls(resCl);
            }
            if(props.role === 2) {
            
                EdPrograms();
            }
        }, [])
   
    
    const handleChange = (file) => {
        setFile({...file, file});
    };
    const nameInput = (event) => {
        setLessonName(event.target.value);
        
        console.log(event.target.value);
    }
    const CourseName = (event) => {
        setCourse(event.target.value);
    
        console.log(event.target.value);
    }   

    const IshodHandle = (event) => {
        setIshod(event.target.value);
        console.log(event.target.value);
    }   
    const createLesson = () => {
            axios.post(Config.apiUrl+"/lesson", {
                name: LessonName,
                course_id: location.state,
                section: Ishod
            })
            .then((response) => {
                console.log(response.data.id);
                notify("Lekcija uspjesno kreirana, ponovo ucitaj stranu");
                props.pozoviFunkciju();
                
            });
          
         
    }


    const createLessonFiles = () => {
        const formData = new FormData();
        formData.append("post_content", "ddd");
            Object.values(file).map((e) => {
            return formData.append("files[]", e);
        })
        axios.post(Config.apiUrl+"/lesson", {
            name: LessonName,
            course_id: Course,
            section: Ishod
        })
        .then((response) => {
            console.log(response.data.id);
            formData.append("lesson_id", response.data.id);
            axios.post(Config.apiUrl+"/Material", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },})
            .then((response) => {
                console.log(response);
                notify("Lekcija uspjesno kreirana");

            })
        });
        
}
    const addFiles = () => {
        const formData = new FormData();
            formData.append("lesson_id", Course);
            formData.append("post_content", "ddd");
            Object.values(file).map((e) => {
            return formData.append("files[]", e);
        })
        axios.post(Config.apiUrl+"/Material", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },})
        .then((response) => {
            console.log(response);
            notify("Fajlovi uspjesno dodati");

        })
    }
        const removee = (fn) => {
           setFile(current =>
              Object.values(current).filter(File => {
                return File.name !== fn;
              }),
            );
        }
      
        function useOutsideAlerter (ref) {
            useEffect(() => {
              
             
                if(LessonPopUp === true) {
                    function handleClickOutside(event) {
                        if (ref.current && !ref.current.contains(event.target)) {
                          setPopUp(false);
                        
                        }
                      }
                    
                      document.addEventListener("mousedown", handleClickOutside);
                      return () => {
                     
                        document.removeEventListener("mousedown", handleClickOutside);
                      };
                }  
              });
        }


        const createHomework = () => {
            axios.post(Config.apiUrl+"/homework", {
                name: LessonName,
                course_id: location.state,
                description: Homeworkdesc,
            })
            .then((response) => {
                console.log(response.data.id);
                notify("Domaći uspjesno kreirana, ponovo ucitaj stranu");
                
            });
    }

    const addHomeworkFiles = () => {
        const formData = new FormData();
            formData.append("homework_id", props.hmId);
            formData.append("post_content", "ddd");
            formData.append("user_id", props.id);
            Object.values(file).map((e) => {
            return formData.append("files[]", e);
        })
        axios.post(Config.apiUrl+"/homeworkUpload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },})
        .then((response) => {
            console.log(response);
            notify("Fajlovi uspjesno dodati");

        })
    }
    return(
        <>
         <ToastContainer />
        {props.data === 1 ?
        <div className="AddLesson" id={LessonPopUp === true ? "opened" : ""} ref={ref}>
            <h1>Add Lesson</h1>
            <input onChange={nameInput} type="text" placeholder="LessonName"/>
                <select onChange={IshodHandle}>
                        <option value="" disabled>Izaberi Ishod</option>
                        <option value="Ishod 1">Ishod 1</option>
                        <option value="Ishod 2">Ishod 2</option>
                        <option value="Ishod 3">Ishod 3</option>
                        <option value="Ishod 4">Ishod 4</option>
                </select>
                <select onChange={CourseName}>
                    <option value="">Izaberi modul</option>
                        {Clsd.map((clss)=> {          
                            return(    
                                <option value={clss.id}>{clss.course_name+"-"+clss.name}</option>
                                );     
                    })}
                </select>
            <div className="Helper">
                <ul>
                {file.length < 2  ? <div className='NoFile'><FontAwesomeIcon icon={faFileCircleXmark} size="7x"/><p>No selected file</p></div>:<h4>Ready to upload</h4>}
                    {
                    Object.values(file).map((files)=> {
                            console.log(files.length)
                            if(!files.length) {
                                let fileName = files.name;
                                let fileEx = fileName.split(".");
                                console.log(fileEx[1]);
                                return(<li ><img src={require("./img/"+fileEx[1]+".png")} alt="" /><h5>{files.name}</h5><FontAwesomeIcon icon={faXmark} onClick={()=> removee(fileName)} /></li>)
                            }
                        })
                    }  
                </ul>
                <div className="dargDrop" >
                    <form onSubmit={createLesson}>
                        <FileUploader handleChange={handleChange} name="file" types={fileTypes} multiple fileOrFiles/>
                        <img src={Cloud} alt="" />
                        <p>Darg & Drop your files here</p>
                    </form> 
                </div>
            </div>
            <button onClick={() => createLessonFiles()}>Upload</button>
        </div> 
       : props.data === "lesson"? 
        <div className="AddLesson" >
            <h1>Dodaj lekciju</h1>
                <input onChange={nameInput} type="text" placeholder="LessonName"/>
                    <select onChange={IshodHandle}>
                        <option value="">Izaberi Ishod</option>
                        <option value="Ishod 1">Ishod 1</option>
                        <option value="Ishod 2">Ishod 2</option>
                        <option value="Ishod 3">Ishod 3</option>
                        <option value="Ishod 4">Ishod 4</option>
                    </select>
            <button onClick={()=>createLesson()} >Dodaj lekciju</button>
        </div>
        : props.data === "file" ? 
            <div className="AddLesson" id={LessonPopUp === true ? "opened" : ""} ref={ref}>
                <h1>Add Files</h1>
                    <select onChange={CourseName}>
                        <option value="">Izaberi lekciju</option>
                        {props.les.map((clss)=> {          
                            return(    
                                <option value={clss.id}>{clss.name}</option>
                                );     
                    })}
                    </select>
            <div className="Helper">
                <ul>
                {file.length < 2  ? <div className='NoFile'><FontAwesomeIcon icon={faFileCircleXmark} size="7x"/><p>No selected file</p></div>:<h4>Ready to upload</h4>}
                        {
                        Object.values(file).map((files)=> {
                                console.log(files.length)
                                if(!files.length) {
                                    let fileName = files.name;
                                    let fileEx = fileName.split(".");
                                    console.log(fileEx[1]);
                                    return(<li ><img src={require("./img/"+fileEx[1]+".png")} alt="" /><h5>{files.name}</h5><FontAwesomeIcon icon={faXmark} onClick={()=> removee(fileName)} /></li>)
                                }
                            })
                    }  
                </ul>
                <div className="dargDrop" >
                <form onSubmit={createLesson}>
                        <FileUploader handleChange={handleChange} name="file" types={fileTypes} multiple fileOrFiles/>
                        <img src={Cloud} alt="" />
                        <p>Darg & Drop your files here</p>
                    </form> 
                </div>
            </div>
            <button onClick={() => addFiles()}>Upload</button>
       
        </div>
        :props.data === "homework" ? 
            <div className="AddLesson" id={LessonPopUp === true ? "opened" : ""} ref={ref}>
                <h1>Homework upload</h1>
                <p>Ime domaceg</p>
                    <div className="Helper">
                <ul>
                {file.length < 2  ? <div className='NoFile'><FontAwesomeIcon icon={faFileCircleXmark} size="7x"/><p>No selected file</p></div>:<h4>Ready to upload</h4>}
                        {
                        Object.values(file).map((files)=> {
                                console.log(files.length)
                                if(!files.length) {
                                    let fileName = files.name;
                                    let fileEx = fileName.split(".");
                                    console.log(fileEx[1]);
                                    return(<li ><img src={require("./img/"+fileEx[1]+".png")} alt="" /><h5>{files.name}</h5><FontAwesomeIcon icon={faXmark} onClick={()=> removee(fileName)} /></li>)
                                }
                            })
                    }  
                </ul>
                <div className="dargDrop" >
                <form onSubmit={createLesson}>
                        <FileUploader handleChange={handleChange} name="file" types={fileTypes} multiple fileOrFiles/>
                        <img src={Cloud} alt="" />
                        <p>Darg & Drop your files here</p>
                    </form> 
                </div>
            </div>
            <button onClick={() => addHomeworkFiles()}>Upload</button>
       
        </div>:props.data === "homeworkPrf" ? 
            <div className="AddLesson" id={LessonPopUp === true ? "opened" : ""} ref={ref}>
                <h1>Homework upload</h1>
                <input placeholder='Ime' onChange={nameInput} name='HomeworkName'/>
                <input placeholder='opis' onChange={(event) => setHomeworkdesc(event.target.value)} name='HomeworkDesc'/>
                 
            <button onClick={() => createHomework()}>Upload</button>
       
        </div>: null}</>
    );
}

export default LessonAdd;
