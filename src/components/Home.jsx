import React from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from "reactstrap";
import { useEffect } from "react";
function Home() {
  useEffect(() => {
          document.title = "Home";
    
      }
      , []);
  return (
    <Container fluid style={{ padding: "1rem" }}>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <CardTitle tag="h1" className="text-center">
                Welcome to Coursenic
              </CardTitle>
              <CardText>
                <p>
                  Coursenic is your one-stop solution for learning and growth. Explore
                  our courses, manage your learning journey, and achieve your goals!
                </p>
                <p>
                  Use the sidebar to navigate through different sections of the
                  application.
                </p>
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;