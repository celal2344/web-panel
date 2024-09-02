import TagList from "./Tags";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Box from '@mui/material/Box';
import StepButton from '@mui/material/StepButton';
import ScoreFieldTextList from "./Scores";
import { useEffect, useState } from 'react';
import axios from "axios";
import '../css/InputForms.scss';
import Review from "./Review";

const steps = ['İnceleme yazısı', "Etiketler", "Konum", "Puanlar", "Fotoğraflar", "Video", "Kaydet"];
function Main() {
    const [error, setError] = useState("")
    const [scoreFields, setScoreFields] = useState([])
    const [activeStep, setActiveStep] = useState(0);
    const [tags, setTags] = useState([])
    // const [selectedTag, setSelectedTag] = useState("")
    const [selectedTags, setSelectedTags] = useState([])
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/getScoreFields')
            .then(response => {
                console.log(response.data)
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
                console.log(response.data)
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
            <Box className="container">
                <Box className="content-container">
                    {activeStep == 0 ? <Review /> : null}
                    {activeStep == 1 ? <TagList tags={tags} setTags={setTags} selectedItems={selectedTags} setSelectedItems={setSelectedTags} /> : null}
                    {activeStep == 3 ? <ScoreFieldTextList scoreFields={scoreFields} /> : null}
                    {/* <div className="add-review-container">
                    <Form aria-label="Review form">
                        <Label>İnceleme Ekleyiniz:</Label>
                        <TextField aria-label="Review Text field" name="review" type="text" >
                            <TextArea aria-label="Review Text area" aria-multiline={true} className={"input-form"} />
                            <FieldError />
                        </TextField>
                    </Form>
                </div> */}
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
            </Box >
    )
}

export default Main