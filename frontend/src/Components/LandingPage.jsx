import React, { useState, useRef, useEffect } from 'react';

const LandingPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [inventory, setInventory] = useState([]); // Initialize as empty array
    const containerRef = useRef(null);

    useEffect(() => {
        // Fetch inventory on page load
        const fetchInventory = async () => {
            try {
                const response = await fetch('http://localhost:8080/inventory');
                const data = await response.json();
                console.log('Fetched Inventory:', data);  // Log the response for debugging
                if (data && Array.isArray(data.items)) {
                    setInventory(data.items);  // Set inventory to the 'items' array
                } else {
                    console.error('Fetched data is not in the expected format:', data);
                }
            } catch (error) {
                console.error('Error fetching inventory:', error);
            }
        };
        fetchInventory();
    }, []);

    useEffect(() => {
        // Hide suggestions when clicking outside
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value) {
            // Filter suggestions from the fetched inventory
            const filtered = inventory
                .map(item => item.name)  // Access 'name' field from each item
                .filter((suggestion) =>
                    suggestion.toLowerCase().includes(value.toLowerCase())
                );
            setFilteredSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setFilteredSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion);  // Set the input field to the clicked suggestion
        setShowSuggestions(false);  // Hide the suggestion list
    };

    const handleGoClick = () => {
        alert(`You searched for: ${searchTerm}`);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>I'm looking for</h1>
            <div ref={containerRef} style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    style={styles.searchInput}
                />
                <button onClick={handleGoClick} style={styles.goButton}>Go</button>
                {showSuggestions && (
                    <ul style={styles.suggestionList}>
                        {filteredSuggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                style={styles.suggestionItem}
                                onClick={() => handleSuggestionClick(suggestion)}  // Add onClick handler
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '30vh',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    heading: {
        fontSize: '2rem',
        marginBottom: '20px',
    },
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        width: '400px',
    },
    searchInput: {
        flex: 1,
        padding: '12px 20px',
        fontSize: '16px',
        borderRadius: '25px 0 0 25px',
        border: '1px solid #ccc',
        outline: 'none',
    },
    goButton: {
        padding: '12px 20px',
        fontSize: '16px',
        border: 'none',
        backgroundColor: '#29660C',
        color: 'white',
        borderRadius: '0 25px 25px 0',
        cursor: 'pointer',
        outline: 'none',
    },
    suggestionList: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 10,
    },
    suggestionItem: {
        padding: '10px',
        cursor: 'pointer',
    },
};

export default LandingPage;
