import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Home from "./routes/home";
import MovieList from './routes/movies-list';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

import Snacks from './routes/snacks';

function App() {
  return (
    <>
    <Router>
      <div id="app-container">
        <Navbar />
          <div id="app-main-content">
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/phim-dang-chieu/' component={MovieList}/>
              <Route path='/do-an-vat' component={Snacks} />
            </Switch>
          </div>
        <Footer />
      </div>
    </Router>
    </>    
  );
}

export default App;
