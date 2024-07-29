import { ListBox, ListBoxItem } from 'react-aria-components';
import { useEffect } from 'react';
import '../css/AriaCSS.scss';


function TextList({ selectedItems }) {
    useEffect(() => {
        console.log(selectedItems)
    }, [selectedItems]);
    return (
        <>
            <ListBox
                aria-label="List of entries"
                layout='grid'
            >
                {
                    selectedItems.map((item, index) => {
                        return (
                            <ListBoxItem
                                key={index}
                            >
                                {item}
                            </ListBoxItem>
                        )
                    })
                }
            </ListBox>
        </>
    )
}

export default TextList