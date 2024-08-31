import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { getAdminData } from '../../api/Profiles_api/Profiles';
import { getTheaterData } from '../../api/Theater_api/Theater';
import { useNavigate } from 'react-router-dom';


function Admin() {
  const [adminData, setAdminData] = useState({});
  const [theater, setTheatre] = useState([])
  const adminId = localStorage.getItem('adminId') || 'abc';
  const navigate = useNavigate(); 

  useEffect(() => {

    const fetchAdminData = async () => {
      const data = await getAdminData(adminId);
      setAdminData(data);
    };
    fetchAdminData();

    const fetchTheaterData = async () => {
      const data = await getTheaterData(adminId);
      setTheatre(data);
    };
    fetchTheaterData();

  }, [adminId]);

  return (
    <div className="admin">
      <h1 style={{textAlign:'center',marginTop:'2rem'}}>Admin Dashboard</h1>
    <Box sx={{ width: '100%', display: 'flex', color: 'white', marginTop:'2rem'}}>
    
    {adminData && (
      <Box sx={{ width: '30%', p: 3, textAlign: 'center'}}>
        <AccountCircleIcon sx={{ fontSize: '10rem', mb: 2, color: 'white' }} />
        <Typography variant="h6" color="white">Name: {adminData.name}</Typography>
        <Typography variant="h6" color="white">Email: {adminData.email}</Typography>
        <Typography variant="h6" color="white">Phone no.: {adminData.phone}</Typography>
        <Typography variant="h6" color="white">Role: {adminData.role}</Typography>
      </Box>
    )}

    <Box sx={{ width: '70%', p: 3 }}>
      <Typography variant="h5" gutterBottom color="white">
        Theater Created by {adminData.name}
      </Typography>
      {theater.length > 0 ? (
          <Grid container spacing={3}>
            {theater.map(theater => (
              <Grid item xs={12} sm={6} md={4} key={theater._id}>
                <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', color: 'white'}} style={{cursor:'pointer'}}  onClick={() => navigate(`/theater/${theater._id}/movies`)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={theater.image}
                    alt={theater.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div" pb={1}>
                      {theater.name}
                    </Typography>
                    <Typography variant="body2" color="white" pb={1}>
                      City: {theater.city}
                    </Typography>
                    <Typography variant="body2" color="white" pb={1}>
                      Ticket Price: &#8377; {theater.ticketPrice} 
                    </Typography>
                    <Typography variant="body2" color="white">
                      Seats Available: {theater.seats[0]}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography color="white">No theater created by this admin.</Typography>
        )}
    </Box>
  </Box>
</div>
        
  );

}

export default Admin;