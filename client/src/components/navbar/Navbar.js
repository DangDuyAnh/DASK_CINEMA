import React, {useEffect, useState} from 'react';
import './Navbar.css';
import {IoPerson} from "react-icons/io5";
import {GiTicket, GiWallet, GiFilmSpool} from "react-icons/gi";
import { IconContext } from "react-icons";
import { MdArrowDropDown, MdArrowRight} from "react-icons/md";
import { Link } from 'react-router-dom';
import { authenticationService } from "../../utility/authenticationService";

export default function Navbar(props){

    const [openMenu, setOpenMenu] = useState(false);
    const [menuButton, setMenuButton] = useState([false, false, false]);
    const [width, setWindowWidth] = useState(0);
    const [user, setUser] = useState(authenticationService.getUser());

    const logout = () => {
        authenticationService.logout();
        setUser(null);
    }

    useEffect(() => {
        setUser(authenticationService.getUser());
        updateDimensions();

        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
        }, [props.history]);

    const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
    };

    const changeMenuButton = (index) => {
        let newMenuButton = menuButton;
        newMenuButton[index] = !menuButton[index];
        setMenuButton([...newMenuButton]);
    };

    const MediumNavbar = 
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
                    <IconContext.Provider value={{ size: "24px"}}>
                    <div className= {!openMenu?"Navbar-menu-content":"Navbar-menu-content active-menu"}>
                        <div>
                            <div style={{paddingTop: 15}} className={(menuButton[0])?"Navbar-menu-item Navbar-menu-active":"Navbar-menu-item"}
                                onClick = {() => changeMenuButton(0)}>
                                <div className="Navbar-logo-icon">
                                {(menuButton[0])?<MdArrowDropDown />:<MdArrowRight />}
                                </div>
                                <a>LỊCH CHIẾU</a>
                            </div>
                            {((menuButton[0]))&&<div className="Navbar-menu-small">
                                <div className="phim-dang-chieu">
                                    <a href='/phim-dang-chieu'>Phim đang chiếu</a>
                                </div>
                                <div className="phim-dang-chieu">
                                    <a href='/phim-sap-chieu'>Phim sắp chiếu</a>
                                </div>
                            </div>}
                        </div>

                            <div className="Navbar-menu-item">
                                <div className="Navbar-logo-icon">
                                    <MdArrowRight />
                                </div>
                                <a href="/he-thong-rap">HỆ THỐNG RẠP</a>
                            </div>

                            <div className="Navbar-menu-item" style={{borderBottom: 0}}>
                                <div className="Navbar-logo-icon">
                                    <MdArrowRight />
                                </div>
                                <a href="/do-an-vat">QUẦY ONLINE</a>
                            </div>
                            <div className="Navbar-menu-item" style={{borderBottom: 0}}>
                                <div className="Navbar-logo-icon">
                                    <MdArrowRight />
                                </div>
                                <a href="/404">TIN TỨC</a>
                            </div>
                            <div className="Navbar-menu-item" style={{borderBottom: 0}}>
                                <div className="Navbar-logo-icon">
                                    <MdArrowRight />
                                </div>
                                <a href="/user/history">VÉ CỦA TÔI</a>
                            </div>

                    </div>
                    </IconContext.Provider>
                </div>

                <div className="Navbar-wrapper extra">
                    <Link style={{textDecoration: 'none'}} to='/phim-dang-chieu'>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        <div className="Navbar-logo-icon">
                            <GiWallet />
                        </div>
                        <p className="Navbar-logo-description">Mua vé</p>
                    </div>
                    </Link>
                </div>

            </div>

            <div className="Navbar-logo" onClick={() => window.location='/'}>
                <p>DASK</p>
                <p>CINEMA</p>
            </div>

            <div>
                <Link style={{textDecoration: 'none'}} to='/user/history'>
                <div className="Navbar-wrapper extra">
                    <div className="Navbar-logo-icon">
                        <GiTicket />
                    </div>
                    <p className="Navbar-logo-description">Vé của tôi</p>
                </div>
                </Link>

                <Link style={{textDecoration: 'none', cursor: 'context-menu'}} to={user?{pathname: window.location.pathname}:{pathname: "/login", backURL: window.location.pathname}}>
                <div className="Navbar-wrapper">
                    <div className={user?"Navbar-logo-icon-special":"Navbar-logo-icon"}>
                        <IoPerson />
                    </div>
                    {user?<p className="Navbar-logo-description-special"><span className="Navbar-logo-description-span" onClick={() => {window.location='/user/account'}}>{user.ten}</span> | <span className="Navbar-logo-description-span" onClick={logout}>Thoát</span></p>
                    :<p className="Navbar-logo-description">Đăng nhập</p>}
                </div>
                </Link>
            </div>
        </div>
    </IconContext.Provider>

    const LargeNavbar = 
    <IconContext.Provider value={{ size: "25px"}}>
        <div className="Navbar-navbar" style = {{alignItems:'start'}}> 
            <div className="dask">
                <a className="dask" href="/">DASK</a>
                    <div className="Navbar-logo-icon" style={{paddingLeft: 20}}>
                <GiFilmSpool />
                    </div>
            </div>

            <ul className='Navbar-tab'>
                <li className="Navbar-dropdown">
                    <a className="Navbar-dropbtn">PHIM</a>
                    <div className="dropdown-content">
                        <a href="/phim-dang-chieu/">PHIM ĐANG CHIẾU</a>
                        <a href="/phim-sap-chieu/">PHIM SẮP CHIẾU</a>
                    </div>
                </li>
                <li className="Navbar-dropdown">
                    <a href='/he-thong-rap' className="Navbar-dropbtn">HỆ THỐNG RẠP</a>
                </li>
                <li >
                <a href="/do-an-vat/">QUẦY ONLINE</a>
                </li>
                <li><a href='/404'>TIN TỨC</a></li>
                <li><a href='/user/history'>VÉ CỦA TÔI</a></li>
            </ul>

            <Link style={{textDecoration: 'none', cursor: 'context-menu'}} to={user?{pathname: window.location.pathname}:{pathname: "/login", backURL: window.location.pathname}}>
            <div className="dang-nhap"> 
                <div className={user?"Navbar-logo-icon-special":"Navbar-logo-icon"}>
                    <IoPerson />
                </div>
                {user?<p><span className="Navbar-logo-description-span" onClick={() => {window.location='/user/account'}}>{user.ten}</span> | <span className="Navbar-logo-description-span" onClick={logout}>Thoát</span></p>
                :<p className="dang-nhap-p">ĐĂNG NHẬP</p>
                }
            </div>
            </Link>

        </div>
    </IconContext.Provider>

    return(
        <div>
            {(width>1050)?LargeNavbar:MediumNavbar}
        </div>
    )
}