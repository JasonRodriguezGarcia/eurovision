import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, TextField, } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';

// datos para una tabla
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// fin datos tabla
// para dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// fin dialog
//para select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// fin select


const EurovisionRankingPage = () => {
 
    const navigate = useNavigate()
    const [idVotante, setIdVotante] = useState("")
    const [idActuacion, setIdActuacion] = useState(0)
    const [voto, setVoto] = useState(1)
    const [actuaciones, setActuaciones] = useState([])
    const [votantes, setVotantes] = useState([])
    const [selectVotante, setSelectVotante] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [closeViewDialog, setCloseViewDialog] = useState(true)


    useEffect(()=> {
        console.log("ordenado: ", actuaciones)

    }, [actuaciones])

    useEffect(() => {
        const getActuaciones = async () => {
            try {
                const response = await fetch (`http://localhost:5000/api/v1/eurovision/ranking`)
                if (!response.ok) {
                    throw new Error ("Error en consulta de actuaciones")
                }
                const datos = await response.json()
                console.log("Actuaciones: ", datos)

                setActuaciones([...datos].sort((a, b) => b.nota - a.nota))
                setErrorMessage("")
            }
            catch(error) {
                console.log("Error retrieving Actuaciones: ", error)
            }
        }
        getActuaciones()
    }, [])



    return (
                <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: "lightblue", alignItems: "center",
                width: "80vw"
        }}>

                <TableContainer component={Paper} sx={{height: "60vh", overflow: "auto"}}>
                    <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {/* <TableCell>Marca</TableCell> */}
                                <TableCell align="right" sx={{fontSize: "20px"}}>POINTS</TableCell>
                                <TableCell align="right" sx={{fontSize: "20px"}}>Country</TableCell>
                                <TableCell align="center" sx={{fontSize: "20px"}}>Image</TableCell>
                                <TableCell align="right" sx={{fontSize: "20px"}}>Artist name</TableCell>
                                <TableCell align="right" sx={{fontSize: "20px"}}>Song title</TableCell>
                                {/* <TableCell align="right" sx={{fontSize: "20px"}}> </TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {actuaciones.map((actuacion, index) => (
                            <TableRow
                            key={index}
                            sx={{padding: "10px inherit 10px inherit"}}
                            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="right" sx={{fontSize: "20px"}}>{actuacion.nota}</TableCell>
                            <TableCell align="right">{actuacion.code_pais}</TableCell>
                            <TableCell component="th" scope="row" align="right">
                                <Box component="img"
                                src={`http://localhost:5000/images/${index}.jpg`}  alt={`imagen${index}`}
                                sx={{with: "70px", height: "70px", transition: "all 1s",
                                        margin: "auto", 
                                        boxShadow: "10px 10px 10px 5px",
                                        boxSizing: "border-box",
                                        display: "cover",
                                        "&:hover": {
                                            transform: "scale(2.5)",
                                            cursor: "pointer",
                                        }
                                ,}}
                                />
                                {/* {actuacion.picture} */}
                            </TableCell>
                            <TableCell align="right">{actuacion.nombre_artista}</TableCell>
                            <TableCell align="right">{actuacion.titulo_cancion}</TableCell>
                            {/* <TableCell align="right">
                                <ButtonGroup variant="contained" aria-label="Basic button group">
                                    <Button title="Submit Vote !!"  
                                    onClick={()=> handleDialog(actuacion.id)}
                                    sx={{ backgroundColor: "green", color: "white", fontSize: "20px"}}>
                                    🗳vote
                                    </Button>
                                </ButtonGroup>
                            </TableCell> */}
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        </Box>
    )
}

export default EurovisionRankingPage