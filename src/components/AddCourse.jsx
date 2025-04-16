import { Fragment, useState, useEffect } from "react";
import { Button, Container, FormGroup } from "reactstrap";
import { Form, Label, Input } from "reactstrap";
import React from "react";
import axios from "axios";
import base_url from "./apiservice.js";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate

function AddCourse() { // You might not need courseInput prop anymore
    const location = useLocation();
    const navigate = useNavigate();
    const [courses, setcourses] = useState({
        userid: "",
        title: "",
        description: "",
        id: null // Add an 'id' field for updating
    });
    console.log("location state", location.state);
    const isUpdate = location.state && location.state.courseData;

    useEffect(() => {
        document.title = isUpdate ? "Edit Course" : "Add Course";
        if (isUpdate) {
            const { courseData } = location.state;
            console.log("courseData", courseData);
            setcourses({
                userid: courseData.userid || "",
                title: courseData.title || "",
                description: courseData.description || "",
                id: courseData.id || null // Set the ID for updating
            });
        }
    }, [location.state, isUpdate]);

    const handleForm = (e) => {
        e.preventDefault();
        if (!courses.userid || !courses.title || !courses.description) {
            toast.error("All fields are required!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return; // Stop form submission
        }
        console.log(courses);
        if (isUpdate && courses.id) {
            updateDataToServer(courses);
        } else {
            postdatatoserver(courses);
        }
    };

    const postdatatoserver = (data) => {
        axios.post(`${base_url}`, data)
            .then((response) => {
                console.log(response);
                console.log("success");
                toast.success("Course added successfully");
                navigate('/'); // Redirect back to the course list
            })
            .catch((error) => {
                console.log(error);
                console.log("error");
                toast.error("Failed to add course");
            });
    };

    const updateDataToServer = (data) => {
        axios.put(`${base_url}/${data.id}`, data)
            .then((response) => {
                console.log(response);
                console.log("success");
                toast.success("Course updated successfully");
                navigate('/'); // Redirect back to the course list
            })
            .catch((error) => {
                console.log(error);
                console.log("error");
                toast.error("Failed to update course");
            });
    };

    const resetForm = () => {
        setcourses({ userid: "", title: "", description: "", id: null });
    };

    return (
        <Fragment>
            <h1 style={{ textAlign: "center" }}>{isUpdate ? "Edit Course" : "Fill Course Details"}</h1>
            <Form onSubmit={handleForm}>
                <FormGroup>
                    <Label for="userId">Course id</Label>
                    <Input
                        type="text"
                        id="userId"
                        placeholder="Enter here"
                        value={courses.userid}
                        onChange={(e) => setcourses({ ...courses, userid: e.target.value })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="title">Course Title</Label>
                    <Input
                        type="text"
                        id="title"
                        placeholder="Enter course title"
                        value={courses.title}
                        onChange={(e) => setcourses({ ...courses, title: e.target.value })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Course Description</Label>
                    <Input
                        type="textarea"
                        id="courseDescription"
                        placeholder="Enter course description"
                        style={{ height: '150px' }}
                        value={courses.description}
                        onChange={(e) => setcourses({ ...courses, description: e.target.value })}
                    />
                </FormGroup>
                <Container className="text-center">
                    <Button type="submit" color="primary">{isUpdate ? "Update Course" : "Add Course"}</Button>
                    <Button type="reset" color="danger" className="mx-2" onClick={resetForm}>Reset</Button>
                </Container>
            </Form>
        </Fragment>
    );
}

export default AddCourse;