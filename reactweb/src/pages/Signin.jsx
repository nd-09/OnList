import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useFormik } from 'formik';
import { http } from '../config/http';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/user/userSlice';
import backgroundImage from "./images/blue.jpg"

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch= useDispatch();
    const formik= useFormik({
        initialValues: {
            email:"",
            password:"",
        },
        onSubmit:async(values)=>{
            const response =await http.post("/user/Signin",values)
            console.log(response.data);
            if(response.status===200){
              localStorage.setItem('user',JSON.stringify(response.data.user))
              localStorage.setItem('token',response.data.token)
            dispatch(setUser(response.data.user));
              navigate("/dashboard")
            }
        }
    }) 

  return (
    <header style={ NavStyle }>
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            paddingTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor:'#14279B' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              hypertext={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              hypertext={formik.touched.password && formik.errors.password}
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link style={{color: 'black'}} href="Signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </header>
    
  );
}

const NavStyle= {
  width:"100%",
  height: "100vh",
  background:`url(${backgroundImage})`,
  backgroundPosition:"center",
  backgroundRepeat: "no-repeat",
  backgroundSize:"cover",
  }