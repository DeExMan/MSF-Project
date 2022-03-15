import {React, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, Container} from '@mui/material';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import { CustomLink } from './CustomLink';
import FighterCreater from './FighterCreater';
import FightersOfTiltyard from './FightersOfTiltyard';
import OrderOfTiltyard from './OrderOfTiltyard';
import APIService from './APIService';
import { Paper, Table, TableHead, TableRow, TableCell, 
        TableContainer, TableBody, styled } from '@mui/material';
import theme from '../Theme';
import {ThemeProvider } from '@mui/material/styles';
import WinnerTable from './WinnerTable';



    
function TiltyardInfo(props) {

    const {id, stage} = useParams();
    const [token] = useCookies(['mytoken'])
    const [fighters, setFighters] = useState([]);
    const [tiltyard1, setTiltyard1] = useState()
    const [formingFights, setFormingFights] = useState(false)
    const navigate = useNavigate();
    const [nextStage, setNextStage] = useState(false)
    const[intervalId, setIntervalId] = useState()
    const [isFinal, setIsFinal] = useState(true);
    
    const updateFighters = (fighter) => {
        if(fighter){
            const new_fighters = fighters.map(myfighter => {
                if(myfighter.id === fighter.id) {
                    return fighter
                }
                return myfighter
            })
            console.log(new_fighters)
            setFighters(new_fighters)
            setFormingFights(false)
        }
        setFormingFights(true)
        
    }

    const addFighter = (fighter) => {
        if(fighter) {
            const data = []
            fighters.map(e => data.push(e))
            data.push(fighter)
            setFighters(data)
            setFormingFights(false)
        }
        if(formingFights) {
            setFormingFights(false)
            setFormingFights(true)
        }
        
    }

    const deleteFighter = (fighter) => {
        if(fighter) {
            const new_fighters = fighters.filter(myfighter => {
                if(myfighter.id === fighter.id) {
                    return false
                }
                return true
            })
            setFighters(new_fighters)
            setFormingFights(false)
        }
        setFormingFights(true)
    }

    const createFights = () => {
        console.log("yes")
        setFormingFights(true)
    }

    useEffect(() => {
        if (!token['mytoken']) {
            navigate('/');
        }
        fetchingFighters()
        fetchingTityards()
    }, [token])

    async function moveNextStage(nextStage) {
        let i = Number(nextStage);
        navigate(`/tiltyardInfo/${id}/${i}`)
        window.location.reload()
    }

    async function fetchingTityards () {
        await fetch(`http://127.0.0.1:8000/api/tiltyards/${id}/`, {
          'method': "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token['mytoken']}`
          }
        })
        .then(resp => resp.json())
        .then(resp => setTiltyard1(resp))
        .catch(error => console.log(error))
        
    }

    async function fetchingTityardsSub () {
        await fetch(`http://127.0.0.1:8000/api/tiltyards/${id}/`, {
          'method': "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token['mytoken']}`
          }
        })
        .then(resp => resp.json())
        .then(resp => check(resp))
        .catch(error => console.log(error))
        
    }

    const check = (resp) => {
        if(resp.stage != stage) {
           console.log(resp.stage)
            moveNextStage(resp.stage);

        }
    }

    const UpdateTiltyard = (id) => {
        fetch(`http://127.0.0.1:8000/api/tiltyards/${id}/`, {
          'method': "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token['mytoken']}`
          }
        })
        .then(resp => resp.json())
        .then(resp => setTiltyard1(resp))
        .catch(error => console.log(error))
    }

    const fetchingFighters = () => {
        fetch('http://127.0.0.1:8000/api/fighters/', {
          'method': "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token['mytoken']}`
          }
        })
        .then(resp => resp.json())
        .then(resp => createData(resp))
        .catch(error => console.log(error))
    }

    const fetchingFightersSub = () => {
        fetch('http://127.0.0.1:8000/api/fighters/', {
          'method': "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token['mytoken']}`
          }
        })
        .then(resp => resp.json())
        .then(resp => checkFighters(resp))
        .catch(error => console.log(error))
    }
    
    const checkFighters = () => {}

    const createData = (resp) => {
        let data = [];
        
        resp.map(fighter => {

        if (fighter.tiltyard == id) {
            data.push(fighter);
        }
        })
        if (data.length != 0) {
            setFighters(data);
        }
        
    }
    
    const save = () =>
    {
        for(let i = 0; i != fighters.length; i++ ){
                let name = fighters[i].name;
                let surname = fighters[i].surname;
                let number = fighters[i].number;
                let patronymic = fighters[i].patronymic;
                let club = fighters[i].club;
                let pool = fighters[i].pool;
                let tiltyard = fighters[i].tiltyard;
                let stage = fighters[i].stage+1;
                APIService.UpdateFighter(fighters[i].id, {name, 
                    surname,
                    number,
                    patronymic,
                    pool,
                    club,
                    tiltyard,
                    stage}, token['mytoken'])
                    .then((resp) => console.log(resp))
                    
        }    
        let name =tiltyard1.name
        let nomination = tiltyard1.nomination
        let age_category = tiltyard1.age_category
        let league = tiltyard1.league
        let state = "Идет"
        console.log(tiltyard1.referee)
        let referee = tiltyard1.referee.id
        console.log(tiltyard1.stage+1)
        let stage = tiltyard1.stage+1;
        APIService.UpdateTiltyard(tiltyard1.id, {name, 
            nomination, 
            age_category, 
            league, 
            state, 
            referee,
            stage}, token['mytoken'])
            .then((resp) => console.log(resp))
            .then(resp => moveNextStage(resp.stage))

    }

    useEffect(() =>{
                setIntervalId(setInterval(() => {
                    if(stage >= 1 || stage =="NaN"){
                            console.log("Updating")
                            fetchingTityardsSub()
                            fetchingFightersSub()
                        }
    }, 10000),
    );
    }, [])

    const back = (x) => {
        console.log(x)
        clearInterval(x)
        console.log(intervalId)
    }

    function someMethod () {
        setIsFinal(false)
    }

    const DeletTiltyard = () => {
        APIService.DeleteTiltyard(id, token['mytoken'])
            .then((resp) => console.log(resp))
            .then(resp => back())
    }

 

    return (
        <ThemeProvider theme={theme}>
        <Container maxWidth='xl'> 
        {tiltyard1 && 
        
        <>
        
        <br/>
        
        
        <>
        <Box sx={{ flexGrow: 1}}>
        <Grid container spacing={1}>
                
        <Grid item xs={4} md={4}  container justifyContent="left">
            <CustomLink onClick ={() => back(intervalId)} variant="contained" color="secondary" to={'/tiltyardList'} >
            К списку
            </CustomLink>           
        </Grid>
        <Grid item xs={4} md={4} sx = {{fontSize:36, textAlign: "center"}}  container justifyContent="center">
            <h1 className='textUpper'><b>{tiltyard1.name}</b></h1>          
        </Grid>
        <Grid item xs={4} md={4} container justifyContent="right">
            
            <h3 style={{color: tiltyard1.state.length > 4 ? '#FDA286' : '#FAFD86' }}>{tiltyard1.state}  </h3>  
            <p className={tiltyard1.state.length > 4 ? 'd3' : 'd4'}></p>
        
        </Grid>


        <br/>
        </Grid>
        </Box>
        <br/>
        
        <br/>
        <br/>
        {/* Информация о ристалище */}
        {tiltyard1 &&
        <Box sx={{ flexGrow: 1}}>
            <Grid container spacing={8} justifyContent="center">
                
                <Grid item xs={3} md={3} sx = {{fontSize:36, textAlign: "center"}} >
                    <>
                        <b>Номинация</b><br/>
                        {tiltyard1.nomination}
                        
                    </>
                </Grid>
                <Grid item xs={4} md={4} sx = {{fontSize:36, textAlign: "center"}}>
                    <>
                        <b>Возрастная категороя</b><br/>
                        {tiltyard1.age_category}
                    </>
                </Grid>
                <Grid item xs={2} md={2} sx = {{fontSize:36, textAlign: "center"}}>
                    <>
                        <b>Лига</b><br/>
                        {tiltyard1.league}
                    </>
                </Grid>
                <Grid item xs={3} md={3} sx = {{fontSize:36, textAlign: "center"}}>
                    <>
                        <b>Судья</b><br/>
                         {tiltyard1.referee.username}
                    </>
                </Grid>
                

                
                
            </Grid>
        </Box>
        }
        <br/>

        
        
        <>
        {/* Отображение таблицы бойцов */}
        <Box sx={{ flexGrow: 1 }}>
            {(tiltyard1.state == "Окончено") ?
            null
            : <Grid container spacing={4 } justifyContent="center">
            <FightersOfTiltyard fighters ={fighters} isSaved = {tiltyard1.state.length !== 4} updateFighters = {updateFighters} deleteFighter = {deleteFighter}/>
            <Grid item xs={7} md={7}>
                <div >  
                {((tiltyard1.state.length === 4) || formingFights) &&
                <OrderOfTiltyard showWiners = {() => someMethod()} fightersLenght = {fighters.length} stage = {tiltyard1.stage} fighters = {fighters}/>
                }
                </div>
            </Grid>
        </Grid>}
        
        </Box>
        <br/>
        {(tiltyard1.state == "Окончено") ?
        <>
        <Grid container justifyContent="center">
        <Grid item justifyContent={"center"} xs={12} md={12}>
            <WinnerTable id  ={tiltyard1.id} fighters ={fighters} />
        </Grid>
        </Grid>
        <br/>
                    <Grid item xs={12} md={12} container justifyContent="center">
                    <Button variant="contained" color="error" onClick={() => DeletTiltyard()}>
                    Закрыть ристалище
                    </Button>
                    </Grid>
        </>
        : 
        <Grid container spacing={4}>
        <Grid item xs={7} md={5}>
        <FighterCreater disabled={fighters.length < 32 && tiltyard1.state.length !== 4 ? false : true} tiltyardId = {tiltyard1.id} addFighter = {addFighter}/>
        </Grid>
        <Grid item xs={7} md={4}>
        <Button variant="contained" disabled={tiltyard1.state.length !== 4 && fighters && (fighters.length > 5) ? false : true} color="success" onClick={() => createFights()}>
        СФормировать бои
        </Button>
        </Grid>

        <Grid item xs={7} md={3} sx={{textAlign:"right"}}>
        <Button variant="contained" disabled={tiltyard1.state.length !== 4 && fighters.length >5 && formingFights ? false : true} color="primary" onClick={save}>
        Сохранить
        </Button>
        
        </Grid>
        </Grid>}
        </>
        </>
        </>
       
        
        
        }
        
        </Container> 
        </ThemeProvider>
        
    )
}

export default TiltyardInfo
