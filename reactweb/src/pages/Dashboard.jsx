import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { AppBar, Button, Paper } from "@mui/material";
import Ticket from "./Tickets";
import { useState,useEffect } from "react";
import setUser from "../features/user/userSlice"
import { useSelector,useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import { http } from "../config/http";
import backgroundImage from "./images/blue.jpg"


function DashboardContent() {
  const [userData,setUserData]= useState([]);
  const [tokenData,setTokenData]= useState();

const dispatch= useDispatch();
const navigate= useNavigate();
useEffect(()=>{
  setUserData(JSON.parse(localStorage.getItem("user")));
  setTokenData(localStorage.getItem("token"));
},[])
  const handleLogout = () => {
    // dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  const user = useSelector((state) =>  state.user  );
  const getTickets=async()=>{
    try {
      const response=await http.get("/ticket/all")
      console.log("data",response.data.tickets);
      return response.data.tickets
    } catch (error) {
      
    }
  }

  return (
    <>
    { tokenData ?
   <header style={ NavStyle }>
   <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar
        style={{ backgroundColor: "#B5DEFF"}}
                  sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            color="black"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <Typography style={{color:"black"}}>Welcome, {userData?.firstName}</Typography>
          &nbsp;&nbsp;&nbsp;
          <Button
            onClick={handleLogout}
            variant="contained"
            style={{ backgroundColor: "red" }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Ticket getLists={getTickets} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
    </header>
  :navigate("/")}
  </>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}

const NavStyle= {
width:"100%",
height: "100vh",
background:`url(${backgroundImage})`,
backgroundPosition:"center",
backgroundSize:"cover",
}