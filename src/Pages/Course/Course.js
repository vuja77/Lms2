import "./Course.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faEye, faBell, faEyeSlash, faMagnifyingGlass, faPlay, faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons"
import Logo from "../../components/img/logo.svg";
import { FileSvg, DownloadSvg } from "../../components/svg.js"
import { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import LessonAdd from "../../components/UploadForm";
import Config from "../../Config.js";
import leftArrow from "../../components/img/LeftArrow.svg";
import EmptyState from "../../components/img/EmptyState.svg"
import { Media, Video } from '@vidstack/player-react';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import code from "../../components/img/codee.svg";
import gr from "../../components/img/gr.png";
import Hand from "../../components/img/hand.svg";
import  exm from "../../components/img/exm.svg";
import les from "../../components/img/les.svg";
import axios from "axios";
import SideBar from "../../components/SideBar";
function Course(props) {
    const ref = useRef(null);
    useOutsideAlerter(ref);
    const location = useLocation();
    const [filter, setFilter] = useState(0);
    const [Course, setCourse] = useState([]);
    const [Lesson, setLesson] = useState([]);
    const [Matetials, setMatetials] = useState([]);
    const [Homework, setHomework] = useState([]);
    const [HomeworkUploads, setHomeworkUploads] = useState([]);
    const [MaterialVeiw, setMaterialVeiw] = useState("false");
    const [showFiles, setShow] = useState();
    const [FileUploadForm, setFileUploadForm] = useState(false);
    const [HomeworkUploadForm, setHomeworkUploadForm] = useState(0);
    const [showOptions, setOptions] = useState(true);
    const [FilePopUp, setFilePopUp] = useState(false);
    const [FileExtension, setFileExtension] = useState();
    const [Search, setSearch] = useState("");
    const [Popup, setPopUp] = useState(false);
    const [deleteID, setDeleteID] = useState();
    let i = 0;
    let matI = 0;
    const notify = (text) => toast.success(text);
    const [Notifi, setNotifi] = useState(false);
    //Fetch materilas for clicked lesson
    const ClickLesson = async (key) => {

        setShow(key);
        if (showFiles === key) {
            setShow(0);
        }
    }
    const Lessonfetch = async () => {
        await fetch(Config.apiUrl + "/getlesson/" + location.state)
            .then((response) => response.json())
            .then((LessonResp) => {
                setLesson(LessonResp);
            });
    }
    useEffect(() => {
        const LessonCourseFetch = async () => {
            //fetch coruse name and thumbnail
            await fetch(Config.apiUrl + "/course/" + location.state)
                .then((response) => response.json())
                .then((CourseResp) => {
                    setCourse(CourseResp[0]);
                })
            //Fetch lesson for couse
            await fetch(Config.apiUrl + "/getlesson/" + location.state)
                .then((response) => response.json())
                .then((LessonResp) => {
                    setLesson(LessonResp);
                });
            await fetch(Config.apiUrl + "/getMaterial/" + location.state)
                .then((response) => response.json())
                .then((MaterialsResp) => {
                    setMatetials(MaterialsResp);
                })

            await fetch(Config.apiUrl + "/gethomework/" + location.state)
                .then((response) => response.json())
                .then((HomeResp) => {
                    setHomework(HomeResp);
                })
            await fetch(Config.apiUrl + "/gethomeworkUpload/" + location.state + "/" + props.id)
                .then((response) => response.json())
                .then((HomeResp) => {
                    setHomeworkUploads(HomeResp);
                })

        }
        LessonCourseFetch();

    }, [])
    const DeleteLesson = async (a) => {
        setPopUp(false);
        await axios.delete(Config.apiUrl + "/lesson/" + deleteID)
            .then((response) => {
                Lessonfetch();
                notify("Lekcija uspjesno obrisana");
            })
    }
    const HideLesson = async (a) => {
        setPopUp(false);

        await axios.put(Config.apiUrl + "/lesson/" + a, {
            hide: 2,
        })
            .then((response) => {
                Lessonfetch();

            })
    }
    const UnHideLesson = async (a) => {
        setPopUp(false);

        await axios.put(Config.apiUrl + "/lesson/" + a, {
            hide: 1,
        })
            .then((response) => {
                Lessonfetch();

            })
    }
    const DeleteMaterial = async () => {
        setHomeworkUploadForm(0);
        await axios.delete(Config.apiUrl + "/Material/" + deleteID)
            .then((response) => {
            })
    }


    function useOutsideAlerter(ref) {
        useEffect(() => {

            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setFileUploadForm(false);
                    setFilePopUp(false);
                    setHomeworkUploadForm(0);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };

        });
    }
    function a() {
        return ("")
    }
    return (
        <>
            <section className="Course">
                {/*Search bar*/}
                <div className="SearchBar" >
                    <div>
                        <h2>Course <img src={Hand} /></h2>
                        <p>Let’s learn something new today!</p>
                    </div>
                    <div className="Helper">
                        <div className="Search">
                            <div className="Helper">
                                <input placeholder="Search from courses..." onChange={(e) => setSearch(e.target.value)} />
                                <button className={Search === "" ? "" : "close"} onClick={() => setSearch("")}><FontAwesomeIcon icon={Search === "" ? faMagnifyingGlass : faXmark} /></button>
                            </div>
                            <div className="Card" id={Search != "" ? "opened" : ""}>
                                
                                {i < 1 ? <p>Nema rezlutata pretrage</p> : ""}

                            </div>
                        </div>
                  
                            <div className="Search">
                                <button onClick={() => setNotifi(!Notifi)}><FontAwesomeIcon icon={faBell} /></button>
                            </div>
                            <div className="Notifi" id={Notifi === true ? "opened" : null}>
                                
                            </div>
                    
                        
                    </div>
                    </div>
                {/*Course name*/}

                <div className="CourseHead">
                    {/*<div className="CourseInfo">
                        <img src={Course.thumbnail ? require("../../components/img/" + Course.thumbnail) : ""} alt="" />
                        <h1>{Course.name}</h1>
                    </div>*/}

                    <div className="CourseBtn">
                        {/*If user is profesor show button for upload*/
                            props.role === 2 && filter === 0 ?
                                <>
                                    <a><button onClick={() => setFilePopUp(!FilePopUp)}>Dodaj fajl <FontAwesomeIcon icon={faPlus} /></button></a>
                                    <a><button onClick={() => setFileUploadForm(!FileUploadForm)}>Dodaj Lekciju <FontAwesomeIcon icon={faPlus} /></button></a>
                                </>
                                : props.role === 2 && filter === 1 ?
                                    <>

                                        <a><button onClick={() => setHomeworkUploadForm("prf")}>Dodaj domaci<FontAwesomeIcon icon={faPlus} /></button></a>
                                    </>
                                    : props.role === 2 && filter === 2 ?
                                        <>

                                            <a><button onClick={() => setFileUploadForm(!FileUploadForm)}>Dodaj test<FontAwesomeIcon icon={faPlus} /></button></a>
                                        </>

                                        : props.role === 1 ? <a href={"./kurs.html?token=" + props.token + "&scorm_filename=169558184914"}><button>Zapocni kurs <FontAwesomeIcon icon={faPlay} /></button></a> : ""
                        }
                    </div>

                </div>
                {/*Filter*/}
                <div className="FilterOptions">
                    <div onClick={() => setFilter(0)} className={filter === 0 ? "clicked" : ""}>Lekcije</div>
                    <div onClick={() => setFilter(1)} className={filter === 1 ? "clicked" : ""}>Domaci</div>
                    <div onClick={() => setFilter(2)} className={filter === 2 ? "clicked" : ""}>Testovi</div>
                </div>
                {
                    filter === 0 ?
                        //Lessons map
                        Lesson.map((item) => {
                            let lessonId = item.id;

                            if (props.role === 2 || (props.role === 1 && item.hide === 1)) {
                                return (

                                    <div className="Ishod">
                                        {/**<h1>{item.section}</h1> */}
                                        <div className="lesson" key={item.id} id={item.hide === 2 ? "hidden" : null}>
                                            <div className="Info" id={showFiles === item.id ? "opened" : ""}>
                                                {/*Lesson icon*/}
                                                <span onClick={() => ClickLesson(item.id)}>
                                                    <FileSvg />
                                                </span>
                                                {/*Lesson Name*/}
                                                <div className="Text" onClick={() => ClickLesson(item.id)}>
                                                    <h3>{item.name}{props.role === 2 && item.hide === 2 ? " - Sakriven" : ""}</h3>
                                                    <p>{moment(item.created_at).format('DD/MM/YYYY')}</p>
                                                </div>
                                                {
                                                    props.role === 2 ? <div className="Actions">
                                                        {
                                                            showOptions === item.id ?
                                                                <>
                                                                    <button onClick={() => { item.hide === 1 ? HideLesson(lessonId) : UnHideLesson(lessonId) }}><FontAwesomeIcon icon={item.hide === 1 ? faEye : faEyeSlash} color="red" size="1x" /> {item.hide === 1 ? "Hide" : "Show"}</button>
                                                                    <button onClick={() => { setPopUp(true); setDeleteID(lessonId); }}><FontAwesomeIcon icon={faTrash} color="red" size="1x" /> Delete</button><button><FontAwesomeIcon onClick={() => setOptions(true)} icon={faXmark} color="red" size="1x" /></button></>
                                                                :
                                                                <>
                                                                    <img src={leftArrow} alt="" onClick={() => ClickLesson(item.id)} className="LeftArrow" id={showFiles === item.id ? "opened" : ""} />
                                                                    <FontAwesomeIcon className="Dots" onClick={() => { setOptions(item.id); ClickLesson(0); }} icon={faEllipsisVertical} size="1x" />
                                                                </>

                                                        }


                                                    </div>
                                                        : <img src={leftArrow} alt="" onClick={() => ClickLesson(item.id)} className="LeftArrow" id={showFiles === item.id ? "opened" : ""} />
                                                }

                                            </div>

                                            {/*Files div*/}
                                            <div id="files" className={showFiles === item.id ? "opened" : ""} key={item.id}>
                                                <ul>
                                                    {
                                                        //Materials map
                                                        Matetials.filter(mat => mat.lesson_id === lessonId).map((material) => {
                                                            let matId = material.id;
                                                            //if material is file
                                                            if (material.file_path != null) {
                                                                //get file extension
                                                                let fileName = material.file_path;
                                                                let extension = fileName.split(".");
                                                                return (
                                                                    <li>
                                                                        <img onClick={() => { setMaterialVeiw(fileName); setFileExtension(extension[1]); }} src={require("../../components/img/jpg.png")} alt="" />
                                                                        <p>{material.file_path}</p>
                                                                        <div className="Actions">
                                                                            {
                                                                                props.role === 2 ? <button className="delete" onClick={() => setPopUp("material")}><FontAwesomeIcon onClick={() => setDeleteID(matId)} icon={faTrash} color="red" size="5x" /> Delete</button> : ""
                                                                            }

                                                                            <a href={Config.apiUrl + "/download/" + material.file_path}><DownloadSvg /></a>
                                                                        </div>


                                                                    </li>
                                                                );
                                                            }
                                                            // if material is link
                                                            if (material.url != null) {
                                                                return (
                                                                    <li>
                                                                        <a href={material.url}>{material.url}</a>
                                                                    </li>
                                                                );
                                                            }

                                                        })

                                                    }
                                                    {Matetials.filter(mat => mat.lesson_id === lessonId).length < 1 ? <h1>Nema fajlova</h1> : ""}

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else if (props.role === 1 && item.hide != 1) {

                            }
                        }) : filter === 1 ?
                            Homework.map((item) => {
                                let lessonId = item.id;
                                return (

                                    <div className="Ishod">
                                        <h1>{item.section}</h1>
                                        <div className="lesson" id={HomeworkUploads.filter(mat => mat.homework_id === lessonId).length < 1 ? "" : ""} key={item.id}>
                                            <div className="Info" onClick={() => ClickLesson(item.id)} id={showFiles === item.id ? "opened" : ""}>
                                                {/*Lesson icon*/}
                                                <span>
                                                    <FileSvg />
                                                </span>
                                                {/*Lesson Name*/}
                                                <div className="Text">
                                                    <h3>{item.name}</h3>
                                                    <p>{"deadline: " + moment(item.deadline).format('DD/MM/YYYY')}</p>
                                                </div>
                                                <img src={leftArrow} alt="" className="LeftArrow" id={showFiles === item.id ? "opened" : ""} />
                                            </div>
                                            {/*Files div*/}
                                            <div id="files" className={showFiles === item.id ? "opened" : ""} key={item.id}>
                                                <h1>Opis</h1>
                                                <p>{item.description}</p>
                                                {
                                                    props.role === 1 ?
                                                        <>
                                                            <hr />
                                                            <p>Moji domaći:</p>
                                                            <ul>
                                                                {
                                                                    //Materials map
                                                                    HomeworkUploads.filter(mat => mat.homework_id === lessonId).map((item) => {
                                                                        i += 1;
                                                                        //if material is file
                                                                        if (item.file_path != null) {
                                                                            //get file extension
                                                                            let fileName = item.file_path;
                                                                            let extension = fileName.split(".");
                                                                            return (
                                                                                <li>
                                                                                    <img onClick={() => { setMaterialVeiw(fileName); setFileExtension(extension[1]); }} src={require("../../components/img/" + extension[1] + ".png")} alt="" />
                                                                                    <p>{item.file_path}</p>
                                                                                    <a href={Config.apiUrl + "/download/" + item.file_path}><DownloadSvg /></a>

                                                                                </li>
                                                                            );
                                                                        }
                                                                        // if material is link
                                                                        if (item.url != null) {
                                                                            return (
                                                                                <li>
                                                                                    <a href={item.url}>{item.url}</a>
                                                                                </li>
                                                                            );
                                                                        }
                                                                        if (matI === 0) {
                                                                            return (<h1>Nema fajlova</h1>)
                                                                        }
                                                                    })

                                                                }


                                                            </ul>
                                                        </>
                                                        : ""
                                                }

                                                {/*<form action={Config.apiUrl+"/homeworkUpload"} method="POST" enctype="multipart/form-data">
                                            <input type="file" name="files[]"/>
                                            <input type="text" name="homework_id" value={lessonId} hidden/>
                                            <input type="text" name="user_id" value={props.id} hidden/>
                                            <button type="submit">Upload your homework</button>

                                        </form>
                                        <div className="dargDrop" >
                                            <form >
                                                <FileUploader name="file"  multiple fileOrFiles/>
                                                <p>Darg & Drop your files here</p>
                                            </form> 
                                        </div>*/}
                                                <br />
                                                {props.role === 1 ? <button id="PredajDomaci" onClick={() => setHomeworkUploadForm(lessonId)}>Predaj domaći</button> : null}

                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                            : ""
                }
                {/*If lesson dosent exist*/ Lesson.filter(mat => mat.hide === 1) > 0 && filter === 0 ? "" : Lesson.filter(mat => mat.hide === 1) <= 0 && filter === 0 ? <div className="NoLes"><img className="empty" src={EmptyState} /><p className="NoLesson">Trenutno nema lekcija</p></div> : null}
                {/*If lesson dosent exist*/ Homework.length > 0 ? "" : filter === 1 ? <div className="NoLes"><img className="empty" src={EmptyState} /><p className="NoLesson">Trenutno nema domacih zadataka</p></div> : null}
                {/*If lesson dosent exist*/ Lesson.length < 0 ? "" : filter === 2 ? <div className="NoLes"><img className="empty" src={EmptyState} /><p className="NoLesson">Trenutno nema tsestova</p></div> : null}

                <br /><br /><br /><br /><br /><br /><br />
            </section>
            {/*Upload forms*/}
            <div className="PopUpCont" id={FileUploadForm === true ? "opened" : FilePopUp === true ? "opened" : HomeworkUploadForm != 0 ? "opened" : ""}>
                <div ref={ref}>
                    <LessonAdd pozoviFunkciju={Lessonfetch} id={props.id} role={props.role} hmId={HomeworkUploadForm} data={FileUploadForm === true ? "lesson" : FilePopUp === true ? "file" : HomeworkUploadForm > 0 ? "homework" : HomeworkUploadForm === "prf" ? "homeworkPrf" : null} les={Lesson} />
                </div>
            </div>
            {/*HEADER for mobile*/}
            <div className="MobHeader" >
                <img src={Logo} alt="" />
                <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />
            </div>
            {/*material view*/}
            <div className="Image" id={MaterialVeiw != "false" ? "opened" : ""}>
                <button onClick={() => setMaterialVeiw("false")}><FontAwesomeIcon icon={faXmark} size="3x"></FontAwesomeIcon></button>
                {FileExtension === "png" ? <img src={Config.storageUrl + MaterialVeiw} alt="" />
                    : FileExtension === "mp4" ?
                        <Media>
                            <Video loading="visible" controls preload="true">
                                <video loading="visible" src={Config.storageUrl + MaterialVeiw} preload="none" data-video="0" controls />
                            </Video>
                        </Media> : ""}
            </div>



            <div className="PopUp" id={Popup != false ? "opened" : ""}>
                <div className="LogoutAlert">
                    <p>Do you want to delete this lesson</p>
                    <div className="Buttons">

                        <button id="yes" onClick={() => { Popup === "material" ? DeleteMaterial() : DeleteLesson(deleteID) }}>Yes</button>
                        <button id="no" onClick={() => setPopUp(false)}>No</button>
                    </div>
                </div>
            </div>

            <ToastContainer />

            <SideBar role={props.role} description={Course.description} lessons={Lesson.length} professor={Course.first_name + " " + Course.last_name} />
        </>
    );
}

export default Course;
