import React, {useState, useEffect} from "react";
import {post} from '../../utility/api';
import { authenticationService } from "../../utility/authenticationService";

export default function Admin(props) {

    const [ngay, setNgay] = useState('Ngày');
    const [thang, setThang] = useState('Tháng');
    const [nam, setNam] = useState('Năm');
    const [count, setCount] = useState('');

    const valDay = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    const valMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const [valYear, setValYear] = useState([]);

    useEffect(() => {
        let attempYear = []
        for (let i = 2022; i > 1900; i--) {
            attempYear.push(i.toString());
          }
        setValYear([...attempYear]);

        let today = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"}));
        let singleDay = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let singleMonth = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let day = today.getDate().toString();
        if (singleDay.includes(day)) day = '0' + day;
        let month = (today.getMonth() + 1).toString();
        if (singleMonth.includes(month)) month = '0' + month;
        let year = today.getFullYear().toString();
        setNgay(day);
        setThang(month);
        setNam(year);
        let fullDay = day +'-' + month + '-' + year;

        const postData = async () => {
            let response = await post("/pageviews/get", {date: fullDay}, authenticationService.getAdminToken());
            let json = await response.json();
            if (json.pageview) setCount(json.pageview.count)
            else {
                setCount(0);
            }
          }

        postData();
    }, []);

    const search = async () => {
        let fullDay = ngay + '-' + thang + '-' + nam;
        let response = await post("/pageviews/get", {date: fullDay}, authenticationService.getAdminToken());
        let json = await response.json();
        if (json.pageview) setCount(json.pageview.count)
        else {
            setCount(0);
        }
    }
    return(
        <div style={{margin: '30px 0px 20px 30px'}}>
            <p style={{marginLeft: '10px'}}>Chọn ngày: </p>
                <div className="login-form-input">
                    <div style={{display:'flex', maxWidth: '80vw', flexWrap: 'wrap', alignItems: 'center'}}>
                        <select className="login-form-select" value={ngay}
                        onChange={e => {
                            setNgay(e.target.value);
                            }}>
                            <option>Ngày</option>
                            {
                                valDay.map((item, index) => {
                                    return(
                                        <option key={index}>{item}</option>
                                    )
                                })
                            }
                        </select>
                        <select className="login-form-select" value={thang}
                        onChange={e => {
                            setThang(e.target.value);
                            }}>
                            <option>Tháng</option>
                            {
                                valMonth.map((item, index) => {
                                    return(
                                        <option key={index}>{item}</option>
                                    )
                                })
                            }
                        </select>
                        <select className="login-form-select" style={{marginRight: '30px'}}
                        value={nam} onChange={e => {
                            setNam(e.target.value);
                            }}>
                            <option>Năm</option>
                            {
                                valYear.map((item, index) => {
                                    return(
                                        <option key={index}>{item}</option>
                                    )
                                })
                            }
                        </select>

                    </div>
                </div>

                <button style={{marginLeft: '10px'}} className='dang' onClick={search}>Tìm kiếm</button>

                <p style={{marginLeft: '10px'}}>Số lượng truy cập vào Page: {count}</p>
        </div>
    )
}