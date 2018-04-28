import { Row, Col, Radio, Form, DatePicker } from 'antd';
import styles from './index.css';
import moment from 'moment';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD'
const Query = ({statusList, form, updateConfig, queryConfig1}) => {
    const { getFieldDecorator } = form
    function changeStatus(e) {
        updateConfig(Object.assign({}, queryConfig1, {status: e.target.value}))
    }
    function changePicker(e) {
        let begintime, endtime = moment().format(dateFormat)
        switch(e.target.value) {
            case 0:
                begintime = moment().subtract(1, 'month').format(dateFormat)
                break;
            case 1:
                begintime = moment().subtract(7, 'days').format(dateFormat)
                break;
            case 2:
                begintime = moment().subtract(14, 'days').format(dateFormat)
                break;
        }
        updateConfig(Object.assign({}, queryConfig1, {begintime, endtime}))
        
    }
    function selectPicker(data, dataString) {
        updateConfig(Object.assign({}, queryConfig1, {begintime: dataString[0], endtime: dataString[1]}))   
    }
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
          lg: {span: 2}
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
          lg: { span: 22 }
        },
      };
      const formItemLayout1 = {
        labelCol: {
          xs: { span: 12 },
          sm: { span: 8 },
          lg: {span: 4}
        },
        wrapperCol: {
          xs: { span: 12 },
          sm: { span: 10 },
          lg: { span: 11 }
        },
      };
    return (
        <Form layout="inline">
          <Row gutter={10}>
            <Col span={24}>
                <FormItem  {...formItemLayout} label={`状态：`} style={{width: '100%'}}>
                    {getFieldDecorator('status', {
                        initialValue: '',
                    })(
                        <RadioGroup onChange={changeStatus}>
                            <RadioButton className={styles.aa} value={''}>全部</RadioButton >
                            {statusList.map(d => <RadioButton className={styles.aa} value={d.value}  key={d.value}>{d.name}</RadioButton >)}
                        </RadioGroup>
                    )}
                </FormItem>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
                <FormItem  {...formItemLayout1} label={`创建日期：`} style={{width: '100%'}}>
                    {getFieldDecorator('name', {
                        initialValue: [moment(queryConfig1.begintime, dateFormat), moment(queryConfig1.endtime, dateFormat)],
                    })(
                         <RangePicker onChange={selectPicker} />
                    )}
                </FormItem>
            </Col>
            <Col span={12}>
                <FormItem labelCol={{span: 0}}>
                    {getFieldDecorator('time', {
                        initialValue: 0,
                    })(
                        <RadioGroup onChange={changePicker}>
                            <RadioButton className={styles.aa} value={0}>近1月</RadioButton >
                            <RadioButton className={styles.aa} value={1}>近1周</RadioButton >
                            <RadioButton className={styles.aa} value={2}>近2周</RadioButton >
                        </RadioGroup>
                    )}
                </FormItem>
            </Col>
          </Row>
        </Form>
    )
}
// export default Query;
export default Form.create()(Query)