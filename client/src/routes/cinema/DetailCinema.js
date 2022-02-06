import React, {useEffect, useState, useRef} from 'react';
import './index.css';
import { get, post } from "../../utility/api";
import { API_URL, BLOCK_WORDS } from '../../config/Constants';
import {useParams} from 'react-router-dom';
import { authenticationService } from "../../utility/authenticationService";

const cinemaId = {
    'cinema-ba-trieu': '61e18c7bb5054d1c468ced8f',
    'cinema-pham-ngoc-thach': '61e18c99b5054d1c468ced90',
    'cinema-bach-mai': '61e18dd5b5054d1c468ced91',
    'cinema-thanh-xuan': '61e18e85b5054d1c468ced92',
    'cinema-ho-chi-minh': '61e18ed1b5054d1c468ced93',
};

export default function DetailCinema(){

    let { nameCinema } = useParams();
    const [cinema, setCinema] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('')

    useEffect(() => {

        if (!(nameCinema in cinemaId)) {
            window.location = '/404';
            return
        }
        const getData = async () => {
            try {
                let res = await get("/cinemas/getCinema/" + cinemaId[nameCinema]);
                setCinema(res.cinema);
                let res2 = await get("/comments/getList/" + cinemaId[nameCinema]);
                setComments(res2.comments)
            } catch(e) {
                console.log(e);
            };
        }
        getData();

    }, []);

    function auto_grow(element) {
        element.target.style.height = "0px";
        element.target.style.height = (element.target.scrollHeight)+"px";
    }

    const FormatTime = (data) => {
        let currentYear = new Date().getFullYear();
        let time = new Date(data);
        let showTime;
        let singleMinutes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        let minute = time.getMinutes().toString();
        if (singleMinutes.includes(minute)) minute = '0' + minute;
        if (currentYear === time.getFullYear()) {
          showTime = `${time.getDate()}/${time.getMonth()+1} lúc ${time.getHours()}:${minute}`
        } else {
          showTime = `${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()} lúc ${time.getHours()}:${minute}`
        } 
        return showTime;
      }

    const handleDang = async () => {
        BLOCK_WORDS.forEach((item) => {
            if (comment.includes(item)) {
                alert("Bình luận có chứa từ ngữ không phù hợp");
                return;
            }
        })

        let commentObj = {
            cinema: cinemaId[nameCinema],
            content: comment
        }
        let res = await post("/comments/create", commentObj, authenticationService.getUserToken());
        let json = await res.json();
        let tempComments = comments;
        tempComments.unshift(json.comment);
        setComments([...tempComments]);
    }

    return(
    <>
        {cinema && <div className="MovieList-container">
            <div style={{width: 1250, padding: 10, maxWidth: '90vw'}}>
                <ul className="MovieList-menu">
                    <li>
                        <a className="MovieList-a MovieList-active">{cinema.name}</a>
                    </li>
                </ul>

                <p style={{margin: '30px 0px 20px 0px' ,fontSize: '18px', color: 'black'}}><span style={{fontWeight: '600'}}>Địa chỉ: </span>{cinema.address}</p>

                <iframe src={cinema.ggmap}
                    style={{border:"0", width: '100%', maxWidth: '90vw', height: '450px'}} loading="lazy" />
                
                <p style={{fontSize: '20px'}}>BÌNH LUẬN</p>
                <p style={{fontWeight: '600'}}>{comments.length} Bình luận</p>

                {authenticationService.getUser() && <div style={{display: 'flex', flexWrap: 'wrap', marginBottom: '30px'}}>
                    <img src={API_URL + authenticationService.getUser().avatar} style={{width: '50px', height: '50px', margin: '0px 10px 10px 0px'}} />
                    <div style={{width: '95%'}}>
                    <textarea value={comment} onChange={(e) => {setComment(e.target.value)}} onInput={auto_grow} style={{ boxSizing: 'border-box' ,width: '100%', height: '56px', fontSize: '16px', padding: '20px 15px 20px 15px', margin: '0'}} placeholder='Thêm bình luận...'/>
                    <div style={{width: '100%', height: '30px' ,display: 'flex', justifyContent: 'flex-end', margin: '0', alignItems: 'center'}}>
                        <button className='dang' onClick={handleDang}>Đăng</button>
                    </div>
                    </div>
                </div>}

                {comments.map((item, index) => {
                    return(
                        <div key={index} style={{display: 'flex', flexWrap: 'wrap', marginBottom: '30px'}}>
                            <img src={API_URL + item.user.avatar} style={{width: '50px', height: '50px', margin: '0px 10px 10px 0px'}} />
                            <div style={{width: '95%'}}>
                                <p style={{margin: 0, padding: 0, fontWeight: '700', color: '#385898', fontSize: '16px'}}>{item.user.ten}</p>
                                <p style={{margin: '7px 0px', padding: 0, fontSize: '16px', overflowWrap: 'break-word', color: 'black'}}>{item.content}</p>
                                <p style={{margin: 0, padding: 0, fontSize: '12px'}}>{FormatTime(item.createdAt)}</p>
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
        }
    </>
    );
}