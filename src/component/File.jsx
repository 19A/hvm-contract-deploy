import React,{Component} from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import style from 'style-loader';
import './File.less';
const {Dragger} = Upload;
export default class File extends Component {

  state = {
    fileList: [],
    uploading: false,
  };

  render(){
    const { uploading, fileList } = this.state;
    let { getFileList } = this.props;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          getFileList(newFileList);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }),
          getFileList([...this.state.fileList, file])
        );
        return false;
      },
      fileList,
    }
    return (
      <div className='file'>
        <Dragger {...props}>
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