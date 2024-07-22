// import DropdownInput from "react-dropdown-input"
import axios from "axios"
import { useState, useEffect } from "react"
function MultiForm() {
    const [searchItems, setSearchItems] = useState([])
    const [showDropdown, setShowDropdown] = useState(true)

    useEffect(() => {
        axios.get('/getScoreFields')
            .then(response => {
                console.log(response)
                setSearchItems(response.data)
            })
    }, [])

    return (
        <div>
            <div className="container">
                <input className="form-control" onChange={() => setShowDropdown(showDropdown ? false : true)}></input>
            </div>
            <div className="dropdown-menu" style={showDropdown ? { visibility: "visible" } : { visibility: "hidden" }}>

            </div>
        </div>
    )
}

export default MultiForm