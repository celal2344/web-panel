import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function Preview({ reviewText, selectedTags, scores, locationLink, photoLink, videoLink }) {
    return (
        <Box label="preview">
            <Box label="review">
                {reviewText}
            </Box>
            <Box label="tags">
                {selectedTags.map(tag => {
                    return tag + " "
                })}
            </Box>
            <Box label="location">
                {locationLink}
            </Box>
            <Box label="scores">
                {scores.map(score => {
                    return score.field + ": " + score.rating + " "
                })}
            </Box>
            <Box label="location">
                {locationLink}
            </Box>
            <Box label="photo">
                <ImageListItem key={item.img}>
                    <img
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        alt={item.title}
                        loading="lazy"
                    />
                </ImageListItem>
            </Box>
            <Box label="video">

            </Box>
        </Box>
    )
}

export default Preview