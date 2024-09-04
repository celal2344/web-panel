import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Textarea from '@mui/joy/Textarea';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useState, useRef } from 'react';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

function Review({ text, setText }) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const ref = useRef(null);

    const changeText = (textValue) => {
        setText(textValue);
    }
    const onEmojiClick = (emojiObject) => {
        const { selectionStart, selectionEnd } = ref.current
        const newText = text.slice(0, selectionStart) + emojiObject.native + text.slice(selectionEnd);
        changeText(newText);
        const newCursorPosition = selectionStart + emojiObject.native.length;
        setTimeout(() => {
            ref.current.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 0);
    };
    return (
        <div>
            <Textarea
                placeholder="Type in review..."
                minRows={14}
                slotProps={{ textarea: { ref: ref } }}
                value={text}
                onChange={(e) => { changeText(e.target.value) }}
                variant="soft"
                color="success"
                startDecorator={
                    <Box sx={{
                        display: 'flex', gap: 0.5, flex: 1, borderBottom: '1px solid',
                        borderColor: 'divider',
                    }}>
                        <Box sx={{ ml: "auto" }}>
                            <Button variant="outlined" color="neutral" onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                sx={{
                                    mb: 1,
                                }}>
                                <EmojiEmotionsIcon />
                            </Button>
                            <Box sx={{ position: "fixed" }}>
                                {
                                    showEmojiPicker ?
                                        <Picker locale="tr" data={data} onEmojiSelect={(emojiObject) => (onEmojiClick(emojiObject))} />
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
        </div>
    )
}

export default Review