import { useState } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./components/Home";
import AllCourses from "./components/AllCourses";
import AddCourse from "./components/AddCourse";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ToastContainer />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-course" element={<AddCourse />} />
            <Route path="/view-courses" element={<AllCourses />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;