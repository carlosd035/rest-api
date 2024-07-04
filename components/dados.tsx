"use client"
import { useState, useEffect } from 'react';

export default function Dados() {
    const [dados, setDados] = useState<{ id: number, name: string }[]>([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users');
            const result = await response.json();
            setDados(result);
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
