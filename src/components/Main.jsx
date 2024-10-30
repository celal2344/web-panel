import Tags from "./Tags";
import Scores from "./Scores";
import Review from "./Review";
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Box from '@mui/material/Box';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import axios from "axios";
import Preview from "./Preview";
import Media from "./Media";
import LocationSearch from "./LocationSearch";

const steps = ['İnceleme yazısı', "Etiketler", "Konum", "Puanlar", "Medya"];
function Main() {
    const [error, setError] = useState("")
    const [activeStep, setActiveStep] = useState(0);
    const [preview, setPreview] = useState(false)
    const [modal, setModal] = useState(false)
    const [emptyFields, setEmptyFields] = useState([])

    const [reviewText, setReviewText] = useState("")
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [scores, setScores] = useState([])
    const [location, setLocation] = useState({})
    const [media, setMedia] = useState([])
    //TODO: ADD A CONTROL WHEN SAVE BUTTON IS PRESSED AND ASK USER IF THEY WANT TO SEND THE DATA WITH MISSING FIELDS

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + '/getScoreFields')
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
        axios.get(import.meta.env.VITE_API_URL + '/getTags')
            .then(response => {
                if (typeof response.data === 'object') {
                    setTags(response.data)
                }
                else {
                    setError("Error fetching data")
                }
            })
    }, [])
    const checkSubmit = () => {
        let tempEmptyFields = [];

        if (reviewText === "") {
            console.log("İnceleme yazısı boş bırakılamaz");
            tempEmptyFields.push("İnceleme yazısı");
        }

        if (selectedTags.length === 0) {
            console.log("tag boş bırakılamaz");
            tempEmptyFields.push("Etiketler");
        }

        if (Object.keys(location).length === 0) {
            tempEmptyFields.push("Konum");
        }

        if (scores.map((item) => (
            item.description !== "" || item.rating > 0 ?
                { name: item.name, description: item.description, rating: item.rating }
                : null))
            .filter(item => item !== null).length === 0) {
            tempEmptyFields.push("Puanlar");
        }

        if (media.length === 0) {
            tempEmptyFields.push("Medya");
        }

        if (tempEmptyFields.length > 0) {
            setEmptyFields(tempEmptyFields);
            setModal(true);
        } else {
            saveLocation();
        }
    }

    const saveLocation = async () => {
        try {
            console.log(media);
            const postMedia = media.map((item) => ({
                id: item.id,
                type: item.type,
            }));
            const postScores = scores.map((item) => (
                item.description !== "" || item.rating > 0 ?
                    { name: item.name, description: item.description, rating: item.rating }
                    : null))
                .filter(item => item !== null);
            const place = {
                review: reviewText,
                tags: selectedTags,
                scores: postScores,
                location: location,
                images: postMedia
            }
            console.log(place)
            const response = await axios.post(import.meta.env.VITE_API_URL + '/addPlace', place)
            console.log(response.status)
        } catch (error) {
            console.log(error)
        }
    }
    const handleStep = (step) => () => {
        setActiveStep(step);
    };
    return (
        error ? <div>{error}</div> :
            <Box sx={{ width: '100%', maxWidth: '100%' }}>
                {
                    !preview ?
                        <>
                            <Box className="outer-container"
                                sx={{
                                    position: "fixed",
                                    top: "30%",
                                    height: "65%",
                                    left: "50%",
                                    transform: "translate(-50%, -35%)",
                                    width: "900px",
                                    padding: "20px",
                                    borderRadius: "20px",
                                    backgroundColor: "#cacfb3",
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                                    textAlign: "center",
                                }}>
                                <Box className="content-container"
                                    sx={{
                                        backgroundColor: "#cacfb3",
                                        textAlign: "center",
                                        height: "100%",
                                    }}>
                                    {activeStep == 0 ? <Review text={reviewText} setText={setReviewText} /> : null}
                                    {activeStep == 1 ? <Tags tags={tags} setTags={setTags} selectedItems={selectedTags} setSelectedItems={setSelectedTags} /> : null}
                                    {activeStep == 2 ?
                                        <LocationSearch apiKey={import.meta.env.VITE_GOOGLE_DEVELOPER_KEY} location={location} setLocation={setLocation} />
                                        : null}
                                    {activeStep == 3 ? <Scores scoreFields={scores} setScoreFields={setScores} /> : null}
                                    {activeStep == 4 ?
                                        <Media media={media} setMedia={setMedia} /> : null}
                                </Box>
                            </Box >
                            <Box className="stepper-container"
                                sx={{
                                    position: "fixed",
                                    bottom: "10%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: "900px",
                                    padding: "20px",
                                    borderRadius: "20px",
                                    backgroundColor: "#cacfb3",
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                                    textAlign: "center",
                                }}>
                                <Stepper nonLinear activeStep={activeStep}>
                                    {steps.map((label, index) => (
                                        <Step key={label}
                                            sx={{
                                                width: "100wh",
                                                left: "50%",
                                            }}>
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
                        </>
                        :
                        <Box
                            sx={{
                                position: "fixed",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: "850px",
                                height: "90%",
                                padding: "20px",
                                borderRadius: "20px",
                                backgroundColor: "#cacfb3",
                                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                                textAlign: "center",
                                '&::-webkit-scrollbar': {
                                    width: '0.4em'
                                },
                                '&::-webkit-scrollbar-track': {
                                    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                                    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#8d6e63',
                                    borderRadius: '10px',
                                    outline: '1px solid #8d6e63',
                                }
                            }}>
                            <Preview
                                reviewText={reviewText}
                                selectedTags={selectedTags}
                                location={location}
                                scores={scores}
                                media={media}
                            />
                        </Box>
                }

                <Modal
                    open={modal}
                    onClose={() => setModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <Typography id="modal-modal-description" sx={{ mt: 2, p: 2, border: "1px solid black" }}>
                            {emptyFields.map((item, index) => {
                                return (
                                    <Typography key={index} variant="body1" color="error">
                                        {item}
                                    </Typography>
                                )
                            })}
                            Bu alanlar boş bırakılmış.
                        </Typography>
                        <Typography id="modal-modal-title" sx={{ p: 1 }} variant="h6" >
                            Kaydetmek istediğinize emin misiniz?
                        </Typography>
                    </Box>
                </Modal>

                <Box className="buttons-container">
                    <Box sx={{ position: "fixed", bottom: "2%", right: "1%" }}>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                            {!preview ?
                                <Box>
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        disableRipple
                                        onClick={() => (setPreview(!preview))}>
                                        Önizleme
                                    </Button>
                                </Box>
                                :
                                <Box>
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        disableRipple
                                        sx={{ marginRight: "5px" }}
                                        onClick={() => (setPreview(!preview))}>
                                        Düzenlemeye Devam
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        disableRipple
                                        onClick={() => checkSubmit()}
                                    >
                                        Kaydet
                                    </Button>
                                </Box>
                            }
                        </Box>
                    </Box>
                </Box>
            </Box >
    )
}

export default Main
