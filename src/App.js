import React, { Component } from 'react';
import {Row, Col, Input, Button} from 'antd';
// import logo from './logo.svg';
// import './App.css';

import Form from './component/Form';
import File from './component/File';
class App extends Component {
  render(){
    return ( <div className = "App" > 
      {
        /* <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header> */
      } 
      
      <Row>
        <Col span={12}><Form/></Col>
        <Col span={12}>
          <Input type='textarea' />
        </Col>
      </Row>
      <File/>
      <Row><Button type='primary'>
        提交
        </Button></Row>
      </div>
    );
  }
}

export default App;
