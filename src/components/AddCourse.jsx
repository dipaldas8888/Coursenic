import { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  CircularProgress,
  Stack,
  Alert
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import base_url from "./apiservice";
import { toast } from "react-toastify";

function AddCourse() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [courses, setCourses] = useState({
    courseId: "",
    title: "",
    description: "",
    id: null
  });
  
  const isUpdate = location.state && location.state.courseData;

  useEffect(() => {
    document.title = isUpdate ? "Coursenic - Edit Course" : "Coursenic - Add Course";
    
    if (isUpdate) {
      const { courseData } = location.state;
      setCourses({
        courseId: courseData.courseId || "",
        title: courseData.title || "",
        description: courseData.description || "",
        id: courseData.id || null
      });
    }
  }, [location.state, isUpdate]);

  const handleForm = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!courses.courseId || !courses.title || !courses.description) {
      setError("All fields are required!");
      toast.error("All fields are required!");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    if (isUpdate && courses.id) {
      updateDataToServer(courses);
    } else {
      postDataToServer(courses);
    }
  };

  const postDataToServer = (data) => {
    axios
      .post(`${base_url}`, data
      )
      
      
      .then((response) => {
        console.log(response);
        setLoading(false);
        toast.success("Course added successfully");
        navigate("/view-courses");
      })
      .catch((error) => {
        console.error("Error adding course:", error);
        setLoading(false);
        setError("Failed to add course. Please try again.");
        toast.error("Failed to add course");
      });
  };

  const updateDataToServer = (data) => {
    axios
      .put(`${base_url}/${data.id}`, data)
      .then((response) => {
        console.log(response);
        setLoading(false);
        toast.success("Course updated successfully");
        navigate("/view-courses");
      })
      .catch((error) => {
        console.error("Error updating course:", error);
        setLoading(false);
        setError("Failed to update course. Please try again.");
        toast.error("Failed to update course");
      });
  };

  const resetForm = () => {
    setCourses({ courseId: "", title: "", description: "", id: null });
    setError(null);
  };

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
      <Box component="form" onSubmit={handleForm}>
        <Typography variant="h5" component="h1" gutterBottom mb={3}>
          {isUpdate ? "Update Course" : "Add New Course"}
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <Stack spacing={3}>
          <TextField
            label="Course ID"
            variant="outlined"
            fullWidth
            value={courses.courseId}
            onChange={(e) => setCourses({ ...courses, courseId: e.target.value })}
            required
            error={error && !courses.courseId}
            helperText={error && !courses.courseId ? "Course ID is required" : ""}
          />
          
          <TextField
            label="Course Title"
            variant="outlined"
            fullWidth
            value={courses.title}
            onChange={(e) => setCourses({ ...courses, title: e.target.value })}
            required
            error={error && !courses.title}
            helperText={error && !courses.title ? "Course title is required" : ""}
          />
          
          <TextField
            label="Course Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={courses.description}
            onChange={(e) => setCourses({ ...courses, description: e.target.value })}
            required
            error={error && !courses.description}
            helperText={error && !courses.description ? "Course description is required" : ""}
          />
          
          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<ClearIcon />}
              onClick={resetForm}
            >
              Reset
            </Button>
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : isUpdate ? (
                "Update Course"
              ) : (
                "Add Course"
              )}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}

export default AddCourse;