import React, { Component } from 'react';
import { Row, Col, Input, Button, message } from 'antd';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './Back.less';
import $ from "jquery";
var dom = [];
var _time='';
export default class Back extends Component {
  state = {
    fileData: null,
    showCountDown:false,
    now:new Date(),
  }
  
  copyData = () => {
    let textarea = document.createElement('textarea');
    // textarea.value = document.getElementsByClassName('text')[0].innerText;
    textarea.value = $('.text').get(0).innerText;
    // document.execCommand('copy', false, null)
    document.body.appendChild(textarea);
    let range = document.createRange();
    range.selectNode(textarea);
    const selection = window.getSelection();
    if (selection.rangeCount > 0) selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    textarea.style.display = 'none';
  }
  
  showCountDown = () => {
    this.setState({
      showCountDown:!this.state.showCountDown
    })
  }
  addZero = (num) => {
    return num < 10 ? '0'+ num : '' + num;
  }

  getCountDown = () => {
    //假设2100年为终止，估计活不到 哈哈
    let _str = '';
    let { now } = this.state;
    let EndTime = new Date('2100');
    let StartTime = now;
    let diff = EndTime - StartTime;
    let _h = parseInt(diff/1000/60/60);
    let _m = new Date(diff).getMinutes();
    let _s = new Date(diff).getSeconds();
    _str = this.addZero(_h) + ':' + this.addZero(_m) + ':' + this.addZero(_s);
    return _str
  }

  componentWillMount(){
    _time = setInterval(() => {
      this.setState({now:new Date()});
    }, 1000);
  }

  componentWillUnmount(){
    clearInterval(_time);
  }
  render() {
    let { showCountDown, fileData } = this.state;
    let _item = {
      "hypercharin":{
        "namespace":"1",
        "contractAddress":"2",
        "contractAddress":"3",
        "accountJson":"3",
        "nodeUrl":"7"
      }
    }
    let data =  JSON.parse(sessionStorage.getItem('fileData')).data;
    // let data =  _item;
    let { hyperchain } = data;
    let { nodeUrl } = hyperchain;
    let _indent = {textIndent:'2em'}
    return (
      // &nbsp;
      
      <div className="back" style={{width:'80%',margin:'0 auto'}}>
        <div className="text" style={{width:'100%',lineHeight:'1em',padding:'1em'}}>
          <pre>
            hyperchain:<br/>
            {'  namespace: ' + hyperchain.namespace}<br/>
            {'  contractAddress: ' + `'${hyperchain.contractAddress}'`}<br/>
            {'  nodeUrl: '+ nodeUrl.join(',')}<br/>
            {'  accountJson: ' + `'${hyperchain.accountJson}'`}
          </pre>
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
          <Col span={4}>
            <Button type='primary' onClick={this.showCountDown}>
              {showCountDown ? '关闭死亡倒计时' : '显示死亡倒计时'}
            </Button>
          </Col>
          <Col span={4}>
            {
              showCountDown && <div className='count-down'>
                {this.getCountDown()}
              </div>
            }
          </Col>
        </Row>
        <Row>
          <div className='bg-img'></div>
        </Row>
      </div>
    );
  }
}