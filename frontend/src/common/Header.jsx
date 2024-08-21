// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Box from '@mui/material/Box';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';


// function Header({isAdmin}) {
  

//   const [value,setVlaue] = useState(0);

//   return (
//     <>
//       <AppBar position='sticky' sx={{background:"black"}}>
//         <Toolbar>
//           <Box width={"20%"}>
//             <svg viewBox="0 0 24 24" xmlns="(link unavailable)" height='40'>
//               <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm.001 6c-.001 0-.001 0 0 0h-.465l-2.667-4H20l.001 4zM15.5 15 10 18v-6l5.5 3zm-.964-6-2.667-4h2.596l2.667 4h-2.596zm-2.404 0H9.536L6.869 5h2.596l2.667 4zM4 5h.465l2.667 4H4V5z" fill="#ffffff" className="fill-000000"></path>
//             </svg>
//           </Box>
//           <Box display={'flex'} marginLeft={'auto'}>
//             <Tabs textColor='inherit' indicatorColor='secondary' value={value} onChange={(e,val)=>setVlaue(val)}>
//              <Tab label="Home" component={Link} to="/" sx={{color:"white"}}></Tab>
//              {isAdmin ? (
//                <Tab label="Add Theater" component={Link} to="/theater" sx={{ color: "white" }}></Tab>
//               ) : (
//                <Tab label="Theater" component={Link} to="/theater" sx={{ color: "white" }}></Tab>
//               )}
//               <Tab label="Movies" component={Link} to="/movie" sx={{color:"white"}}></Tab>
//               <Tab label="Admin" component={Link} to="/admin" sx={{color:"white"}}> </Tab>
//               <Tab label="User" component={Link} to="/user" sx={{color:"white"}}></Tab>
//             </Tabs>
//           </Box>
//         </Toolbar>
//       </AppBar>

//     </>
//   )
// }

// export default Header



import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Header({isAdmin}) {
  

  const [value,setVlaue] = useState(0);

  return (
    <>
      <AppBar position='sticky' sx={{background:"black"}}>
        <Toolbar>
          <Box width={"20%"}>
            <svg viewBox="0 0 24 24" xmlns="(link unavailable)" height='40'>
              <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm.001 6c-.001 0-.001 0 0 0h-.465l-2.667-4H20l.001 4zM15.5 15 10 18v-6l5.5 3zm-.964-6-2.667-4h2.596l2.667 4h-2.596zm-2.404 0H9.536L6.869 5h2.596l2.667 4zM4 5h.465l2.667 4H4V5z" fill="#ffffff" className="fill-000000"></path>
            </svg>
          </Box>
          <Box display={'flex'} marginLeft={'auto'}>
            <Tabs textColor='inherit' indicatorColor='secondary' value={value} onChange={(e,val)=>setVlaue(val)}>
             <Tab label="Home" component={Link} to="/" sx={{color:"white"}}></Tab>
              <Tab label="Theater" component={Link} to="/theater" sx={{ color: "white" }}></Tab>
              <Tab label="Movies" component={Link} to="/movie" sx={{color:"white"}}></Tab>
              {/* <Tab label="Admin" component={Link} to="/admin" sx={{color:"white"}}> </Tab>
              <Tab label="User" component={Link} to="/user" sx={{color:"white"}}></Tab> */}
              <Tab label='Sign Up' component={Link} to='/register' sx={{color:"white"}}></Tab>
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>

    </>
  )
}

export default Header