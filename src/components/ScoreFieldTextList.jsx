import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import TabPanel from '@mui/lab/TabPanel';
import Textarea from '@mui/joy/Textarea';
import DoneIcon from '@mui/icons-material/Done';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useEffect, useState, useRef } from 'react';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import '../css/AriaCSS.scss';
import '../css/ScoreFieldTextList.scss';

function ScoreFieldTextList({ selectedItems, setSelectedItems, setScoreFields, scoreFields }) {
  const [selected, setSelected] = useState("1");
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const ref = useRef(null);

  const changeText = (scoreField, textValue) => {
    setText(textValue);
    scoreField.description = textValue;
  }
  const onEmojiClick = (emojiObject) => {
    const { selectionStart, selectionEnd } = ref.current
    const newText = text.slice(0, selectionStart) + emojiObject.native + text.slice(selectionEnd);
    setText(newText);
    const newCursorPosition = selectionStart + emojiObject.native.length;
    setTimeout(() => {
      ref.current.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  };
  const handleChange = (event, newValue) => {
    setSelected(newValue.toString());
    ref.current?.focus();
  }
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={selected}>
        <TabList onChange={handleChange} variant='scrollable' aria-label="lab API tabs example">
          {scoreFields.map((scoreField, index) => {
            return (
              <Tab key={index} label={scoreField.name} value={(index + 1.).toString()} />
            )
          })}
        </TabList>
        {
          scoreFields.map((scoreField, index) => {
            return (
              <TabPanel key={index} value={(index + 1.).toString()}>
                <Textarea
                  placeholder="Type in here…"
                  minRows={11}
                  slotProps={{ textarea: { ref: ref } }}
                  value={scoreField.description}
                  onChange={(e) => { changeText(scoreField, e.target.value) }}
                  endDecorator={
                    <Button variant="outlined" color="neutral" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                      <EmojiEmotionsIcon />
                    </Button>}
                  sx={{
                    height: "100%",
                    '&::before': {
                      display: 'none',
                    },
                    '&:focus-within': {
                      outline: '2px solid var(--Textarea-focusedHighlight)',
                      outlineOffset: '2px',
                    },
                  }}
                />
                {
                  showEmojiPicker ?
                    <Picker locale="tr" data={data} onEmojiSelect={onEmojiClick} />
                    : null
                }
              </TabPanel>
            )
          })
        }
      </TabContext>
      <Button aria-label="Next button" variant='outlined' color='neutral' onClick={() => { }}>Next</Button>
    </Box >
  );
}
export default ScoreFieldTextList