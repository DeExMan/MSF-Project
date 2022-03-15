import React, { useState } from 'react'
import { Grid, TableBody, TableContainer, Paper, Table,
        TableHead, TableRow, TableCell, styled, } from '@mui/material'
import { Button } from '@mui/material'
import { useEffect } from 'react';
import APIService from './APIService';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function WinnerTable(props) {
    const [token] = useCookies(['mytoken'])
    const navigate = useNavigate();
    const[fighters, setFighters] = useState()

    useEffect(() => {
        let sortedFighters = props.fighters
        console.log(sortedFighters)
        console.log(props.fighters)
        sortedFighters.sort(function (a, b) {
            if (a.victoryPoints > b.victoryPoints) {
              return -1;
            }
            if (a.victoryPoints < b.victoryPoints) {
              return 1;
            }
            return 0;
        });;
        setFighters(sortedFighters);

    }, [])

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        
        textAlign: 'center',
        color: "white",
        background: "#323846",
        boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
        borderRadius: "20px",
    }));
   


  return (
    <>
    {console.log(fighters)}
        {fighters &&
        <Grid item xs={12} md={12}>
            <div >
                {fighters !=0 &&
                    <>
                        <h4 align = {"center"}>Таблица победителей</h4>
                        <TableContainer  component={Item}>
                        <Table size="medium" stickyHeader = {true}>
                        <TableHead>
                        <TableRow sx={{color:"black"}}>
                            <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD",borderBottom: "none" }}>Место</TableCell>
                            <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD",borderBottom: "none" }} align="left">ФИО</TableCell>
                            <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD",borderBottom: "none" }} align="left">Клуб</TableCell>
                            <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD",borderBottom: "none" }} align="center">Победы</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {fighters.map((fighters, fightersIndex) => ( 
                            <TableRow draggable={true} key={fighters.id} >
                                <TableCell sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", color:"white", textOverflow: "ellipsis", borderBottom: "none"}} component="th" scope="row">{fighters.number = Number(fightersIndex+1)}</TableCell>
                                <TableCell sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", color:"white", textOverflow: "ellipsis", borderBottom: "none"}} component="th" align="left"><div align="left" >{fighters.surname} {fighters.name} {fighters.patronymic}</div></TableCell>
                                <TableCell sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", color:"white", textOverflow: "ellipsis", borderBottom: "none"}} component="th" align="left"><div align="left" className='cell-club'>{fighters.club}</div></TableCell>
                                <TableCell sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", color:"white", textOverflow: "ellipsis", borderBottom: "none"}} component="th" align="center">{fighters.victoryPoints}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                        </Table>
                        </TableContainer>
                    </>
                    }
                    
            </div>
        </Grid>
        }
    </>
  )
}

export default WinnerTable