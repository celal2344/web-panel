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
import { useEffect } from 'react';
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
    const [checked, setChecked] = React.useState([]);

    const leftChecked = intersection(checked, scoreFields);
    const rightChecked = intersection(checked, selectedItems);
    const [rightCheckedToggle, setRightCheckedToggle] = React.useState(false);
    useEffect(() => {
        if (rightChecked.length > 0) {
            setRightCheckedToggle(true);
        } else {
            setRightCheckedToggle(false);
        }
    }, [checked]);
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
    const editScore = (comment) => {
        console.log(comment)
        let score = rightChecked[0];
        score.description = comment;
        console.log(score)
    }
    const customListLeft = (title, items) => (
        <Card>
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
        <Card>
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
    );
    return (
        <Grid
            container
            spacing={2}
            sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
            <Grid item>{customListLeft('Choices', scoreFields)}</Grid>
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
            <Grid item>{customListRight('Chosen', selectedItems)}</Grid>
            <Grid item>
                {rightCheckedToggle ? <Textarea
                    placeholder="Type in here…"
                    minRows={11}
                    onChange={event => {
                        editScore(event.target.value);
                    }}
                    defaultValue={rightChecked.length > 0 ? rightChecked[0].description : ""}
                    sx={{
                        '&::before': {
                            display: 'none',
                        },
                        '&:focus-within': {
                            outline: '2px solid var(--Textarea-focusedHighlight)',
                            outlineOffset: '2px',
                        },
                    }}
                /> : null}
            </Grid>
        </Grid>
    );
}

export default ScoreFieldTextList