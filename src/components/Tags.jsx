import { useState } from 'react';
import List from '@mui/material/List';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
    toggleButtonGroupClasses,
} from '@mui/material/ToggleButtonGroup';
import ListSubheader from '@mui/material/ListSubheader';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    [`& .${toggleButtonGroupClasses.grouped}`]: {
        margin: theme.spacing(0.5) + ' !important',
        borderRadius: theme.shape.borderRadius,
        border: "1px solid",
        borderLeft: "1px solid !important",

    },
    [`& .${toggleButtonGroupClasses.middleButton}`]: {
        border: "1px solid",
    }

}));
function Tags({ tags, selectedItems, setSelectedItems }) {
    const [search, setSearch] = useState("");
    return (
        <StyledToggleButtonGroup
            variant="outlined"
            color='warning'
            orientation='horizontal'
            sx={{
                flexWrap: "wrap",
                border: "2px solid",
                borderRadius: "10px",
                borderColor: "#8d6e63",
                padding: "10px",
            }}
            value={selectedItems}
            onChange={(event, newAlignment) => {
                setSelectedItems(newAlignment);
            }}>
            <List
                sx={{
                    maxHeight: "20rem",
                    position: 'relative',
                    '& ul': { padding: 0 },
                    overflow: "auto",
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
                <li>
                    <ul>
                        <ListSubheader
                            sx={{
                                padding: 0,
                                backgroundColor: "#cacfb3",
                                border: "1px solid",
                                textAlign: "start",
                                width: 1 / 3,
                                height: 1
                            }}
                        >
                            <TextField
                                id="outlined-basic"
                                label="Search for tags..."
                                variant="filled"
                                color='warning'
                                fullWidth
                                sx={{
                                    width: 1,
                                }}
                                value={search}
                                onChange={(event) => {
                                    setSearch(event.target.value);
                                }} />

                        </ListSubheader>
                        {
                            tags.map((tag, index) => {
                                if (search === "") {
                                    return (
                                        <ToggleButton
                                            key={index}
                                            value={tag}
                                            size='medium'
                                        >
                                            {tag.name}
                                        </ToggleButton>
                                    )
                                } else {
                                    if (tag.name.toLowerCase().includes(search.toLowerCase())) {
                                        return (<ToggleButton
                                            key={index}
                                            value={tag}
                                            size='medium'
                                        >
                                            {tag.name}
                                        </ToggleButton>)
                                    }
                                }

                            })
                        }
                    </ul>
                </li>
            </List>
        </ StyledToggleButtonGroup >
    );

}

export default Tags