import './App.css';
import React, { useState } from 'react';
import NavBar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

const App = () => {

  const pageSize = 5; 
  const apiKey = "69ac1739742646f081622e3248e083c3";
  const [progress, setProgress] = useState(0);

  const setprog = (progress) => {
    setProgress(progress);
  }

    return (
        <Router>
          <NavBar />
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route exact path='/'              element={<News setprog={setprog} key="home"          apiKey={apiKey} pageSize={pageSize} country="in" category="general" />} />
            <Route exact path='/business'      element={<News setprog={setprog} key="business"      apiKey={apiKey} pageSize={pageSize} country="in" category="business" />} />
            <Route exact path='/entertainment' element={<News setprog={setprog} key="entertainment" apiKey={apiKey} pageSize={pageSize} country="in" category="entertainment" />} />
            <Route exact path='/health'        element={<News setprog={setprog} key="health"        apiKey={apiKey} pageSize={pageSize} country="in" category="health" />} />
            <Route exact path='/science'       element={<News setprog={setprog} key="science"       apiKey={apiKey} pageSize={pageSize} country="in" category="science" />} />
            <Route exact path='/sports'        element={<News setprog={setprog} key="sports"        apiKey={apiKey} pageSize={pageSize} country="in" category="sports" />} />
            <Route exact path='/technology'    element={<News setprog={setprog} key="technology"    apiKey={apiKey} pageSize={pageSize} country="in" category="technology" />} />
          </Routes>
        </Router>
    );
  
}

export default App;






