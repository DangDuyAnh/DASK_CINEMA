
import React, {useState, useEffect} from "react";
import './index.css';
import { post } from "../../utility/api";

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  
  const numberT = RegExp(/^[0-9]/);


export default function Login(props) {

    const [formError, setFormError] = useState({
        email: '',
        password: '',
        ten: '',
        phonenumber: '',
        ngaySinh: '',
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [ten, setTen] = useState('');
    const [ngay, setNgay] = useState(null);
    const [thang, setThang] = useState(null);
    const [nam, setNam] = useState(null);
    const [ngaySinh, setNgaySinh] = useState('');
    const [gender, setGender] = useState(null);
    const valDay = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    const valMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const [valYear, setValYear] = useState([]);

    const handleLogin = async () => {
        const user = {
            email: email,
            password: password,
            phonenumber: phonenumber,
            ten: ten,
            birthDay: ngaySinh,
            gender: gender
        }

        if ((formError.email === '') && (formError.password === '') 
        && (formError.phonenumber === '') && (formError.ten === '')
        && (formError.birthDay === '') && (formError.gender === '')) {

            try {
                let res = await post("/api/users/register", user);
                if (res.status === 400) setFormError({...formError, email: 'This email existed'});
                else props.history.push('/')
            } catch(e) {
                console.log(e);
            }
        }
    }

    const handleChangeUser = e => {
        // e.preventDefault();
        const { name, value } = e.target;
        let tempFormError = {...formError};
        switch (name) {
            case "email": 
                tempFormError.email = emailRegex.test(value)
                ? ""
                : "invalid email address";
                break;
            case "password":
                tempFormError.password =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            case "phonenumber":
                tempFormError.phonenumber = ((value.length > 8) && (numberT.test(value)))
                ? "" : "số điện thoại không hợp lệ";
                break;
            case "ten":
                tempFormError.ten = (value.length > 0)
                ? "" : "Tên không nên để trống";
                break;
            case "ngaySinh":
                tempFormError.ngaySinh = (ngay === null || thang === null || nam === null || gender === null)
                ? "Hãy điền đầy đủ thông tin" : "";
                break;
            default:
                break;
            }
        setEmail(e.target.value);
        setFormError({...tempFormError});
    }

    const LoginForm = () => {
        return (
        <form className="login-form">
            <div className="login-form-error">
                <p>
                Email hoặc mật khẩu không đúng
                </p>
            </div>
            <p>Email:</p>
            <input />
            <p style={{marginTop: "10px"}}>Mật khẩu: </p>
            <input type="password"/>

            <div className='login-form-button'>
                <p>
                    ĐĂNG NHẬP
                </p>
            </div>
        </form>
        );
    } 

    const RegisterForm = () => {
        return (
            <form className="login-form">
                <p>Email:</p>
                <input type="email" name="email" onChange={e => handleChangeUser(e)} value={email}/>
                {(formError.email !== '')&&<span className="errorMessage">{formError.email}</span>}
                <p>Tên:</p>
                <input />
                <p>Số điện thoại:</p>
                <input />
                <p>Mật khẩu: </p>
                <input type="password"/>
                <p>Ngày sinh: </p>
                <div className="login-form-input">
                    <div style={{display:'flex', maxWidth: '80vw', flexWrap: 'wrap', alignItems: 'center'}}>
                        <select className="login-form-select">
                            <option>Ngày</option>
                            {
                                valDay.map((item, index) => {
                                    return(
                                        <option key={index}>{item}</option>
                                    )
                                })
                            }
                        </select>
                        <select className="login-form-select">
                            <option>Tháng</option>
                            {
                                valMonth.map((item, index) => {
                                    return(
                                        <option key={index}>{item}</option>
                                    )
                                })
                            }
                        </select>
                        <select className="login-form-select" style={{marginRight: '30px'}}>
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
                        <div className="login-circle"/>
                        <h1 style={{margin: 0, padding: 0, fontSize: 16, fontWeight: '500', marginRight: '20px'}}>Nam</h1>
                        <div className="login-circle"/>
                        <h1 style={{margin: 0, padding: 0, fontSize: 16, fontWeight: '500'}}>Nữ</h1>
                    </div>
                </div>

                <div className='login-form-button'>
                    <p>
                        ĐĂNG KÝ
                    </p>
                </div>
            </form>
        );
    }

    useEffect(() => {
        let attempYear = []
        for (let i = 2022; i > 1900; i--) {
            attempYear.push(i.toString());
          }
        setValYear([...attempYear]);
    }, []);

    return(
        <div style={{display: 'flex', flex: 1, width: '100%', justifyContent: 'center'}}>
            <div style={{marginTop: '40px'}}>
                <div className="login-bar">
                    <a href={(props.mode === "register")&&"/login"} 
                    className={(props.mode === "login")?
                    "login-bar-text login-bar-text-active":"login-bar-text"}>ĐĂNG NHẬP</a>
                    <a href={(props.mode === "login")&&"/register"} 
                    className={(props.mode === "register")?
                    "login-bar-text login-bar-text-active":"login-bar-text"}>ĐĂNG KÝ</a>
                </div>

                <form className="login-form">
                    <p>Email:</p>
                    <input type="email" name="email" onChange={e => handleChangeUser(e)} value={email}/>
                    {(formError.email !== '')&&<span className="errorMessage">{formError.email}</span>}
                    <p>Tên:</p>
                    <input />
                    <p>Số điện thoại:</p>
                    <input />
                    <p>Mật khẩu: </p>
                    <input type="password"/>
                    <p>Ngày sinh: </p>
                    <div className="login-form-input">
                        <div style={{display:'flex', maxWidth: '80vw', flexWrap: 'wrap', alignItems: 'center'}}>
                            <select className="login-form-select">
                                <option>Ngày</option>
                                {
                                    valDay.map((item, index) => {
                                        return(
                                            <option key={index}>{item}</option>
                                        )
                                    })
                                }
                            </select>
                            <select className="login-form-select">
                                <option>Tháng</option>
                                {
                                    valMonth.map((item, index) => {
                                        return(
                                            <option key={index}>{item}</option>
                                        )
                                    })
                                }
                            </select>
                            <select className="login-form-select" style={{marginRight: '30px'}}>
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
                            <div className="login-circle"/>
                            <h1 style={{margin: 0, padding: 0, fontSize: 16, fontWeight: '500', marginRight: '20px'}}>Nam</h1>
                            <div className="login-circle"/>
                            <h1 style={{margin: 0, padding: 0, fontSize: 16, fontWeight: '500'}}>Nữ</h1>
                        </div>
                    </div>

                    <div className='login-form-button'>
                        <p>
                            ĐĂNG KÝ
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}