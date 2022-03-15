import React from 'react';
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
import { Container } from '@mui/material';
import vector from '../Vector.png'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function FighterEditer(props) {

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const [name, setName] = useState(props.fighter.name)
    const [surname, setSurname] = useState(props.fighter.surname)
    const [patronymic, setPatronymic] = useState(props.fighter.patronymic)
    const [club, setClub] = useState(props.fighter.club)
    const [tiltyard, setTiltyard] = useState(props.fighter.tiltyard)
    const [token] = useCookies(['mytoken'])

    const updatedFighter = () => {
        
        APIService.UpdateFighter(props.fighter.id,{name, 
            surname,
            patronymic,
            club,
            tiltyard}, token['mytoken'])
            .then((resp) => props.updateFighters(resp))
            .then(setOpen(false))
    }

    const deleteFighter = () => {
        APIService.DeleteFighter(props.fighter.id, token['mytoken'])
        .then((resp) => props.deleteFighter(props.fighter))
        .then(setOpen(false))
    }

  return (
      <>
    <img style={{marginTop: 20}} className='tr-dur' onClick={() => setOpen(true)} src={vector}/>
    <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
    sx = {{borderRadius:'120'}}
  >
    <Container sx={{backgroundColor:" #262E3E", color:"white", }}>
    <DialogTitle sx = {{fontSize:'h1', textAlign:"center"}} >{"Редактирование"}</DialogTitle>
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
                <TextField value={surname} id="surname" label="Фамилия" variant="outlined" onChange={e =>setSurname(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}/>
                </Grid>


                {/* Имя */}
                <Grid item xs={3} md={6}>
                <TextField value={name} id="name" label="Имя" variant="outlined" onChange={e =>setName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}/>
                </Grid>


                {/* Отчество */}
                <Grid item xs={3} md={6}>
                <TextField value={patronymic} id="patronymic" label="Отчество" variant="outlined" onChange={e =>setPatronymic(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}/>
                </Grid>


                {/* Клуб */}
                <Grid item xs={3} md={6}>
                <TextField value={club} id="club" label="Клуб" variant="outlined" onChange={e =>setClub(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}/>
                </Grid>
            </Grid>
        </Box>
    </DialogContent>
    <DialogActions>
    <Grid container spacing={0} >
        <Grid sx={{textAlign:"right"}} item xs={6.5}>
        <Button  variant="contained" color="success" onClick={updatedFighter}>Сохранить</Button>
        </Grid>
        <Grid sx={{textAlign:"left"}} item xs={5}>
        <Button  onClick={handleClose} variant="contained" color="primary" onClick={handleClose}>Отмена</Button>
        </Grid>
        
        <Grid container spacing={0}>
        <Grid sx={{textAlign:"center"}} item xs={12}>
        <br/>
        <Button  onClick={handleClose} variant="contained" size='small' color="error" onClick={deleteFighter}>Удалить</Button>
        </Grid>
        </Grid>
    </Grid>
    </DialogActions>
    </Container>
  </Dialog>
  </>
  );
}

export default FighterEditer;
