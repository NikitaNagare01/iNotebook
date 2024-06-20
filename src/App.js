
import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';

import {
  BrowserRouter as Router,

  Route,

  Routes,

} from "react-router-dom";
import NoteState from './Context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';



function App() {

  const[alert, setalert]=useState(null);

  const showAlert=(message, type)=>{
    setalert({msg:message, type:type});
    setTimeout(()=>{
      setalert(null);
    }, 2000);
  }

  return (
    <div className="App">
          <NoteState>
            

              <Navbar />
              {/* <Alert message="This is a amazing project"/> */}
                <Alert alert={alert}/>
                <Routes>

                  {/* <Route index element={<Navbar title="TEXTUtils" mo={mode} togglemode={togglemode}/>}/> */}
                  <Route exact path="/Home" element={<Home showAlert={showAlert}/>}/>
                  <Route exact path="/About" element={<About/>}/>
                  <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
                  <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
                  
                  {/* <TextForm heading="Enter your text here"  mo={mode} showalert={showalert}/> */}



                </Routes>
           
          </NoteState>
    </div>
  );
}

export default App;
