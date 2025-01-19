import React, { useState, useEffect } from 'react';

const data = [];

const API_ENDPOINT = 'http://localhost:8080/inventory'; 

const RequestingPage = () => {
    const [items, setItems] = useState(data);


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
                    quantity: item.quantity,
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
            to_add.push({ person_id: 0, item_id: item.id, quantity: item.quantity});
        });


        const payload = JSON.stringify({ selectedItems: to_add });

        console.log('payload:', payload);

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
            <h1 style={styles.header}>Requesting Page</h1>
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

export default RequestingPage;
