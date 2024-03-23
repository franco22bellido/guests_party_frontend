import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {

    const {isAuthenticated, logOut} = useAuth();



    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

                    {
                        isAuthenticated === true ? 
                    <div className="navbar-nav">
                        {/* <Link className="nav-link active" aria-current="page" to="create-event">Create new event</Link> */}
                        <Link className="nav-link" onClick={()=> logOut()}>logout</Link>
                        {/* <Link className="nav-link" to="#">Pricing</Link> */}
                        {/* <Link className="nav-link" to={''}>Disabled</Link> */}
                    </div>
                        :
                    <div className="navbar-nav">
                        <Link className="nav-link active" aria-current="page" to="/login">Sign In</Link>
                        <Link className="nav-link" to="/register">Sign Up</Link>
                        {/* <Link className="nav-link" to={''}>Disabled</Link> */}
                    </div>
                    }

                </div>
            </div>
        </nav>
    )
}

export default Navbar


// login, register, events= homepage, create new event logout