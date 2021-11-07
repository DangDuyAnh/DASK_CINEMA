import { useState } from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Login from './Login';
import Register from './Register';
import './index.module.css';

export default function LoginRegister(){

    const [tab, setTab] = useState(0);
    const handleChange = (e, newVal) => {
        setTab(newVal);
    };

    return(
        <div className = "styles.container">

            <Paper square>
                <Tabs
                    onChange={handleChange}
                    variant="fullWidth"
                    value={tab}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="Đăng nhập" />
                    <Tab label="Đăng ký" />
                </Tabs>
            </Paper>
                {tab === 0 && (
                    <Login
                    />
                )}
                {tab === 1 && (
                    <Register></Register>
                )}
        </div>
    );

}
