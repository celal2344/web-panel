import { Button, ComboBox, Input, ListBox, ListBoxItem, Popover } from 'react-aria-components';

function CustomDropdown({ serverItems = [], setSelectedItem }) {
    return (
        <div style={{ marginRight: "20px" }}>
            <ComboBox
                aria-label='combobox'
                onInputChange={setSelectedItem}
            >
                <div>
                    <Input onClick={setSelectedItem} />
                    <Button>▼</Button>
                </div>
                <Popover>
                    <ListBox aria-label='listbox'>
                        {
                            serverItems.map((item, index) => {
                                return (
                                    <ListBoxItem
                                        key={index}
                                    >
                                        {item.name}
                                    </ListBoxItem>
                                )
                            })
                        }
                    </ListBox>
                </Popover>
            </ComboBox>
        </div >

    )
}


export default CustomDropdown;
