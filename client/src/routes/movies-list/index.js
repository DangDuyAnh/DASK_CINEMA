import React from 'react';
import './index.css';

export default function MovieList(){
    return(
        <div className="MovieList-container">
        <div style={{width: '85%'}}>
                <ul className="MovieList-menu">
                    <li>
                        <a className="MovieList-a MovieList-active">PHIM ĐANG CHIẾU</a>
                    </li>
                    <li>
                        <a className="MovieList-a">PHIM SẮP CHIẾU</a>
                    </li>
                </ul>
        </div>
        </div>
    )
}