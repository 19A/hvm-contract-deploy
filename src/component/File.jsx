import React,{Component} from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './File.less';

export default class File extends Component {
  render(){
    return (
      <div className='file'>
        <Upload >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </div>
    )
  }
}