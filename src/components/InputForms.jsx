import TagList from "./TagList";
import ScoreFieldTextList from "./ScoreFieldTextList";
import { useEffect, useState } from 'react';
import axios from "axios";
import '../css/InputForms.scss';
import { Button, Label, TextField, FieldError, Form, TextArea } from "react-aria-components";


function InputForms() {
    const [error, setError] = useState("")
    const [scoreFields, setScoreFields] = useState([])
    const [tags, setTags] = useState([])
    // const [selectedScoreField, setSelectedScoreField] = useState("")
    // const [selectedTag, setSelectedTag] = useState("")
    const [selectedScoreFields, setSelectedScoreFields] = useState([])
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
    return (
        error ? <div>{error}</div> :
            <div className="container">
                <Label>Puanlama Kategorisi Seçiniz:</Label>
                <div className="add-selected-container">
                    <ScoreFieldTextList selectedItems={selectedScoreFields} setSelectedItems={setSelectedScoreFields} setScoreFields={setScoreFields} scoreFields={scoreFields} />
                </div>
                <Label>Tag Seçiniz:</Label>
                <div className="add-selected-container">
                    <TagList tags={tags} setTags={setTags} selectedItems={selectedTags} setSelectedItems={setSelectedTags} />
                </div>
                <div className="add-review-container">
                    <Form aria-label="Review form">
                        <Label>İnceleme Ekleyiniz:</Label>
                        <TextField aria-label="Review Text field" name="review" type="text" >
                            <TextArea aria-label="Review Text area" aria-multiline={true} className={"input-form"} />
                            <FieldError />
                        </TextField>
                    </Form>
                </div>
                <div className="save-button-container">
                    < Button aria-label="Save all button" onPress={() => {

                    }}>Kaydet</Button >
                </div>
            </div >
    )
}

export default InputForms