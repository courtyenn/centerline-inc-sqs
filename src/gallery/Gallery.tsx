import React, { useState, useEffect, useReducer, useRef } from "react";
import { Container, Card, Row, Col, ListGroup, ListGroupItem, Accordion } from "react-bootstrap";
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
  manufacturers: [],
};

const galleryReducer = (prev, action) => {
  switch (action.type) {
    case "MANUFACTURER":
      const indexOfItem = prev.manufacturers.indexOf(action.payload);
      if (indexOfItem >= 0) {
        const clone = prev.manufacturers.slice(0);
        clone.splice(indexOfItem, 1);
        return {
          ...prev,
          manufacturers: clone,
        };
      } else {
        return { ...prev, manufacturers: [...prev.manufacturers, action.payload] };
      }
  }
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

  useEffect(() => {
    if (state.manufacturers.length > 0 && shuffleInstance.current && Array.isArray(shuffleInstance.current) === true) {
      shuffleInstance.current.filter((element) => {
        const manufacturer = element.dataset.manufacturer;
        return state.manufacturers.includes(manufacturer);
      });
    } else if (shuffleInstance.current) {
      shuffleInstance.current.filter(Shuffle.ALL_ITEMS);
    }
  }, [state]);

  const selectManufacturer = (manu) => {
    dispatch({ type: "MANUFACTURER", payload: manu });
  };

  return (
    <Container>
      <Row>
        <h1>Gallery</h1>
      </Row>
      <Row>
        <Col md={3}>
          <Accordion>
            <Accordion.Item eventKey="manufacturer">
              <Accordion.Header>Manufacturer</Accordion.Header>
              <Accordion.Body style={{ padding: 0 }}>
                <ListGroup aria-label="Manufacturer options" variant="flush">
                  <ListGroup.Item
                    action
                    variant="outline-primary"
                    onClick={() => selectManufacturer("Alfred")}
                    active={state.manufacturers.includes("Alfred") ? true : false}
                  >
                    Alfred Jäger
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    variant="outline-primary"
                    onClick={() => selectManufacturer("Ortlieb")}
                    active={state.manufacturers.includes("Ortlieb") ? true : false}
                  >
                    Ortlieb
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    variant="outline-primary"
                    onClick={() => selectManufacturer("Sycotec")}
                    active={state.manufacturers.includes("Sycotec") ? true : false}
                  >
                    Sycotec
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col md={9}>
          <Row className="my-shuffle-container">
            <Col className="my-sizer-element" lg={3} sm={6}></Col>
            {items.map((i) => (
              <Col
                key={i.id}
                lg={3}
                sm={6}
                className="picture-item"
                data-groups={`["${i.manufacturer}"]`}
                data-manufacturer={i.manufacturer}
              >
                <Card style={{ marginBottom: "10px" }}>
                  <Card.Img variant="top" src={i.imageSrc} />
                  <Card.Body>
                    <Card.Title>
                      {i.name} - {i.SKU}
                    </Card.Title>
                    <Card.Text>{i.description}</Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Manufacturer: {i.manufacturer}</ListGroupItem>
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
