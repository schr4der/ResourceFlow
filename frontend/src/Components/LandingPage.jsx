import React, { useState } from 'react';

// Sample autocomplete data (can be replaced with an API)
const suggestions = [
    'React',
    'React Native',
    'JavaScript',
    'Node.js',
    'Python',
    'HTML',
    'CSS',
    'TypeScript',
    'Java',
    'GitHub',
];

const LandingPage = () => {
    const [query, setQuery] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        // Filter suggestions based on the query
        const filtered = suggestions.filter((suggestion) =>
            suggestion.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSuggestions(filtered);
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        setFilteredSuggestions([]); // Clear suggestions after selection
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome to the Landing Page</h1>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search..."
                    style={styles.searchInput}
                />
                {filteredSuggestions.length > 0 && (
                    <ul style={styles.suggestionList}>
                        {filteredSuggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                style={styles.suggestionItem}
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
        textAlign: 'center',
        marginTop: '100px',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    searchContainer: {
        position: 'relative',
        display: 'inline-block',
    },
    searchInput: {
        width: '400px',
        padding: '10px',
        fontSize: '18px',
        borderRadius: '25px',
        border: '1px solid #ccc',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    suggestionList: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '5px',
        maxHeight: '200px',
        overflowY: 'auto',
        marginTop: '5px',
        listStyle: 'none',
        padding: '0',
    },
    suggestionItem: {
        padding: '10px',
        cursor: 'pointer',
        backgroundColor: '#fff',
        transition: 'background-color 0.3s',
    },
};

export default LandingPage;
