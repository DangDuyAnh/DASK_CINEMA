import styles from './index.module.css';
import axios from 'axios';
import { useState } from 'react';

export default function Register(){
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);

  const onChangeUser = e => {
    setUser(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const acc = {
      email: user,
      password: password
    }
    console.log(acc);

    axios.post('http://localhost:5000/register', acc)
      .then( res => {
        if (res.data.length === "User added!") {
          alert("Erroee")
        }
        else {
          alert("Register success")
        } 
      });
    };

    return(
      <div className = {styles.container}>
        <form onSubmit = {handleSubmit}>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                required
                placeholder="User"
                onChange={onChangeUser}
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                required
                placeholder="Password"
                type="password"
                name="password"
                onChange={onChangePassword}
              />
            </div>
            <div className= {styles.createAccount}>
              <button type="submit">Đăng ký</button>
            </div>

          </form>
          </div>
    )
}