import React, { useState,useEffect } from "react";
import Course from "./Course.jsx";
import base_url from "./apiservice.js";
import { toast} from "react-toastify";
import axios from "axios";
function AllCourses() {
    useEffect(() => {
        document.title = "All Courses";
        getAllCourses();
        
    }
    , []);
 const getAllCourses = () => {
    axios.get(`${base_url}`)
        .then((response) => {
            console.log(response.data);
            setCourses(response.data);
            toast.success("Courses fetched successfully", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
        .catch((error) => {
            console.error("Error fetching courses:", error);
            toast.error("Error fetching courses", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    };

 const [courses, setCourses] = useState([
    
    ]);

    // Function to handle course deletion in the parent component
    const handleCourseDelete = (deletedCourseId) => {
      setCourses(courses.filter((course) => course.id !== deletedCourseId));
  };

    return (
    
    <div style={{ padding: "20px" , backgroundColor: "#f8f9fa",textAlign : "center"}}>
      <h1>All Courses</h1>
      <p>This is the All Courses page.</p>
      <p>List of couses are</p>
      {courses.length > 0 ? courses.map((course,index) => (
        <Course key={index} course={course}  onDelete={handleCourseDelete} />
      )) : (
        <p>No courses available.</p>
      )}
        
          
    </div>
  );
}
export default AllCourses;