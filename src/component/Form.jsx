import React, { Component } from 'react';
import { Row, Col, Input, InputNumber } from 'antd';
import './Form.less';
export default class Form extends Component{
    componentWillMount(){
      let _portArr =  [
        '127.0.0.1:8081',
        '127.0.0.1:8082',
        '127.0.0.1:8083',
        '127.0.0.1:8084',
      ]
      let { portArr=_portArr } = this.props;
      var _data = portArr.map(i=>{
        let arr = i.split(':');
        let obj = {};
        obj.ip = arr[0];
        obj.port = arr[1];
        return obj
      })
      this.setState({
        data: _data
      })
    }

    notifyUp = (data) => {
      let dataStr = data.map(item => {
        let strArr = []
        strArr.push(item.ip,item.port);
        strArr.join(':');
        return strArr;
      })
      return dataStr;
    }

    ipChange = (ip,idx) => {
      let {data} = this.state;
      data[idx].ip = ip;
      this.setState({data},()=>{
        this.notifyUp(data)
      });
    }

    portChange = (port,idx) => {
      let { data } = this.state;
      data[idx].port = port;
      this.setState({data},()=>{
        this.notifyUp(data)
      });
    }

    generateItem = (data) => {
      let dom = [];
      data.map((item, idx) => (
        dom.push(
          <Row key={JSON.stringify(item)}>
            <Col span={12}>
              <Input value={item.ip} onChange={(value)=>{this.ipChange(value,idx)}}/>
            </Col>
            <Col span={12}>
              <InputNumber value={item.port} onChange={(value) => { this.portChange(value, idx) }}/>
            </Col>
          </Row>
        )
      ))
      return (<div>{dom}</div>);
    }

    render(){
      const {data} = this.state;
      return(
        <div>
          {this.generateItem(data)}
        </div>
      )
    }
}