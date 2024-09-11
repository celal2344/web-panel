import Box from '@mui/material/Box';

function Preview({ reviewText, selectedTags, scores, locationLink, media }) {
    return (
        <Box
            label="preview"
            sx={{
                maxHeight: "50rem",
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
            <Box label="review">
                {reviewText}
            </Box><br></br>
            <Box label="tags">
                {selectedTags.map(tag => {
                    return tag.name + " "
                })}
            </Box><br></br>
            <Box label="location">
                {locationLink}
            </Box><br></br>
            <Box label="scores">
                {scores.map((score, index) => {
                    return (
                        <div key={index}>
                            {score.name + ": " + score.description + " - " + score.rating}
                        </div>
                    )
                })}
            </Box><br></br>
            <Box label="photo">
                {
                    media.map((item) => (
                        <>{item.url}<br></br></>
                    ))
                }
            </Box>
        </Box >
    )
}

export default Preview