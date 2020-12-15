import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
const reducer = (state=0, action) => {
  switch (action.type) {
    case 'INCREMENT':return state+1;
    case 'DECREASE': return state-1;
    default:return state;
  }
}
const store = createStore(reducer);
const Counter = ({value,onIncrement,onDecrease}) => {
  return (<div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrease}>-</button>
  </div>)
}
const render = () => {
  ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <Counter 
    value = {store.getState()}
    onIncrement = {()=> store.dispatch({type:'INCREMENT'})}
    onDecrease = {()=> store.dispatch({type:'DECREASE'})}
 >
  </Counter>
  ,
  document.getElementById('root')
);
}
render();
store.subscribe(render);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
