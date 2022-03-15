import React, { useEffect } from 'react';
import { useState } from 'react';
import { TextField, Button, Box, Grid, FormControl, InputLabel,
          Select, MenuItem, Dialog, DialogTitle, DialogContent,
          DialogActions, Slide, Container, Alert} from '@mui/material';
import APIService from './APIService';
import {useCookies} from 'react-cookie';
import {useNavigate, useParams} from 'react-router-dom';
import FighterCreater from './FighterCreater'
import {CustomLink} from './CustomLink'
import { fontSize } from '@mui/system';
import {ThemeProvider } from '@mui/material/styles';
import theme from '../Theme';
import { Snackbar } from '@mui/material';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function TiltyardCreater(props) {

    const [open, setOpen] = React.useState(false);
    const [showCreater, setShow] = useState(false);
    const [isError, setisError] = useState(false)
    const [isRequiredFieldsError, setIsRequiredFieldsError] = useState(false)
    const [workedReferee, setWorkedRefere] = useState()
    const [allReferee, setAllReferee] = useState()
    const [emptyRefereError, setEmpyRefereeError] = useState(false)
    
    const handleClickOpen = () => {
        if (referee1.length !== 0) {
            setOpen(true);
            createName();
        }
        else {
            setEmpyRefereeError(true)
        }
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const setZero = () => {
        setName('')
        setNomination('')
        setAge('')
        setLeague('')
        setTest('')
        setisError(false)
      }

    const [name, setName] = useState('')
    const [nomination, setNomination] = useState('')
    const [age_category, setAge] = useState('')
    const [league, setLeague] = useState('')
    const [state] = useState('Подготовка')
    const [referee1, setReferee] = useState([])
    const [test, setTest] = useState('')
    const [token] = useCookies(['mytoken'])
    const [refereeChoice, setRefereeChoice] = useState()
    const returnToList = useNavigate()
    const {lenght} = useParams();
    

    useEffect(() =>{
        
        fetch('http://127.0.0.1:8000/api/users/', {
          'method': "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token['mytoken']}`
          }
        })
        .then(resp => resp.json())
        // .then(resp => setAllReferee(resp))
        .then(resp => createData(resp))
        .catch(error => console.log('error fetching'))
    },[] )

    useEffect(() => {
        if (!token['mytoken']) {
            returnToList('/');
        }

    }, [token])

    const createData = (resp) => {
         
        const workedReferee1 = (props.referee.map(el => el.id));
        console.log(workedReferee1)

        const data = resp.filter(referee =>
            !workedReferee1.includes(referee.id)
        )
        console.log(data)
        const check = []
        data.map(i => {
            if(i.id !== 1)
            check.push(i)
            
        })
        
        console.log(check)
        setReferee(check)
        setAllReferee(resp)
    }

    const checkRequiredField = () => {
        if (!(name!=='' && nomination && age_category && league && test !== '')) {
            setIsRequiredFieldsError(true);
            return true;
        }
        ;
        setIsRequiredFieldsError(false);
        return false;
    }

    const insertTiltyard = () => {
            if (checkRequiredField()){
                return
            }
            APIService.InsertTiltyard({name, nomination, age_category, league, state, referee: referee1[test].id}, token['mytoken'])
            .then(res => res.ok ? res : Promise.reject(res))
            .then(res => res.json())
            .then(data => {
                props.updatedInformation(data);
                setZero();
                handleClose();
            })
            .catch(() => setisError(true));   
            
            const data = []
            referee1.map( e => {
                if (e.id !== referee1[test].id)
                    data.push(e)
            })
            setReferee(data)
    }


    const refereeChange = (event) => {
        console.log(event.target.value)
        setTest(event.target.value);
    };

    const leagueChange = (event) => {
        setLeague(event.target.value);
    };

    const nominationChange = (event) => {
        setNomination(event.target.value);
    };

    const ageChange = (event) => {
        setAge(event.target.value);
    };

    const createName = () => {
        var x = Number(props.tiltyardCount)
        console.log(props.tiltyardCount)
        setName(`Ристалище №${x+1}`) 
    }

    return (
        <ThemeProvider theme = {theme}>
        <div>
            <div style={{textAlign:"center"}}>
        <Button  size ='large' variant="contained" color="success" onClick={handleClickOpen}>
        Новое ристалище
        </Button>

        <Snackbar open={emptyRefereError} autoHideDuration={5000} onClose={() => emptyRefereError(false)}>                  
            <Alert severity="error">Больще нет свободных судей</Alert>
        </Snackbar>
        </div>
            <div>
        <Dialog
        
        fullWidth={true}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        >
            <Container sx={{backgroundColor:" #262E3E", color:"white", }}>
        <DialogTitle  sx = {{fontSize:'h1', textAlign:"center"}}>{name}</DialogTitle>
        <DialogContent sx={{color:"white"}}>
                <Grid container spacing={0}
                direction="column"
                justifyContent="center"
                alignItems="center">
                    {/* Выбор номинации */}
                    <Grid item xs={6} md={6}>
                        <h2>
                        <FormControl error ={isError    ? true : false } sx={{backgroundColor: "#3B414E",
              boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
              borderRadius: "10px",}} style={{width: 300}}>
                        <InputLabel sx={{color:'#CCD1DD'}}    id="nominationID">Номинация</InputLabel>
                            <Select
                            sx={{color:'#CCD1DD'}}
                            labelId="nominationID"
                            id="nomination"
                            value={nomination}
                            label="Номинация"
                            onChange={nominationChange}
                            >
                                <MenuItem value={'Щит-меч'}>Щит-меч</MenuItem>
                                <MenuItem value={'Триатлон'}>Триатлон</MenuItem>
                                <MenuItem value={'Сабля-баклер'}>Сабля-баклер</MenuItem>
                                <MenuItem value={'Восточный щит'}>Восточный щит</MenuItem>
                                <MenuItem value={'Щит-меч женщины'}>Щит-меч женщины</MenuItem>
                                <MenuItem value={'Триатлон женщины'}>Триатлон женщины</MenuItem>
                                <MenuItem value={'Сабля-баклер женщины'}>Сабля-баклер женщины</MenuItem>
                                <MenuItem value={'Восточный щит женщины'}>Восточный щит женщины</MenuItem>
                            </Select>
                        </FormControl>
                        </h2>
                    </Grid>


                    {/* Выбор возростной категории */}
                    <Grid item xs={3} md={3}>
                        <h2>
                        <FormControl error ={isError    ? true : false } sx={{backgroundColor: "#3B414E",
              boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
              borderRadius: "10px",}} style={{width: 300}}>
                        <InputLabel sx={{color:'#CCD1DD'}}  id="ageID">Возрастная категория</InputLabel>
                            <Select
                            sx={{color:'#CCD1DD'}}
                            labelId="ageID"
                            id="age"
                            value={age_category}
                            label="Возрастная категория"
                            onChange={ageChange}
                            >
                                <MenuItem value={'4-5 лет'}>4-5 лет</MenuItem>
                                <MenuItem value={'6-7 лет'}>6-7 лет</MenuItem>
                                <MenuItem value={'8-9 лет'}>8-9 лет</MenuItem>
                                <MenuItem value={'10-11 лет'}>10-11 лет</MenuItem>
                                <MenuItem value={'12-13 лет'}>12-13 лет</MenuItem>
                                <MenuItem value={'14-15 лет'}>14-15 лет</MenuItem>
                                <MenuItem value={'16-17 лет'}>16-17 лет</MenuItem>
                                <MenuItem value={'18-25 лет'}>18-25 лет</MenuItem>
                                <MenuItem value={'25-39 лет'}>25-39 лет</MenuItem>
                                <MenuItem value={'40+ лет'}>40+ лет</MenuItem>
                            </Select>
                        </FormControl>
                        </h2>
                    </Grid>


                    {/* Выбор лиги */}
                    <Grid item xs={3} md={3}>
                        <h2>
                        <FormControl error ={isError    ? true : false } sx={{backgroundColor: "#3B414E",
              boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
              borderRadius: "10px",}} style={{width: 300}}>
                        <InputLabel sx={{color:'#CCD1DD'}} id="leagueID">Лига</InputLabel>
                            <Select
                            sx={{color:'#CCD1DD'}}
                            labelId="leagueID"
                            id="league"
                            value={league}
                            label="Лига"
                            onChange={leagueChange}
                            >
                                <MenuItem value={'лига А'}>лига А</MenuItem>
                                <MenuItem value={'лига Б'}>лига Б</MenuItem>
                                <MenuItem value={'лига Д'}>лига Д</MenuItem>
                                <MenuItem value={'лига О'}>лига О</MenuItem>
                            </Select>
                        </FormControl>
                        </h2>
                    </Grid>


                    {/* Выбор судьи */}  
                    <Grid item xs={3} md={3}>
                        <h2>
                        <FormControl error ={isError    ? true : false } sx={{backgroundColor: "#3B414E",
              boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
              borderRadius: "10px",}} style={{width: 300}}>
                        <InputLabel sx={{color:'#CCD1DD'}} id="refereeID">Судья</InputLabel>

                            <Select
                            sx={{color:'#CCD1DD'}}
                            labelId="refereeID"
                            id="referee"
                            value={test}
                            label="Судья"
                            onChange={refereeChange}
                            >
                                {referee1 ? (referee1.map ((refereeChoice, i ) => (
                                    <MenuItem key={refereeChoice.id} value={i}>{refereeChoice.username}</MenuItem>
                                )
                                )) : <MenuItem key={23422241} value={null}>Нет свободных судей</MenuItem>}  
                            </Select>
                        
                        </FormControl>
                        </h2>
                    </Grid>
                </Grid>
                
            </DialogContent>
            <DialogActions>
                <Grid container spacing={0}>
                            <Grid item xs={6} sx={{textAlign:"left"}}>
                <Button  variant="contained" color="success" onClick={insertTiltyard}>
                Сохранить
                </Button>
                </Grid>
                <Grid item xs={6} sx={{textAlign:"right"}}>
                <Button  onClick={handleClose} variant="contained" color="error" >
                Назад
                </Button>
                </Grid>
                </Grid>
                <Snackbar open={isError} autoHideDuration={3000} onClose={() => setisError(false)}>                  
                    <Alert severity="error">Этот судья занят</Alert>
                </Snackbar>
                <Snackbar open={isRequiredFieldsError} autoHideDuration={3000} onClose={() => setIsRequiredFieldsError(false)}>                  
                    <Alert severity="error">Проверьте все ли поля заполнены</Alert>
                </Snackbar>
                </DialogActions>
                </Container>
                </Dialog>
            </div>
    
        </div>
        </ThemeProvider>
        
    )
}

export default TiltyardCreater
