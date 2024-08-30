import CustomDropdown from "./CustomDropdown"
import TextList from "./TextList";
import ScoreFieldTextList from "./ScoreFieldTextList";
import { useEffect, useState } from 'react';
import axios from "axios";
import '../css/InputForms.scss';
import { Button, Label, TextField, FieldError, Form, TextArea } from "react-aria-components";
import { useListData } from 'react-stately';


function InputForms() {
    const [error, setError] = useState("")
    const [scoreFields, setScoreFields] = useState([])
    const [tags, setTags] = useState([])
    const [selectedScoreField, setSelectedScoreField] = useState("")
    const [selectedTag, setSelectedTag] = useState("")
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
                    < CustomDropdown aria-label="Score Field Dropdown" serverItems={scoreFields} setSelectedItem={setSelectedScoreField} />
                    <Button aria-label="Score Field add button" style={{ marginRight: "20px" }}
                        onPress={() => {
                            if (selectedScoreField != "") {
                                setSelectedScoreFields([...selectedScoreFields, selectedScoreField])//add selected to the list
                                setScoreFields(scoreFields.filter(item => item.name !== selectedScoreField));//removed the selected from the main list
                            }
                        }
                        }>+</Button>
                    <ScoreFieldTextList selectedItems={selectedScoreFields} setSelectedItems={setSelectedScoreFields} setScoreFields={setScoreFields} scoreFields={scoreFields} />
                </div>
                <Label>Tag Seçiniz:</Label>
                <div className="add-selected-container">
                    < CustomDropdown aria-label="Tag Dropdown" serverItems={tags} setSelectedItem={setSelectedTag} />
                    <Button aria-label="Tag add button" style={{ marginRight: "20px" }}
                        onPress={() => {
                            selectedTag != "" ?
                                setSelectedTags([...selectedTags, selectedTag]) : null
                        }}>+</Button>
                    <TextList selectedItems={selectedTags} />
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