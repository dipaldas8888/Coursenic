import React from "react";
import { List, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
function Sidebar(){
    return(
        <ListGroup>
            <Link className="list-group-item list-group-item-action"tag="a"  to="/" >
                Home
            </Link>
            
            <Link  className="list-group-item list-group-item-action"tag="a" to="/add-course" >
                Add Courses
            </Link>
            <Link className="list-group-item list-group-item-action" tag="a" to="/view-course" >
                View Courses
            </Link>
            <Link className="list-group-item list-group-item-action" tag="a" to="#!" >
                About Us
            </Link>
            <Link className="list-group-item list-group-item-action" tag="a" to="#!" >
                Contact
            </Link>
        </ListGroup>
    )
}
export default Sidebar;