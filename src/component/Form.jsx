import React, { Component } from 'react';
import { Row, Col, Input, InputNumber } from 'antd';
import './Form.less';
export default class Form extends Component{
    componentWillMount(){
      let { ipList } = this.props;
      var _data = ipList.map(i=>{
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
        return strArr.join(':');
      });
      this.props.getIpData && this.props.getIpData(dataStr);
    }

    ipChange = (e,idx) => {
      let {data} = this.state;
      data[idx].ip = e.target.value;
      this.setState({data},()=>{
        this.notifyUp(data);
      });
    }

    portChange = (port,idx) => {
      let { data } = this.state;
      data[idx].port = port;
      this.setState({data},()=>{
        this.notifyUp(data);
      });
    }

    generateItem = (data) => {
      let dom = [];
      data.map((item, idx) => (
        dom.push(
          <Row>
            <Col span={12}>
              <Input value={item.ip} onChange={(e)=>{this.ipChange(e,idx)}}/>
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