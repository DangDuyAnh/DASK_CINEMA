import React, {useEffect, useState} from "react";
import  { Redirect } from 'react-router-dom'
import { BsClockHistory, BsPlayFill } from "react-icons/bs";
import "./index.css"
import { get } from "../../utility/api";
import { API_URL } from '../../config/Constants';
import { IconContext } from "react-icons";
import YoutubeEmbed from "../../components/YoutubeEmbeded/YoutubeEmbed";

export default function Movie(props) { 
    
    const [movie, setMovie] = useState(null);
    const [showTime, setShowTime] = useState(null);
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(0);
    const [showtimes, setShowtimes] = useState({});
    const [todayShowtimes, setTodayShowtimes] = useState({});

    useEffect(() => {
        let dateArray = [];
        let today = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"}));
        let todayString = getHour(today);
        dateArray.push(today);
        for (let i = 1; i < 14; i++) {
            let nextDay = new Date();
            nextDay.setDate(today.getDate() + i);
            dateArray.push(nextDay);
        }
        setDates(dateArray);
        let res = get("/movies/getMovie/" + props.match.params.id);
        res.then(res => {
            console.log(res);
            if (res.data === null) {
                props.history.push('/404');
            }
            else {
                setMovie(res.data);
                let time = new Date(res.data.releaseDate);
                setShowTime(`${time.getDate()}-${time.getMonth()+1}-${time.getFullYear()}`)
            }
            let modal = document.getElementById("myModal");
            let btn = document.getElementById("myBtn");
            let span = document.getElementsByClassName("close")[0];
            let video = document.getElementById("youtube-video");
            // When the user clicks the button, open the modal 
            btn.onclick = function() {
                modal.style.display = "block";
            }
            
            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
                video.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
            }
            
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                modal.style.display = "none";
                video.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
                }
            }
        })
        .catch(function (error) {
            console.log(error);
          })
          
        const getShowtimes = async () => {
        try {
            let tempDict = {};
            let tempDict2 = {};
            let res2 = await get("/showtimes/getShowtime/" + props.match.params.id);
            res2.showtimes.forEach((item, idx) => {
                if (!tempDict[item.cinema.name]) tempDict[item.cinema.name] = [];
                tempDict[item.cinema.name].push(item);
                if (todayString < item.time) {
                    if (!tempDict2[item.cinema.name]) tempDict2[item.cinema.name] = [];
                    tempDict2[item.cinema.name].push(item);
                }
            });
            setShowtimes(tempDict);
            setTodayShowtimes(tempDict2);
            console.log(tempDict);
        } catch(e) {
            console.log(e);
        }}
        getShowtimes();
    }, []);

    const getDay = (date) => {
        let singleDay = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
        let day = date.getDate().toString();
        if (singleDay.includes(day)) day = '0' + day;
        return day
      }

    const getMonth = (date) => {
    let singleMonth = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    let month = (date.getMonth() + 1).toString();
    if (singleMonth.includes(month)) month = '0' + month;
    return month
    }

    const getHour = (date) => {
        let singleHour = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
        let hour = date.getHours() + 1;
        if (singleHour.includes(hour)) hour = '0' + hour;
        return hour
    }

    return (
    <>
    { movie &&
    <IconContext.Provider value={{ size: "18px"}}>
        <div id="myModal" className={"modal"}>
            <div className="modal-content">
                <span className="close">&times;</span>
                <p style = {{textAlign: 'center', fontWeight: '500', fontSize: '20px', marginTop: 0}}>{movie.title}</p>
                <YoutubeEmbed source={movie.trailerVideo} title={movie.title}/>
            </div>
        </div>

        <div className="MovieList-container">
            <div style={{width: 1250, padding: 10, maxWidth: '90vw' }}>
                <ul className="MovieList-menu">
                    <li>
                        <a className="MovieList-a MovieList-active">{movie.title}</a>
                    </li>
                </ul>
                <div style={{display: 'block'}}>
                    <div style={{maxWidth: '90vw'}}>
                        <div className="movie-card-img" style={{marginRight: '40px', float: 'left', backgroundImage: 'url('+ (API_URL + movie.poster) + ')'
                            , display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <div className="movie-play" id="myBtn">
                                <IconContext.Provider value={{ size: "40px"}}>
                                    <BsPlayFill style={{color: 'white'}}/>
                                </IconContext.Provider>
                            </div>
                        </div>

                        <div style={{float: 'left'}}>
                            <p className="movie-title">{movie.title}</p>

                            <div style={{display: "flex", alignItems: 'center'}}>
                                {movie.requiredAge !== 'NONE'&& 
                                <p style={{color: 'white', backgroundColor: '#00a8e1', display: 'inline'
                                , padding: 5, fontSize: 16, marginRight: '20px'}}>
                                    {movie.requiredAge}
                                </p>
                                }        

                                <BsClockHistory/>
                                <p style={{marginLeft: '10px', fontSize: '16px', color: 'black', fontWeight: '600'}}>
                                    {movie.duration}</p>
                            </div>
                            <p className="movie-info"><span style={{color: '#757575'}}>Đạo diễn: </span>
                                {movie.director}</p>
                            <p className="movie-info"><span style={{color: '#757575'}}>Thế loại: </span>
                                {movie.movieType}</p>
                            <p className="movie-info"><span style={{color: '#757575'}}>Khởi chiếu: </span>
                                {showTime}</p>
                        </div>
                        
                        <div style={{clear: 'both'}}></div>
                    </div>
                </div>

                <div style={{maxWidth: '90vw'}}>
                    <h1 style={{padding: 0, marginTop: '50px', fontSize: '20px', fontWeight: '600'}}>NỘI DUNG PHIM</h1>
                    <div style={{width: '80px', height: '2px', backgroundColor: '#00a8e1'}}/>
                    <div style={{textAlign: 'justify'}}>
                        <p>{movie.description}</p>
                    </div>
                </div>

                <div style={{minHeight: '600px'}}>
                    <h1 style={{padding: 0, marginTop: '50px', fontSize: '20px', fontWeight: '600'}}>LỊCH CHIẾU</h1>
                    <div style={{width: '80px', height: '2px', backgroundColor: '#00a8e1'}}/>

                    <div style={{width: '100%', height: '1px', backgroundColor: 'black', marginTop: '30px'}}/>
                        <div style={{display: 'flex', maxWidth: '90vw', flexWrap: 'wrap', justifyContent: 'center'
                        , marginTop: '20px', marginBottom: '20px'}}>
                            {dates.map((item, idx) => {
                                return(
                                    <div key={idx} className={(selectedDate===idx)?"box-time box-time-active":"box-time"}
                                        onClick={() => {
                                            setSelectedDate(idx);
                                        }}>
                                        <div style={{width: '40%', height: '100%', float: 'left', justifyContent: 'center',
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
                                            <p style={{padding: 0, margin: 0, color: '#424242', fontSize: '13px'}}>{getMonth(dates[idx])}</p>
                                            <p style={{padding: 0, margin: 0, color: '#424242', fontSize: '13px', padding: '3px'}}>{dates[idx].toString().split(' ')[0]}</p>
                                        </div>
                                        <div style={{width: '60%', height: '100%', float: 'left', display: 'flex', flexDirection: 'column-reverse',
                                            justifyContent: 'center'}}>
                                            <p style={{padding: 0, margin: 0, color: '#424242', fontSize: '36px'}}>{getDay(dates[idx])}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    <div style={{width: '100%', height: '1px', backgroundColor: 'black'}}/>

                    <div style={{marginTop: '40px', maxWidth: '90vw', overflow: 'hidden'}}>
                    {(selectedDate === 0) && Object.entries(todayShowtimes).map(([key, value]) => { return (
                        <div key={key} style={{marginBottom: '40px'}}>
                            <div style={{display: 'flex'}}>
                                <div style={{width: '5px', height: '35px', backgroundColor: '#616161'}}/>
                                <div style={{width: '250px', height: '35px', backgroundColor: '#00a8e1', alignItems: 'center',
                                    display: 'flex'}}>
                                    <p style={{color: 'white', padding: 0, margin: 0, marginLeft: '15px', fontSize: '16px'
                                        , fontWeight: '500'}}>{value[0].cinema.name}</p>
                                </div>
                            </div>
                            <div style={{width: '750px', height: '85px', border: '1px solid black', display: 'flex', alignItems: 'center'
                                ,paddingLeft: '20px', maxWidth: '90vw'}}>
                                {value.map((item, idx) => { return (
                                <div key={idx} className="box-small-time">
                                    <p className="small-time">{item.time}</p>
                                </div>
                                )})}
                            </div>
                        </div>
                        )})
                        }

                        {(selectedDate !== 0) && Object.entries(showtimes).map(([key, value]) => { return (
                        <div key={key} style={{marginBottom: '40px'}}>
                            <div style={{display: 'flex'}}>
                                <div style={{width: '5px', height: '35px', backgroundColor: '#616161'}}/>
                                <div style={{width: '250px', height: '35px', backgroundColor: '#00a8e1', alignItems: 'center',
                                    display: 'flex'}}>
                                    <p style={{color: 'white', padding: 0, margin: 0, marginLeft: '15px', fontSize: '16px'
                                        , fontWeight: '500'}}>{value[0].cinema.name}</p>
                                </div>
                            </div>
                            <div style={{width: '750px', height: '85px', border: '1px solid black', display: 'flex', alignItems: 'center'
                                ,paddingLeft: '20px', maxWidth: '90vw'}}>
                                {value.map((item, idx) => { return (
                                <div key={idx} className="box-small-time">
                                    <p className="small-time">{item.time}</p>
                                </div>
                                )})}
                            </div>
                        </div>
                        )})
                        }
                    </div>
                </div>

            </div>
        </div>
    </IconContext.Provider>
    }
    </>
    );
}