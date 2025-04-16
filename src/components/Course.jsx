import React from "react";
import { Card,CardBody ,CardTitle,CardSubtitle,CardText,CardFooter,Button,Container}from "reactstrap";
import base_url from "./apiservice";
import axios from "axios";
import { toast } from "react-toastify";
function Course({course, onDelete}) {
    const deletecourse=(id)=>{
        axios.delete(`${base_url}/${id}`).then((response)=>{
            console.log(response);
            console.log("success");
            toast.success("Course deleted successfully");
            onDelete(id); // Call the parent function to update the course list

        }).catch((error)=>{
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
                            <Button color="primary" onClick={()=>deletecourse(course.id)}>Delete</Button>
                            <Button color="danger" className="mx-2">Update</Button>
                        </Container>
                    </CardBody>
                </Card>
            
        </div>
    );
}
export default Course;