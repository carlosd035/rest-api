"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Dados() {
    const [dados, setDados] = useState<{ id: number, name: string }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            // const response = await fetch('/api/users');
            // const result = await response.json();
            // setDados(result);
    
            // sempre usa o axios, é mais fácil 
            const { data } = await axios.get("/api/users");
            setDados(data);
        }

        fetchData();
    }, []);

    return (
        <ul className='text-black'>
            {dados.map((user) => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}
