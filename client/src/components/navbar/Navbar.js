import React, {useEffect, useState} from 'react';
import './Navbar.css';
import {IoPerson} from "react-icons/io5";
import {GiTicket, GiWallet, GiFilmSpool} from "react-icons/gi";
import { IconContext } from "react-icons";
import { MdArrowDropDown, MdArrowRight} from "react-icons/md";

export default function Navbar(){

    const [openMenu, setOpenMenu] = useState(false);
    const [menuButton, setMenuButton] = useState([false, false, false]);
    const [width, setWindowWidth] = useState(0);

    useEffect(() => {
        updateDimensions();

        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
        }, []);

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
                                <a href="#">LỊCH CHIẾU</a>
                            </div>
                            {((menuButton[0]))&&<div className="Navbar-menu-small">
                                <div className="phim-dang-chieu">
                                    <a>Phim đang chiếu</a>
                                </div>
                                <div className="phim-dang-chieu">
                                    <a>Phim sắp chiếu</a>
                                </div>
                            </div>}
                        </div>

                            <div className="Navbar-menu-item">
                                <div className="Navbar-logo-icon">
                                    <MdArrowRight />
                                </div>
                                <a href="#">HỆ THỐNG RẠP</a>
                            </div>

                            <div className="Navbar-menu-item" style={{borderBottom: 0}}>
                                <div className="Navbar-logo-icon">
                                    <MdArrowRight />
                                </div>
                                <a href="#">ĐỒ ĂN</a>
                            </div>

                    </div>
                    </IconContext.Provider>
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
                        <a>PHIM SẮP CHIẾU</a>
                    </div>
                </li>
                <li className="Navbar-dropdown">
                    <a className="Navbar-dropbtn">HỆ THỐNG RẠP</a>
                    <div className="dropdown-content">
                        <a>TEST 1</a>
                        <a>TEST 2</a>
                    </div>
                </li>
                <li >
                <a href="/do-an-vat/">ĐỒ ĂN</a>
                </li>
                <li><a>TIN TỨC</a></li>
                <li><a>VÉ CỦA TÔI</a></li>
            </ul>

            <div className="dang-nhap"> 
            <div className="Navbar-logo-icon">
                <IoPerson />
            </div>
            <p className="dang-nhap-p">ĐĂNG NHẬP</p>
            </div>
        </div>
    </IconContext.Provider>

    return(
        <div>
            {(width>1050)?LargeNavbar:MediumNavbar}
        </div>
    )
}