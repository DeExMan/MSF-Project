import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, styled } from '@mui/material';
import { useState, useEffect } from 'react';
import FighterCreater from './FighterCreater';
import { chainPropTypes } from '@mui/utils';

function OrderOfTiltyard(props) {

    const [battleOrder, setBattleOrder] = useState([])
    const [currentOrder, setCurrentOrder] = useState()
    let [i] = useState(0)

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        
        textAlign: 'center',
        color: "white",
        background: "#323846",
        boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
        borderRadius: "20px",
    }));


    const multiple = (x, fighter) => {
        if(x === 3){
            const res = fighter.slice(i, i + 3);
            battleOrder.push([res[0], res[1]])
            battleOrder.push([res[2], res[1]])
            battleOrder.push([res[2], res[0]])
            i = i + 3
        }
        else if (x === 4){
            console.log(battleOrder)
            const res = fighter.slice(i,  i + 4);
            battleOrder.push([res[0], res[1]])
            battleOrder.push([res[2], res[1]])
            battleOrder.push([res[2], res[3]])
            battleOrder.push([res[0], res[3]])
            battleOrder.push([res[0], res[2]])
            battleOrder.push([res[1], res[3]])
            i = i + 4
            console.log(battleOrder)
        }
        console.log(battleOrder)
    }
    
    useEffect(() => {
        formingFights()
    }, [])

    const formingFights = () => {
        console.log(props.fightersLenght)
        let fighters = props.fighters;
        let data = [4,3];
        console.log(fighters.length)

        if(fighters.length <= 8){
            for(let t = 0; t <= 1; t++)
                for(let z = 0; z <= 1; z++)
                    if(data[t]+data[z] == fighters.length){
                        if(props.stage < 2) {
                            multiple(data[t], props.fighters)
                            multiple(data[z], props.fighters)
                            i = 0
                            t = 1
                        } 
                        else if(props.stage == 2) {
                            let fighterStageTwo = []
                            for(let i = 0; i < fighters.length-1; i++) {
                                if(fighters[i].stage == 2)
                                    fighterStageTwo.push(fighters[i])
                            }
                            battleOrder.push([fighterStageTwo[0], fighterStageTwo[3]])
                            battleOrder.push([fighterStageTwo[1], fighterStageTwo[2]])
                            t = 1
                        }
                        else if(props.stage == 3) {
                            let finalFighters =[]
                            let thirdPlace = []
                            for(let i = 0; i < fighters.length-1; i++) {
                                if(fighters[i].stage == 3)
                                finalFighters.push(fighters[i])
                                if(fighters[i].stage == 2)
                                thirdPlace.push(fighters[i])
                            }
                            battleOrder.push([finalFighters[0], finalFighters[1]])
                            battleOrder.push([thirdPlace[0], thirdPlace[1]])
                            t = 1
                        }
                        else if(props.stge == 4) {
                            props.showWiners();
                        }
                        
                    }
        }
        else if(fighters.length <= 12) {
            for(let f = 0; f <= 1; f++)
                for(let t = 0; t <= 1; t++)
                    for(let z = 0; z <= 1; z++)
                        if(data[f]+data[t]+data[z] == fighters.length){
                            if(props.stage < 2) {
                                console.log(data[f],
                                    data[t],
                                    data[z])
                                multiple(data[f], props.fighters)
                                multiple(data[t], props.fighters)
                                multiple(data[z], props.fighters)
                                i = 0
                                f = 1
                            } 
                            else if (props.stage == 2) {
                                let fighterStageTwo = []
                                for(let i = 0; i < fighters.length-1; i++) {
                                    if(fighters[i].stage == 2)
                                        fighterStageTwo.push(fighters[i])
                                }
                                battleOrder.push([fighterStageTwo[0],fighterStageTwo[3]])
                                battleOrder.push([fighterStageTwo[2],fighterStageTwo[5]])
                                battleOrder.push([fighterStageTwo[4],fighterStageTwo[1]])
                                f=1
                            }
                            else if (props.stage == 3) {
                                let finalStage = []
                                for(let i = 0; i < fighters.length-1; i++) {
                                    if(fighters[i].stage == 3)
                                    finalStage.push(fighters[i])
                                }
                                multiple(3, finalStage)
                                i = 0
                                f=1
                            }
                        }
        }
        else if(fighters.length <= 16) {
            for(let p = 0; p <= 1; p++)
                for(let f = 0; f <= 1; f++)
                    for(let t = 0; t <= 1; t++)
                        for(let z = 0; z <= 1; z++)
                            if(data[p]+data[f]+data[t]+data[z] == fighters.length){
                                if(props.stage < 2) {
                                    multiple(data[p], props.fighters)
                                    multiple(data[f], props.fighters)
                                    multiple(data[t], props.fighters)
                                    multiple(data[z], props.fighters)
                                    i = 0
                                    p = 1
                                } 
                                else if (props.stage == 2) {
                                    let fighterStageTwo = []
                                    for(let i = 0; i < fighters.length-1; i++) {
                                        if(fighters[i].stage == 2)
                                            fighterStageTwo.push(fighters[i])
                                    }
                                    for(let i = 0; i < fighterStageTwo.length-1; i = i+2){
                                        console.log(i)
                                        if(i == 4){
                                            battleOrder.push([fighterStageTwo[i],fighterStageTwo[fighterStageTwo.length-i-3]])
                                        }  
                                        else if(i == 6) {
                                            battleOrder.push([fighterStageTwo[i],fighterStageTwo[fighterStageTwo.length-i+1]])
                                        }
                                        else
                                        battleOrder.push([fighterStageTwo[i],fighterStageTwo[fighterStageTwo.length-i-1]])
                                    }
                                    console.log(battleOrder)
                                    p=1
                                }
                                else if (props.stage == 3) {
                                    let finalStage = []
                                    for(let i = 0; i < fighters.length-1; i++) {
                                        if(fighters[i].stage == 3)
                                        finalStage.push(fighters[i])
                                    }
                                    console.log(finalStage)
                                    multiple(4, finalStage)
                                    i = 0
                                    p=1
                                }
                                else if (props.stage == 4) {
                                    let finalFighters =[]
                                    let thirdPlace = []
                                    for(let i = 0; i < fighters.length-1; i++) {
                                        if(fighters[i].stage == 4)
                                        finalFighters.push(fighters[i])
                                        if(fighters[i].stage == 3)
                                        thirdPlace.push(fighters[i])
                                    }
                                    battleOrder.push([finalFighters[0], finalFighters[1]])
                                    battleOrder.push([thirdPlace[0], thirdPlace[1]])
                                    p = 1
                                }
                            }
        }
        else if(fighters.length == 17){
            console.log("eh")
        }
        else if(fighters.length <= 24) {
            for(let r = 0; r <= 1; r++)
                for(let m = 0; m <= 1; m++)    
                    for(let p = 0; p <= 1; p++)
                        for(let f = 0; f <= 1; f++)
                            for(let t = 0; t <= 1; t++)
                                for(let z = 0; z <= 1; z++)
                                    if(data[r]+data[m]+data[p]+data[f]+data[t]+data[z] == fighters.length){
                                        if(props.stage < 2) {
                                            multiple(data[r], props.fighters)
                                            multiple(data[m], props.fighters)
                                            multiple(data[p], props.fighters)
                                            multiple(data[f], props.fighters)
                                            multiple(data[t], props.fighters)
                                            multiple(data[z], props.fighters)
                                            i = 0
                                            m = 1
                                            p = 1
                                            f = 1
                                            t = 1
                                            z = 1
                                            r = 1
                                        } 
                                        else if(props.stage == 2) {
                                            let fighterStageTwo = []
                                            for(let i = 0; i < fighters.length-1; i++) {
                                                if(fighters[i].stage == 2)
                                                    fighterStageTwo.push(fighters[i])
                                            }
                                            for(let i = 0; i < fighterStageTwo.length-1; i = i+2){
                                                if(i==8){
                                                    battleOrder.push([fighterStageTwo[i],fighterStageTwo[5]])
                                                }
                                                else if(i==10){
                                                    battleOrder.push([fighterStageTwo[i],fighterStageTwo[3]])
                                                }
                                                else{
                                                let b = ((fighterStageTwo.length+i-5)%12)
                                                console.log(b);
                                                battleOrder.push([fighterStageTwo[i],fighterStageTwo[b]])
                                                }
                                            }
                                            console.log(battleOrder)
                                            m=1
                                        }
                                        else if(props.stage == 3){
                                            let fighterStageThree = []
                                            for(let i = 0; i < fighters.length-1; i++) {
                                                if(fighters[i].stage == 3)
                                                fighterStageThree.push(fighters[i])
                                            }
                                            for(let i = 0; i < fighterStageThree.length; i+=2){
                                                battleOrder.push([fighterStageThree[i],fighterStageThree[i+1]])
                                            }
                                            r=1
                                        } 
                                        else if (props.stage == 4) {
                                            let finalFighters =[]
                                            let thirdPlace = []
                                            for(let i = 0; i < fighters.length-1; i++) {
                                                if(fighters[i].stage == 4)
                                                finalFighters.push(fighters[i])
                                                if(fighters[i].stage == 3)
                                                thirdPlace.push(fighters[i])
                                            }
                                            battleOrder.push([finalFighters[0], finalFighters[1]])
                                            battleOrder.push([thirdPlace[0], thirdPlace[1]])
                                            r = 1
                                        }
                                    }
        }
        else if(fighters.length <= 32){
            for(let q = 0; q <= 1; q++)
                for(let y = 0; y <= 1; y++)
                    for(let r = 0; r <= 1; r++)
                        for(let m = 0; m <= 1; m++)    
                            for(let p = 0; p <= 1; p++)
                                for(let f = 0; f <= 1; f++)
                                    for(let t = 0; t <= 1; t++)
                                        for(let z = 0; z <= 1; z++)
                                            if(data[q]+data[y]+data[r]+data[m]+data[p]+data[f]+data[t]+data[z] == fighters.length){
                                                if(props.stage < 2) {
                                                    multiple(data[q], props.fighters)
                                                    multiple(data[y], props.fighters)
                                                    multiple(data[r], props.fighters)
                                                    multiple(data[m], props.fighters)
                                                    multiple(data[p], props.fighters)
                                                    multiple(data[f], props.fighters)
                                                    multiple(data[t], props.fighters)
                                                    multiple(data[z], props.fighters)
                                                    i = 0
                                                    m = 1
                                                    p = 1
                                                    f = 1
                                                    t = 1
                                                    z = 1
                                                    r = 1
                                                    y = 1
                                                    q = 1
                                                }  
                                                else if(props.stage == 2) {
                                                    let fighterStageTwo = []
                                                    for(let i = 0; i < fighters.length-1; i++) {
                                                        if(fighters[i].stage == 2)
                                                            fighterStageTwo.push(fighters[i])
                                                    }
                                                    for(let i = 0; i < fighterStageTwo.length-1; i = i+2){
                                                        
                                                        console.log(i)
                                                        battleOrder.push([fighterStageTwo[i],fighterStageTwo[fighterStageTwo.length-1-i]])
                                                        
                                                    }
                                                    q=1
                                                }
                                                else if(props.stage == 3) {
                                                    let fighterStageThree = []
                                                    for(let i = 0; i < fighters.length-1; i++) {
                                                        if(fighters[i].stage == 2)
                                                            fighterStageThree.push(fighters[i])
                                                    }
                                                    for(let i = 0; i < fighterStageThree.length; i+=2){
                                                        battleOrder.push([fighterStageThree[i], fighterStageThree[i+1]])
                                                    }
                                                    q = 1
                                                }
                                                else if(props.stage == 4) {
                                                    let fighterStage4 = []
                                                    for(let i = 0; i < fighters.length-1; i++) {
                                                        if(fighters[i].stage == 2)
                                                        fighterStage4.push(fighters[i])
                                                    }
                                                    for(let i = 0; i < fighterStage4.length; i+=2){
                                                        battleOrder.push([fighterStage4[i], fighterStage4[i+1]])
                                                    }
                                                    q = 1
                                                }
                                                else if (props.stage == 5) {
                                                    let finalFighters =[]
                                                    let thirdPlace = []
                                                    for(let i = 0; i < fighters.length-1; i++) {
                                                        if(fighters[i].stage == 4)
                                                        finalFighters.push(fighters[i])
                                                        if(fighters[i].stage == 3)
                                                        thirdPlace.push(fighters[i])
                                                    }
                                                    battleOrder.push([finalFighters[0], finalFighters[1]])
                                                    battleOrder.push([thirdPlace[0], thirdPlace[1]])
                                                    q = 1
                                                }
                                            }   
        }
        setCurrentOrder(battleOrder)
        setBattleOrder([])
    }

    return (
    <>
    {props.stage == 0 ?
    <>
    <h4 align = {"center"}>БОИ</h4>
    <Grid container spacing={1}>
    
            <Grid item xs={12} md={12}>
            <TableContainer component={Item}>
            <Table   size="medium" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "none"}} align="left">№</TableCell>
                    <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "none"}} align="left">ФИО</TableCell>
                    <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "none"}} align="left">Клуб</TableCell>
                    <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "none", borderLeft: "3px solid #262E3E"}} align="left">№</TableCell>
                    <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "none"}} align="left">ФИО</TableCell>
                    <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "none"}} align="left">Клуб</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {currentOrder && currentOrder.map((fighter, index) => (
                    <TableRow
                    key={index}
                    
                    >
                    <TableCell sx={{backgroundColor: (index%2 !== 0) ? "#3B414E" : "#323846", color:"white", borderBottom: "none"}} component="th" scope="row"><div className="cell-name-small">{fighter[0].number}</div></TableCell>
                    <TableCell sx={{backgroundColor: (index%2 !== 0) ? "#3B414E" : "#323846", color:"white", borderBottom: "none"}} component="th" scope="row"><div className="cell-name-small">{fighter[0].surname} {fighter[0].name[0]}. {fighter[0].patronymic[0]}</div></TableCell>
                    <TableCell sx={{backgroundColor: (index%2 !== 0) ? "#3B414E" : "#323846", color:"white", borderBottom: "none", borderRight: "3px solid #262E3E",}} component="th" scope="row"><div className="cell-club-small">{fighter[0].club}</div></TableCell>
                    <TableCell sx={{backgroundColor: (index%2 !== 0) ? "#3B414E" : "#323846", color:"white", borderBottom: "none", }} component="th" scope="row"><div className='cell-name-small'>{fighter[1].number}</div></TableCell>
                    <TableCell sx={{backgroundColor: (index%2 !== 0) ? "#3B414E" : "#323846", color:"white", borderBottom: "none"}} component="th" scope="row"><div className='cell-name-small'>{fighter[1].surname} {fighter[1].name[0]}. {fighter[1].patronymic[0]}</div></TableCell>
                    <TableCell sx={{backgroundColor: (index%2 !== 0) ? "#3B414E" : "#323846", color:"white", borderBottom: "none"}} component="th" scope="row"><div className='cell-club-small'>{fighter[1].club}</div></TableCell>
                    
                    </TableRow>
                ))}

                </TableBody>
            </Table>
            </TableContainer>
        </Grid>
    </Grid>
    </> :
    <>
    <h4 align = {"center"}>              БОИ</h4>
    <Grid container >
    
            <Grid item xs={12} md={12}>
            <TableContainer component={Item}>
            <Table   size="medium" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "none"}} align="left">№</TableCell>
                    <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "none"}} align="left">ФИО</TableCell>
                    <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "none"}} align="left">Клуб</TableCell>
                    <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "none"}} align="center">Счет</TableCell>
                    <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "none"}} align="left">ФИО</TableCell>
                    <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "none"}} align="left">Клуб</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {currentOrder && currentOrder.map((fighter, index) => (
                    <TableRow
                    key={index}
                    
                    >
                    <TableCell sx={{backgroundColor: (index%2 !== 0) ? "#3B414E" : "#323846", color:"white", borderBottom: "none"}} component="th" scope="row"><div className="cell-number-small">{index+1}</div></TableCell>
                    <TableCell sx={{backgroundColor: (index%2 !== 0) ? "#3B414E" : "#323846", color:"white", borderBottom: "none"}} component="th" scope="row"><div className="cell-name-small">{fighter[0].surname} {fighter[0].name[0]}. {fighter[0].patronymic[0]}</div></TableCell>
                    <TableCell sx={{backgroundColor: (index%2 !== 0) ? "#3B414E" : "#323846", color:"white", borderBottom: "none"}} component="th" scope="row"><div className="cell-club-small">{fighter[0].club}</div></TableCell>
                    <TableCell sx={{backgroundColor: (index%2 !== 0) ? "#3B414E" : "#323846", color:"white", borderBottom: "none", }} align="center" ><div className='cell-name-small'>{fighter[0].scores}:{fighter[1].scores}</div></TableCell>
                    <TableCell sx={{backgroundColor: (index%2 !== 0) ? "#3B414E" : "#323846", color:"white", borderBottom: "none"}} component="th" scope="row"><div className='cell-name-small'>{fighter[1].surname} {fighter[1].name[0]}. {fighter[1].patronymic[0]}</div></TableCell>
                    <TableCell sx={{backgroundColor: (index%2 !== 0) ? "#3B414E" : "#323846", color:"white", borderBottom: "none"}} component="th" scope="row"><div className='cell-club-small'>{fighter[1].club}</div></TableCell>
                    
                    </TableRow>
                ))}

                </TableBody>
            </Table>
            </TableContainer>
        </Grid>
    </Grid>
    </>}
    </>
    )
}

export default OrderOfTiltyard
