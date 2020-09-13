import React, { Component } from 'react';
import { Row, Col, Input, Button, message, Switch } from 'antd';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import $ from 'jquery';
import Form from './Form';
import File from './File';
const {TextArea} = Input;
export default class Config extends Component {
  state = {
    fileList: [],
    uploading: false,
    encrypt:false,
    accountJson:'',
    ipList: [
      '127.0.0.1:8081',
      '127.0.0.1:8082',
      '127.0.0.1:8083',
      '127.0.0.1:8084',
    ],
  }

  handleUpload = () => {
    const { fileList, ipList, encrypt, accountJson } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('file', file);
    });

    this.setState({
      uploading: true,
    });
    let that = this;
    formData.append('nodeUrl', ipList);
    formData.append('encrypt', encrypt);
    if (!accountJson || !accountJson.trim()){
      formData.append('accountJson', accountJson);
    };
    console.log(fileList, 'form', formData);
    $.ajax({
      url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      dataType: 'json',
      // contentType:"multipart/form-data",

      // data: JSON.stringify(param),
      // contentType: "application/json; charset=UTF-8",

      // // processData:false,
      success: function (res) {
        console.log('success', res);
        that.setState({
          fileList: [],
          uploading: false,
        });
        sessionStorage.setItem('fileData',res);
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
    // You can use any AJAX library you like
    // reqwest({
    //   url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //   method: 'post',
    //   processData: false,
    //   data: formData,
    //   success: () => {
    //     this.setState({
    //       fileList: [],
    //       uploading: false,
    //     });
    //     message.success('upload successfully.');
    //   },
    //   error: () => {
    //     this.setState({
    //       uploading: false,
    //     });
    //     message.error('upload failed.');
    //   },
    // });


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

  render() {
    const { fileList, uploading, ipList, encrypt } = this.state;
    return (
      <div className="app" style={{padding:'10px'}}>
        <Row style={{margin:'20px 0'}}>
          <Col span={12}>
            <Form getIpData={this.getIpData} ipList={ipList} />
          </Col>
          <Col span={12}>
            <Row gutter={16} style={{margin:'0 0 20px 0'}}>
              <TextArea height='100px'onChange={(v)=>{this.setState({accountJson:v})}}/></Row>
            <Row gutter={16}><Switch value={encrypt} onChange={()=>{this.setState({encrypt:!encrypt})}}/></Row>
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