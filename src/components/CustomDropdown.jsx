import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'


function CustomDropdown() {
    const [searchItems, setSearchItems] = useState([])
    const [error, setError] = useState("")
    useEffect(() => {
        axios.get('/getScoreFields')
            .then(response => {
                console.log(response)
                if (Array.isArray(response.data)) {
                    setSearchItems(response.data)
                }
                else {
                    setError("Error fetching data")
                }
            })
    }, [])

    return (
        error ? <div>{error}</div> :
            < Dropdown >
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {
                        searchItems.map((item, index) => {
                            return <Dropdown.Item key={index}>{item}</Dropdown.Item>
                        })
                    }
                </Dropdown.Menu>
            </Dropdown >

    )
}


export default CustomDropdown;
