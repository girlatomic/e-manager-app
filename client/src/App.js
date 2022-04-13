import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Clients from "./pages/Clients";
import Repairs from "./pages/Repairs";
import AddClientView from "./pages/AddClientView";
import AddRepairView from "./pages/AddRepairView";
import EditRepairView from "./pages/EditRepairView";
import MyJobs from "./pages/MyJobs.js";
import MySettings from "./pages/MySettings.js";
import LogIn from "./pages/LogIn.js";
import SignUp from "./pages/SignUp.js";
import ManageUsers from "./pages/ManageUsers.js";
import EditClientView from "./pages/EditClientView";

// Helpers
import API from "./helpers/API.js";
import Local from "./helpers/Local.js";

// Stylesheet
import "./App.css";

export default function App() {
  let [user, setUser] = useState(Local.getUser());
  let [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const [inactive, setInactive] = useState(false);

  // Functions for log in and log out

  async function handleLogin(username, password) {
    let response = await API.loginUser(username, password);
    console.log(response);
    if (response.ok) {
      Local.saveUserInfo(response.data.token, response.data.user);
      setUser(response.data.user);
      setLoginError("");
      navigate("/myjobs");
    } else {
      setLoginError(response.error);
      console.log(loginError);
    }
  }

  async function handleLogout() {
    Local.removeUserInfo();
    setUser(Local.getUser());
  }

  // Sign up functions

  const handleSignUp = async (newUser) => {
    let response = await API.createUser(
      newUser.username,
      newUser.password,
      newUser.email
    );
    if (response.ok) {
      setLoginError("");
      console.log("Sign up successful!");
    } else {
      setLoginError(response.error);
      console.log(loginError);
    }
  };

  // Change user info

  async function updateUserInfo(userObj, route) {
    let response = await API.updateUserInfo(userObj, route);
    console.log(response);
    if (response.ok) {
      Local.saveUserInfo(response.data.token, response.data.user);
      setUser(response.data.user);
      setLoginError("");
    } else {
      setLoginError("Login failed");
      console.log(loginError);
    }
  }

  return (
    <div className="App">
      <Navbar user={user} logoutCB={() => handleLogout()} />
      <div>
        <Sidebar
          user={user}
          onCollapse={(inactive) => {
            console.log(inactive);
            setInactive(inactive);
          }}
        />

        <div className={`content ${inactive ? "inactive" : ""}`}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/login"
              element={
                <LogIn
                  logInCb={(username, password) =>
                    handleLogin(username, password)
                  }
                />
              }
              loginError={loginError}
            />
            <Route
              path="/signup"
              element={
                <SignUp addUserCb={(newUser) => handleSignUp(newUser)} />
              }
            />

            <Route
              path="/clients"
              element={
                <PrivateRoute>
                  <Clients />
                </PrivateRoute>
              }
            />

            <Route
              path="/clients/add"
              element={
                <PrivateRoute>
                  <AddClientView />
                </PrivateRoute>
              }
            />

            <Route
              path="/clients/edit/:id"
              element={
                <PrivateRoute>
                  <EditClientView user={user} />
                </PrivateRoute>
              }
            />

            <Route
              path="/mysettings"
              element={
                <PrivateRoute>
                  <MySettings
                    user={user}
                    updateUserCB={(userObj, route) =>
                      updateUserInfo(userObj, route)
                    }
                  />
                </PrivateRoute>
              }
            />

            <Route
              path="/repairs"
              element={
                <PrivateRoute>
                  <Repairs />
                </PrivateRoute>
              }
            />

            <Route
              path="/repairs/add"
              element={
                <PrivateRoute>
                  <AddRepairView user={user} />
                </PrivateRoute>
              }
            />

            <Route
              path="/repairs/edit/:repair_id"
              element={
                <PrivateRoute>
                  <EditRepairView user={user} />
                </PrivateRoute>
              }
            />

            <Route
              path="/myjobs"
              element={
                <PrivateRoute>
                  <MyJobs user={user} />
                </PrivateRoute>
              }
            />

            <Route
              path="/manageusers"
              element={
                <AdminRoute>
                  <ManageUsers user={user} />
                </AdminRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
