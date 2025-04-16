import React from "react";
import { Card, CardBody, CardSubtitle, CardText, Button, Container } from "reactstrap";
import base_url from "./apiservice";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom'; // Import Link

function Course({ course, onDelete }) {
    const deletecourse = (id) => {
        axios.delete(`${base_url}/${id}`).then((response) => {
            console.log(response);
            console.log("success");
            toast.success("Course deleted successfully");
            onDelete(id); // Call the parent function to update the course list
        }).catch((error) => {
            console.log(error);
            console.log("error");
        });
    }

    return (
        <div>
            <Card className="text-center">
                <CardBody>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">{course.title}</CardSubtitle>
                    <CardText>{course.description}</CardText>
                    <Container>
                        <Button color="primary" onClick={() => deletecourse(course.id)}>Delete</Button>
                        {/* Use Link to navigate to AddCourse with course data as state */}
                        <Link
                            to={{
                                pathname: "/add-course", // Define the path for your AddCourse component
                                state: { courseData: course } // Pass the course data as state
                            }}
                            className="btn btn-danger mx-2" // Apply button styling
                        >
                            Update
                        </Link>
                    </Container>
                </CardBody>
            </Card>
        </div>
    );
}

export default Course;