import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Clients from "./pages/Clients";
import Repairs from "./pages/Repairs";
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
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/clients" element={<Clients />} />
            <Route path="/repairs" element={<Repairs />} />
          </Routes>
      </div>

      </div>
      
    </div>
  );

}