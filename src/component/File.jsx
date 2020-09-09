import React,{Component} from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import './File.less';
const {Dragger} = Upload;
export default class File extends Component {
  render(){
    return (
      <div className='file'>
        <Upload >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>

        <Dragger>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
          </p>
        </Dragger>
      </div>
    )
  }
}