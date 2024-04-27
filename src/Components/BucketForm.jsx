import { useState, useEffect } from 'react';
import { Modal, Typography, Button, Box, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, TextField, Input, FormHelperText, Paper } from '@mui/material';

// Importing the service
import { createBucketService, placeBallService, getBucketService } from '../services/bucketServices.js'
import { createBallService, getBallService } from '../services/ballServices.js'

// Importing libraies
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BucketForm() {
    const [bucketData, setBucketData] = useState({ bucketName: '', volume: '' })
    const [ballData, setBallData] = useState({ ballColor: '', ballVolume: '' })
    const [ballPlaceData, setballPlaceData] = useState({ ballData: [{ ballName: '', ballCounts: 0 }] })
    const [allBallData, setAllBallData] = useState([])
    const [allBucketData, setAllBucketData] = useState([])
    const [refreshBall, setRefreshBall] = useState(false)
    const [refreshBuckets, setRefreshBucket] = useState(false)

    const handleBucketFormChange = (e) => {
        setBucketData({ ...bucketData, [e.target.name]: e.target.value })
    }

    const handleBallFormChange = (e) => {
        setBallData({ ...ballData, [e.target.name]: e.target.value })
    }

    const handleBasketForm = async (e) => {
        e.preventDefault();
        const creatingBucket = await createBucketService(bucketData)
        toast(creatingBucket.message);
        setRefreshBucket(!refreshBuckets);

    }

    const handleBallForm = async (e) => {
        e.preventDefault();
        const creatingBall = await createBallService(ballData)
        toast(creatingBall.message);
        setRefreshBall(!refreshBall);
    }

    const updateBallPlaceData = (index, ballName, ballCounts) => {
        const updateBallData = [...ballPlaceData.ballData];
        updateBallData[index] = { ballName, ballCounts };
        setballPlaceData({ ballData: updateBallData });
    }

    const handlePlaceBallForm = async (e) => {
        e.preventDefault();
        const placeBall = await placeBallService(ballPlaceData)
        toast(placeBall.message);
        setRefreshBucket(!refreshBuckets);
    }

    // now has to use the use effect for ball data
    useEffect(() => {
        const fetchBallData = async () => {
            try {
                const ballDataResponse = await getBallService();
                setAllBallData(ballDataResponse.data);
                // Initialize ballPlaceData with the same number of elements as allBallData
                setballPlaceData({
                    ballData: ballDataResponse.data.map(() => ({ ballName: '', ballCounts: 0 }))
                });
            } catch (error) {
                console.log('error : ', error);
            }
        };
        fetchBallData();
    }, [refreshBall]);

    // now has to use the use effect for bucket data
    useEffect(() => {
        const fetchBallData = async () => {
            try {
                const bucketDataResponse = await getBucketService();
                setAllBucketData(bucketDataResponse.data);
            } catch (error) {
                console.log('error : ', error);
            }
        };
        fetchBallData();
    }, [refreshBuckets]);


    return (
        <>
            <Box>
                <Typography variant='h2' textAlign={'center'} >Assesment-Test-(suraj-kumar)</Typography>
                <Box sx={{ border: '2px solid red' }} mt={4} p={2} >
                    <Grid container spacing={1} justifyContent={'space-between'}>
                        {/*  this is bucket form */}

                        <Box sx={{ position: 'relative' }} height={300} width={600} >
                            <Grid item xs={5} md={6} >
                                <Box sx={{}} ><Typography variant='h6'  >Bucket-Form</Typography></Box>
                                <Box sx={{ border: '2px solid black', position: 'absolute', width: '100%', height: '88%' }}>
                                    <Box sx={{ p: 2, mt: 2, minWidth: '200px' }} >
                                        <form onSubmit={handleBasketForm}>
                                            <Typography variant='subtitle1' gutterBottom >Basket Name: <input type='text' id="Basket" style={{ padding: '6px', boxSizing: 'border-box' }} name='bucketName' value={bucketData.bucketName} onChange={handleBucketFormChange} required /> </Typography>
                                            <Typography variant='subtitle1' gutterBottom >Volume (in inches): <input type='number' id="Basket" style={{ padding: '6px', boxSizing: 'border-box' }} name='volume' value={bucketData.volume} onChange={handleBucketFormChange} required /> </Typography>
                                            <Button variant='contained' color='warning' sx={{ mt: 3 }} type='submit'>Save</Button>
                                        </form>
                                    </Box>
                                </Box>
                            </Grid>
                        </Box>

                        {/*  this is ball form */}

                        <Box sx={{ position: 'relative' }} height={300} width={600}  >
                            <Grid item xs={5} md={6} >
                                <Box sx={{}} ><Typography variant='h6'>Ball-Form</Typography></Box>
                                <Box sx={{ border: '2px solid black', position: 'absolute', width: '100%', height: '88%' }}>
                                    <Box sx={{ p: 2, mt: 2, minWidth: '200px' }}>
                                        <form onSubmit={handleBallForm}>
                                            <Typography variant='subtitle1' gutterBottom >Ball Name: <input type='text' id="Basket" style={{ padding: '6px', boxSizing: 'border-box' }} name='ballColor' value={ballData.ballColor} onChange={handleBallFormChange} required /> </Typography>
                                            <Typography variant='subtitle1' gutterBottom >Volume (in inches): <input type='number' id="Basket" style={{ padding: '6px', boxSizing: 'border-box' }} name='ballVolume' value={ballData.ballVolume} onChange={handleBallFormChange} required /> </Typography>
                                            <Button variant='contained' color='warning' sx={{ mt: 3 }} type='submit'>Save</Button>
                                        </form>
                                    </Box>
                                </Box>

                            </Grid>
                        </Box>

                        {/*  this is ballplace  form */}


                        <Box sx={{ position: 'relative' }} height={300} width={600} >

                            <Grid item xs={5} md={6} >
                                <Box ><Typography variant='h6'  >Bucket-Suggestion</Typography></Box>
                                <Box sx={{ border: '2px solid black', position: 'absolute', width: '100%', height: '88%', overflow: 'auto' }}>
                                    <Box sx={{ p: 2, mt: 2, minWidth: '200px' }}>
                                        <form onSubmit={handlePlaceBallForm}>
                                            {
                                                allBallData.map((item, index) => (
                                                    <Typography key={index} variant='subtitle1' gutterBottom>{item.ballColor}: <input type='number' id={`Ball_${index}`} style={{ padding: '6px', boxSizing: 'border-box' }} value={ballPlaceData.ballData[index].ballCounts}
                                                        onChange={(e) => updateBallPlaceData(index, item.ballColor, parseInt(e.target.value))} required /> </Typography>
                                                ))
                                            }
                                            <Button variant='contained' color='warning' sx={{ mt: 3 }} type='submit'>Place Balls In Buckets</Button>
                                        </form>
                                    </Box>
                                </Box>

                            </Grid>
                        </Box>

                        {/*  this is result form */}

                        <Box sx={{ position: 'relative', height: 300, width: 600 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant='h6'>Result</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ border: '2px solid black', position: 'absolute', width: '100%', height: '88%' }}>
                                        <Box sx={{ overflow: 'auto', height: '100%', paddingRight: 2 }}>
                                            <Typography variant='h7'>Following are the suggested buckets.</Typography>
                                            {allBucketData.map((bucket, index) => (
                                                <Box key={index} sx={{ borderBottom: 1, borderColor: 'divider', pt: 1, pb: 1, mt: 4 }}>
                                                    <Typography variant="subtitle1" sx={{ whiteSpace: 'pre-wrap' }}>
                                                        {bucket.bucketName}: {bucket.bucketData}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                    </Grid>
                </Box>

            </Box>
            <ToastContainer />
        </>
    )
}
