import React, { Component } from 'react';
import { Row, Col, Input, Button, message } from 'antd';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
// import style from './Back.less';
// var dom = [];
export default class Back extends Component {
  state = {
    fileData:window.fileData || null
  }

  renderCycleData = (data) => {
    for (var k in data){
      if(typeof data[k] === 'object'){
        this.renderCycleData(data[k]);
      }else{
        dom.push(<div><span>{k}:{data[k]}</span></div>)
      }
    }
    return (<div>{dom}</div>)
  }

  renderData = () => {
    const {fileData} = this.state;
    if(!fileData) return;
    return this.renderCycleData(fileData);
  }
  
  render() {
    return (
      <div className="back" style={{width:'80%',margin:'20px auto',background:'#f90'}}>
        <div className="text" style={{width:'100%',border:'1px solid #000'}}>
          {this.renderData()}
        </div>
        <Row>
          <Button type='primary' onClick={()=>{this.props.history.push('/config')}}>
            Back
          </Button>
        </Row>
      </div>
    );
  }
}