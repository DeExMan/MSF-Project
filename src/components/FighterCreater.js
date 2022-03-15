import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {Grid, Box, TextField} from '@mui/material'
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import APIService from './APIService';
import { useNavigate } from 'react-router-dom';
import { Container, Snackbar, Alert } from '@mui/material';
import { borderRadius } from '@mui/system';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function FighterCreater(props) {
  const [open, setOpen] = React.useState(false);
  const [token] = useCookies(['mytoken'])

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [patronymic, setPatronymic] = useState('')
  const [club, setClub] = useState('')
  const [tiltyard, setTiltyard] = useState(props.tiltyard)
  const [isRequiredFieldsError, setIsRequiredFieldsError] = useState(false)

  const returnToList = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
    setTiltyard(props.tiltyardId)
  };

  useEffect(() => {
    if (!token['mytoken']) {
        returnToList('/');
    }

}, [token])

const checkRequiredField = () => {
  if (!(name!=='' && surname !=='' && patronymic !=='' && club !=='' )) {
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
    
    setOpen(false);
    APIService.InsertFighter({name, 
    surname,
    patronymic,
    club,
    tiltyard}, token['mytoken'])
    .then((resp) => props.addFighter(resp))
    setZero()
    
}

  const setZero = () => {
    setName('')
    setSurname('')
    setPatronymic('')
    setClub('')
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button disabled={props.disabled} variant="contained" color="success" onClick={handleClickOpen}>
        Добавить участника
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx = {{borderRadius:'120'}}
      >
        <Container sx={{backgroundColor:" #262E3E", color:"white", }}>
        <DialogTitle sx = {{fontSize:'h1', textAlign:"center"}} >{"Новый боец"}</DialogTitle>
        <DialogContent>
          <Box sx={{ flexGrow: 2 }}>
                <Grid container spacing={4}
                direction="column"
                justifyContent="center"
                alignItems="center"
                >
                  <br/>
                    {/* Фамилия */}
                    <Grid item xs={12} md={6}>
                    <TextField InputLabelProps={{style : {color : 'rgba(204, 209, 221, 1)'} }} error ={isRequiredFieldsError ? true : false } value={surname} id="surname" label="Фамилия" variant="outlined" onChange={e =>setSurname(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}/>
                    </Grid>


                    {/* Имя */}
                    <Grid item xs={3} md={6}>
                    <TextField InputLabelProps={{style : {color : 'rgba(204, 209, 221, 1)'} }} error ={isRequiredFieldsError ? true : false } value={name} id="name" label="Имя" variant="outlined" onChange={e =>setName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}/>
                    </Grid>


                    {/* Отчество */}
                    <Grid item xs={3} md={6}>
                    <TextField InputLabelProps={{style : {color : 'rgba(204, 209, 221, 1)'} }} error ={isRequiredFieldsError ? true : false } value={patronymic} id="patronymic" label="Отчество" variant="outlined" onChange={e =>setPatronymic(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}/>
                    </Grid>


                    {/* Клуб */}
                    <Grid item xs={3} md={6}>
                    <TextField InputLabelProps={{style : {color : 'rgba(204, 209, 221, 1)'} }} error ={isRequiredFieldsError ? true : false } value={club} id="club" label="Клуб" variant="outlined" onChange={e =>setClub(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}/>
                    </Grid>
                </Grid>
            </Box>
        </DialogContent>
        <DialogActions>
        <Grid container spacing={0}>
            <Grid sx={{textAlign:"left"}} item xs={6}>
            <Button  variant="contained" color="success" onClick={insertTiltyard}>Сохранить</Button>
            </Grid>
            <Grid sx={{textAlign:"right"}} item xs={6}>
            <Button  onClick={handleClose} variant="contained" color="error" onClick={handleClose}>Отмена</Button>
            </Grid>
        </Grid>
        </DialogActions>
        </Container>
      </Dialog>
      <Snackbar open={isRequiredFieldsError} autoHideDuration={3000} onClose={() => setIsRequiredFieldsError(false)}>                  
          <Alert severity="error">Проверьте все ли поля заполнены</Alert>
      </Snackbar>
    </>
  );
}
