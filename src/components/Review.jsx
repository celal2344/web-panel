import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Textarea from '@mui/joy/Textarea';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useState, useRef } from 'react';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

function Review() {
    const [text, setText] = useState("");
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
                minRows={11}
                slotProps={{ textarea: { ref: ref } }}
                value={text}
                onChange={(e) => { changeText(e.target.value) }}
                endDecorator={
                    <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>

                        <Box sx={{ ml: "auto" }}>
                            <Button variant="outlined" color="neutral" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
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
                    mb: 2,
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
        </div>
    )
}

export default Review