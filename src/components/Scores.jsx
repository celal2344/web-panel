import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import TabPanel from '@mui/lab/TabPanel';
import Textarea from '@mui/joy/Textarea';
import BorderColorIcon from '@mui/icons-material/BorderColor'; import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useState, useRef } from 'react';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

function Scores({ scoreFields }) {
  const [selected, setSelected] = useState("1");
  const [text, setText] = useState("");
  const [, setRating] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const ref = useRef(null);

  const changeText = (scoreField, textValue) => {
    setText(textValue);
    scoreField.description = textValue;
  }
  const changeRating = (scoreField, ratingValue) => {
    setRating(ratingValue);
    scoreField.rating = ratingValue;
  }
  const onEmojiClick = (scoreField, emojiObject) => {
    const { selectionStart, selectionEnd } = ref.current
    const newText = text.slice(0, selectionStart) + emojiObject.native + text.slice(selectionEnd);
    changeText(scoreField, newText);
    const newCursorPosition = selectionStart + emojiObject.native.length;
    setTimeout(() => {
      ref.current.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  };
  const handleChange = (event, newValue) => {
    setSelected(newValue.toString());
    setShowEmojiPicker(false);
  }
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={selected}>
        <TabList
          onChange={handleChange}
          variant='scrollable'
          aria-label="lab API tabs example">
          {scoreFields.map((scoreField, index) => {
            return (
              <Tab
                iconPosition='start'
                icon={scoreField.description != "" || scoreField.rating > 0 ? <BorderColorIcon fontSize='small' /> : null}
                key={index}
                label={scoreField.name}
                value={(index + 1.).toString()} />
            )
          })}
        </TabList>
        {
          scoreFields.map((scoreField, index) => {
            return (
              <TabPanel
                key={index}
                value={(index + 1.).toString()}>
                <Textarea
                  placeholder="Type in score explanation..."
                  minRows={11}
                  slotProps={{ textarea: { ref: ref } }}
                  value={scoreField.description}
                  onChange={(e) => { changeText(scoreField, e.target.value) }}
                  startDecorator={
                    <Box sx={{
                      display: 'flex',
                      gap: 0.5,
                      flex: 1
                    }}>
                      <Rating
                        name="simple-controlled"
                        value={scoreField.rating}
                        onChange={(event, newValue) => { changeRating(scoreField, newValue) }}
                        precision={1}
                        max={10} />
                      <Box
                        sx={{ ml: "auto" }}>
                        <Button
                          variant="outlined"
                          color="neutral"
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                          <EmojiEmotionsIcon />
                        </Button>
                        <Box
                          sx={{ position: "fixed" }}>
                          {
                            showEmojiPicker ?
                              <Picker
                                locale="tr"
                                data={data}
                                onEmojiSelect={(emojiObject) => (onEmojiClick(scoreField, emojiObject))} />
                              : null
                          }
                        </Box>
                      </Box>
                    </Box>
                  }
                  sx={{
                    backgroundColor: "#e4d4c4",//yazı yeri içi
                    height: "100%",
                    '&::before': {
                      display: 'none',
                    },
                    '&:focus-within': {
                      outline: '0,85px solid brown',//yazı yeri sınırı
                      outlineOffset: '2px',
                    },
                  }}
                />
              </TabPanel>
            )
          })
        }
      </TabContext>
    </Box >
  );
}
export default Scores