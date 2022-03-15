import './App.css';
import '@mui/material';
import Login from './components/Login';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import TiltyardList from './components/TiltyardList';
import TiltyardInfo from './components/TiltyardInfo';
import TiltyardCreater from './components/TiltyardCreater';
import {CookiesProvider, useCookies} from 'react-cookie';
import {React, useState} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from './Theme';


function App() {
  const [updateTiltyard, setUpdateTiltyard] = useState([])
  
  const updateList = (resp) => {
    console.log(resp);
    setUpdateTiltyard(resp)
  }

  return (
    <>
      <CookiesProvider>
            <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<Login/>}/>
                <Route path = "/tiltyardList" element = {<TiltyardList updateTiltyard = {updateTiltyard}/>}/>
                <Route path = "/tiltyardInfo/:id/:stage" element = {<TiltyardInfo />}/>
                <Route path = "/tiltyardCreater/:lenght" element = {<TiltyardCreater setUpdateTiltyard = {updateList}/>}/>
            </Routes>
            </BrowserRouter>
      </CookiesProvider>
    </>
  );
}

export default App;
