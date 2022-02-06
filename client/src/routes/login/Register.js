
import React, {useState, useEffect} from "react";
import './index.css';
import { post } from "../../utility/api";
import { authenticationService } from "../../utility/authenticationService";
import { useHistory, useLocation, Link } from "react-router-dom";

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  
  const numberT = RegExp(/^[0-9]/);


export default function Login(props) {

    let history = useHistory();
    let location = useLocation();

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
    const [ngay, setNgay] = useState('Ngày');
    const [thang, setThang] = useState('Tháng');
    const [nam, setNam] = useState('Năm');
    const [gender, setGender] = useState('Nam');
    const valDay = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    const valMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const [valYear, setValYear] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (ngay === 'Ngày' || thang === 'Tháng' || nam === 'Năm') {
            setFormError({...formError, ngaySinh: 'Please select your birthday'});
            return;
        }
        const user = {
            email: email,
            password: password,
            phonenumber: phonenumber,
            ten: ten,
            birthday: `${ngay}/${thang}/${nam}`,
            gender: gender
        }
        console.log(user);

        if ((formError.email === '') && (formError.password === '') 
        && (formError.phonenumber === '') && (formError.ten === '')
        && (formError.ngaySinh === '')) {
            try {
                let res = await post("/users/register", user);
                let json = await res.json();
                if (res.status === 400) setFormError({...formError, email: 'This email existed'});
                console.log(res.status)
                if (res.status === 201) {
                    console.log('yeah')
                    authenticationService.login(json.user, json.token);
                    if (props.location.backURL && props.location.backURL.toString() !== '/register') {
                        window.location = props.location.backURL.toString();
                    } else {
                        window.location = '/';
                    }
                }
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
                setEmail(e.target.value);
                break;
            case "password":
                tempFormError.password =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                setPassword(e.target.value);
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

    useEffect(() => {
        if (authenticationService.getUserToken()) {
            window.location = '/';
        }
        else setLoaded(true);
        let attempYear = []
        for (let i = 2022; i > 1900; i--) {
            attempYear.push(i.toString());
          }
        setValYear([...attempYear]);
    }, []);

    return(
        <>
        {loaded?
        <div style={{display: 'flex', flex: 1, width: '100%', justifyContent: 'center'}}>
            <div style={{marginTop: '40px'}}>
                <div className="login-bar">
                    <Link style={{textDecoration: 'none'}} className="login-bar-text" to={{pathname: "/login", backURL: props.location.backURL}}>
                    <a>ĐĂNG NHẬP</a>
                    </Link>
                    <a className="login-bar-text login-bar-text-active">ĐĂNG KÝ</a>
                </div>

                <form className="login-form" onSubmit={handleRegister}>
                    <p>Email:</p>
                    <input required type="email" name="email" onChange={e => handleChangeUser(e)} value={email}/>
                    {(formError.email !== '')&&<span className="errorMessage">{formError.email}</span>}
                    <p>Tên:</p>
                    <input required type="text" name="ten" onChange={e => handleChangeUser(e)} value={ten}/>
                    {(formError.ten !== '')&&<span className="errorMessage">{formError.ten}</span>}
                    <p>Số điện thoại:</p>
                    <input required type="text" name="phonenumber" onChange={e => handleChangeUser(e)} value={phonenumber}/>
                    {(formError.phonenumber !== '')&&<span className="errorMessage">{formError.phonenumber}</span>}
                    <p>Mật khẩu: </p>
                    <input required type="password" name="password" onChange={e => handleChangeUser(e)} value={password}/>
                    {(formError.password !== '')&&<span className="errorMessage">{formError.password}</span>}
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
                    </div>
                    {(formError.ngaySinh !== '')&&<span className="errorMessage">{formError.ngaySinh}</span>}

                    <button type="submit" className='login-form-button'>
                        ĐĂNG KÝ
                    </button>
                </form>
            </div>
        </div>
        :null}
        </>
    );
}