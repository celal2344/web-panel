import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Rating from '@mui/material/Rating';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { FormLabel } from '@mui/material';

function Preview({ reviewText, selectedTags, scores, location, media }) {
    return (
        <Tabs
            label="preview"
            orientation="vertical"
            sx={{ height: "100%" }}>
            <TabList>
                <Tab>İnceleme</Tab>
                <Tab>Tagler</Tab>
                <Tab>Konum</Tab>
                <Tab>Skorlar</Tab>
                <Tab>Medya</Tab>
            </TabList>
            <TabPanel value={0} label="review" sx={{
                whiteSpace: 'pre-wrap', textAlign: "start",
                overflow: "auto", height: "95%", '&::-webkit-scrollbar': {
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
                {reviewText}
            </TabPanel>
            <TabPanel value={1} label="tags" sx={{
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
                {selectedTags.map((tag, index) => {
                    return (<Box color="coral" sx={{ display: "inline-flex", margin: "4px", padding: "2px", border: "1px solid", width: "max-content", borderRadius: "10px" }} key={index}> {tag.name + " "}</Box>)
                })}
            </TabPanel>
            <TabPanel value={2} label="location">
                <Box>
                    <Typography variant="body1">{location.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                        {location.formatted_address}
                    </Typography>
                </Box>
            </TabPanel>
            <TabPanel value={3} label="scores" sx={{
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
                {scores.map((item) => (
                    item.description !== "" || item.rating > 0 ?
                        { name: item.name, description: item.description, rating: item.rating }
                        : null))
                    .filter(item => item !== null).map((score, index) => {
                        return (
                            <Box key={index}
                                sx={{
                                    border: "1px solid", borderRadius: "10px", mb: "4px", overflow: "auto", maxHeight: "50%", ml: "5%", mr: "5%",
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
                                <Box>
                                    <FormLabel>{score.name}</FormLabel>
                                    <Rating
                                        name="read-only"
                                        readOnly
                                        value={score.rating}
                                        precision={1}
                                        max={10} />
                                </Box>
                                <Typography whiteSpace={"pre-wrap"} sx={{ textAlign: "start", m: 2 }}>
                                    {score.description}
                                </Typography>
                            </Box>
                        )
                    })}
            </TabPanel>
            <TabPanel value={4} label="photo" sx={{
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
                {
                    media.length > 0 ?
                        <ImageList
                            variant="standart"
                            cols={3}
                            gap={10}
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
            </TabPanel>
        </Tabs >
    )
}

export default Preview