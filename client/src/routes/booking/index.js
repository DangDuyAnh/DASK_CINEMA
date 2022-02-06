import React, {useEffect, useState} from "react";
import { get, post } from "../../utility/api";
import "./index.css"
import { API_URL } from '../../config/Constants';
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IconContext } from "react-icons";
import {useLocation} from "react-router-dom";
import { authenticationService } from "../../utility/authenticationService";
export default function Booking(props) {

    const [showtime, setShowtime] = useState(null);
    const rowSeats = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const columnSeats = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const valDay = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    const valMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const [book, setBook] = useState([]);
    const [selectedBook, setSelectedBook] = useState([]);
    const [movieMoney, setMovieMoney] = useState(0);
    const [comboMoney, setComboMoney] = useState(0);
    const [snack, setSnack] = useState([]);
    const [snackCount, setSnackCount] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    const [step, setStep] = useState(0);
    const [step2, setStep2] = useState(0);
    const [day, setDay] = useState('');

    function numberWithCommas(x) {
        let y = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        y = y + " VNĐ"
        return y
    }

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
      }
    let query = useQuery();
    let dayBooking = query.get("day");

    const checkDay = () => {
        if (!dayBooking) {
            props.history.push('/404');
            return; 
        }
        let date = dayBooking.substring(0,2);
        let month = dayBooking.substring(2,4);
        let year = dayBooking.substring(4,8);
        if (!valDay.includes(date) || !valMonth.includes(month) || (year !== '2022')) {
            props.history.push('/404');
            return;
        }
        if (month === '04' || month === '06' || month === '09' || month === '11') {
            if (date === '31') {
                props.history.push('/404');
                return; 
            }
        }
        if (month === '02') {
            if (date === '31' || (date === '30') || (date === '29')) {
                props.history.push('/404');
                return; 
            }
        }
        setDay(`${date}-${month}-${year}`)
    }

    const booking = (item) => {
        if (selectedBook.includes(item)) return;
        let attempList = book;
        if (attempList.includes(item)) attempList = attempList.filter(ele => ele !== item);
        else {
            if (attempList.length >= 8) {
                alert("Bạn chỉ có thể chọn tối đa 8 vé");
                return;
            }
            attempList.push(item);
        }
        setBook([...attempList]);
        setMovieMoney(attempList.length*80000);
    }

    const plusSnackCount = (index1, index2) => {
        let attempSnack = snackCount;
        attempSnack[index1][index2] += 1;
        setSnackCount([...attempSnack]);
        let priceCombo = comboMoney
        if (index2 === 0) priceCombo = priceCombo + snack[index1].price.M;
        if (index2 === 1) priceCombo = priceCombo + snack[index1].price.L;
        if (index2 === 2) priceCombo = priceCombo + snack[index1].price.XL;
        setComboMoney(priceCombo);
    }

    const minusSnackCount = (index1, index2) => {
        let attempSnack = snackCount;
        if (attempSnack[index1][index2] === 0) return;
        attempSnack[index1][index2] -= 1;
        setSnackCount([...attempSnack]);
        let priceCombo = comboMoney
        if (index2 === 0) priceCombo = priceCombo - snack[index1].price.M;
        if (index2 === 1) priceCombo = priceCombo - snack[index1].price.L;
        if (index2 === 2) priceCombo = priceCombo - snack[index1].price.XL;
        setComboMoney(priceCombo);
    }

    const handleNext = (target = null) => {
        if ((target - step2) > 1) return; 
        if (book.length === 0) {
            alert("Hãy chọn ghế xem phim");
            return;
        }
        if (target === undefined || target === null) {
            setStep(step + 1);
            if ((step + 1) > step2) setStep2(step + 1);
        } else {
            setStep(target);
            if (target > step2) setStep2(target);
        };
        window.scrollTo(0, 0);
    }

    const handlePrev = () => {
        setStep(step - 1);
        window.scrollTo(0, 0);
    }

    const handleBook = async () => {
        let tempFood = [];
        snackCount.forEach((item, index) => {
            item.forEach((value, idx) => {
                if (value !== 0) {
                    if (idx === 0) {
                        tempFood.push({
                            name: snack[index].name + ' size ' + 'M',
                            price: snack[index].price.M,
                            count: value,
                            total: snack[index].price.M*value
                        })
                    } else if (idx === 1) {
                        tempFood.push({
                            name: snack[index].name + ' size ' + 'L',
                            price: snack[index].price.L,
                            count: value,
                            total: snack[index].price.L*value
                        })
                    }  else if (idx === 2) {
                        tempFood.push({
                            name: snack[index].name + ' size ' + 'XL',
                            price: snack[index].price.XL,
                            count: value,
                            total: snack[index].price.XL*value
                        })
                    }
                }
            })
        })
        let bookObj = {
            showtime: props.match.params.id,
            date: day,
            seat: book,
            money: movieMoney + comboMoney,
            food: tempFood
        }
        try {
            let res = await post("/books/create", bookObj, authenticationService.getUserToken());
            props.history.push('/user/history');
        } catch(e) {
            console.log(e)
        }

    }

    useEffect(() => {
        if (!dayBooking) {
            props.history.push('/404');
            return; 
        }
        let date = dayBooking.substring(0,2);
        let month = dayBooking.substring(2,4);
        let year = dayBooking.substring(4,8);
        if (!valDay.includes(date) || !valMonth.includes(month) || (year !== '2022')) {
            props.history.push('/404');
            return;
        }
        if (month === '04' || month === '06' || month === '09' || month === '11') {
            if (date === '31') {
                props.history.push('/404');
                return; 
            }
        }
        if (month === '02') {
            if (date === '31' || (date === '30') || (date === '29')) {
                props.history.push('/404');
                return; 
            }
        }
        setDay(`${date}-${month}-${year}`)
        const getShowtimes = async () => {
            try {
                let res = await get("/showtimes/findShowtime/" + props.match.params.id);
                if (res.showtimes === null || res.showtimes === undefined) {
                    props.history.push('/404');
                }
                setShowtime(res.showtimes);

                let snacks = await get("/snacks/list");
                setSnack(snacks);

                const searchObj = {
                    date: `${date}-${month}-${year}`,
                    showtime: props.match.params.id
                }
                let res2 = await post("/books/list", searchObj);
                let json = await res2.json();
                let tempArr = []
                json.books.forEach((item) => {
                    item.seat.forEach(value => {
                        tempArr.push(value)
                    })
                });
                setSelectedBook(tempArr);

            } catch(e) {
                // props.history.push('/404');
                console.log(e);
            }}
            getShowtimes();
    }, []);

    const SeatSelect = () => {
        return(
            <div className="seat-container">
                <div style={{backgroundColor: 'black', width: '400px', marginTop: '40px',
                    textAlign: 'center', maxWidth: '100vw'}}>
                    <p style={{color: 'white', paddingTop: '10px', margin: 0, paddingBottom: '10px'}}>
                        SCREEN
                    </p>
                </div>

                <div className="seats-wrapper">
                    {rowSeats.map((row, idx) => {
                        return(
                            <div key={idx} className="seats-row">
                                {columnSeats.map((column, index) => {
                                    return (
                                        <div key={index} className={
                                            (selectedBook.includes(`${row}${column}`))?"seat seat-selected"
                                            :(book.includes(`${row}${column}`))?"seat seat-booking":"seat"} 
                                            onClick={() => {booking(`${row}${column}`)}}>
                                            <p className={(selectedBook.includes(`${row}${column}`) || book.includes(`${row}${column}`))
                                                ?"booking-text booking-text-booking":"booking-text"}>
                                                {`${row}${column}`}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        );
                    })}
                </div>

                <div style={{marginTop: '50px', display: 'flex', maxWidth: '100vw', marginBottom: '50px'}}>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '80px'}}>
                        <div className="seat" style={{backgroundColor: '#b42222', border: 0}}/>
                        <p style={{marginLeft: '13px'}}>Ghế đang chọn</p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <div className="seat" style={{backgroundColor: '#9e9e9e', border: 0}}/>
                        <p style={{marginLeft: '13px'}}>Ghế đã chọn</p>
                    </div>
                </div>
            </div>
        );
    }

    const FoodSelect = () => {
        return(
            <div className="food-container">
                <IconContext.Provider value={{ size: "14px", color: 'white'}}>
                {snack.map((item, index) => {return(
                <div key={index} className="food-item">
                    <img style={{width: "120px", height: '160px', objectFit: 'cover', float: 'left', 
                        marginRight: '25px'}}
                        src={API_URL + item.img}/>
                    <div style={{float: 'left'}}>
                        <div>
                            <p className="food-title">{item.name}</p>
                            <div style={{marginBottom: '13px', float: 'left', marginRight: '50px'}}>
                                <div style={{display: 'flex', marginBottom: '5px'}}>
                                    <p className="food-text">Size M: </p>
                                    <p className="food-text" style={{fontWeight: '600'}}>{numberWithCommas(item.price.M)}</p>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div className="food-icon" onClick={() => {minusSnackCount(index, 0)}}>
                                        <AiOutlineMinus />
                                    </div>
                                    <div className="food-number">
                                        {snackCount[index][0]}
                                    </div>
                                    <div className="food-icon" onClick={() => {plusSnackCount(index, 0)}}>
                                        <AiOutlinePlus />
                                    </div>
                                </div>
                            </div>

                            <div style={{marginBottom: '13px', float: 'left'}}>
                                <div style={{display: 'flex', marginBottom: '5px'}}>
                                    <p className="food-text">Size L: </p>
                                    <p className="food-text" style={{fontWeight: '600'}}>{numberWithCommas(item.price.L)}</p> 
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div className="food-icon" onClick={() => {minusSnackCount(index, 1)}}>
                                        <AiOutlineMinus />
                                    </div>
                                    <div className="food-number">
                                        {snackCount[index][1]}
                                    </div>
                                    <div className="food-icon" onClick={() => {plusSnackCount(index, 1)}}>
                                        <AiOutlinePlus />
                                    </div>
                                </div>
                            </div>

                            <div style={{clear: 'both'}}></div>

                            <div style={{marginBottom: '10px', float: 'left'}}>
                                <div style={{display: 'flex', marginBottom: '5px'}}>
                                    <p className="food-text">Size XL: </p>
                                    <p className="food-text" style={{fontWeight: '600'}}>{numberWithCommas(item.price.XL)}</p>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div className="food-icon" onClick={() => {minusSnackCount(index, 2)}}>
                                        <AiOutlineMinus />
                                    </div>
                                    <div className="food-number">
                                        {snackCount[index][2]}
                                    </div>
                                    <div className="food-icon" onClick={() => {plusSnackCount(index, 2)}}>
                                        <AiOutlinePlus />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div style={{clear: 'both'}}></div>
                </div>
                )})
                }   
                </IconContext.Provider>
            </div>
        );
    }

    const BookingPay = () => {
        return(
            <div className="booking-pay-container">
                <p style={{fontWeight: '600', fontSize: '30px', margin: 0, padding: 0}}>Vé của bạn</p>
                <div style={{width: '90%', height: '1px', backgroundColor: 'black', marginTop: '8px', marginBottom: '20px'}}/>
                <div style={{display: 'flex'}}>
                    <p className="booking-pay-line" style={{fontWeight:'bold' ,color: 'green', width: '100px'}}>Phim: </p>
                    <p className="booking-pay-line" style={{fontWeight:'bold' ,color: 'green'}}>{showtime.movie.title}</p>
                </div>
                <div style={{display: 'flex'}}>
                    <p className="booking-pay-line" style={{fontWeight:'bold' ,color: '#be1209', width: '100px'}}>Rạp: </p>
                    <p className="booking-pay-line" style={{fontWeight:'bold' ,color: '#be1209'}}>{showtime.cinema.name}</p>
                </div>
                <div style={{display: 'flex'}}>
                    <p className="booking-pay-line" style={{fontWeight:'500' ,width: '100px'}}>Ngày: </p>
                    <p className="booking-pay-line" style={{fontWeight:'500' }}>{day}</p>
                </div>
                <div style={{display: 'flex'}}>
                    <p className="booking-pay-line" style={{fontWeight:'500' ,width: '100px'}}>Suất: </p>
                    <p className="booking-pay-line" style={{fontWeight:'500' }}>{showtime.time}</p>
                </div>
                <div style={{display: 'flex'}}>
                    <p className="booking-pay-line" style={{fontWeight:'500' ,width: '100px'}}>Ghế: </p>
                    {book.map((item, idx) => {
                        return(
                            <div>
                            {(idx < book.length - 1)?
                            <p key={idx} className="booking-pay-line" style={{fontWeight:'500', marginRight: '6px' }}>{`${item},`}</p>
                            :<p key={idx} className="booking-pay-line" style={{fontWeight:'500', marginRight: '6px' }}>{item}</p>
                            }
                            </div>
                            );
                    })}
                </div>
                <div style={{display: 'flex'}}>
                    <p className="booking-pay-line" style={{fontWeight:'500' ,width: '100px'}}>Thành tiền: </p>
                    <p className="booking-pay-line" style={{fontWeight:'500' }}>{numberWithCommas(movieMoney + comboMoney)}</p>
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
                    <td>{book.length}</td>
                    <td>{numberWithCommas(movieMoney)}</td>                       
                </tr>
                {
                    snackCount.map((item, idx) => {
                        return(
                            <>
                            {item.map((value, index) => {
                                if (value !== 0)
                                return(
                                    <>
                                    {(index === 0) &&
                                    <tr>
                                        <td>{`${snack[idx].name} size M`}</td>
                                        <td>{numberWithCommas(snack[idx].price.M)}</td>
                                        <td>{value}</td>
                                        <td>{numberWithCommas(snack[idx].price.M*value)}</td>                       
                                    </tr>
                                    }

                                    {(index === 1) &&
                                    <tr>
                                        <td>{`${snack[idx].name} size L`}</td>
                                        <td>{numberWithCommas(snack[idx].price.L)}</td>
                                        <td>{value}</td>
                                        <td>{numberWithCommas(snack[idx].price.L*value)}</td>                       
                                    </tr>
                                    }

                                    {(index === 2) &&
                                    <tr>
                                        <td>{`${snack[idx].name} size XL`}</td>
                                        <td>{numberWithCommas(snack[idx].price.XL)}</td>
                                        <td>{value}</td>
                                        <td>{numberWithCommas(snack[idx].price.XL*value)}</td>                       
                                    </tr>
                                    }
                                    </>
                                );
                                })
                            }   
                            </>
                        );
                    })
                }
                    <tr style={{paddingTop: '20px'}}>
                        <td></td>
                        <td></td>
                        <td style={{ fontWeight: '700'}}>Tổng cộng</td>
                        <td style={{ fontWeight: '700'}}>{numberWithCommas(movieMoney + comboMoney)}</td>                       
                    </tr>
                </table>

                <div style={{width: '90%', display: 'flex', flexDirection: 'row-reverse', margin: '90px 0px 50px 0px'}}>
                    <div style={{ border: '1px solid #616161' ,padding: '5px 15px 6px 15px', borderRadius: '5px', marginLeft: '30px',
                        marginRight: '20px', cursor: 'pointer'}} onClick={() => props.history.push('/')}>
                        <p style={{padding: 0, margin: 0, fontSize: '18px', color: '#616161', fontWeight: '400'}}>Hủy</p>
                    </div>
                    <div style={{backgroundColor: '#CE0E2D', padding: '5px 15px 6px 15px', borderRadius: '5px', cursor: 'pointer'}} onClick={handleBook}>
                        <p style={{padding: 0, margin: 0, fontSize: '18px', color: 'white', fontWeight: '500'}}>Thanh toán</p>
                    </div>
                </div>
            </div>
            
        );
    }

    return(
        <div className="booking-container">
            <div className="booking-navbar">
                <div className="outer-stepbar">
                    <div className="stepbar">
                        <div className="stepbar-step stepbar-active"
                        onClick={() => {handleNext(0)}}>
                            <div className="stepbar-circle stepbar-circle-active">
                                <div className="stepbar-small-circle stepbar-small-circle-active"/>
                            </div>
                            <p>Chọn ghế</p>
                        </div>

                        <div className={(step2 > 0)?"stepbar-step stepbar-active": "stepbar-step"}
                        onClick={() => {handleNext(1)}}>
                            <div className={(step2 > 0)?"stepbar-circle stepbar-circle-active":"stepbar-circle"}>
                                <div className={(step2 > 0)?"stepbar-small-circle stepbar-small-circle-active":"stepbar-small-circle"}/>
                            </div>
                            <div className="stepbar-line"/>
                            <div className={(step2 > 0)?"stepbar-line-none stepbar-line-active":"stepbar-line-none"}/>
                            <p style={{ whiteSpace: 'nowrap'}}>Chọn đồ ăn</p>
                        </div>

                        <div className={(step2 > 1)?"stepbar-step stepbar-active": "stepbar-step"}
                        onClick={() => {handleNext(2)}}>
                            <div className={(step2 > 1)?"stepbar-circle stepbar-circle-active":"stepbar-circle"}>
                                <div className={(step2 > 1)?"stepbar-small-circle stepbar-small-circle-active":"stepbar-small-circle"}/>
                            </div>
                            <div className="stepbar-line"/>
                            <div className={(step2 > 1)?"stepbar-line-none stepbar-line-active":"stepbar-line-none"}/>
                            <p style={{ whiteSpace: 'nowrap'}}>Thanh toán</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="booking-content">
                {(showtime && (step < 2))&& <div className="booking-title">
                    <div style={{display: 'block'}}>
                        <div style={{maxWidth: '90vw'}}>
                            <img style={{marginRight: '40px', float: 'left', width: "120px", height: '150px', objectFit: 'cover'}}
                                src={API_URL + showtime.movie.poster}/>

                            <div style={{float: 'left', marginRight: '150px'}}>
                                <p className="movie-info"><span style={{color: '#757575'}}>Phim: </span>
                                    {showtime.movie.title}</p>
                                <p className="movie-info"><span style={{color: '#757575'}}>Rạp: </span>
                                    {showtime.cinema.name}</p>
                                <p className="movie-info"><span style={{color: '#757575'}}>Giờ chiếu: </span>
                                    {`${showtime.time} ngày ${day}`}</p>
                            </div>
                            
                            <div style={{float: 'left'}}>
                                <p className="movie-info"><span style={{color: '#757575'}}>Tiền vé: </span>
                                    {numberWithCommas(movieMoney)}</p>
                                <p className="movie-info"><span style={{color: '#757575'}}>Combo: </span>
                                    {numberWithCommas(comboMoney)}</p>
                                <p className="movie-info"><span style={{color: '#757575'}}>Tổng: </span>
                                    {numberWithCommas(movieMoney + comboMoney)}</p>
                            </div>
                            <div style={{clear: 'both'}}></div>
                        </div>
                    </div>
                </div>}

                {(step === 0)&& <SeatSelect />}
                {((step === 1) && (snack.length > 0))&& <FoodSelect />}
                { (step === 2) && showtime && <BookingPay />}
            </div>

            <div className="booking-button-container">
                {(step>0)&&
                <div className="booking-button" style={(step < 2)?{marginRight: "100px"}:null} onClick={() => {handlePrev()}}>
                    <p className="booking-button-text">Back</p>
                    <div className="booking-button-icon">
                        <HiArrowCircleLeft />
                    </div>
                </div>
                }
                {(step<2)&&
                <div className="booking-button" onClick={() => {handleNext()}}>
                    <p className="booking-button-text">Next</p>
                    <div className="booking-button-icon">
                        <HiArrowCircleRight />
                    </div>
                </div>
                }
            </div>
        </div>
    );
}