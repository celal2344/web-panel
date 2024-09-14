// PlaceSearch.js
import React, { useState } from 'react';
import { LoadScript, GoogleMap, StandaloneSearchBox } from '@react-google-maps/api';
import { TextField, Box, Typography, Button } from '@mui/material';

const libraries = ['places'];

const LocationSearch = ({ apiKey, location, setLocation }) => {
    const [searchBox, setSearchBox] = useState(null);

    const onLoad = (ref) => {
        setSearchBox(ref);
    };
    const onPlacesChanged = () => {
        const placesArray = searchBox.getPlaces();
        setLocation(placesArray[0]);
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2
            }}>
            <LoadScript
                className="google-maps-container"
                googleMapsApiKey={apiKey} libraries={libraries}>
                <StandaloneSearchBox
                    className="search-box"
                    onLoad={onLoad}
                    onPlacesChanged={onPlacesChanged}
                >
                    <TextField
                        placeholder={location.name ? location.name : "Mekan ara..."}
                        variant="filled"
                        sx={{
                            width: '100%',
                            borderRadius: 1,
                            padding: 0,
                            backgroundColor: "#cacfb3",
                            border: "1px solid",
                            textAlign: "start",
                            m: 1,
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                        }}
                        slotProps={{
                            input: {
                                hiddenLabel: true,
                                disableUnderline: true
                            }
                        }}
                    />
                </StandaloneSearchBox>
            </LoadScript>
        </Box>
    );
};

export default LocationSearch;
