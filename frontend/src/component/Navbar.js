import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar(props) {
    let location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }
    // console.log(location)
    return (
        <nav className={`navbar navbar-expand-lg border-bottom sticky-top shadow-lg bg-${props.mode} text-${props.mode === 'light' ? 'black' : 'light'} border-${props.mode === 'light' ? 'dark' : 'light'}`}>
            <div className="container-fluid">
                <Link className={`navbar-brand text-primary`} style={{ textShadow: "rgb(0 0 0) 0px 0px 3px, rgb(2 74 108) 0px 0px 5px", fontSize: "32px" }} to="#" onClick={props.getOption}><i><strong>Todo</strong></i></Link>
                <button className="navbar-toggler bg-primary" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link text-${props.mode === 'light' ? 'black' : 'light'} ${location.pathname !== "/" ? "inActive" : ""}`} aria-current="page" name="Home" to="/" onClick={props.getOption} >Home</Link>
                        </li>
                    </ul>
                    <div className='mx-1' style={{ fontSize: "20px" }}>
                        <label className="switch">
                            <input type="checkbox" onClick={props.toogle} />
                            <span className="slider"></span>
                        </label> Dark Mode
                    </div>
                    {!localStorage.getItem("token") ? <form className="d-flex">
                        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-1" to="signup" role="button">Signup</Link>
                    </form> : <button className='btn btn-danger' onClick={handleLogout}>Log Out</button>}

                </div>
            </div>
        </nav>
    )
}
