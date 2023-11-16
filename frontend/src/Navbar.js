import { useState } from 'react'

import {IconText} from './components/Icons.js'
import {FaGear} from 'react-icons/fa6'


const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation" style={{borderBottom: "1px solid"}}>
        <div className="navbar-brand">
            <a className="navbar-item has-text-weight-bold" href="/">
                NginUI
            </a>

            <a href="#null" role="button" className={`navbar-burger ${mobileOpen ? "is-active": ""}`}
               aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={(e) => {
                e.preventDefault();
                setMobileOpen(!mobileOpen);
               }}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">

            {/* <a className="navbar-item" href="#null">
                Something 1
            </a> */}

            <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link" href="#null">
                More
                </a>

                <div className="navbar-dropdown">
                <a className="navbar-item" target="_blank" rel='noreferrer' href="https://github.com/cmmeyer1800/NginUI">
                    About
                </a>
                <a className="navbar-item" target="_blank" rel='noreferrer' href="https://nginui.readthedocs.io/">
                    Documentation
                </a>
                <hr className="navbar-divider"></hr>
                <a className="navbar-item" target="_blank" rel='noreferrer' href="https://github.com/cmmeyer1800/NginUI/issues">
                    Report an issue
                </a>
                </div>
            </div>
            </div>

            <div className="navbar-end">
                <a className="navbar-item" href='/settings'>
                    <IconText icon={<FaGear/>}>Settings</IconText>
                </a>
            </div>
        </div>
        </nav>
    )
}


export default Navbar;