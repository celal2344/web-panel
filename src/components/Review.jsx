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
        <div style={{
            height: "100%",
        }}>
            <Textarea
                placeholder="Type in review..."
                maxRows={22}
                minRows={22}
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
                value={text}
                onChange={(e) => { changeText(e.target.value) }}
                variant="soft"
                color="success"
                sx={{
                    backgroundColor: "#e4d4c4",//yazı yeri içi
                    height: "100%",
                    overflow: "auto",
                    '&::before': {
                        display: 'none',
                    },
                    '&:focus-within': {
                        outline: '0,85px solid brown',//yazı yeri sınırı
                        outlineOffset: '2px',
                    },
                }}
                startDecorator={
                    <Box sx={{
                        display: 'flex', gap: 0.5, flex: 1, borderBottom: '1px solid',
                        borderColor: 'divider',
                    }}>
                        <Box sx={{ ml: "auto", display: "flex", flexDirection: "row" }}>
                            <Button variant="outlined" color="neutral" onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                sx={{
                                    mb: 1,
                                }}>
                                <EmojiEmotionsIcon />
                            </Button>
                            <Box sx={{
                                ml: "64px",
                                position: 'fixed',
                            }}>
                                {
                                    showEmojiPicker ?
                                        <Picker locale="tr" data={data} onEmojiSelect={(emojiObject) => (onEmojiClick(emojiObject))} />
                                        : null
                                }
                            </Box>
                        </Box>
                    </Box>
                }
            />
        </div>
    )
}

export default Review