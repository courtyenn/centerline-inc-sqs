import { useState, useEffect, useReducer, useRef } from "react";
import { Container, Card, Row, Col, ButtonGroup, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import dummyData from "./demo/data.json";
import Shuffle from "shufflejs";

type Product = {
  id: number;
  manufacturer: string;
  name: string;
  SKU: string;
  imageSrc: string;
  description: string;
};

const initialState = {
  manufacturer: "",
};

const galleryReducer = (prev, action) => {
  return prev;
};

export const Gallery = () => {
  const shuffleInstance = useRef();
  const [state, dispatch] = useReducer(galleryReducer, initialState);
  const [items, setItems]: [Product[], any] = useState([]);
  useEffect(() => {
    setItems(dummyData.hits);
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      const element = document.querySelector(".my-shuffle-container");
      const sizer = element.querySelector(".my-sizer-element");

      shuffleInstance.current = new Shuffle(element, {
        itemSelector: ".picture-item",
        sizer,
        columnWidth: 100,
      });

      shuffleInstance.current.filter(Shuffle.ALL_ITEMS);
    }
  }, [items]);

  const selectManufacturer = (manu) => {
    shuffleInstance.current.filter(manu);
  };

  return (
    <Container>
      <Row>
        <h1>Gallery</h1>
      </Row>
      <Row>
        <Col md={3}>
          <ListGroup aria-label="Basic example">
            <ListGroup.Item action variant="outline-primary" onClick={() => selectManufacturer("Alfred")}>
              Alfred Jäger
            </ListGroup.Item>
            <ListGroup.Item action variant="outline-primary" onClick={() => selectManufacturer("Ortlieb")}>
              Ortlieb
            </ListGroup.Item>
            <ListGroup.Item action variant="outline-primary" onClick={() => selectManufacturer("Sycotec")}>
              Sycotec
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          <Row className="my-shuffle-container">
            <Col className="my-sizer-element" lg={3} sm={6}></Col>
            {items.map((i) => (
              <Col key={i.id} lg={3} sm={6} className="picture-item" data-groups={`["${i.manufacturer}"]`}>
                <Card style={{ marginBottom: "10px" }}>
                  <Card.Img variant="top" src={i.imageSrc} />
                  <Card.Body>
                    <Card.Title>
                      {i.name} - {i.SKU}
                    </Card.Title>
                    <Card.Text>{i.description}</Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Manufaturer: {i.manufacturer}</ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
