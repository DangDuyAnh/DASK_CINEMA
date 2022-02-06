import React, {useEffect, useState} from 'react';
import { API_URL } from '../../config/Constants';
import { get, post } from "../../utility/api";
import { authenticationService } from "../../utility/authenticationService";

export default function Account(props) {
    const [user, setUser] = useState(null);

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
                setUser(res.data)
            } catch(e) {
                console.log(e)
            }
        }
        getData();
    }, []);

    const changeImage = async (event) => {
        console.log(event.target);
        if (event.target.files.length > 0) {
            const formData = new FormData();
            formData.append("images", event.target.files[0]);
            try {
                const response = await fetch(API_URL+'/api/users/changeAvatar', {
                  method: 'POST',
                  headers: {
                    // // Accept: "application/x-www-form-urlencoded",
                    // 'Content-Type': 'multipart/form-data',
                    // Accept: "application/json",
                    Authorization: `Bearer ${authenticationService.getUserToken()}`,
                  },
                  body: formData,
                });
                const json = await response.json();
                setUser(json.user)
                authenticationService.changeUser(json.user)
              } catch (error) {
                console.log(error);
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
                            <p style={{color: 'white', textAlign: 'center', fontSize: '22px', padding: '5px 0px', margin: 0}}>THÔNG TIN CHUNG</p>
                        </div>

                        <div style={{display: 'flex', flexWrap: 'wrap', marginTop: '20px'}}>
                            <div style={{display: 'flex', flexDirection: 'column', marginRight: '40px', alignItems: 'center'}}>
                                <img src={API_URL + user.avatar} style={{borderRadius: '5px', width: '150px', height: '150px'
                                    , objectFit: 'cover', border: '1px solid black'}}/>
                                <input onChange={changeImage} type='file' id='file' accept=".jpg, .jpeg, .png" style={{display: 'none'}} />
                                <label for='file' style={{margin: '10px 0px', backgroundColor: "#757575"
                                , color: 'white', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer'}}>Thay đổi</label>
                            </div>
                            <div>
                                <p style={{margin: 0, padding: 0, fontWeight: '700', fontSize: '18px', marginBottom: '20px'}}>Thông tin tài khoản</p>
                                <p className='account-info'><span style={{color: '#757575'}}>Tên: </span>{user.ten}</p>
                                <p className='account-info'><span style={{color: '#757575'}}>Email: </span>{user.email}</p>
                                <p className='account-info'><span style={{color: '#757575'}}>Số điện thoại: </span>{user.phonenumber}</p>
                                <p className='account-info'><span style={{color: '#757575'}}>Giới tính: </span>{user.gender}</p>
                                <p className='account-info'><span style={{color: '#757575'}}>Ngày sinh: </span>{user.birthday}</p>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}