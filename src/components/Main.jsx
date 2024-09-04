import Tags from "./Tags";
import Scores from "./Scores";
import Review from "./Review";
import TextField from '@mui/material/TextField';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Box from '@mui/material/Box';
import StepButton from '@mui/material/StepButton';
import { useEffect, useState } from 'react';
import axios from "axios";
import Preview from "./Preview";

const steps = ['İnceleme yazısı', "Etiketler", "Konum", "Puanlar", "Fotoğraflar", "Video", "Kaydet"];
function Main() {
    const [error, setError] = useState("")
    const [activeStep, setActiveStep] = useState(0);

    const [reviewText, setReviewText] = useState("")
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [scores, setScores] = useState([])
    const [locationLink, setLocationLink] = useState("")
    const [photoLink, setPhotoLink] = useState("")
    const [videoLink, setVideoLink] = useState("")

    useEffect(() => {
        console.log("")
        console.log("Review Text: ", reviewText);
        console.log("Selected Tags: ", selectedTags);
        console.log("Scores: ", scores);
        console.log("Location Link: ", locationLink);
        console.log("Photo Link: ", photoLink);
        console.log("Video Link: ", videoLink);
    }, [reviewText, selectedTags, scores, locationLink, photoLink, videoLink])

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/getScoreFields')
            .then(response => {
                if (typeof response.data === 'object') {
                    setScores(response.data)
                }
                else {
                    setError("Error fetching data")
                }
            })
    }, [])
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/getTags')
            .then(response => {
                if (typeof response.data === 'object') {
                    setTags(response.data)
                }
                else {
                    setError("Error fetching data")
                }
            })
    }, [])
    const handleStep = (step) => () => {
        setActiveStep(step);
    };
    return (
        error ? <div>{error}</div> :
            <Box sx={{ width: '100%', maxWidth: '100%' }}>
                <Box
                    sx={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "50%",
                        padding: "20px",
                        borderRadius: "20px",
                        backgroundColor: "#cacfb3",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                        textAlign: "center",
                    }}>
                    <Box className="content-container">
                        {activeStep == 0 ? <Review text={reviewText} setText={setReviewText} /> : null}
                        {/*TAGLARA ARAMA ÖZELLİĞİ EKLE ARADIKÇA ARANAN TAGLER GÖRÜNSÜN PLS TŞK KG*/}
                        {activeStep == 1 ? <Tags tags={tags} setTags={setTags} selectedItems={selectedTags} setSelectedItems={setSelectedTags} /> : null}
                        {activeStep == 2 ? <Box sx={{ width: "100%", maxWidth: '100%' }}>
                            <TextField fullWidth label="Enter Google Maps link of the location..." value={locationLink} id="fullWidth" onChange={(event) => {
                                setLocationLink(event.target.value);
                            }} />
                        </Box> : null}
                        {activeStep == 3 ? <Scores scoreFields={scores} /> : null}
                        {activeStep == 4 ? <Box sx={{ width: "100%", maxWidth: '100%' }}>
                            <TextField fullWidth label="Enter Google Drive link of the photos..." value={photoLink} id="fullWidth" onChange={(event) => {
                                setPhotoLink(event.target.value);
                            }} />
                        </Box> : null}
                        {activeStep == 5 ? <Box sx={{ width: "100%", maxWidth: '100%' }}>
                            <TextField fullWidth label="Enter Google Drive link of the video..." value={videoLink} id="fullWidth" onChange={(event) => {
                                setVideoLink(event.target.value);
                            }} />
                        </Box> : null}
                        {activeStep == 6 ?
                            <Preview
                                reviewText={reviewText}
                                selectedTags={selectedTags}
                                locationLink={locationLink}
                                scores={scores}
                                photoLink={photoLink}
                                videoLink={videoLink}
                            /> : null}
                    </Box>
                </Box >
                <Box className="stepper-container"
                    sx={{
                        position: "fixed",
                        bottom: "10%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "50%",
                        padding: "20px",
                        borderRadius: "20px",
                        backgroundColor: "#cacfb3",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                        textAlign: "center",
                    }}>
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepButton
                                    icon={
                                        <Box
                                            sx={{
                                                width: "30px",
                                                height: "30px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: "50%",
                                                backgroundColor: activeStep === index ? "#8d6e63" : "rgba(0, 0, 0, 0.5)",
                                                color: "white"
                                            }}>
                                            {index + 1}
                                        </Box>
                                    }
                                    TouchRippleProps={{
                                        sx: {
                                            height: "50%",
                                            width: "90%",
                                            borderRadius: "20px",
                                            margin: "0",
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            msTransform: "translate(-50%, -50%);",
                                            transform: "translate(-50%, -50%)"
                                        }
                                    }}
                                    onClick={handleStep(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </Box>
    )
}

export default Main