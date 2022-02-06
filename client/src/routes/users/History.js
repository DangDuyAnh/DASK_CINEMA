import React, {useEffect, useState} from 'react';
import { API_URL } from '../../config/Constants';
import { get } from "../../utility/api";
import { authenticationService } from "../../utility/authenticationService";

export default function History(props) {
    const [user, setUser] = useState(null);
    const [book, setBook] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    function numberWithCommas(x) {
        let y = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        y = y + " VNĐ"
        return y
    }

    useEffect(() => {
        console.log(authenticationService.getUser());
        let c = document.getElementsByClassName("myCanvas");
        for (let i = 0; i < c.length; i ++) {
            let ctx = c[i].getContext("2d");
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(232, 0);
            ctx.lineTo(232, 33);
            ctx.lineTo(0, 33);
            ctx.lineTo(17, 17);
            ctx.fillStyle = "#02a4da"
            ctx.fill();
        }

        let c2 = document.getElementsByClassName("otherCanvas");
        for (let i = 0; i < c2.length; i ++) {
            let ctx = c2[i].getContext("2d");
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(232, 0);
            ctx.lineTo(232, 33);
            ctx.lineTo(0, 33);
            ctx.lineTo(17, 17);
            ctx.fillStyle = "#bdbdbd"
            ctx.fill();
        }

        const getData = async () => {
            try {
                let res = await get("/users/show", authenticationService.getUserToken());
                setUser(res.data)
                let res2 = await get("/books/find", authenticationService.getUserToken());
                setBook(res2.books);
            } catch(e) {
                console.log(e)
            }
        }
        getData();
    }, []);

    useEffect(() => {
        
        let modal = document.getElementById("myModal");
        if (selectedBook) {
        let span = document.getElementsByClassName("close2")[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            setOpenModal(false);
        }
        }
        
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                console.log('hi')
                setOpenModal(false);
            }
        }
    }, [selectedBook])

    const getDay = (data) => {
        let time = new Date(data);
        let showTime = `${time.getDate()}-${time.getMonth()+1}-${time.getFullYear()}`
        return showTime
    }

    const getHour = (data) => {
        let time = new Date(data);
        let singleMinutes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        let minute = time.getMinutes().toString();
        if (singleMinutes.includes(minute)) minute = '0' + minute;
        let showTime = `${time.getHours()}:${minute}`
        return showTime;
    }

    const targetModal = (item) => {
        setSelectedBook(item);
        setOpenModal(true);
        console.log('hi')
    }

    return(
        <>
        {selectedBook&&
        <div id="myModal" className={openModal?"modal modal-active":"modal"}>
            <div className="modal2-content">
                <span className="close2">&times;</span>
                <div className="booking-content">
                <div className="booking-pay-container">
                    <p style={{fontWeight: '600', fontSize: '30px', margin: 0, padding: 0}}>Vé của bạn</p>
                    <div style={{width: '90%', height: '1px', backgroundColor: 'black', marginTop: '8px', marginBottom: '20px'}}/>
                    <div style={{display: 'flex'}}>
                        <p className="booking-pay-line" style={{fontWeight:'bold' ,color: 'green', width: '100px'}}>Phim: </p>
                        <p className="booking-pay-line" style={{fontWeight:'bold' ,color: 'green'}}>{selectedBook.showtime.movie.title}</p>
                    </div>
                    <div style={{display: 'flex'}}>
                        <p className="booking-pay-line" style={{fontWeight:'bold' ,color: '#be1209', width: '100px'}}>Rạp: </p>
                        <p className="booking-pay-line" style={{fontWeight:'bold' ,color: '#be1209'}}>{selectedBook.showtime.cinema.name}</p>
                    </div>
                    <div style={{display: 'flex'}}>
                        <p className="booking-pay-line" style={{fontWeight:'500' ,width: '100px'}}>Ngày: </p>
                        <p className="booking-pay-line" style={{fontWeight:'500' }}>{selectedBook.date}</p>
                    </div>
                    <div style={{display: 'flex'}}>
                        <p className="booking-pay-line" style={{fontWeight:'500' ,width: '100px'}}>Suất: </p>
                        <p className="booking-pay-line" style={{fontWeight:'500' }}>{selectedBook.showtime.time}</p>
                    </div>
                    <div style={{display: 'flex'}}>
                        <p className="booking-pay-line" style={{fontWeight:'500' ,width: '100px'}}>Ghế: </p>
                        {selectedBook.seat.map((item, idx) => {
                            return(
                                <div>
                                {(idx < selectedBook.seat.length - 1)?
                                <p key={idx} className="booking-pay-line" style={{fontWeight:'500', marginRight: '6px' }}>{`${item},`}</p>
                                :<p key={idx} className="booking-pay-line" style={{fontWeight:'500', marginRight: '6px' }}>{item}</p>
                                }
                                </div>
                                );
                        })}
                    </div>
                    <div style={{display: 'flex'}}>
                        <p className="booking-pay-line" style={{fontWeight:'500' ,width: '100px'}}>Thành tiền: </p>
                        <p className="booking-pay-line" style={{fontWeight:'500' }}>{numberWithCommas(selectedBook.money)}</p>
                    </div>

                    <table className="booking-table">
                    <tr>
                        <th>Mục</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Cộng</th>
                    </tr>
                    <tr>
                        <td>Ghế xem phim</td>
                        <td>80,000 VNĐ</td>
                        <td>{selectedBook.seat.length}</td>
                        <td>{numberWithCommas(80000*selectedBook.seat.length)}</td>                       
                    </tr>
                    {
                        selectedBook.food.map((item, idx) => {
                            return(
                                <tr key={idx}>
                                    <td>{item.name}</td>
                                    <td>{numberWithCommas(item.price)}</td>
                                    <td>{item.count}</td>
                                    <td>{numberWithCommas(item.total)}</td>                       
                                </tr>
                            );
                        })
                    }
                        <tr style={{paddingTop: '20px'}}>
                            <td></td>
                            <td></td>
                            <td style={{ fontWeight: '700'}}>Tổng cộng</td>
                            <td style={{ fontWeight: '700'}}>{numberWithCommas(selectedBook.money)}</td>                       
                        </tr>
                    </table>
                    <div style={{marginBottom: '50px'}}/>

                </div>
                </div>
            </div>
        </div>
        }
        <div className="MovieList-container">
            <div style={{width: 1100, padding: 10, maxWidth: '90vw'}}>
                <div style={{marginTop: '50px', display: 'flex', flexWrap: 'wrap', maxWidth: '90vw'}}>
                    <div style={{marginRight: '20px'}}>
                        <p style={{color: '#02a4da', margin: '0px 0px 10px 0px', padding: 0, fontSize: '24px', fontWeight: '700', 
                        letterSpacing: '1px'}}>TÀI KHOẢN DASK</p>
                        <div style={{position: 'relative', display: 'flex', alignItems: 'center', marginBottom: '2px', cursor: 'pointer'}}
                            onClick={() => {window.location = '/user/account'}}>
                            <canvas
                                className="otherCanvas"
                                width="232"
                                height="34"
                            >
                                Your browser does not support the HTML canvas tag.
                            </canvas>
                            <p style={{position: 'absolute', margin: '0px 0px 0px 25px', padding: 0, zIndex: 1, color: '#616161',
                                fontSize: '14px', fontWeight: 'bold'}}>
                                THÔNG TIN CHUNG
                            </p>
                        </div>
                        <div style={{position: 'relative', display: 'flex', alignItems: 'center', marginBottom: '2px', cursor: 'pointer'}}
                            onClick={() => {window.location = '/user/detail'}}>
                            <canvas
                                className="otherCanvas"
                                width="232"
                                height="34"
                            >
                                Your browser does not support the HTML canvas tag.
                            </canvas>
                            <p style={{position: 'absolute', margin: '0px 0px 0px 25px', padding: 0, zIndex: 1, color: '#616161',
                                fontSize: '14px', fontWeight: 'bold'}}>
                                CHI TIẾT TÀI KHOẢN
                            </p>
                        </div>
                        <div style={{position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '2px'}}
                            >
                            <canvas
                                className="myCanvas"
                                width="232"
                                height="34"
                            >
                                Your browser does not support the HTML canvas tag.
                            </canvas>
                            <p style={{position: 'absolute', margin: '0px 0px 0px 25px', padding: 0, zIndex: 1, color: 'white',
                                fontSize: '14px', fontWeight: 'bold'}}>
                                LỊCH SỬ GIAO DỊCH
                            </p>
                        </div>
                    </div>

                    {book&&<div style={{flex: '1'}}>
                        <div style={{width: '100%', backgroundColor: 'black', margin: 0, padding: 0}}>
                            <p style={{color: 'white', textAlign: 'center', fontSize: '22px', padding: '5px 0px', margin: 0}}>LỊCH SỬ GIAO DỊCH</p>
                        </div>

                        <div>
                            <table className='history-table'>
                            <tr>
                                <th>STT</th>
                                <th>Ngày mua</th>
                                <th>Phim</th>
                                <th>Rạp</th>
                                <th>Suất chiếu</th>
                                <th>Thành tiền</th>
                                <th>Chi tiết</th>
                            </tr>
                            {
                                book.map((item, index) => {
                                    return(
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div style={{margin: 0, padding: '2px 0px'}}>{getDay(item.createdAt)}</div>
                                                <div style={{margin: 0, padding: '2px 0px'}}>{getHour(item.createdAt)}</div>
                                            </td>
                                            <td>{item.showtime.movie.title}</td>
                                            <td>{item.showtime.cinema.name}</td>
                                            <td>
                                                <div style={{margin: 0, padding: '2px 0px'}}>{item.date}</div>
                                                <div style={{margin: 0, padding: '2px 0px'}}>{item.showtime.time}</div>
                                            </td>
                                            <td>
                                                {numberWithCommas(item.money)}
                                            </td>
                                            <td><p style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}
                                             onClick={() => targetModal(item)}>View</p></td>                     
                                        </tr>
                                    )
                                })
                            }
                            </table>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
        </>
    )
}