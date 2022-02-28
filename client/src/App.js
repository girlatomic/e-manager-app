import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import Repairs from "./pages/Repairs";
import AddClientView from "./pages/AddClientView";
import AddRepairView from "./pages/AddRepairView";
import './App.css';
import EditClientView from "./pages/EditClientView";

export default function App() {
  let [clients, setClients] = useState([]);
  let [repairs, setRepairs] = useState([]);

  let [searchTerm, setSearchTerm] = useState("");
  let [searchResults, setSearchResults] = useState([]);

  let [searchRterm, setSearchRterm] = useState("");
  let [searchRresults, setSearchRresults] = useState([]);

  const navigate = useNavigate();

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm !== "") {
      const newContactList = clients.filter((contact) => {
       return Object.values(contact)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }
    else {
      setSearchResults(clients);
    }
  };

  const searchRepairHandler = (searchRterm) => {
    setSearchRterm(searchRterm);
    if(searchRterm !== "") {
      const newRepairList = repairs.filter((repair) => {
       return Object.values(repair)
        .join(" ")
        .toLowerCase()
        .includes(searchRterm.toLowerCase());
      });
      setSearchRresults(newRepairList);
    }
    else {
      setSearchRresults(repairs);
    }
  };

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

  async function addRepair(repair) {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(repair)
    };

    try {
      let response = await fetch("/repairs", options);
      if (response.ok) {
        let data = await response.json();
        setRepairs(data);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }

    navigate('/repairs');
  }

  async function editClient(client) {
    console.log('this is client', client);
    
    let options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client)
    };

    try {
      let response = await fetch(`/clients/${client.id}`, options);
      console.log('this is response', response);
      if (response.ok) {
        let data = await response.json();
        setClients(data);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  return (
    <div className="App">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/clients" element={<Clients 
            clients={searchTerm.length < 1 ? clients : searchResults} 
            term={searchTerm} 
            searchKeyword={searchHandler} />} />
            <Route path="/repairs" element={<Repairs 
            repairs={searchRterm.length < 1 ? repairs : searchRresults } 
            repairTerm={searchRterm}
            searchRepKeyword={searchRepairHandler} />} />
            <Route path="/add-client" element={<AddClientView addClientCb={client => addClient(client)} />} />
            <Route path="/edit-client/:id" element={<EditClientView editClientCb={id => editClient(id)}/>} />
            <Route path="/add-repair" element={<AddRepairView addRepairCb={repair => addRepair(repair)}/>} />
          </Routes>
      </div>

      </div>
      
    </div>
  );

}