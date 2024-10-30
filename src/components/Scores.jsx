import { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import TabPanel from '@mui/lab/TabPanel';
import Textarea from '@mui/joy/Textarea';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

function Scores({ scoreFields, setScoreFields }) {
  const [selected, setSelected] = useState("1");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [tabsData, setTabsData] = useState(scoreFields);
  const ref = useRef(null);

  useEffect(() => {
    setScoreFields(tabsData);
  }, [tabsData, setScoreFields]);

  const changeText = (index, textValue) => {
    const updatedData = [...tabsData];
    updatedData[index].description = textValue;
    setTabsData(updatedData);
  };

  const changeRating = (index, ratingValue) => {
    const updatedData = [...tabsData];
    updatedData[index].rating = ratingValue;
    setTabsData(updatedData);
  };

  const onEmojiClick = (index, emojiObject) => {
    const { selectionStart, selectionEnd } = ref.current;
    let text = tabsData[index].description;
    const newText = text.slice(0, selectionStart) + emojiObject.native + text.slice(selectionEnd);
    changeText(index, newText);
    const newCursorPosition = selectionStart + emojiObject.native.length;
    setTimeout(() => {
      ref.current.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  };

  const handleChange = (event, newValue) => {
    setSelected(newValue.toString());
    setShowEmojiPicker(false);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={selected}>
        <TabList onChange={handleChange} variant='scrollable' aria-label="lab API tabs example">
          {scoreFields.map((scoreField, index) => (
            <Tab
              iconPosition='start'
              key={index}
              label={tabsData[index].description !== "" || tabsData[index].rating > 0 ? <><BorderColorIcon fontSize='inherit' /><>&nbsp;{scoreField.name}</></> : scoreField.name}
              value={(index + 1).toString()} />
          ))}
        </TabList>
        {scoreFields.map((scoreField, index) => (
          <TabPanel key={index} value={(index + 1).toString()}>
            <Textarea
              placeholder="Puanlama sebebini giriniz..."
              minRows={18}
              maxRows={18}
              slotProps={{
                textarea: {
                  ref: ref,
                  sx: {
                    '&::-webkit-scrollbar': {
                      width: '0.4em',
                    },
                    '&::-webkit-scrollbar-track': {
                      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                      margin: '5px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: '#8d6e63',
                      borderRadius: '10px',
                      outline: '1px solid #8d6e63',
                    },
                  },
                }
              }}
              value={tabsData[index].description}
              onChange={(e) => changeText(index, e.target.value)}
              sx={{
                overflow: "auto",
                backgroundColor: "#e4d4c4",
                height: "100%",
                '&::before': { display: 'none' },
                '&:focus-within': { outline: '0.85px solid brown', outlineOffset: '2px' },
              }}
              startDecorator={
                <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
                  <Rating
                    name="simple-controlled"
                    value={tabsData[index].rating}
                    onChange={(event, newValue) => changeRating(index, newValue)}
                    precision={1}
                    max={10} />
                  <Box sx={{ ml: "auto", display: "flex", flexDirection: "row" }}>
                    <Button variant="outlined" color="neutral" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                      <EmojiEmotionsIcon />
                    </Button>
                    <Box sx={{ ml: "64px", position: 'fixed' }}>
                      {showEmojiPicker ? (
                        <Picker
                          locale="tr"
                          data={data}
                          onEmojiSelect={(emojiObject) => onEmojiClick(index, emojiObject)} />
                      ) : null}
                    </Box>
                  </Box>
                </Box>
              }
            />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}

export default Scores;
