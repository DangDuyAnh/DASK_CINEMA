import React, {useEffect, useState} from 'react';
import { API_URL } from '../../config/Constants';
import { get, post } from "../../utility/api";
import { authenticationService } from "../../utility/authenticationService";

const numberT = RegExp(/^[0-9]/);

export default function Detail(props) {
    const [user, setUser] = useState(null);
    const [formError, setFormError] = useState({
        email: '',
        newPassword: '',
        oldPassword: '',
        ten: '',
        phonenumber: '',
        ngaySinh: '',
    });
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [editPassword, setEditPassword] = useState(false);
    const [phonenumber, setPhoneNumber] = useState('');
    const [ten, setTen] = useState('');
    const [ngay, setNgay] = useState('Ngày');
    const [thang, setThang] = useState('Tháng');
    const [nam, setNam] = useState('Năm');
    const [gender, setGender] = useState('Nam');
    const valDay = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    const valMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const [valYear, setValYear] = useState([]);

    useEffect(() => {
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
                setUser(res.data);
                setTen(res.data.ten);
                setPhoneNumber(res.data.phonenumber);
                setGender(res.data.gender);
                setNgay(res.data.birthday.substring(0,2));
                setThang(res.data.birthday.substring(3,5));
                setNam(res.data.birthday.substring(6,10));

            } catch(e) {
                console.log(e)
            }
        }
        getData();
        let attempYear = []
        for (let i = 2022; i > 1900; i--) {
            attempYear.push(i.toString());
          }
        setValYear([...attempYear]);
    }, []);



    const handleChangeUser = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let tempFormError = {...formError};
        switch (name) {
            case "newPassword":
                tempFormError.newPassword =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                setNewPassword(e.target.value);
                break;
            case "phonenumber":
                tempFormError.phonenumber = ((value.length > 8) && (numberT.test(value)))
                ? "" : "Invalid phonenumber";
                setPhoneNumber(e.target.value);
                break;
            case "ten":
                tempFormError.ten = (value.length > 0)
                ? "" : "Name should not be blank";
                setTen(e.target.value);
                break;
            default:
                break;
            }
        setFormError({...tempFormError});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (ngay === 'Ngày' || thang === 'Tháng' || nam === 'Năm') {
            setFormError({...formError, ngaySinh: 'Please select your birthday'});
            return;
        }
        if (oldPassword === '') {
            setFormError({...formError, oldPassword: 'Hãy nhập mật khẩu cũ'});
            return;
        }
        let userObj
        if (editPassword) {
            userObj = {
                currentPassword: oldPassword,
                newPassword: newPassword,
                phonenumber: phonenumber,
                ten: ten,
                birthday: `${ngay}/${thang}/${nam}`,
                gender: gender
            }

        } else {
            userObj = {
                currentPassword: oldPassword,
                phonenumber: phonenumber,
                ten: ten,
                birthday: `${ngay}/${thang}/${nam}`,
                gender: gender
            }
        }

        if ((formError.oldPassword === '') 
        && (formError.phonenumber === '') && (formError.ten === '')
        && (formError.ngaySinh === '')) {
            if (editPassword) {
                if ((formError.newPassword !== '')) return;
            }
            try {
                console.log('hi')
                let res = await post("/users/edit", userObj, authenticationService.getUserToken());
                let json = await res.json();
                if (res.status === 400) setFormError({...formError, oldPassword: 'Mật khẩu không đúng'});
                console.log(res.status)
                if (res.status === 200) {
                    authenticationService.changeUser(json.data);
                    window.location = '/user/account';
                }
            } catch(e) {
                console.log(e);
            }
        }
    }

    return(
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
                                CHI TIẾT TÀI KHOẢN
                            </p>
                        </div>
                        <div style={{position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '2px'}}
                            onClick={() => {window.location = '/user/history'}}>
                            <canvas
                                className="otherCanvas"
                                width="232"
                                height="34"
                            >
                                Your browser does not support the HTML canvas tag.
                            </canvas>
                            <p style={{position: 'absolute', margin: '0px 0px 0px 25px', padding: 0, zIndex: 1, color: '#616161',
                                fontSize: '14px', fontWeight: 'bold'}}>
                                LỊCH SỬ GIAO DỊCH
                            </p>
                        </div>
                    </div>

                    {user&&<div style={{flex: '1'}}>
                        <div style={{width: '100%', backgroundColor: 'black', margin: 0, padding: 0}}>
                            <p style={{color: 'white', textAlign: 'center', fontSize: '22px', padding: '5px 0px', margin: 0}}>THAY ĐỔI THÔNG TIN</p>
                        </div>

                        <div style={{marginTop: '10px', display: 'flex', justifyContent: 'center'}}>
                            <form className="login-form" onSubmit={handleSubmit}>
                                <p>Tên:</p>
                                <input required type="text" name="ten" onChange={e => handleChangeUser(e)} value={ten}/>
                                {(formError.ten !== '')&&<span className="errorMessage">{formError.ten}</span>}
                                <p>Số điện thoại:</p>
                                <input required type="text" name="phonenumber" onChange={e => handleChangeUser(e)} value={phonenumber}/>
                                {(formError.phonenumber !== '')&&<span className="errorMessage">{formError.phonenumber}</span>}

                                <p>Ngày sinh: </p>
                                <div className="login-form-input">
                                    <div style={{display:'flex', maxWidth: '80vw', flexWrap: 'wrap', alignItems: 'center'}}>
                                        <select className="login-form-select" value={ngay}
                                            onChange={e => {
                                                setNgay(e.target.value);
                                                setFormError({...formError, ngaySinh: ''});}}>
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
                                            setFormError({...formError, ngaySinh: ''});
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
                                            setFormError({...formError, ngaySinh: ''});
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
                                    <div style={{display:'flex', maxWidth: '80vw', flexWrap: 'wrap', alignItems: 'center'}}>
                                        <div className="login-circle" onClick={() => setGender('Nam')}>
                                            {(gender==='Nam')&&<div className="login-circle-inner"/>}
                                        </div>
                                        <h1 style={{margin: 0, padding: 0, fontSize: 16, fontWeight: '500', marginRight: '20px'}}>Nam</h1>
                                        <div className="login-circle" onClick={() => setGender('Nữ')}>
                                            {(gender==='Nữ')&&<div className="login-circle-inner"/>}
                                        </div>
                                        <h1 style={{margin: 0, padding: 0, fontSize: 16, fontWeight: '500'}}>Nữ</h1>
                                    </div>
                                    {(formError.ngaySinh !== '')&&<span className="errorMessage">{formError.ngaySinh}</span>}
                                    <p style={{marginTop: '20px'}}>Mật khẩu cũ: </p>
                                    <input required type="password" name="oldPassword" value={oldPassword} onChange={e => {
                                        setOldPassword(e.target.value);
                                        setFormError({...formError, oldPassword: ''});
                                        }}/>
                                    {(formError.oldPassword !== '')&&<span className="errorMessage">{formError.oldPassword}</span>}
                                    <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                                        <input type="checkbox" checked={editPassword} style={{width: 'inherit'}} onClick={() => setEditPassword(!editPassword)}/>
                                        <p style={{width: 'inherit', margin: 0, padding: 0, fontSize: '14px', fontWeight: '400'}}>Tôi muốn thay đổi mật khẩu</p>
                                    </div>
                                    {editPassword && <div>
                                        <p style={{marginTop: '10px'}}>Mật khẩu mới: </p>
                                        <input required type="password" name="newPassword" onChange={e => handleChangeUser(e)} value={newPassword}/>
                                        {(formError.newPassword !== '')&&<span className="errorMessage">{formError.newPassword}</span>}
                                    </div>}
                                </div>

                                <button type="submit" className='login-form-button'>
                                    LƯU LẠI
                                </button>
                            </form>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}