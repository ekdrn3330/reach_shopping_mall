import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import {재고context} from './App.js';
import { Nav } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import { connect, useDispatch, useSelector } from 'react-redux';

let 박스 = styled.div`
    padding : 20px;
`;

let 제목 = styled.h4`
    font-size : 25px;
    color : ${ props => props.색상 };
`;

// class Detail2 extends React.Component {

//     componentDidMount() {
        
//     }

//     componentWillUnmount() {

//     }

// }

function Detail(props) {

    let state = useSelector((state)=>state);
    let dispatch = useDispatch();

    let 재고 = useContext(재고context);

    useEffect(()=>{

        var a = localStorage.getItem('arr');
        var b = JSON.parse(a);
        if(b == null) {
            console.log('장바구니에 상품이 없음');
            localStorage.setItem('arr',JSON.stringify([id]));
        } else {
            console.log('장바구니에 상품이 있음');
            b.push(id);
            b = new Set(b);
            b = [...b];
            localStorage.setItem('arr',JSON.stringify(b));
        }
        console.log(b);

        let 타이머 = setTimeout(()=>{ alert변경(false); },2000);
        return ()=>{ clearTimeout(타이머); }

    },[]);

    let [스위치, 스위치변경] = useState(false);
    let [누른탭, 누른탭변경] = useState(0);
    let [alert, alert변경] = useState(true);
    let { id } = useParams();
    let history = useHistory();
    let [수량, 수량변경] = useState(0);
    let 찾은상품 = props.shoes.find((상품)=>{
        return 상품.id == id;
    });

    return (
        <div className="container">
            <박스>
                <제목 className="red">상세페이지</제목>
            </박스>

            
            {
                alert === true
                ? <div className="my-alert2"><p>재고가 얼마 남지 않았습니다</p></div>
                : null
            }

            <div className="row">
            <div className="col-md-6">
                <img src={ 'https://codingapple1.github.io/shop/shoes' + ( 찾은상품.id + 1 ) + '.jpg' } alt="" width="100%" />
            </div>
            <div className="col-md-6 mt-4">
                <h4 className="pt-5">{ 찾은상품.title }</h4>
                <p>{ 찾은상품.content }</p>
                <p>{ 찾은상품.price }원</p>

                <Info 수량={수량} 수량변경={수량변경} />

                <button className="btn btn-danger" onClick={()=>{
                    dispatch({ type : '항목추가', payload : {id : 찾은상품.id, name : 찾은상품.title, quan : state.reducer3} });
                    history.push('/cart');
                }} >주문하기</button>
                &nbsp;
                <button className="btn btn-danger" onClick={()=>{ history.goBack(); }}>뒤로가기</button> 
            </div>
            </div>

            <Nav clasName="mt-5" variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={()=>{ 스위치변경(false); 누른탭변경(0); }}>Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={()=>{ 스위치변경(false); 누른탭변경(1); }}>Option 2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={()=>{ 스위치변경(false); 누른탭변경(2); }}>Option 3</Nav.Link>
                </Nav.Item>
            </Nav>

            <CSSTransition in={스위치} classNames="wow" timeout={500} >
                <TabContent 누른탭={누른탭} 스위치변경={스위치변경} />
            </CSSTransition>

        </div> 
    );
}

function TabContent(props) {

    useEffect(()=>{
        props.스위치변경(true);
    });

    if(props.누른탭 === 0) {
        return <div>0번째 내용입니다</div>
    } else if (props.누른탭 === 1) {
        return <div>1번째 내용입니다</div>
    } else if (props.누른탭 === 2) {
        return <div>2번째 내용입니다</div>
    }
} 


function Info() {
    let state = useSelector((state)=>state);
    let dispatch = useDispatch();
    return (
        <p>수량<input onChange={(e)=>{ dispatch({ type : '수량변경', 수량 : e.target.value }); }} /></p>
    );
}

// function state를props화(state) {
//     return {
//         state : state.reducer,
//         alert열렸니 : state.reducer2
//     }
// }

// export default connect(state를props화)(Detail)

export default Detail;