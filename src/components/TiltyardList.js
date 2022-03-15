import {React, useState, useEffect} from 'react';
import {Grid, Paper, Box, Button, Container} from '@mui/material';
import { styled } from '@mui/material/styles';
import TiltyardCreater from './TiltyardCreater';
import TiltyardInfo from './TiltyardInfo';
import {useCookies} from 'react-cookie';
import {useNavigate, Link } from 'react-router-dom';
import {CustomLink} from './CustomLink'
import theme from '../Theme';
import {ThemeProvider } from '@mui/material/styles';
import Update from "../Update.png"






function TiltyardList(props) {

    const [tiltyards, setTiltyards] = useState([])
    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const navigate = useNavigate();
    const toTiltyard = useNavigate();
    const [referee, setReferee] = useState()
    const[intervalId, setIntervalId] = useState()
    

    useEffect(() => {
        if (!token['mytoken']) {
            navigate('/');
        }

    }, [token])

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: "white",
        background: "#323846",
        boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
        borderRadius: "20px",
    }));
    
    const updatedInformation = () => {
        fetchData()
        
    }
    useEffect(() =>{
        setIntervalId(setInterval(() => {
            console.log("Updating")
                fetchData()
    }, 100000),
    console.log(intervalId)
    );
    }, [])

    useEffect(() =>{
        fetchData()
    }, [])

    
    const logOut = () => {
        clearInterval(intervalId);
        console.log(intervalId)
        removeToken(['mytoken']);
        
    }

    const dataCreater = (resp) => {
          setTiltyards(resp);
          
            let i =[]
            resp.map(resp => {
                i.push(resp.referee)
                
              })  
              setReferee(i)
              
          
          
    }

    const fetchData = () => {
        fetch('http://127.0.0.1:8000/api/tiltyards/', {
          'method': "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token['mytoken']}`
          }
        })
        .then(resp => resp.json())
        .then(resp => dataCreater(resp))
        .catch(error => console.log('error fetching'))
    }



    const openTiltyardInfo = (id, stage) => {
        clearInterval(intervalId);
        toTiltyard(`/tiltyardInfo/${id}/${stage}`)
    }

    return (
        <Container>
        <br/>
        <ThemeProvider theme={theme}>

        <Grid container rowSpacing={4} columnSpacing={{ xs: 6, sm: 6, md: 6 }}>
        <Grid sx={{textAlign:"left"}} item xs={6}>
            <CustomLink to={'/'} variant="contained" color="error" onClick={()=>logOut()}>
                Выход
            </CustomLink>
        </Grid>

        <Grid sx={{textAlign:"right"}} item xs={6}>
        <Button variant="contained" color="secondary" onClick={()=>updatedInformation()}>{<img  width="45" height="45" className='tr-durUp'src={Update}/>}</Button>
        </Grid>
        </Grid>
            <h1 style ={{textAlign:'center'}}>СПИСОК РИСТАЛИЩ</h1>
            
            <br/>
            <br/>
            <Container>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={4} columnSpacing={{ xs: 6, sm: 6, md: 6 }}>
                    {tiltyards && tiltyards.map ((tiltyard , i) => (
                        <Grid key = {tiltyard.id} item xs={6}>
                            <Item className='pointer' onClick={() => openTiltyardInfo(tiltyard.id, tiltyard.stage)}>
                            <Grid container spacing={4}>
                                <Grid  item xs={6}>
                                <h2><b>{tiltyard.name}</b></h2>
                                </Grid>
                                <Grid item xs={6} container justifyContent="center">
                                    <>
                                    
                                    <h2 style={{color: tiltyard.state.length > 4 ? '#FDA286' : '#FAFD86'}}>{tiltyard.state} </h2>
                                    <div className={tiltyard.state.length > 4 ? 'd2' : 'd1'}></div>
                                    
                                    </>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4} sx={{color:'#CCD1DD'}}>
                                <Grid item xs={6} >
                            <h2 className='fw-normal'>Номинация:    </h2>
                            </Grid>
                            <Grid item xs={6}>
                            <h2 className='fw-light'>{tiltyard.nomination}</h2>
                            </Grid>
                            </Grid>
                            <Grid container spacing={4} sx={{color:'#CCD1DD'}}>
                            <Grid item xs={6} container justifyContent="left">
                            <h2 className='fw-normal'>Возрастная категория:    </h2>
                            </Grid>
                            <Grid item xs={6}>
                            <h2 className='fw-light'><p>{tiltyard.age_category}</p></h2>
                            </Grid>
                            </Grid>
                            <Grid container spacing={4}
                            sx={{color:'#CCD1DD'}}>
                            <Grid item xs={6}>
                            <h2 className='fw-normal'>Лига:    </h2>

                            </Grid>
                            <Grid item xs={6}>
                            <h2 className='fw-light'>{tiltyard.league}</h2>
                            </Grid>
                            </Grid>
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            </Container>
            <br/>
            {typeof referee !== "undefined" &&
            <TiltyardCreater refereeLenght = {referee.length} referee ={referee} updatedInformation = {updatedInformation} tiltyardCount = {tiltyards.length}/>
            }
        </ThemeProvider>
      </Container>
    )
}

export default TiltyardList
