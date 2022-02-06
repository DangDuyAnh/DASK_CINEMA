import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

import Home from "./routes/home";
import MovieList from './routes/movies-list';
import Movie from './routes/movie';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import PageNotFound from './routes/page-not-found';
import Booking from './routes/booking';
import Snacks from './routes/snacks';
import Login from './routes/login/Login';
import Register from './routes/login/Register';
import Cinema from './routes/cinema';
import User from './routes/users';
import Admin from './routes/admin';
import {post} from './utility/api';
import { authenticationService } from './utility/authenticationService';
import {PrivateRoute, NestedPrivateRoute, AdminRoute} from './components/private-route';
function App() {
  useEffect(() => {
    let today = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"}));
    let singleDay = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let singleMonth = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let day = today.getDate().toString();
    if (singleDay.includes(day)) day = '0' + day;
    let month = (today.getMonth() + 1).toString();
    if (singleMonth.includes(month)) month = '0' + month;
    let year = today.getFullYear().toString();
    let fullDay = day +'-' + month + '-' + year;

    const postData = async () => {
      await post("/pageviews/plusCount", {date: fullDay});
    }
    postData();
  }, []);
  return (
    <>
    <Router>
      <div id="app-container">
        <Navbar />
          <div id="app-main-content">
            <Switch>
              <Route path='/' exact component={Home} /> 
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/do-an-vat' component={Snacks} />
              <Route path='/phim-dang-chieu/' movieList = "phim-dang-chieu" component={() => (<MovieList movieList="phim-dang-chieu" />)}/>
              <Route path='/phim-sap-chieu/' movieList = "phim-sap-chieu" component={() => (<MovieList movieList="phim-sap-chieu" />)}/>
              <Route path='/phim/:id' component={Movie}/>
              <AdminRoute path='/admin' component={Admin}/>
              <PrivateRoute path='/booking/:id' component={Booking} />
              <Route path='/he-thong-rap'>
                <Cinema />
              </Route>
              <NestedPrivateRoute path='/user'>
                <User />
              </NestedPrivateRoute>
              <Route path='/404' component={PageNotFound} />
              <Redirect to='/404' />
            </Switch>
          </div>
        <Footer />
      </div>
    </Router>
    </>    
  );
}

export default App;
