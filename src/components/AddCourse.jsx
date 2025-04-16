import { Fragment, useState } from "react";
import { Button, Container, FormGroup } from "reactstrap";
import { Form, Label, Input } from "reactstrap";
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import base_url from "./apiservice.js";
import { toast } from "react-toastify";

function AddCourse(){
    useEffect(() => {
            document.title = "All Courses";
            
        }
        , []);
        const [courses,setcourses]=useState({});
        const handleForm=(e)=>{
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
            postdatatoserver(courses);
        }
        const postdatatoserver=(data)=>{
axios.post(`${base_url}`,data).then((response)=>{
                console.log(response);
                console.log("success");
                toast.success("Course added successfully");
            }).catch((error)=>{
                console.log(error);
                console.log("error");
            });
        };
    return(
        <Fragment>
            <h1 style={{textAlign : "center"}}>Fill Course Details</h1>
            <Form onSubmit={handleForm}>
                <FormGroup>
                    <Label for="userId" >Course id</Label>
                    <Input type="text"  id="userId" placeholder="Enter here" onChange={(e)=>{
                        setcourses({...courses,userid:e.target.value})
                    }}/>
                </FormGroup>
                <FormGroup>
                    <Label for="title">Course Title</Label>
                    <Input type="text" id="title" placeholder="Enter course title" onChange={(e)=>{
                        setcourses({...courses,title:e.target.value})}}/>
                </FormGroup>
                <FormGroup>
                    <Label for="description">Course Description</Label>
                    <Input type="textarea"  id="courseDescription" placeholder="Enter course description" style={{height:'150 px'}} onChange={(e)=>{
                        setcourses({...courses,description:e.target.value})}}/>
                </FormGroup>
                <Container className="text-center">
                    <Button  type="submit" color="primary" >Add Course</Button>
                    <Button  type="reset"color="danger" className="mx-2" setcourses={{}}>Reset</Button>
                </Container>
            </Form>
        </Fragment>
    )
}
export default AddCourse;