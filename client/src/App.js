import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Clients from "./pages/Clients";
import Repairs from "./pages/Repairs";
import AddClientView from "./pages/AddClientView";
import AddRepairView from "./pages/AddRepairView";
import MyJobs from "./pages/MyJobs.js";
import LogIn from "./pages/LogIn.js";
import SignUp from "./pages/SignUp.js";
import ManageUsers from "./pages/ManageUsers.js";

// Helpers
import API from "./helpers/API.js";
import Local from "./helpers/Local.js";

// Stylesheet
import './App.css';

export default function App() {
  let [user, setUser] = useState(Local.getUser());
  const [submitSuccess, setSubmitSuccess] = useState(false);
  let [loginErrorMsg, setLoginErrorMsg] = useState("");
  let [repairs, setRepairs] = useState([]);
  const navigate = useNavigate();


  // Functions for log in and log out

  async function handleLogin(username, password) {
    let response = await API.loginUser(username, password);
    console.log(response)
    if (response.ok) {
        Local.saveUserInfo(response.data.token, response.data.user);
        setUser(response.data.user);
        setLoginErrorMsg('');
        navigate('/myjobs');
    } else {
        setLoginErrorMsg('Login failed');
        console.log(loginErrorMsg);
    }
  }

  async function handleLogout() {
    Local.removeUserInfo();
    setUser(Local.getUser());
  }
  
  // Sign up functions

  const handleSignUp = async (newUser) => {
    let response = await API.createUser(newUser.username, newUser.password, newUser.email);
    if (response.ok) {
      setSubmitSuccess(true);
      setLoginErrorMsg('');
      console.log("It worked!")
  } else {
      setLoginErrorMsg('Sign up failed');
      console.log(loginErrorMsg);
  }
  }

  // Client functions

  // async function addClient(client) {

  //   let options = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(client)
  //   };

  //   try {
  //     let response = await fetch("/clients", options);
  //     if (response.ok) {
  //       let data = await response.json();
  //       setClients(data);
  //     } else {
  //       console.log(`Server error: ${response.status} ${response.statusText}`);
  //     }
  //   } catch (err) {
  //     console.log(`Server error: ${err.message}`);
  //   }

  //   navigate('/clients');
  // }

  // Repair functions

  // async function addRepair(repair) {
  //   let options = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(repair)
  //   };

  //   try {
  //     let response = await fetch("/repairs", options);
  //     if (response.ok) {
  //       let data = await response.json();
  //       setRepairs(data);
  //     } else {
  //       console.log(`Server error: ${response.status} ${response.statusText}`);
  //     }
  //   } catch (err) {
  //     console.log(`Server error: ${err.message}`);
  //   }

  //   navigate('/repairs');
  // }

  return (
    <div className="App">
      <Navbar user={user} logoutCB={() => handleLogout()} />
      <div className="d-flex">
        <Sidebar user={user} />
        <div className="content">          
          <Routes>
            <Route path="/" element={<Home/>} />

            <Route path="/login" element={<LogIn logInCb={(username, password) => handleLogin(username, password)}/>} />
            <Route path="/signup" element={<SignUp addUserCb={(newUser) => handleSignUp(newUser)} submitSuccess={submitSuccess}/>} />
            
            <Route path="/clients" element={
                <PrivateRoute>
                    <Clients />
                </PrivateRoute> 
              } />    
                
            {/* <Route path="/add-client" element={<AddClientView addClientCb={client => addClient(client)} />} /> */}

            <Route path="/repairs" element={
              <PrivateRoute>
                  <Repairs />
              </PrivateRoute>
            } />
            
            
            {/* <Route path="/add-repair" element={<AddRepairView addRepairCb={repair => addRepair(repair)}/>} /> */}

            <Route path="/myjobs" element={
            
              <PrivateRoute>
                <MyJobs user={user} />
              </PrivateRoute>
              } />

            <Route path="/manageusers" element={
            
            <AdminRoute>
              <ManageUsers user={user} />
            </AdminRoute>
            } />

            
          </Routes>
      </div>

      </div>
      
    </div>
  );

}