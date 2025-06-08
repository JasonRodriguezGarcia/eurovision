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

// para dialogVideo
import {
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";


//para select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// fin select


const EurovisionVotePage = () => {
    
    const navigate = useNavigate()
    const [idVotante, setIdVotante] = useState("")
    const [idActuacion, setIdActuacion] = useState(0)
    const [voto, setVoto] = useState(0)
    const [actuaciones, setActuaciones] = useState([])
    const [votantes, setVotantes] = useState([])
    const [selectVotante, setSelectVotante] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [openViewDialogVideo, setOpenViewDialogVideo] = useState(false)
    const [closeViewDialog, setCloseViewDialog] = useState(true)
    const [urlVideo, setUrlVideo] = useState('')

    const lineasDatosVotantes = votantes.map((votante, index) => (
        <MenuItem key={index} value={votante.idVotante}>({votante.idVotante}) {votante.nombre} - {votante.codigoPais}</MenuItem>
    ))

    // const lineasDatosVoto = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((voto) => (
    //     <MenuItem key={voto} value={voto}>{voto}</MenuItem>
    // ))
    const lineasDatosVoto = Array.from({ length: 13 }, (_, i) => (
        <MenuItem key={i} value={i}>{i}</MenuItem>
    ));

    useEffect(() => {
        const getActuaciones = async () => {
            try {
                const response = await fetch (`http://localhost:5000/api/v1/eurovision/actuaciones`)
                if (!response.ok) {
                    throw new Error ("Error en consulta de actuaciones")
                }
                const datos = await response.json()
                console.log("Actuaciones: ", datos)
                setActuaciones(datos)
                setErrorMessage("")
            }
            catch(error) {
                console.log("Error retrieving Actuaciones: ", error)
            }
        }
        const getVotantes = async () => {
            try {
                const response = await fetch (`http://localhost:5000/api/v1/eurovision/votantes`)
                if (!response.ok) {
                    throw new Error ("Error en consulta de votantes")
                }
                const datos = await response.json()
                console.log("Votantes: ", datos)
                setVotantes(datos)
                setIdVotante(datos[0].idVotante)
                setErrorMessage("")
            }
            catch(error) {
                console.log("Error retrieving Votantes: ", error)
            }
        }
        getActuaciones()
        getVotantes()

    }, [])

    const handleFormSubmit = () => {

    }

    const handleOpenDialogVideo = (url) => {
        setUrlVideo(url)
        setOpenViewDialogVideo(true)
    }

    const handleIdVotante = (e) => {
        setIdVotante(e.target.value)
        console.log("evento select votante: ", e)
    }
    const handleVoto = (e) => {
        setVoto(e.target.value)
        console.log("evento select voto: ", e)
        console.log("imprimo state voto seleccionado: ", voto)
    }
    const handleDialog = (id) => {
        setOpenViewDialog(true)
        setIdActuacion(id)
        console.log("Actuacion seleccionada: ", id)
    }
    const handleSendVote = async () => {
        // mandar voto
        setOpenViewDialog(false)
            // crear user con datos de inputs
        const votacion = {
            idVotante: parseInt(idVotante),
            idActuacion: idActuacion,
            fechaVoto: new Date(),
            voto: parseInt(voto)
        }
        debugger
        console.log("Votacion: ", votacion)
        console.log("linea en blanco")
        try {
            // fetch POST y pasar user como cuerpo (body)
            const response = await fetch('http://localhost:5000/api/v1/eurovision/votos',
                {
                    method: 'POST',
                    headers: {'Content-type': 'application/json; charset=UTF-8'},
                    body: JSON.stringify(votacion)
                }
            )
            const respuesta = await response.json();
            console.log("Respuesta del backend en frontend: ", respuesta)
            if (!response.success) {
                throw new Error('Network response was not ok');
            }
            console.log("Mandar fetch")
        } catch (error) {
            console.log("Error al llamar desde frontend: ", error.message);
        }
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: "lightblue", alignItems: "center",
                width: "80vw"
        }}>
            <Dialog
              open={openViewDialog}
              onClose={()=> setOpenViewDialog(false)}
              aria-labelledby="viewDescription-dialog-title"
              aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="viewDescription-dialog-title">
                    Submit Vote
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {voto == 0 ? <> Ouch ... That really hurts !! <br /> </>: voto == 12 ? <> You really love this song !! <br /> </> : ""}
                        Pls confirm Vote !!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={()=> setOpenViewDialog(false)}>Disagree</Button> */}
                    <Button onClick={handleSendVote} 
                        variant="contained" autoFocus sx={{backgroundColor: "green"}}
                    >
                        VOTE !!
                    </Button>
                    <Button onClick={()=> setOpenViewDialog(false)} autoFocus variant="contained"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openViewDialogVideo}
                onClose={()=> setOpenViewDialogVideo(false)}
                // maxWidth="md"
                fullWidth

                aria-labelledby="viewDescription-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <IconButton
                    onClick={()=> setOpenViewDialogVideo(false)}
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "white",
                        zIndex: 10
                    }}
                >
                    <CloseIcon />
                    {/* Close */}
                </IconButton>
                <DialogContent
                    sx={{
                        padding: 0,
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "black"
                    }}
                    >
                    <iframe
                        width="100%"
                        height="480"
                        src= {`https://www.youtube.com/embed/${urlVideo}?autoplay=1`}
                        // src="https://www.youtube.com/embed/BvVxhbCW9rw"
                        // src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        //  src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        title="YouTube video"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        style={{ border: "none" }}
                    ></iframe>
                </DialogContent>
            </Dialog>


            {/* {datosEvents && datosEvents.map((evento, index) => (     */}
            <Typography variant="h2" component="h2">
                Welcome to Eurovision voting
            </Typography>
            <Typography component="p">
                Pls select voter and click on vote in one of the list
            </Typography>

            <Box component="div" sx={{display: "flex", alignItems: "center"}}>

                {/* UN BOX QUE ACTUA COMO UN FORMULARIO */}
                <Box  component="form" onSubmit={handleFormSubmit} sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    <Box component="div" sx={{display: "flex", gap: "15px", padding: "15px"}}>
                        <FormControl fullWidth>
                        {/* <FormControl sx={{width: "50%"}}> */}
                            <InputLabel id="demo-simple-select-label">Voter</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={idVotante}
                                label="Votante"
                                onChange={(e)=> handleIdVotante(e)}
                                    sx={{fontSize: "30px"}}
                            >
                                {lineasDatosVotantes}
                            </Select>
                        </FormControl>
                        <FormControl sx={{width: 100}}>
                            <InputLabel id="demo-simple-select-label2">Note</InputLabel>
                            <Select
                                labelId="demo-simple-select-label2"
                                id="demo-simple-select2"
                                value={voto}
                                label="Voto"
                                onChange={(e)=> handleVoto(e)}
                                sx={{fontSize: "30px"}}
                            >
                                {lineasDatosVoto}
                            </Select>
                        </FormControl>
                    </Box>
                    <TableContainer component={Paper} sx={{height: "60vh", overflow: "auto"}}>
                    <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right" sx={{fontSize: "20px"}}>Image</TableCell>
                                <TableCell align="right" sx={{fontSize: "20px"}}>Media</TableCell>
                                <TableCell align="right" sx={{fontSize: "20px"}}>Nombre artista</TableCell>
                                <TableCell align="right" sx={{fontSize: "20px"}}>Pais</TableCell>
                                <TableCell align="right" sx={{fontSize: "20px"}}>Titulo Cancion</TableCell>
                                <TableCell align="right" sx={{fontSize: "20px"}}> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {actuaciones.map((actuacion, index) => (
                            <TableRow
                                key={index}
                                sx={{padding: "10px inherit 10px inherit"}}
                            >
                                <TableCell component="th" scope="row" align="right">
                                    <Box component="img"
                                    // src={`http://localhost:5000/images/${index}.jpg`} alt={`imagen${index}`}
                                    // https://img.youtube.com/vi/${video.idvideo}/0.jpg
                                    // src={"https://img.youtube.com/vi/BvVxhbCW9rw/0.jpg"}  alt={`imagen${index}`}
                                    src={`https://img.youtube.com/vi/${actuacion.url_artista}/0.jpg`}  alt={`imagen${index}`}
                                    sx={{width: "60px", height: "60px", transition: "all 1s", 
                                            boxShadow: "10px 10px 10px 5px",
                                            boxSizing: "border-box",
                                            objectFit: "cover",
                                            "&:hover": {
                                                transform: "scale(2)",
                                            }
                                    ,}}
                                    />
                                    {/* {actuacion.picture} */}
                                </TableCell>
                                <TableCell align="right"
                                >
                                    <Button variant="contained" title="Play video" color="primary" onClick={()=> handleOpenDialogVideo(actuacion.url_artista)}>
                                        {/* Play */}
                                        <SmartDisplayIcon/>
                                    </Button>
                                </TableCell>
                                <TableCell align="right">{actuacion.nombre_artista}</TableCell>
                                <TableCell align="right">{actuacion.code_pais}</TableCell>
                                <TableCell align="right">{actuacion.titulo_cancion}</TableCell>
                                <TableCell align="right">
                                    <ButtonGroup variant="contained" aria-label="Basic button group">
                                        <Button title="Submit Vote !!"  
                                        onClick={()=> handleDialog(actuacion.id)}
                                        sx={{ backgroundColor: "green", color: "white", fontSize: "20px"}}>
                                        🗳vote
                                        </Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    {/* <TextField value={date} id="date" variant="filled" onChange={(e)=> setDate(e.target.value)} disabled={true}/> */}

                    {/* <Button type="submit" onClick={handleFormSubmit} variant="contained" color="primary"> */}
                    <Box sx={{display: "flex", gap: "20px", justifyContent: "center"}}>
                        {/* <Button type="submit"variant="contained" color="primary">
                            Submit Vote !!
                        </Button> */}
                        <Button type="button" onClick={()=> navigate('/ranking')} variant="contained" color="primary">
                            RANKING
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default EurovisionVotePage