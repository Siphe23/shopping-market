
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa';

import '../assets/Navbar.css';
// Correct default export
const Navbar = () => {
    return (
                <nav>
                    <div className="logo">
                        <h1>Shoppree<span>.com</span></h1>
                    </div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shoplist">Shop List</Link></li>
                        <Link to="/buy">Buy</Link>
                        <Link to="/sell">Sell</Link>

                        <li>
                            <Link to="/login">
                                <FaUser /> 
                             
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart">
                                <FaShoppingCart /> 
                               
                            </Link>
                        </li>
                    </ul>
                </nav>
            );
  };
  export default Navbar;
  

// const Navbar = () => {
//     return (
//         <nav>
//             <div className="logo">
//                 <h1>Shoppree<span>.com</span></h1>
//             </div>
//             <ul>
//                 <li><Link to="/">Home</Link></li>
//                 <li><Link to="/shoplist">Shop List</Link></li>
//                 <li><Link to="/buy">Buy</Link></li>
//                 <li><Link to="/sell">Sell</Link></li>
//                 <li>
//                     <Link to="/login">
//                         <FaUser /> 
                     
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/cart">
//                         <FaShoppingCart /> 
                       
//                     </Link>
//                 </li>
//             </ul>
//         </nav>
//     );
// };

// export default Navbar;
