import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TokenGenerator = () => {
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/generate-tokens'); // Adjust URL as per your backend setup
                setTokens(response.data);
            } catch (error) {
                console.error('Error fetching tokens:', error);
            }
        };

        fetchTokens();
    }, []);

    return (
        <div>
            <h2>Tokens Generated:</h2>
            <ul>
                {tokens.map(token => (
                    <li key={token._id}>
                        <strong>User ID:</strong> {token._id} | <strong>Token:</strong> {token.token}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TokenGenerator;
