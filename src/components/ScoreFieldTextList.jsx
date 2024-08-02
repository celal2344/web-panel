import { ListBox, ListBoxItem, TextArea, FieldError, Label } from 'react-aria-components';
import { useEffect, useState } from 'react';
import '../css/AriaCSS.scss';
import '../css/ScoreFieldTextList.scss';


function ScoreFieldTextList({ selectedItems, setSelectedItems, setscoreFields, scoreFields }) {
    const [selectedItem, setSelectedItem] = useState();
    useEffect(() => {
        console.log(selectedItem)
        console.log(selectedItems)
    }, [selectedItem]);
    const removeItem = (index) => {
        setSelectedItems(prevItems => prevItems.filter((_, i) => i !== index));//remove from the selected list
        setscoreFields(...scoreFields, selectedItems[index]);//add back to the main list
        console.log(scoreFields)
    };
    return (
        <>
            <ListBox
                aria-label="List of entries"
                layout='grid'
                selectionMode='single'
                selectedKey={selectedItems}
                onSelectionChange={(key) => setSelectedItem(key)}
                style={{
                    height: '20vh',
                    width: '400px',
                    gap: "5px",
                    overflowY: "auto",
                }}
            >
                {
                    selectedItems.map((item, index) => {
                        return (
                            <ListBoxItem
                                style={{
                                    display: 'flex',
                                    flexDirection: 'horizontal',
                                    minHeight: 'calc(10vh - 10px)',
                                    width: "100%",
                                    padding: "0",
                                    boxSizing: "border-box",
                                    textAlign: "center",
                                    justifyContent: "center",
                                }}
                                key={index}
                            >
                                {item}
                            </ListBoxItem>
                        )
                    })
                }
            </ListBox >
            {selectedItem != "" ? (
                <>
                    <Label>{selectedItem}</Label>
                    <TextArea
                        style={{
                            height: '20vh',
                            width: '20vw',
                            margin: "0.5vw"
                        }}
                    >
                    </TextArea>
                    <FieldError />
                </>
            ) : null}
        </>
    )
}

export default ScoreFieldTextList