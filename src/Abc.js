import React, { useEffect, memo } from 'react';

function Cart2(){
    return (
      <Parent 이름="존박1" 나이="20" />
    )
  }
  
  function Parent(props){
    return (
      <div>
        <Child1 이름={props.이름} />
        <Child2 나이={props.나이} /> 
      </div>
    )
  }
  function Child1(){
    useEffect( ()=>{ console.log('렌더링됨1') } );
    return <div>1111</div>
  }
  let Child2 = memo(function(){
    useEffect( ()=>{ console.log('렌더링됨2') } );
    return <div>2222</div>
  });

export default Cart2;