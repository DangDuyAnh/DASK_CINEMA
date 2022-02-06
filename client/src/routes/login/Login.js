
import React, {useState, useEffect} from "react";
import './index.css';
import { post } from "../../utility/api";
import { useHistory, useLocation, Link } from "react-router-dom";
import { authenticationService } from "../../utility/authenticationService";

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  
  const numberT = RegExp(/^[0-9]/);


export default function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    let history = useHistory();
    let location = useLocation();

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = {
            email: email,
            password: password,
        }

            try {
                let res = await post("/users/login", user);
                if (res.status === 400) setError(true);
                if (res.status === 200) {
                    let json = await res.json();
                    authenticationService.login(json.user, json.token);
                    if (props.location.backURL && props.location.backURL.toString() !== '/login') {
                        window.location = props.location.backURL.toString();
                    } else {
                        window.location = '/';
                    }
                }
            } catch(e) {
                console.log(e);
            }
    }

    useEffect(() => {
        console.log(props.location.backURL);
        if (authenticationService.getUserToken()) {
            window.location = '/';
        }
        else setLoaded(true);
    }, []);

    return(
        <>
        {loaded?
        <div style={{display: 'flex', flex: 1, width: '100%', justifyContent: 'center'}}>
            <div style={{marginTop: '40px'}}>
                <div className="login-bar">
                    <a className="login-bar-text login-bar-text-active">ĐĂNG NHẬP</a>
                    <Link style={{textDecoration: 'none'}} className="login-bar-text" to={{pathname: "/register", backURL: props.location.backURL}}>
                    <a>
                        ĐĂNG KÝ
                    </a>
                    </Link>
                </div>

                <form className="login-form" onSubmit={handleLogin}>
                    {error&&<div className="login-form-error">
                        <p>
                        Email hoặc mật khẩu không đúng
                        </p>
                    </div>}
                    <p>Email:</p>
                    <input required type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <p style={{marginTop: "10px"}}>Mật khẩu: </p>
                    <input required type="password" value={password} onChange={e => setPassword(e.target.value)}/>

                    <button type="submit" className='login-form-button'>
                        ĐĂNG NHẬP
                    </button>
                </form>
            </div>
        </div>
        :null
        }
        </>
    );
}