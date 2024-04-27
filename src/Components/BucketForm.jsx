import {useState, useEffect} from 'react';
import { Modal, Typography, Button, Box, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, TextField, Input, FormHelperText } from '@mui/material';


// Importing the service
import {createBucketService, } from '../services/bucketServices.js' 
import {createBallService} from '../services/ballServices.js'

export default function BucketForm() {
    // only for the testing purpose ..
    const data = [
        {
        ballColor : 'red',
        ballVolume : 10
    },
        {
        ballColor : 'blue',
        ballVolume : 5
    },
        {
        ballColor : 'green',
        ballVolume : 10
        }, {
            ballColor : 'green',
            ballVolume : 10
            }, {
                ballColor : 'green',
                ballVolume : 10
                }, {
                    ballColor : 'green',
                    ballVolume : 10
                    },
    ]



    const [bucketData , setBucketData] = useState({bucketName:'', volume:''})
    const [ballData , setBallData] = useState({ballColor:'', ballVolume:''})


    const handleBucketFormChange = (e)=>{
        setBucketData({...bucketData, [e.target.name] : e.target.value })
    }

    const handleBallFormChange = (e)=>{
        setBucketData({...ballData, [e.target.name] : e.target.value })
    }

    const handleBasketForm = async(e)=>{
        e.preventDefault();
        const creatingBucket = await createBucketService(bucketData)        
    }

    const handleBallForm = async(e)=>{
        e.preventDefault();
        const creatingBall = await createBallService(ballData)
    }

    const handlePlaceBallForm = (e)=>{
        e.preventDefault();
        alert('hi')
        console.log('form data :: ' ,e)
    }



    return (
        <>
            <Box>
                <Typography variant='h2' textAlign={'center'} >Assesment-Test-(suraj-kumar)</Typography>
                <Box sx={{ border: '2px solid red' }} mt={4} p={2} >
                    <Grid container spacing={1} justifyContent={'space-between'}>

                        <Box sx={{  position:'relative' }} height={300} width={600} >
                            <Grid item xs={5} md={6} >
                                <Box sx={{}} ><Typography variant='h6'  >Bucket-Form</Typography></Box>
                                <Box sx={{ border: '2px solid black',position: 'absolute',width: '100%',height:'88%'  }}>
                                    <Box sx={{p:2, mt:2, minWidth: '200px'}} >
                                        <form onSubmit={handleBasketForm}>
                                        <Typography variant='subtitle1' gutterBottom >Basket Name: <input type='text' id="Basket" style={{ padding: '6px', boxSizing: 'border-box' }} name='bucketName' value={bucketData.bucketName} onChange={handleBucketFormChange} required/> </Typography>
                                        <Typography variant='subtitle1' gutterBottom >Volume (in inches): <input type='number' id="Basket" style={{ padding: '6px', boxSizing: 'border-box' }} name='volume' value={bucketData.volume} onChange={handleBucketFormChange} required /> </Typography>
                                        <Button variant='contained' color='warning' sx={{mt:3}} type='submit'>Save</Button>
                                        </form>
                                    </Box>
                                </Box>
                            </Grid>
                        </Box>

                        <Box sx={{  position:'relative'}} height={300} width={600}  >
                            <Grid item xs={5} md={6} >
                                <Box sx={{ }} ><Typography variant='h6'>Ball-Form</Typography></Box>
                                <Box sx={{ border: '2px solid black',position: 'absolute',width: '100%',height:'88%'  }}>
                                    <Box sx={{p:2 , mt:2, minWidth:'200px'}}>
                                    <form onSubmit={handleBallForm}>
                                        <Typography variant='subtitle1' gutterBottom >Ball Name: <input type='text' id="Basket" style={{ padding: '6px', boxSizing: 'border-box' }} name='ballColor' value={ballData.ballColor} onChange={handleBallFormChange} required/> </Typography>
                                        <Typography variant='subtitle1' gutterBottom >Volume (in inches): <input type='number' id="Basket" style={{ padding: '6px', boxSizing: 'border-box' }} name='ballVolume' value={ballData.ballVolume} onChange={handleBallFormChange} required/> </Typography>
                                        <Button variant='contained' color='warning' sx={{mt:3}} type='submit'>Save</Button>
                                    </form>
                                    </Box>
                                </Box>

                            </Grid>
                        </Box>

                        <Box sx={{  position:'relative'}} height={300} width={600} >

                            <Grid item xs={5} md={6} >
                                <Box sx={{  }} ><Typography variant='h6'  >Bucket-Suggestion</Typography></Box>
                                <Box sx={{ border: '2px solid black',position: 'absolute',width: '100%',height:'88%' , overflow:'auto' }}>
                                    <Box sx={{p:2 , mt:2, minWidth:'200px'}}>
                                    <form onSubmit={handlePlaceBallForm}>                                        
                                        {
                                            data.map((item, index)=>(
                                                <Typography key={index} variant='subtitle1' gutterBottom>{item.ballColor}: <input type='number' id={`Ball_${index}`} style={{ padding: '6px', boxSizing: 'border-box' }} required /> </Typography>
                                            ))
                                        }
                                        <Button variant='contained' color='warning' sx={{mt:3}} type='submit'>Place Balls In Buckets</Button>
                                    </form>
                                    </Box>
                                </Box>

                            </Grid>
                        </Box>

                        <Box sx={{  position:'relative'}} height={300} width={600}  >
                            <Grid item xs={5} md={6} >
                                <Box sx={{ }} ><Typography variant='h6'>Result</Typography></Box>
                                <Box sx={{ border: '2px solid black',position: 'absolute',width: '100%',height:'88%' }} >                                </Box>
                            </Grid>
                        </Box>
                    </Grid>
                </Box>

            </Box>
        </>
    )
}
