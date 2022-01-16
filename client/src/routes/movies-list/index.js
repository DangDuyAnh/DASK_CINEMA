import React, { useEffect, useState } from 'react';
import './index.css';

import { API_URL } from '../../config/Constants';
export default function MovieList(props){

    const [movieList, setMovieList] = useState([]) 

    useEffect(() => {
        try {
            const getData = async () => {
                if (props.movieList === 'phim-dang-chieu') {
                    const response = await fetch(API_URL+'/api/movies/getListMovies/now_playing', {
                        method: 'GET',
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: undefined,
                        },
                    });
                    const json = await response.json();
                    setMovieList(json.movieList);
                } else {
                    const response = await fetch(API_URL+'/api/movies/getListMovies/up_coming', {
                        method: 'GET',
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        },
                    });
                    const json = await response.json();
                    setMovieList(json.movieList);
                }
            }
            getData()
        } catch(e) {
            console.log(e);
        }
    }, []);

    return(
        <div className="MovieList-container">
        <div style={{width: 1250, padding: 10 }}>
            <ul className="MovieList-menu">
                <li>
                    <a href={(props.movieList === "phim-sap-chieu")&&"/phim-dang-chieu/"} 
                    className={(props.movieList === "phim-dang-chieu")?
                    "MovieList-a MovieList-active":"MovieList-a"}>PHIM ĐANG CHIẾU</a>
                </li>
                <li>
                    <a href={(props.movieList === "phim-dang-chieu")&&"/phim-sap-chieu/"}
                    className={(props.movieList === "phim-sap-chieu")?
                    "MovieList-a MovieList-active":"MovieList-a"}>PHIM SẮP CHIẾU</a>
                </li>
            </ul>

            <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 100}}>
                <div className="movie-list">
                    {movieList.map((item, idx) => { 
                        let time = new Date(item.releaseDate);
                        let showTime = `${time.getDate()}-${time.getMonth()+1}-${time.getFullYear()}`
                        return(
                        <div className="movie-card">
                            <div className="movie-card-img" style={{backgroundImage: 'url('+ (API_URL + item.poster) + ')'}}
                                onClick={() => {window.location = ("/phim/" + item._id)}}>
                                <div className='movie-overlay'> 
                                    <div style={{textAlign: 'center'}}>
                                        {item.requiredAge !== 'NONE'&& 
                                        <div style={{marginBottom: 60}}>
                                        <p style={{color: 'white', backgroundColor: '#00a8e1', display: 'inline'
                                        , padding: 3, fontSize: 14}}>
                                            {item.requiredAge}
                                        </p>
                                        </div>}
                                        
                                        <div className='mua-ve'>
                                            <p>MUA VÉ</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="movie-text">{item.title} </p>
                            <p><span style={{fontWeight: '600'}}>Thời lượng: </span>{item.duration}</p>
                            <p><span style={{fontWeight: '600'}}>Khởi chiếu: </span>{showTime}</p>
                        </div>
                        )
                    })}
                </div>
            </div>
        </div>
        </div>
    )
}