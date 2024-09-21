import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

function Auth({ setAuth }) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };
    const checkPassword = async () => {
        console.log("checkPassword")
        const password = {
            password: document.getElementById("outlined-adornment-password").value
        };
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + '/authenticate', password);
            setAuth(response.data)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Box
            sx={{
                position: "fixed",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                top: "30%",
                height: "500px",
                left: "50%",
                transform: "translate(-50%, -35%)",
                width: "700px",
                padding: "20px",
                borderRadius: "20px",
                backgroundColor: "#cacfb3",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
            }}>
            <Box sx={{
                top: "5%",
                left: "0%",
                width: "100%",
            }}>
                <img src="../washere.webp" alt="logo" />
            </Box>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Şifre</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            <Box sx={{ m: 1 }}>
                <Button variant="contained" color="warning" onClick={checkPassword}>Giriş</Button>
            </Box>
        </Box>
    )
}

export default Auth