import "./SideBar.scss";
import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Matematika from "./img/matematika.png";
import dayjs from 'dayjs';
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
function SideBar(props) {
  const location = useLocation();
  let fullDesc = null;
  useEffect(() => {
    if (location.pathname === "/course" && props.description) {
      fullDesc = props.description.slice(0, 100);
    }
  })

  return (
    <section className="SideBar">

      <header>
        <h3>Profile</h3>
        <button><img src={require("./img/edit.png")} alt="" /></button>
      </header>
      <Link to="/profile"><div className="Profile">
        <img src={require("./img/prf.png")} alt="" />
        <h1>Djordjije Vujovic</h1>
        <p>Student</p>
      </div>
      </Link>
      <div className="calendar">
        <h4>Octobar</h4>
        <div className="Helper">
          <div>
            <p>M</p>
            <span>21</span>
          </div>
          <div>
            <p>T</p>
            <span>22</span>
          </div>
          <div className="today">
            <p>W</p>
            <span>23</span>
          </div>
          <div>
            <p>T</p>
            <span>24</span>
          </div>
          <div>
            <p>F</p>
            <span>25</span>
          </div>
          <div>
            <p>S</p>
            <span>26</span>
          </div>
          <div>
            <p>S</p>
            <span>27</span>
          </div>
        </div>


      </div>
      <hr />
      <div className="UpcomingExam">
                <h3>Predstojeći ispiti</h3>
                <div className="ExamNotfi">
                  <img src={Matematika} alt="" />
                  <div className="Text">
                    <h4>HTML & CSS</h4>
                    <p>Programiranje 11:45h</p>
                  </div>
                </div>
                <div className="ExamNotfi">
                  <img src={Matematika} alt="" />
                  <div className="Text">
                    <h4>HTML & CSS</h4>
                    <p>Programiranje 11:45h</p>
                  </div>
                </div>
              </div>
    </section>
  );
}

export default SideBar;
