import {React, useState} from 'react'
import { Grid, TableBody, TableContainer, Paper, Table,
        TableHead, TableRow, TableCell, styled } from '@mui/material'
import { Button } from '@mui/material'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';


import FighterEditer from './FighterEditer'

function FightersOfTiltyard(props) {

    const [show, setShow] = useState(false)
    const isSaved = props.isSaved
    const [open, setOpen] = useState(false);

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        
        textAlign: 'center',
        color: "white",
        background: "#323846",
        boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
        borderRadius: "20px",
    }));

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: '#00000',
          color: 'white',
          fontSize: theme.typography.pxToRem(12),
        },
      }));


    return (
                <Grid item xs={5} md={5}>
                    <div >
                    {props.fighters !=0 &&
                    <>
                    <h4 align = {"center"}>БОЙЦЫ</h4>
                    <TableContainer  component={Item}>
                    <Table size="medium" stickyHeader = {true}>
                        <TableHead>
                        <TableRow sx={{color:"black"}}>
                            <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD",borderBottom: "none" }}>№</TableCell>
                            <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD",borderBottom: "none" }} align="left">ФИО</TableCell>
                            <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD",borderBottom: "none" }} align="left">Клуб</TableCell>
                            {isSaved ? 
                            <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD",borderBottom: "none" }} align="right"></TableCell> 
                            :
                            <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD",borderBottom: "none" }} align="center">Победы</TableCell>
                            }
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {props.fighters.map((fighters, fightersIndex) => (
                            <HtmlTooltip
                            key={fighters.id}
                            title={
                                <>
                                  <Typography>Имя:</Typography>
                                  {fighters.surname} <br/> {fighters.name} <br/> {fighters.patronymic}
                                  <Typography>Клуб:</Typography>
                                  {fighters.club}
                                </>
                              }
                            arrow
                            placement="top"
                            >
                            
                            <TableRow
                            draggable={true}
                            key={fighters.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0,  backgroundColor: "#323846", color:"white",} }}
                            >
                            <TableCell sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", color:"white", textOverflow: "ellipsis", borderBottom: "none"}} component="th" scope="row">{fighters.number = Number(fightersIndex+1)}</TableCell>
                            <TableCell sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", color:"white", textOverflow: "ellipsis", borderBottom: "none"}} component="th" align="left"><div align="left" className='cell-name'>{fighters.surname} {fighters.name[0]}. {fighters.patronymic[0]}.</div></TableCell>
                            <TableCell sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", color:"white", textOverflow: "ellipsis", borderBottom: "none"}} component="th" align="left"><div align="left" className='cell-club'>{fighters.club}</div></TableCell>
                            {isSaved ?
                            <TableCell sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", color:"white", textOverflow: "ellipsis", borderBottom: "none"}} component="th" align="right">
                            <FighterEditer updateFighters = {props.updateFighters} deleteFighter = {props.deleteFighter} fighter = {fighters}/>
                            </TableCell>
                            :
                            <TableCell sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", color:"white", textOverflow: "ellipsis", borderBottom: "none"}} component="th" align="center">
                            {fighters.victoryPoints}
                            </TableCell>
                            }
                            </TableRow>
                            
                            </HtmlTooltip>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </>
                    }
                    
                    </div>
                </Grid>
    )
} 

export default FightersOfTiltyard
