import "./Student.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark, faBell } from "@fortawesome/free-solid-svg-icons"
import Calendar from "../../components/img/Calendar.png";
import Pedagog from "../../components/img/Pedagog.png";
import code from "../../components/img/codee.svg";
import gr from "../../components/img/gr.png";
import Hand from "../../components/img/hand.svg";
import  exm from "../../components/img/exm.svg";
import les from "../../components/img/les.svg";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";
import Config from "../../Config.js";
import { memo } from "react";
import { CChart } from '@coreui/react-chartjs';
import LessonAdd from "../../components/UploadForm";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
function Student(props) {
    const ref = useRef();
    const reminders = useRef();
    const [Loading, setLoading] = useState(false);
    const [filter, setFilter] = useState(0);
    const [MyCourse, setCourse] = useState([]);
    const [Search, setSearch] = useState("");
    const [Scroll, setScroll] = useState(0);
    const [LessonPopUp, setPopUp] = useState(false);
    const [Notifi, setNotifi] = useState(false);
    let i = 0;
    let a = 0;
    //Loading Screeen
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, [])
    //Fetch course
    useEffect(() => {
        const fetchCourse = async () => {
            await fetch(Config.apiUrl + "/getcourse/" + props.data1)
                .then((responese) => responese.json())
                .then((CourseResp) => {
                    setCourse(CourseResp);
                })
        }
        fetchCourse();
    }, [props.data1]);
    const data = [
        {
            "name": "Mpn",
            "hours": 2,
        },
        {
            "name": "Tue",
            "hours": 1,
        },
        {
            "name": "Wen",
            "hours": 3,
        },
        {
            "name": "Thu",
            "hours": 4,
        },
        {
            "name": "Fri",
            "hours": 5,
        },
        {
            "name": "Sun",
            "hours": 3,
        },
        {
            "name": "Sat",
            "hours": 4.4,
        }
    ]
    return (
        <>
            {Loading === true ? <LoadingScreen /> : ""}
            <section className="CenterSection" ref={ref} onScroll={(event) => setScroll(event.currentTarget.scrollTop)}>
                <div className="SearchBar" >
                    <div>
                        <h2>Hello, {props.name} <img src={Hand} /></h2>
                        <p>Let’s learn something new today!</p>
                    </div>
                    <div className="Helper">
                        <div className="Search">
                            <div className="Helper">
                                <input placeholder="Search from courses..." onChange={(e) => setSearch(e.target.value)} />
                                <button className={Search === "" ? "" : "close"} onClick={() => setSearch("")}><FontAwesomeIcon icon={Search === "" ? faMagnifyingGlass : faXmark} /></button>
                            </div>
                            <div className="Card" id={Search != "" ? "opened" : ""}>
                                {MyCourse.filter(course => course.name.toLowerCase().includes(Search) || course.name.toUpperCase().includes(Search.toUpperCase())).map((course) => {

                                    i += 1;

                                    return (
                                        <Link to="/course" state={course.id}>
                                            <div>
                                                <img src={require("../../components/img/code.png")} alt="" />
                                                <div className="Text">

                                                    <h2>{course.name}</h2>
                                                    <h3>{course.first_name + " " + course.last_name}</h3>
                                                </div>

                                            </div>
                                        </Link>
                                    )


                                })}
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
                <h1>Time Spent</h1>
                <div className="Head">

                    <div className="Time">

                        <BarChart width={430} height={230} data={data}>
                            <CartesianGrid strokeDasharray="20 13" />
                            <XAxis dataKey="name" />
                            <YAxis dataKey={data.hours} />
                            <Tooltip />
                            <Bar dataKey="hours" fill="#FF9053" radius={[10, 10, 10, 10]} />
                        </BarChart>

                    </div>
                    <div className="Point">
                       
                    </div>
                </div>



                <br />



                <h1>Moduli</h1>
                {/*Filter Options*/}
                <div className="FilterOptions">
                    <div onClick={() => setFilter(0)} className={filter === 0 ? "clicked" : ""}>Svi</div>
                    <div onClick={() => setFilter(1)} className={filter === 1 ? "clicked" : ""}>Strucni</div>
                    <div onClick={() => setFilter(2)} className={filter === 2 ? "clicked" : ""}>Opsti</div>
                </div>
                <div className="Moduli">
                    {
                        MyCourse.map((course) => {
                            if (course.course_type_id === filter) {
                                return (
                                    <Link to="/course" state={course.id}>
                                        <div className="Course" id={course.courseTypeName === "Stručni" ? "blue" : "gr"}>
                                            <div className="img">
                                                <img src={code} alt="" />
                                            </div>
                                            <h2>{course.name}</h2>
                                            <div className="info">
                                                <div><img src={les} alt="" />21</div>
                                                <div><img src={exm} alt="" />21</div>
                                                <div><img src={les} alt="" />21</div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            } else if (filter === 0) {
                                return (
                                    <Link to="/course" state={course.id}>
                                        <div className="Course" id={course.courseTypeName === "Stručni" ? "blue" : course.name === "CSBH" ? "nr" : "gr"}>
                                            <div className="img">
                                                <img src={course.courseTypeName === "Stručni" ? code : course.name === "CSBH" ? gr : gr} alt="" />
                                            </div>
                                            <h2>{course.name}</h2>

                                            <div className="info">
                                                <div><img src={les} alt="" />21</div>
                                                <div><img src={exm} alt="" />21</div>
                                                <div><img src={les} alt="" />21</div>
                                            </div>
                                            <Box sx={{ width: '100%', mr: 1, borderRadius: "30px" }}>
                                                <LinearProgress variant="determinate" value="60" />
                                            </Box>
                                        </div>
                                    </Link>
                                );
                            } else {
                                return ("");
                            }

                        })
                    }
                </div>
            </section>

        </>
    );
}

export default memo(Student);

