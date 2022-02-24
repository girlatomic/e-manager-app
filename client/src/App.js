import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Clients from "./pages/Clients";
import Repairs from "./pages/Repairs";
import AddClientView from "./pages/AddClientView";
import AddRepairView from "./pages/AddRepairView";
import './App.css';

export default function App() {
  let [clients, setClients] = useState([]);
  let [repairs, setRepairs] = useState([]);
  const navigate = useNavigate();

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

  async function addClient(client) {
    // console.log('ADD CLIENT', client);

    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client)
    };

    try {
      let response = await fetch("/clients", options);
      if (response.ok) {
        let data = await response.json();
        setClients(data);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }

    navigate('/clients');
  }

  return (
    <div className="App">
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/clients" element={<Clients clients={clients} />} />
            <Route path="/repairs" element={<Repairs repairs={repairs} />} />
            <Route path="/add-client" element={<AddClientView addClientCb={client => addClient(client)} />} />
            <Route path="add-repair" element={<AddRepairView/>} />
          </Routes>
      </div>

      </div>
      
    </div>
  );

}