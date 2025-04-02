// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [active, setActive] = useState("Home");

//     // Update the active state based on the current location/path
//     useEffect(() => {
//         // Set the active state based on the current location
//         if (location.pathname === "/") {
//             setActive("Home");
//         } else if (location.pathname === "/about") {
//             setActive("About");
//         } else if (location.pathname === "/events") {
//             setActive("Events");
//         } else if (location.pathname === "/volunteer") {
//             setActive("Volunteer");
//         } else if (location.pathname === "/donation") {
//             setActive("Donation");
//         }
//     }, [location]);  // Only run this when the location changes

//     return (
//         <nav className="navbar">
//             <div className="logo">
//                 <img src="ngoLogo.png" alt="Logo" />
//                 <span>Blind's Welfare Association</span>
//             </div>

//             <ul className="nav-links">
//                 {["Home", "About", "Events"].map((item) => (
//                     <li
//                         key={item}
//                         className={active === item ? "active" : ""}
//                     >
//                         <Link to={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
//                             {item}
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//             <div className="nav-buttons">
//                 <button
//                     className="volunteer-btn"
//                     onClick={() => navigate("/volunteer")}
//                 >
//                     👤 Volunteer
//                 </button>
//                 <button
//                     className="donate-btn"
//                     onClick={() => navigate("/donation")}
//                 >
//                     💰 Donate
//                 </button>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [active, setActive] = useState("Home");

    // Update the active state based on the current location/path
    useEffect(() => {
        if (location.pathname === "/") {
            setActive("Home");
        } else if (location.pathname === "/about") {
            setActive("About");
        } else if (location.pathname === "/events") {
            setActive("Events");
        } else if (location.pathname === "/volunteer") {
            setActive("Volunteer");
        } else if (location.pathname === "/donation") {
            setActive("Donation");
        }
    }, [location]);

    return (
        <nav className="navbar">
            <div className="logo">
                <img src="ngoLogo.png" alt="Logo" />
                <span>Blind's Welfare Association</span>
            </div>

            <ul className="nav-links">
                {["Home", "About", "Events"].map((item) => (
                    <li key={item} className={active === item ? "active" : ""}>
                        <Link to={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                            {item}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="nav-buttons">
                <button className="volunteer-btn" onClick={() => navigate("/volunteer")}>
                    👤 Volunteer
                </button>
                <button className="donate-btn" onClick={() => navigate("/donation")}>
                    💰 Donate
                </button>
                <button className="admin-btn" onClick={() => navigate("/admin/login")}>
                    🔑 Admin Login
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
