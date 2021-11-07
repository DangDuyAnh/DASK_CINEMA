import styles from './index.module.css';
import axios from 'axios';
import { useState } from 'react';

export default function Login(){
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

    axios.post('http://localhost:5000/login', acc)
      .then( res => {
        if (res.data.length === 0) {
          alert("Acc not exist")
        }
        else {
          alert("Login succesful")
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
              <button type="submit">Đăng nhập</button>
            </div>

          </form>
          </div>
    )
}