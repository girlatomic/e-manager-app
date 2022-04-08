import React from "react";
import { Link } from "react-router-dom";
import Local from '../helpers/Local';


function AdminRoute(props) {
    // Redirect to /login if anonymous user
    let userType = Local.getUserType();
    if (userType != "admin") {
        return (
        
        <div className="container d-flex flex-column align-items-center pt-3">
            <h1 className="text-danger">Sorry! You must be an admin to view this page.</h1>
            <Link to="/" className="btn btn-primary">Go Home</Link>
        </div>
        
        
        
        );
    }
    // Render child component(s)
    return (
        <>
            {props.children}
        </>
    );
}

export default AdminRoute;