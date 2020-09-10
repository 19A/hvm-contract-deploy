import React, { Component } from 'react';
import {Row, Col, Input, Button, message} from 'antd';
import $ from 'jquery';
// import logo from './logo.svg';
// import './App.css';

import Form from './component/Form';
import File from './component/File';
class App extends Component {

  state={
    fileList:[],
    uploading: false,
    ipList: [
      '127.0.0.1:8081',
      '127.0.0.1:8082',
      '127.0.0.1:8083',
      '127.0.0.1:8084',
    ],
  }

  handleUpload = () => {
    const { fileList,ipList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,
    });
    let param = {
      ipList,
      fileList:formData
    }
    $.ajax({
      url:'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      method:'POST',
      data: param,
      processData:false,
      success:()=>{
        this.setState({
                fileList: [],
                uploading: false,
              });
        message.success('upload successfully.');
      },
      error: () => {
          this.setState({
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
    this.setState({fileList});
  }
 
  getIpData = (ipList) => {
    this.setState({ipList});
  }

  checkData = () => {
    const { fileList,ipList } = this.state;
    if (fileList.length === 0) {
      return true
    }else if(!ipList){
      return true
    }
    return false
  }
  
  render(){
    const { fileList, uploading, ipList } = this.state;
    return ( <div className = "App" > 
      <Row>
        <Col span={12}>
          <Form getIpData={this.getIpData} ipList={ipList}/>
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

export default App;
