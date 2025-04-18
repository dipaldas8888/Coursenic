import { useEffect } from "react";
import { 
  Typography, 
  Paper, 
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  Grid,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";

function Home() {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Coursenic - Home";
  }, []);

  return (
    <>
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2, bgcolor: "#f0f7ff" }}>
        <Box display="flex" alignItems="center" mb={2}>
          <SchoolIcon sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Coursenic
          </Typography>
        </Box>
        <Typography variant="body1" paragraph>
          Your one-stop solution for learning and growth. Explore our courses, manage your learning journey, and achieve your goals!
        </Typography>
        <Box display="flex" gap={2} mt={3}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate("/view-courses")}
          >
            Browse Courses
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={() => navigate("/add-course")}
          >
            Add New Course
          </Button>
        </Box>
      </Paper>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, mb: 3 }}>
        Featured Categories
      </Typography>

      <Grid container spacing={3}>
        {["Programming", "Data Science", "Design", "Business"].map((category) => (
          <Grid item xs={12} sm={6} md={3} key={category}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="div"
                sx={{
                  height: 140,
                  bgcolor: "primary.light",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <SchoolIcon sx={{ fontSize: 60, color: "white" }} />
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Explore our {category.toLowerCase()} courses and enhance your skills.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Home;