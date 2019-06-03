import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, notification, Card } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageWrapper from '@/components/ImageWrapper'; // @ 表示相对于源文件根目录
import styles from './Blog.less';

class Blog extends PureComponent {
  state = {
    value: 'test',
  };

  handleChange = value => {
    this.setState({
      value,
    });
  };

  prompt = () => {
    notification.open({
      message: 'We got value:',
      description: <span dangerouslySetInnerHTML={{ __html: this.state.value }} />,
    });
  };

  render() {
    return (
      <div className={styles.main}>
        博客
        <ImageWrapper
          src="https://os.alipayobjects.com/rmsportal/mgesTPFxodmIwpi.png"
          desc="示意图"
        />
        <Card title="富文本编辑器">
          <ReactQuill value={this.state.value} onChange={this.handleChange} />
          <Button style={{ marginTop: 16 }} onClick={this.prompt}>
            Prompt
          </Button>
        </Card>
      </div>
    );
  }
}

export default Blog;
