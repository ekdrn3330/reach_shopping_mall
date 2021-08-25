/* eslint-disable */
import React, {useState} from 'react';
import { Navbar,Container,Nav,NavDropdown,Button } from 'react-bootstrap';
import './App.css';
import Data from './data';

function App() {

  let [shoes, shoes변경] = useState(Data);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="background">
        <h1>20% Season Off</h1>
        <p>
          dasdsadsadasdaskjdhaskjdhkjashdkjsa
        </p>
        <p>
          <Button variant="primary">Primary</Button>
        </p>
      </div>

      <div className="container">
        <div className="row">
          <Goods shoes={shoes} />
        </div>
      </div>

    </div>
  );
}

function Goods(props) {
  return (
    <>
      {
        props.shoes.map((curent, index, array)=>{
          return (
            <div className="col-md-4" key={index}>
              <img src="https://codingapple1.github.io/shop/shoes1.jpg" alt="" width="100%" />
              <h4>{ props.shoes[index].title }</h4>
              <p>{ props.shoes[index].content } &amp; 가격</p>
            </div>
          )
        })
      }
    </>
  );
}

export default App;
