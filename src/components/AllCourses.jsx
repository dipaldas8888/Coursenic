import { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  CircularProgress,
  Alert,
  IconButton,
  Chip,
  Divider,
  Paper
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import base_url from "./apiservice";
import { toast } from "react-toastify";

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Coursenic - All Courses";
    
    const abortController = new AbortController();

    const getAllCourses = () => {
      setLoading(true);
      axios
        .get(`${base_url}`, { signal: abortController.signal })
        .then((response) => {
          setCourses(response.data);
          setLoading(false);
          toast.success("Courses fetched successfully");
        })
        .catch((error) => {
          if (error.name !== 'CanceledError') {
            console.error("Error fetching courses:", error);
            setError("Failed to load courses. Please try again later.");
            setLoading(false);
            toast.error("Error fetching courses");
          }
        });
    };

    getAllCourses();

    return () => abortController.abort();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${base_url}/${id}`)
      .then(() => {
        setCourses(courses.filter((course) => course.id !== id));
        toast.success("Course deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
        toast.error("Failed to delete course");
      });
  };

  const handleEdit = (course) => {
    navigate("/add-course", { state: { courseData: course } });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <>
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={4}
      >
        <Typography variant="h4" component="h1">
          All Courses
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate("/add-course")}
          startIcon={<SchoolIcon />}
        >
          Add New Course
        </Button>
      </Box>

      {courses.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
          <Typography variant="h6" color="text.secondary">
            No courses available
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Get started by adding your first course
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} md={6} key={course.id}>
              <Card 
                elevation={2} 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Chip 
                      label={course.courseId} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                      sx={{ mr: 1 }} 
                    />
                    <Typography variant="h6" component="h2" gutterBottom>
                      {course.title}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {course.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    color="primary" 
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(course)}
                  >
                    Edit
                  </Button>
                  <Button 
                    size="small" 
                    color="error" 
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default AllCourses;