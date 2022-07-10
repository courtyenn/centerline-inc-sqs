import { useState, useEffect, Dispatch } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import dummyData from "./demo/data.json";

type Product = {
  id: number;
  manufacturer: string;
  name: string;
  SKU: string;
  imageSrc: string;
  description: string;
};

export const Gallery = () => {
  const [items, setItems]: [Product[], any] = useState([]);
  useEffect(() => {
    setItems(dummyData.hits);
  }, []);

  return (
    <Container>
      <Row>
        {items.map((i, index) => (
          <Col key={i.id} lg={3} sm={6}>
            <Card>
              <Card.Img variant="top" src={i.imageSrc} />
              <Card.Body>
                <Card.Title>
                  {i.name} - {i.SKU}
                </Card.Title>
                <Card.Text>{i.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
