import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Textarea from '@mui/joy/Textarea';
import Box from '@mui/joy/Box';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useEffect, useState, useRef } from 'react';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import '../css/AriaCSS.scss';
import '../css/ScoreFieldTextList.scss';

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}
function ScoreFieldTextList({ selectedItems, setSelectedItems, setScoreFields, scoreFields }) {
    const [checked, setChecked] = useState([]);
    const [text, setText] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const leftChecked = intersection(checked, scoreFields);
    const rightChecked = intersection(checked, selectedItems);
    const [rightCheckedToggle, setRightCheckedToggle] = React.useState(false);
    const ref = useRef(null);
    useEffect(() => {
        if (rightChecked.length > 0) {
            setRightCheckedToggle(true);
            setText(rightChecked[0].description);
        } else {
            setRightCheckedToggle(false);
            setText("");
        }

    }, [rightChecked.length]);
    useEffect(() => {
        if (rightChecked.length > 0) {
            rightChecked[0].description = text;
        }
        console.log(rightChecked[0]);
    }, [text]);
    const onEmojiClick = (emojiObject) => {
        const { selectionStart, selectionEnd } = ref.current
        const newText = text.slice(0, selectionStart) + emojiObject.native + text.slice(selectionEnd);
        setText(newText);
        const newCursorPosition = selectionStart + emojiObject.native.length;
        setTimeout(() => {
            ref.current.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 0);
    };
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setSelectedItems(selectedItems.concat(leftChecked));
        setScoreFields(not(scoreFields, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setScoreFields(scoreFields.concat(rightChecked));
        setSelectedItems(not(selectedItems, rightChecked));
        setChecked(not(checked, rightChecked));
    };
    const customListLeft = (title, items) => (
        <Card sx={{
            height: "100%",
        }}>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                    < Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={
                            numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{
                            'aria-label': 'all items selected',
                        }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            <List
                sx={{
                    width: 200,
                    height: 230,
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((value, index) => {
                    const labelId = `transfer-list-all-item-${value}-label`;

                    return (
                        <ListItemButton
                            key={index}
                            role="listitem"
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.name} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Card>
    );
    const customListRight = (title, items) => (
        <div style={{
            display: 'flex',
            flexDirection: 'row'
        }}>
            <Card sx={{
                height: "100%",
            }}>
                <CardHeader
                    sx={{ px: 2, py: 1 }}
                    avatar={<></>}
                    title={title}
                />
                <Divider />
                <List
                    sx={{
                        width: 200,
                        height: 230,
                        bgcolor: 'background.paper',
                        overflow: 'auto',
                    }}
                    dense
                    component="div"
                    role="list"
                >
                    {items.map((value, index) => {
                        const labelId = `transfer-list-all-item-${value}-label`;
                        return (
                            <ListItemButton
                                key={index}
                                role="listitem"
                                onClick={handleToggle(value)}
                                disabled={checked.indexOf(value) === -1 && rightCheckedToggle}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        checked={checked.indexOf(value) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{
                                            'aria-labelledby': labelId,
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={value.name} />
                            </ListItemButton>
                        );
                    })}
                </List>
            </Card>
            {
                rightCheckedToggle ?
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginLeft: '1rem',
                        height: "100%"
                    }}>
                        <Textarea
                            placeholder="Type in here…"
                            minRows={11}
                            slotProps={{ textarea: { ref: ref } }}
                            value={text}
                            onChange={(e) => { setText(e.target.value) }}
                            endDecorator={<Box sx={{
                                display: 'flex', gap: 0.5, flex: 1, borderTop: '1px solid',
                                borderColor: 'divider'
                            }}>
                                <Button variant="outlined" color="neutral" sx={{ ml: 'auto' }} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                                    <EmojiEmotionsIcon />
                                </Button>
                            </Box>}
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
                        {showEmojiPicker ?
                            <div style={{ height: 230, marginLeft: "1rem", maxHeight: "auto" }}><Picker locale="tr" data={data} onEmojiSelect={onEmojiClick} /></div>
                            : null}
                    </div>
                    : null
            }
        </div >
    );
    return (
        <Grid
            container
            spacing={2}
            sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
            <Grid item sx={{
                height: "100%",
            }}>{customListLeft('Choices', scoreFields)}</Grid>
            <Grid item>
                <Grid container direction="column" sx={{ alignItems: 'center' }}>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item sx={{
                height: "100%",
            }}>{customListRight('Chosen', selectedItems)}</Grid>
        </Grid>
    );
}

export default ScoreFieldTextList