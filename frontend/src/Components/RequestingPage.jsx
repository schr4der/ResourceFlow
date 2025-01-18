import React, { useState } from 'react';

const dummyData = [
    { name: 'Item 1', quantity: 0 },
    { name: 'Item 2', quantity: 0 },
    { name: 'Item 3', quantity: 0 },
    { name: 'Item 4', quantity: 0 },
    { name: 'Item 5', quantity: 0 },
];

const RequestingPage = () => {
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

    const handleNext = () => {
        const checkedItems = items.filter((item) => item.checked);
        console.log('Checked Items:', checkedItems);

        // TODO 
    };

    return (
        <div>
            <h1>Requesting Page</h1>
            <p>This is the requesting page component.</p>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {items.map((item, index) => (
                    <li
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '10px',
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={item.checked || false}
                            onChange={() => handleCheckboxChange(index)}
                            style={{ marginRight: '10px' }}
                        />
                        <span style={{ marginRight: '10px' }}>{item.name}:</span>
                        <select
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(index, e.target.value)}
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
            <button onClick={handleNext} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
                Next
            </button>
        </div>
    );
};

export default RequestingPage;
