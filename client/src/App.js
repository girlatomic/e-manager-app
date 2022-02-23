import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';

export default function App() {
  let [clients, setClients] = useState([]);
  let [repairs, setRepairs] = useState([]);

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    getRepairs();
  }, []);

  const getClients = () => {
    fetch("/clients")
      .then(response => response.json())
      .then(clients => {
        setClients(clients);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getRepairs = () => {
    fetch("/repairs")
      .then(response => response.json())
      .then(repairs => {
        setRepairs(repairs);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <h1>eManager</h1>

      <h2>Clients</h2>
      <ul>
      {
        clients.map(c => (
         <li ley={c.id}>{c.first_name} {c.last_name}</li>
         ))
      }
      </ul>

      <h2>Repairs</h2>
      <ul>
      {
        repairs.map(r => (
         <li ley={r.id}>{r.model} {r.brand}</li>
         ))
      }
      </ul>
      
    </div>
  );
}

