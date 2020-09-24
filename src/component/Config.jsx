import React, { Component } from 'react';
import { Row, Col, Input, Button, message, Switch } from 'antd';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import $ from 'jquery';
import Form from './Form';
import File from './File';
const { TextArea } = Input;
export default class Config extends Component {
  state = {
    fileList: [],
    uploading: false,
    encrypt: false,
    accountJson: '12',
    ipList: [
      '127.0.0.1:8081',
      '127.0.0.1:8082',
      '127.0.0.1:8083',
      '127.0.0.1:8084',
    ],
  }

  handleUpload = () => {
    let that = this;
    const { fileList, ipList, encrypt, accountJson } = this.state;
    const formData = new FormData();      //FormData实例
    // formData.append('file', fileList[0]); //文件
    fileList.forEach(file => {
      formData.append('file', file, 'file');
    });
    this.setState({
      uploading: true,
    });
    //json
    let request = {};
    request.nodeUrl = ipList; request.encrypt = encrypt;
    // request.accountJson = accountJson;
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }), 'request');
    $.ajax({
      url: 'http://47.106.251.33:8088/deploy',
      headers: {//跨域
        'Access-Control-Allow-Origin': true,
        withCredentials: true,
        'Content-Diposition': 'form-data;name=request'
      },
      type: 'POST',
      data: formData,
      contentType: false, //忽略contentType
      processData: false, //取消序列化
      dataType: 'json',
      // contentType:"multipart/form-data",
      // data: JSON.stringify(param),
      // contentType: "application/json; charset=UTF-8",
      // AccessControlAllowOrigin:true,
      // crossDomain:true,   // 会让请求头中包含跨域的额外信息，但不会含cookie
      // xhrFields: {
      //   withCredentials: true    // 前端设置是否带cookie
      // },
      success: function (res) {
        console.log('success', res);
        that.setState({
          fileList: [],
          uploading: false,
        });
        sessionStorage.setItem('fileData', JSON.stringify(res));
        that.props.history.push('/back');
        message.success('upload successfully.');
      },
      error: function () {
        that.setState({
          uploading: false,
        });
        message.error('upload failed.');
      },
    })
  };

  getFileList = (fileList) => {
    this.setState({ fileList });
  }

  getIpData = (ipList) => {
    this.setState({ ipList });
  }

  checkData = () => {
    const { fileList, ipList } = this.state;
    if (fileList.length === 0) {
      return true
    } else if (!ipList) {
      return true
    }
    return false
  }
  getAccountJson = (e) => {
    this.setState({ accountJson: e.target.value })
  }
  render() {
    const { fileList, uploading, ipList, encrypt } = this.state;
    return (
      <div className="app" style={{ padding: '10px' }}>
        <Row style={{ margin: '20px 0' }}>
          <Col span={12}>
            <Form getIpData={this.getIpData} ipList={ipList} />
          </Col>
          <Col span={12}>
            <Row gutter={16} style={{ margin: '0 0 20px 0' }}>
              <TextArea height='100px' onChange={this.getAccountJson} /></Row>
            <Row gutter={16}><Switch value={encrypt} sonChange={() => { this.setState({ encrypt: !encrypt }) }} /></Row>
          </Col>
        </Row>
        <File
          getFileList={this.getFileList}
        />
        <Row type='flex' justify='center' style={{ margin: '20px 0' }}>
          <Button
            type="primary"
            onClick={this.handleUpload}
            disabled={this.checkData()}
            loading={uploading}
            style={{ marginTop: 16 }}
          >
            {uploading ? 'loding' : 'submit'}
          </Button>
        </Row>
      </div>
    );
  }
}