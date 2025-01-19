import React, { useState, useEffect } from 'react';

const data = [];

const API_ENDPOINT = 'http://localhost:8080/inventory';
const API_ENDPOINT_POST = 'http://localhost:8080/request-items';


const AddingPage = () => {
    const [items, setItems] = useState(data);
    const [customItem, setCustomItem] = useState('');
    const [customQuantity, setCustomQuantity] = useState(0);
    const [customDescription, setCustomDescription] = useState('');

    const handleQuantityChange = (index, quantity) => {
        const updatedItems = [...items];
        updatedItems[index].quantity = parseInt(quantity, 10);
        setItems(updatedItems);
    };

    const handleCheckboxChange = (index) => {
        const updatedItems = [...items];
        updatedItems[index].checked = !updatedItems[index].checked;
        setItems(updatedItems);
    };

    useEffect(() => {
        // Fetch inventory on page load
        const fetchInventory = async () => {
            try {
                const response = await fetch(API_ENDPOINT);
                const data = await response.json();
                console.log('Fetched Inventory:', data);

                const updatedItems = data.items.map(item => ({
                    id: item.id,
                    name: item.name,
                    quantity: 1,
                    checked: false,
                }));

                setItems(updatedItems);

            } catch (error) {
                console.error('Error fetching inventory:', error);
            }
        };
        fetchInventory();
    }, []);


    const handleNext = async () => {
        const checkedItems = items.filter((item) => item.checked);

        let to_add = [];

        if (checkedItems.length === 0) {
            alert('Please select at least one item before proceeding.');
            return;
        }

        checkedItems.forEach(item => {
            to_add.push({ person_id: 0, item_id: parseInt(item.id), quantity: item.quantity});
        });

        const payload = JSON.stringify(to_add);
        

        console.log('payload:', payload);

        try {
            const response = await fetch(API_ENDPOINT_POST, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: payload,
            });

            const result = await response;
            console.log('Success:', result);
            alert('Data submitted successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the data.',error);
        }
    };

    const handleAddCustomItem = async () => {
        let to_add = [];

        if (!customItem.trim()) {
            alert('Error: Please enter a valid item name.');
            return;
        }

        if (!customDescription.trim()) {
            alert('Error: Please enter a valid description.');
            return;
        }

        console.log("customitem: ", customItem);
        console.log("customDescription: ", customDescription);

        to_add.push({ item: customItem, description: customDescription, quantity: 0});

        const payload = JSON.stringify(to_add);

        console.log("payload:", payload);
        
        // setItems([...items, { name: customItem, checked: false, quantity: customQuantity }]);
        
        try {
            const response = await fetch(API_ENDPOINT_POST, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: payload,
            });

            const result = await response;
            console.log('Success:', result);
            alert('Data submitted successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the data.',error);
        }

        setCustomItem('');
        setCustomQuantity(0);
    };


    return (
        <div>
            <div style={styles.container}>
                <h1 style={styles.header}>Add Items</h1>
                <p style={styles.description}>Select items, choose quantities, and proceed to submit your request.</p>
                <ul style={styles.list}>
                    {items.map((item, index) => (
                        <li key={index} style={styles.listItem}>
                            <input
                                type="checkbox"
                                checked={item.checked || false}
                                onChange={() => handleCheckboxChange(index)}
                                style={{
                                    width: '30px',
                                    height: '30px', 
                                    marginRight: '10px',
                                    cursor: 'pointer',
                                    accentColor: 'green',
                                }}
                            />
                            <span style={styles.itemName}>{item.name}</span>
                            <select
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(index, e.target.value)}
                                style={styles.select}
                            >
                            {[...Array(100)].map((_, index) => (
                            <option key={index + 1} value={index + 1}>
                                {index + 1}
                            </option>
                            ))}
                            </select>
                        </li>
                    ))}
                </ul>

                <button onClick={handleNext} style={styles.button}>
                    Submit
                </button>
            </div>

            <div style={styles.container_custom}>
                <p style={styles.description}>Don't see your item in the list? Add it below.</p>

                <div style={styles.customInputContainer}>
                    <input
                    type="text"
                    value={customItem}
                    onChange={(e) => setCustomItem(e.target.value)}
                    placeholder="Custom Item Name"
                    style={styles.searchInput}
                    />
                    <input
                        type="text"
                        value={customDescription} // New input for description
                        onChange={(e) => setCustomDescription(e.target.value)}
                        placeholder="Custom Item Description"
                        style={styles.searchInput}
                    />
                    <button onClick={handleAddCustomItem} style={styles.custom_button}>
                        Add Custom Item
                    </button>
                </div>
            </div>
        </div>


    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '40px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
    },
    container_custom: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '40px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
    },
    searchInput: {
        flex: 1,
        padding: '12px 20px',
        fontSize: '16px',
        borderRadius: '25px',
        border: '1px solid #ccc',
        outline: 'none',
    },
    customInputContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '20px',
    },
    header: {
        textAlign: 'center',
        color: '#333',
        fontSize: '24px',
    },
    description: {
        textAlign: 'center',
        color: '#666',
        marginBottom: '20px',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
        marginBottom: '20px',
        height: "500px",
        overflowY: "auto",
    },
    listItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: '#fff',
    },
    checkbox: {
        marginRight: '10px',
    },
    itemName: {
        flexGrow: 1,
        fontSize: '16px',
        color: '#333',
    },
    select: {
        marginLeft: '10px',
        padding: '5px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px',
    },
    button: {
        display: 'block',
        width: '100%',
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#29660C',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    custom_button: {
        display: 'block',
        width: '25%',
        height: 'auto',
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#29660C',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
};

export default AddingPage;