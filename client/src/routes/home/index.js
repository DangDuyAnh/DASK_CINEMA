import React, {useEffect, useState} from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconContext } from "react-icons";
import CallEndIcon from '@mui/icons-material/CallEnd';

import "./index.css";
import { newsData } from './HomeData';
import { movies } from './HomeData';

export default function Homepage(){

  const [slideIndex, setSlideIndex] = useState(0);
  const [movieIndex, setMovieIndex] = useState(0);

  const plusSlides = (n) => {
    let i = slideIndex + n;
    if (i >= newsData.length) i = 0;
    if (i < 0) i = newsData.length - 1;
    setSlideIndex(i);
  }

  const currentSlide = (n) => {
    setSlideIndex(n);
  }

  useEffect(() => {
    let slides = document.getElementsByClassName("image-container");
    let dots = document.getElementsByClassName("dot");
    let i;
    for (i = 0; i < slides.length; i++) {
      slides[i].className = slides[i].className.replace(" active-anim", ""); 
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex].className += " active-anim";  
    dots[slideIndex].className += " active";

  }, [slideIndex])

  useEffect(() => {
    let track = document.querySelector('.track');
    let slideWidth = document.querySelector('.card').offsetWidth;
    track.style.transform = `translateX(-${movieIndex*slideWidth}px)`;
  }, [movieIndex])

  useEffect(() => {
    const interval = setInterval(() => {
      if (slideIndex === (newsData.length - 1)) {
        setSlideIndex(0);
        return;
      }
      else {
        setSlideIndex(slideIndex + 1);
      }
    }, 5000);
    return () => clearInterval(interval);
  })

  return (
    <IconContext.Provider value={{ size: "30px"}}>
    <div >
      <div className="slide-container">
        {newsData.map((item, index) => {
          return(
            <div className="image-container" key={index}>
              <img src={item.src} className="slide-image" />
            </div>
          )
        })}

        <div className="button-container">
            {newsData.map((item, index) => {
                return(
                  <div className="dot" key={index} onClick={() => currentSlide(index)}></div> 
                )
              })}
        </div>

        <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
        <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
      </div>

      <div className="movie-part">
          <h1 className="phim-moi">Phim mới</h1>
          <div className="line" />

        {(movieIndex !== 0)&&<div className="movie-prev" onClick={() => setMovieIndex(movieIndex - 1)}>
          <div className="arrow">
            <ArrowBackIosNewIcon fontSize="large"/>
          </div>
        </div>}

        {(movieIndex !== (movies.length - 1))&&<div className="movie-next" onClick={() => setMovieIndex(movieIndex + 1)}>
          <div className="arrow">
            <ArrowForwardIosIcon fontSize="large"/>
          </div>
        </div>}
          
      <div className="movie-series">
        <div className="track">
          {movies.map((item, index) => {
            return(
              <div className="card" key={index}>
                <img src={item.src} />
                <div className="Home-overlay">
                  <div className="bottom-overlay"> 
                    <h1>Tiêu đề phim rất là dài này nhé</h1>
                    
                    <div className="overlay-button-group"> 
                      <div className="overlay-wrapper"> 
                        <p>Xem chi tiết </p>
                      </div>
                      <div className="overlay-wrapper"> 
                        <div className="overlay-book">
                        <CallEndIcon style={{color: "white", marginLeft: "7px"}}/>
                        <p>MUA VÉ </p>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      </div>
    </div>
    </IconContext.Provider>
    );
  }
