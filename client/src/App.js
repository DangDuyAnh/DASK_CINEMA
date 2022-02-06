import React from 'react';
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
import {PrivateRoute, NestedPrivateRoute} from './components/private-route';
function App() {
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
