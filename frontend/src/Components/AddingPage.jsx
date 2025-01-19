import React, { useState } from 'react';

const dummyData = [
    { name: 'Item 1', quantity: 0 },
    { name: 'Item 2', quantity: 0 },
    { name: 'Item 3', quantity: 0 },
    { name: 'Item 4', quantity: 0 },
    { name: 'Item 5', quantity: 0 },
];

const API_ENDPOINT = 'https://example.com/api/selected-items'; // Replace with your endpoint URL

const AddingPage = () => {
    const [items, setItems] = useState(dummyData);

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

    const handleNext = async () => {
        const checkedItems = items.filter((item) => item.checked);

        if (checkedItems.length === 0) {
            alert('Please select at least one item before proceeding.');
            return;
        }

        const payload = JSON.stringify({ selectedItems: checkedItems });

        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: payload,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Success:', result);
            alert('Data submitted successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the data.');
        }
    };

    return (
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
                            style={styles.checkbox}
                        />
                        <span style={styles.itemName}>{item.name}</span>
                        <select
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(index, e.target.value)}
                            style={styles.select}
                        >
                            {[...Array(11).keys()].map((number) => (
                                <option key={number} value={number}>
                                    {number}
                                </option>
                            ))}
                        </select>
                    </li>
                ))}
            </ul>
            <button onClick={handleNext} style={styles.button}>
                Next
            </button>
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
    buttonHover: {
        backgroundColor: '#0056b3',
    },
};

export default AddingPage;