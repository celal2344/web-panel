import CustomDropdown from "./CustomDropdown"
import TextList from "./TextList";
import { useEffect, useState } from 'react';
import axios from "axios";
import '../css/InputForms.scss';
import { Button, Label, TextField, FieldError, Form, TextArea } from "react-aria-components";
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
                    < CustomDropdown serverItems={scoreFields} setSelectedItem={setSelectedScoreField} />

                    <Button style={{ marginRight: "20px" }}
                        onPress={() => {
                            selectedScoreField != "" ?
                                setSelectedScoreFields([...selectedScoreFields, selectedScoreField]) : null
                        }
                        }>+</Button>

                    <TextList selectedItems={selectedScoreFields} />
                </div>
                <Label>Tag Seçiniz:</Label>
                <div className="add-selected-container">
                    < CustomDropdown serverItems={tags} setSelectedItem={setSelectedTag} />
                    <Button style={{ marginRight: "20px" }}
                        onPress={() => {
                            selectedTag != "" ?
                                setSelectedTags([...selectedTags, selectedTag]) : null
                        }}>+</Button>
                    <TextList selectedItems={selectedTags} />
                </div>
                <div className="add-review-container">
                    <Form>
                        <Label>İnceleme Ekleyiniz:</Label>
                        <TextField name="review" type="text" >
                            <TextArea aria-multiline={true} className={"input-form"} />
                            <FieldError />
                        </TextField>
                    </Form>
                </div>
                <div className="save-button-container">
                    < Button onPress={() => {

                    }}>Kaydet</Button >
                </div>
            </div >
    )
}

export default InputForms