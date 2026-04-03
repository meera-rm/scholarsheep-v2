// /* Initial styles for the navbar */
// .navbar {
//     background-color: #333;
//     padding: 20px;
//     transition: all 0.3s ease; /* Add a smooth transition effect */
//   }
  
//   /* Styles for the navbar when it shrinks */
//   .navbar.shrink {
//     padding: 10px; /* Adjust the padding when the navbar shrinks */
//   }
//   import React, { useState, useEffect } from 'react';
// import './App.scss'; // Import the SCSS file

// function App() {
//   const [scrolling, setScrolling] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setScrolling(true);
//       } else {
//         setScrolling(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <nav className={`navbar ${scrolling ? 'shrink' : ''}`}>
//       {/* Navbar content */}
//       <ul>
//         <li>Home</li>
//         <li>About</li>
//         <li>Contact</li>
//       </ul>
//     </nav>
//   );
// }

// export default App;
