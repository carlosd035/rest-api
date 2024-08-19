"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dados() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/users`)
      .then((response) => {
        setDados(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <ul className="text-black">
      {dados.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
