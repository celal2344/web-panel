import Tags from "./Tags";
import Scores from "./Scores";
import Review from "./Review";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Box from '@mui/material/Box';
import StepButton from '@mui/material/StepButton';
import { useEffect, useState } from 'react';
import axios from "axios";

const steps = ['İnceleme yazısı', "Etiketler", "Konum", "Puanlar", "Fotoğraflar", "Video", "Kaydet"];
function Main() {
    const [error, setError] = useState("")
    const [scoreFields, setScoreFields] = useState([])
    const [activeStep, setActiveStep] = useState(0);
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/getScoreFields')
            .then(response => {
                if (typeof response.data === 'object') {
                    setScoreFields(response.data)
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
            <div
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "50%",
                    padding: "20px",
                    backgroundColor: "#fff",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                }}>
                <Box className="content-container">
                    {activeStep == 0 ? <Review /> : null}
                    {activeStep == 1 ? <Tags tags={tags} setTags={setTags} selectedItems={selectedTags} setSelectedItems={setSelectedTags} /> : null}
                    {activeStep == 3 ? <Scores scoreFields={scoreFields} /> : null}
                </Box>
                <Box className="stepper-container">
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepButton color="inherit" onClick={handleStep(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </div >
    )
}

export default Main