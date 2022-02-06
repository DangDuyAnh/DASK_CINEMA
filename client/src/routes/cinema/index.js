import React, {useEffect, useState, useRef} from 'react';
import './index.css';
import { get } from "../../utility/api";
import { API_URL } from '../../config/Constants';
import DetailCinema from './DetailCinema';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';

const cinemaName = {
    '61e18c7bb5054d1c468ced8f': 'cinema-ba-trieu',
    '61e18c99b5054d1c468ced90': 'cinema-pham-ngoc-thach',
    '61e18dd5b5054d1c468ced91': 'cinema-bach-mai',
    '61e18e85b5054d1c468ced92': 'cinema-thanh-xuan',
    '61e18ed1b5054d1c468ced93': 'cinema-ho-chi-minh',
};

export default function Cinema(props) {
    const [cinemaList, setCinemaList] = useState([]); 
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(0);
    const [showtimes, setShowtimes] = useState({});
    const [todayShowtimes, setTodayShowtimes] = useState({});
    const [selectedShowtime, setSelectedShowtime] = useState({});
    const [selectedTodayShowtime, setSelectedTodayShowtime] = useState({});
    const [cinema, setCinema] = useState('');
    const [clicked, setClicked] = useState(false);

    const timeRef = useRef()
    let { path, url } = useRouteMatch();
    
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
        let hour = (date.getHours() + 1).toString();
        if (singleHour.includes(hour)) hour = '0' + hour;
        return hour
    }

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
        const getData = async () => {
            try {
                let res = await get("/cinemas/getListCinema");
                setCinemaList(res.cinemaList);
                res = await get("/showtimes/getList");
                let tempDict = {};
                let tempDict2 = {};
                res.showtimes.forEach((item, idx) => {
                    if (!tempDict[item.cinema.name]) tempDict[item.cinema.name] = {};
                    if (!tempDict[item.cinema.name][item.movie.title]) tempDict[item.cinema.name][item.movie.title] = [];
                    tempDict[item.cinema.name][item.movie.title].push(item);
                    if (todayString < item.time) {
                        if (!tempDict2[item.cinema.name]) tempDict2[item.cinema.name] = {};
                        if (!tempDict2[item.cinema.name][item.movie.title]) tempDict2[item.cinema.name][item.movie.title] = [];
                        tempDict2[item.cinema.name][item.movie.title].push(item);
                    }
                });
                setShowtimes(tempDict);
                setTodayShowtimes(tempDict2);
            } catch(e) {
                console.log(e);
            };
        }
        getData();
    }, []);

    const onClickCinema = (cinema) => {
        setSelectedShowtime(showtimes[cinema]);
        setSelectedTodayShowtime(todayShowtimes[cinema]);
        setClicked(true);
        setCinema(cinema);
        timeRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const Cinemalist = () => {
        return(
        <div className="MovieList-container">
            <div style={{width: 1250, padding: 10, maxWidth: '90vw'}}>
                <ul className="MovieList-menu">
                    <li>
                        <a className="MovieList-a MovieList-active">HỆ THỐNG RẠP</a>
                    </li>
                </ul>
    
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '70px'}}>
                    <div className="cinema-list">
                        {cinemaList.map((item, index) => {
                            return(
                                <div key={index} className='cinema-card'>
                                    <div className='cinema-info' onClick={() => onClickCinema(item.name)}>
                                        <p className='cinema-title'>{item.name}</p>
                                        <p className='cinema-address'>{item.address}</p>
                                    </div>
                                    <Link style={{textDecoration: 'none'}} to={'/he-thong-rap/' + cinemaName[item._id]}>
                                        <div className='cinema-detail'>
                                            <p className='cinema-title' style={{margin: 0}}>XEM CHI TIẾT</p>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
    
                <div style={{marginTop: '40px', minHeight: '600px'}} className={clicked?'time-active':'time-disable'}>
                    <div ref={timeRef} style={{width: '100%', height: '1px', backgroundColor: 'black', marginTop: '30px'}}/>
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
    
                    <div style={{marginTop: '80px', maxWidth: '90vw', overflow: 'hidden'}}>
    
                    {(selectedDate === 0) && (selectedTodayShowtime) && Object.entries(selectedTodayShowtime).map(([key, value]) => { return (
                            <div style={{marginBottom: '30px'}}>
                                <img style={{float: 'left', width: "167px", height: '250px', objectFit: 'cover', marginRight: '30px'}}
                                    src={API_URL + value[0].movie.poster}/>
    
                                <div style={{float: 'left'}}>
                                    <p style={{margin: 0, padding: 0, fontSize: '20px', fontWeight: '600', color: 'black'}}>{key}</p>
                                    <p style={{color: '#0091ea', fontSize: '18px', fontWeight: '500', margin: '5px 0px 15px 0px'}}>{cinema}</p>
                                    <p style={{color: '#717171', fontSize: '18px', fontWeight: '500', margin: '15px 0px 5px 0px'}}>Giờ chiếu:</p>
                                    <div style={{display: 'flex'}}>
                                        {value.map((item, idx) => { return (
                                        <div onClick={() => {window.location = ('/booking/' + item._id + '?day=' + getDay(dates[selectedDate]) 
                                            + getMonth(dates[selectedDate]) + '2022')}} key={idx} className="cinema-boxtime">
                                            <p className="cinema-small-time">{item.time}</p>
                                        </div>
                                        )})}
                                    </div>
                                </div>
                                
                                <div style={{clear: 'both'}}></div>
                            </div>
                        )})}
    
                        {(selectedDate !== 0) && (selectedShowtime) && Object.entries(selectedShowtime).map(([key, value]) => { return (
                            <div style={{marginBottom: '30px'}}>
                                <img style={{float: 'left', width: "167px", height: '250px', objectFit: 'cover', marginRight: '30px'}}
                                    src={API_URL + value[0].movie.poster}/>
    
                                <div style={{float: 'left'}}>
                                    <p style={{margin: 0, padding: 0, fontSize: '20px', fontWeight: '600', color: 'black'}}>{key}</p>
                                    <p style={{color: '#0091ea', fontSize: '18px', fontWeight: '500', margin: '5px 0px 15px 0px'}}>{cinema}</p>
                                    <p style={{color: '#717171', fontSize: '18px', fontWeight: '500', margin: '15px 0px 5px 0px'}}>Giờ chiếu:</p>
                                    <div style={{display: 'flex'}}>
                                        {value.map((item, idx) => { return (
                                        <div onClick={() => {window.location = ('/booking/' + item._id + '?day=' + getDay(dates[selectedDate]) 
                                            + getMonth(dates[selectedDate]) + '2022')}} key={idx} className="cinema-boxtime">
                                            <p className="cinema-small-time">{item.time}</p>
                                        </div>
                                        )})}
                                    </div>
                                </div>
                                
                                <div style={{clear: 'both'}}></div>
                            </div>
                        )})}
                    </div>
                </div>
    
            </div>
        </div>
        );
    }

    return(
    <>
    <Switch>
        <Route exact path={path}>
          <Cinemalist/>
        </Route>
        <Route path={`${path}/:nameCinema`}>
          <DetailCinema />
        </Route>
    </Switch>
    </>
    );
}