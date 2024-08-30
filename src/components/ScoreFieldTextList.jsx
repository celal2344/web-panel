import { ListBox, ListBoxItem, TextArea, FieldError, Label } from 'react-aria-components';
import { useEffect, useState } from 'react';
import '../css/AriaCSS.scss';
import '../css/ScoreFieldTextList.scss';


function ScoreFieldTextList({ selectedItems, setSelectedItems, setscoreFields, scoreFields }) {
    const [highlightedItem, setHighlightedItem] = useState(new Set());

    useEffect(() => {
        console.log(highlightedItem)
        console.log(selectedItems)
    }, [highlightedItem]);
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
                items={selectedItems}
                onSelectionChange={setHighlightedItem}
                selectedKeys={highlightedItem}
                style={{
                    height: '20vh',
                    width: '400px',
                    gap: "5px",
                    overflowY: "auto",
                }}
            >
                {selectedItems.map((item) => (
                    (<ListBoxItem
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
                        id={item}
                        key={item}
                    >
                        {item}
                    </ListBoxItem>)))}
            </ListBox >
            {highlightedItem.size > 0 ? (
                <div style={{
                    height: '20vh',
                    width: '20vw',
                }}>
                    <TextArea
                        label={highlightedItem}
                    >
                    </TextArea>
                    <FieldError />
                </div >
            ) : null
            }
        </>
    )
}

export default ScoreFieldTextList