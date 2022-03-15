import { TextField, Box, Button, styled, Paper, Snackbar, createTheme, Grid, Alert} from '@mui/material';
import {React, useState, useEffect} from 'react';
import APIService from './APIService';
import {useCookies} from 'react-cookie';
import {useNavigate, Link } from 'react-router-dom';
import {CustomLink} from './CustomLink'
import {ThemeProvider } from '@mui/material/styles';
import theme from '../Theme';




function Login(props) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [wrong, setWrong] = useState(false)


    useEffect(() => {
        if (token['mytoken']) {
            navigate('/tiltyardList');
        }

    }, [token])


    const setTokenFunc = (resp) => {
        if(resp.token){
            setToken('mytoken', resp.token)
            navigate('/tiltyardList')
        }
        setWrong(true)
        // '/tiltyardList'
    }


    const loginBtn = () => {
            APIService.LoginUser({username, password})
            .then(resp => setTokenFunc(resp))
    }




    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: "white",
        background: "#323846",
        boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
        borderRadius: "20px"
    }));

    return (
        <div className='cover'>
        <ThemeProvider theme={theme} >
            <Paper elevation={12} sx={{width: 615,
                    height: 544, background:'#262E3E', color: "white",
                    borderRadius:10, position:"absolute",
                    top:"50%",
                    left:"50%",
                    margin:"-272px 0 0 -307px"}}>
            <Box >
            <Grid direction="column" justifyContent="center"
                alignItems="center" container spacing={2}>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                <h1>ВХОД</h1>
                <div id = "app"></div>
                <Grid item xs={6}>
                    
                <TextField sx={{color: "white"}} InputLabelProps={{style : {color : 'rgba(204, 209, 221, 1)'} }} error ={wrong ? true : false } 
                id="login" label="Логин" variant="outlined" 
                onChange={e => setUserName(e.target.value)}/>
                </Grid>
                <Grid item xs={6}>
                <TextField error ={wrong ? true : false } id="password" 
                label="Пароль" InputLabelProps={{style : {color : 'rgba(204, 209, 221, 1)'} }} variant="outlined" 
                InputProps={{style:{color: "white"}}} 
                onChange={e => setPassword(e.target.value)}/>
                </Grid >
                <br/>
                <Grid item xs={6} justifyContent="center"
                alignItems="center">
                    <Snackbar open={wrong} autoHideDuration={5000} onClose={() => setWrong(false)}>
                        <Alert severity="error">Не правильный логин или пароль</Alert>
                    </Snackbar>
                    </Grid>
                    <Grid item xs={6} justifyContent="center"
                alignItems="center">
                <Button size ='large' variant="contained" color="success" onClick={loginBtn}>
                   Вход
                </Button>
                </Grid>
            </Grid>
            </Box>
            </Paper>
        </ThemeProvider>
        </div>
    )
}

export default Login
