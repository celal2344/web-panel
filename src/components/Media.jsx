import useDrivePicker from 'react-google-drive-picker'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import Button from '@mui/material/Button';

function Media({ media, setMedia }) {
    const [openPicker,] = useDrivePicker();

    useEffect(() => { console.log(media) }, [media])
    const handleOpenPicker = () => {
        openPicker({
            clientId: "",
            developerKey: "",
            viewId: "DOCS",
            // token: token, // pass oauth token in case you already have one
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: true,
            // customViews: customViewsArray, // custom view
            callbackFunction: (data) => {
                if (data.action === 'cancel') {
                    console.log('User clicked cancel/close button')
                }
                if (data.action === "picked") {
                    setMedia(data.docs)
                }
                console.log(data)
            },
        })
    }
    return (
        <Box
            style={{
                height: "100%",
                width: "100%",
            }}>
            <Button variant='outlined' color='warning' onClick={() => handleOpenPicker()}>Seç</Button>
            {
                media.length > 0 ?
                    <ImageList
                        variant="standart"
                        cols={3}
                        gap={10}
                        sx={{
                            width: "100%",
                            height: "90%",
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
                        }}
                    >
                        {media.map((item) => (
                            item.type === "photo" ? (
                                <ImageListItem key={item.id}>
                                    <img
                                        src={`https://drive.google.com/thumbnail?id=${item.id}&sz`}
                                        alt={item.description}
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = `https://drive.google.com/thumbnail?id=${item.id}&sz&t=${new Date().getTime()}`;
                                        }}
                                    />
                                </ImageListItem>
                            ) : item.type === "video" ? (
                                <ImageListItem key={item.id} >
                                    <iframe
                                        autoPlay
                                        src={`https://drive.google.com/file/d/${item.id}/preview?usp=drive_web`}
                                        alt={item.description}
                                        style={{
                                            border: 0,
                                            height: "100%",
                                            width: "100%"
                                        }}
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = `https://drive.google.com/thumbnail?id=${item.id}&sz&t=${new Date().getTime()}`;
                                        }}
                                    />
                                </ImageListItem>
                            ) : null
                        ))}
                    </ImageList>
                    :
                    null

            }
        </Box >
    );


}

export default Media
