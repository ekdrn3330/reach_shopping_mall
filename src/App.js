/* eslint-disable */

import React, {useContext, useState, lazy, Suspense} from 'react';
import { Navbar,Container,Nav,NavDropdown,Button } from 'react-bootstrap';
import './App.css';
import Data from './data';
// import Detail from './Detail';
let Detail = lazy(() => import('./Detail.js'));
import Cart from './Cart.js';
import axios from 'axios';

export let 재고context = React.createContext();

import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
let Abc = lazy(()=> import('./Abc.js'));

function App() {

  let [onOff, onOff변경] = useState(false);
  let [shoes, shoes변경] = useState(Data);
  let [재고,재고변경] = useState([10,11,12]);
  let [count, setCount] = useState(0);
  let [age, setAge] = useState(20);
  useEffect(()=>{
    if(count != 0 && count < 3) {
      setAge(age+1);
    }
  },[count])

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/Detail">Detail</Nav.Link>
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
      
      <Switch>
        
        <Route exact path="/">
          <div>
            <div>안녕하십니까 전 {age}</div>
            <button onClick={()=>{
              setCount(count+1);
            }}>누르면한살먹기</button>
          </div>
          <div className="background">
            <h1>20% Season Off</h1>
            <p>
              react shopping mall
            </p>
            <p>
              <Button variant="primary">Primary</Button>
            </p>
          </div>
          <div className="container">
            
            <button onClick={()=>{ 
              var newArray = [...shoes];
              newArray.sort((a, b)=>{
                return b.price-a.price;
              });
              shoes변경(newArray);
            }}>가격순정렬</button>

            <재고context.Provider value={재고}>

            <div className="row">
              {
                shoes.map((a, i)=>{
                  return <Card shoes={shoes[i]} i={i} key={i} />
                })
              }
            </div>

            </재고context.Provider>

            {
              onOff === true
              ? <div><div class="spinner-border" role="status" /></div>
              : null
            }
            <button class="btn btn-primary" onClick={()=>{

              onOff변경(true);

              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result)=>{
                onOff변경(false);
                shoes변경( [...shoes, ...result.data] );
              })
              .catch(()=>{
                console.log('실패했어요.');
              });

            }}>더보기</button>
          </div>
        </Route>

        
        <Route path="/detail/:id">
          <재고context.Provider value={재고}>
            <Suspense fallback={<div>로딩중이에요</div>}>
              <Detail shoes={shoes} 재고={ 재고 } 재고변경={재고변경} />
            </Suspense>
          </재고context.Provider>
        </Route>
        
        <Route path="/cart">
            <Cart />
        </Route>

        <Route path="/abc">
          <Suspense fallback={<div>로딩중입니다.</div>}>
            <Abc />
          </Suspense>
        </Route>

        <Route path="/:id">
              <div>아무거나적었을때 이거 보여주셈</div>
        </Route>

        {/* <Route path="/어쩌구" component={Modal} ></Route> */}

      </Switch>
      
    </div>
  );
}

function Card(props) {

  let 재고 = useContext(재고context);
  let history = useHistory();

  return (
    <div className="col-md-4" onClick={()=>{ history.push('/detail/' + props.shoes.id); }}>
      <img src={ 'https://codingapple1.github.io/shop/shoes' + (props.shoes.id + 1) + '.jpg' } alt="" width="100%" />
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.content } &amp; {props.shoes.price}원</p>
      {재고[props.i]}
      <Test />
    </div>
  );
}

function Test(props) {
  let 재고 = useContext(재고context);
  return (
    <p>재고 : {재고}</p>
  )
}


export default App;
