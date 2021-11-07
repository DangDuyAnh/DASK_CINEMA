import React, {useState} from 'react';
import './Navbar.css';
import {IoPerson} from "react-icons/io5";
import {GiTicket, GiWallet} from "react-icons/gi";
import { IconContext } from "react-icons";

export default function Navbar(){

    const [openMenu, setOpenMenu] = useState(false);
    return(
        <IconContext.Provider value={{ size: "25px"}}>
            <div className="Navbar-navbar"> 
                <div style={{ display: "flex"}} >
                    <div>
                        <div className = "Navbar-menu" onClick={() => {
                            setOpenMenu(!openMenu);
                        }}>
                            <div>
                                <div className = "Navbar-burger">
                                    <div className={!openMenu?"Navbar-line":"Navbar-line change-line1"}/>
                                    <div className={!openMenu?"Navbar-line":"Navbar-line change-line2"}/>
                                    <div className={!openMenu?"Navbar-line":"Navbar-line change-line3"}/>
                                </div>
                                <p className="Navbar-menu-title">MENU</p>
                            </div>
                        </div>
                        <div className= {!openMenu?"Navbar-menu-content":"Navbar-menu-content active-menu"}>
                            <a href="#">LỊCH CHIẾU</a>
                            <a href="#">HỆ THỐNG RẠP</a>
                            <a href="#">ĐỒ ĂN</a>
                        </div>
                    </div>

                    <div className="Navbar-wrapper extra">
                        <div className="Navbar-logo-icon">
                            <GiWallet />
                        </div>
                        <p className="Navbar-logo-description">Mua vé</p>
                    </div>
                </div>

                <div className="Navbar-logo">
                    <p>DASK</p>
                    <p>CINEMA</p>
                </div>

                {/* <div style={{marginRight: "5px", display: "flex"}}> */}
                <div>
                    <div className="Navbar-wrapper extra">
                        <div className="Navbar-logo-icon">
                            <GiTicket />
                        </div>
                        <p className="Navbar-logo-description">Vé của tôi</p>
                    </div>

                    <div className="Navbar-wrapper">
                        <div className="Navbar-logo-icon">
                            <IoPerson />
                        </div>
                        <p className="Navbar-logo-description">Đăng nhập</p>
                    </div>
                </div>
            </div>
        </IconContext.Provider>
    )
}