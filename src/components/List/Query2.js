import { Row, Col, Form, Input, Button } from 'antd';
import styles from './index.css';
import moment from 'moment';
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD'
const Query = ({ form, queryConfig2, updateConfig}) => {
    const { getFieldDecorator, validateFieldsAndScroll, resetFields } = form
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
          lg: {span: 4}
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
          lg: { span: 20 }
        },
      };
      function query() {
        validateFieldsAndScroll((err, values) => {
            if (!err) {
                updateConfig({...queryConfig2, ...values})
            }
        });
      }
      function clear() {
        resetFields()
        query()
      }
    return (
        <Form layout="inline">
          <Row gutter={40}>
            <Col span={8}>
                <FormItem  {...formItemLayout} label={`名称：`} style={{width: '100%'}}>
                    {getFieldDecorator('name', {
                        initialValue: '',
                    })(
                        <Input />
                    )}
                </FormItem>
            </Col>
            <Col span={8}>
                <FormItem  {...formItemLayout} label={`身份证号：`} style={{width: '100%'}}>
                    {getFieldDecorator('idNo', {
                        initialValue: '',
                    })(
                        <Input />
                    )}
                </FormItem>
            </Col>
            <Col span={8}>
                <FormItem  {...formItemLayout} label={`电话号码：`} style={{width: '100%'}}>
                    {getFieldDecorator('tel', {
                        initialValue: '',
                    })(
                        <Input />
                    )}
                </FormItem>
            </Col>
          </Row>
          <Row gutter={40}>
            <Col span={6} offset={18}>
                <Button type="primary" onClick={query}>查询</Button>
                <Button onClick={clear}>清空</Button>
            </Col>
          </Row>
        </Form>
    )
}
// export default Query;
export default Form.create()(Query)