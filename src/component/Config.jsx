import React, { Component } from 'react';
import { Row, Col, Input, Button, message } from 'antd';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import $ from 'jquery';
import Form from './Form';
import File from './File';

export default class Config extends Component {
  state = {
    fileList: [],
    uploading: false,
    ipList: [
      '127.0.0.1:8081',
      '127.0.0.1:8082',
      '127.0.0.1:8083',
      '127.0.0.1:8084',
    ],
  }

  handleUpload = () => {
    const { fileList, ipList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,
    });
    let that = this;
    formData.append('ipList', ipList);
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
        window.fileData = {data:res};
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
    const { fileList, uploading, ipList } = this.state;
    return (
      <div className="App" >
        <Row>
          <Col span={12}>
            <Form getIpData={this.getIpData} ipList={ipList} />
          </Col>
          <Col span={12}>
            <Input type='textarea' />
          </Col>
        </Row>
        <File
          getFileList={this.getFileList}
        />
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={this.checkData()}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'loding' : 'submit'}
        </Button>
      </div>
    );
  }
}