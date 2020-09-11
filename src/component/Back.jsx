import React, { Component } from 'react';
import { Row, Col, Input, Button, message } from 'antd';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
// import style from './Back.less';
import $ from "jquery";
var dom = [];
export default class Back extends Component {
  state = {
    fileData:sessionStorage.getItem('fileData') || null
  }
  
  copyData = () => {
    let textarea = document.createElement('textarea')
    textarea.value = $('.text').innerText;
    // document.execCommand('copy', false, null)
    document.body.appendChild(textarea);
    let range = document.createRange();
    range.selectNode(textarea);
    const selection = window.getSelection();
    // if (selection.rangeCount > 0) selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    textarea.style.display = 'none';
  }
  
  render() {
    let _item = {
      "hypercharin":{
        "namespace":"",
        "contractAddress":"",
        "contractAddress":"",
        "accountJson":"",
        "nodeUrl":""
      }
    }
    let data =  _item;
    let { hypercharin } = data;
    let _indent = {textIndent:'2em'}
    return (
      <div className="back" style={{width:'80%',margin:'0 auto'}}>
        <div className="text" style={{width:'100%',border:'1px solid gray',lineHeight:'1em',padding:'1em'}}>
          <p>hypercharin:</p>
          <p style={_indent}>namespace:{hypercharin.namespace}</p>
          <p style={_indent}>contractAddress:{hypercharin.contractAddress}</p>
          <p style={_indent}>accountJson:{hypercharin.accountJson}</p>
          <p style={_indent}>nodeUrl:{hypercharin.nodeUrl}</p>
        </div>
        <Row style={{marginTop:'2em'}}>
          <Col span={4}>
            <Button type='primary' onClick={()=>{this.props.history.push('/config')}}>
              Back
            </Button>
          </Col>
          <Col span={4}>
            <Button type='primary' onClick={this.copyData}>
              Copy
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}