import { Row, Col, Form, Icon, Input, Button, Checkbox, InputNumber, Cascader, Radio, Select, Upload, message } from 'antd';
import styles from './index.css'
import { UploadImg } from '../Common/index.js'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const Info = ({ dinfo={}, form, options, statusList, updateConfig }) => {
    const uploadProps = {
        imageUrl: dinfo.avatar,
        updateConfig(payload){updateConfig({dinfo: {...dinfo, ...payload}})}
    }
    const { validateFieldsAndScroll, getFieldsValue, getFieldDecorator, setFieldsInitialValue, setFieldsValue, setFields } = form
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
    };
    function changeAdd(value) {
    }
    return (
        <Form>
            <Row>
                <Col span={12}>
                    <FormItem {...formItemLayout} label="id">
                        {getFieldDecorator('id', {
                            initialValue: dinfo.id
                        })(
                            <Input type="text" disabled/>
                        )}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem {...formItemLayout} label="nickName">
                        {getFieldDecorator('nickName', {
                            rules: [{
                                required: true,
                            }, {
                                validator: (rule, value, callback) => {
                                    if ((/^[a-z]+$/i).test(value)) {
                                        callback()
                                    } else{
                                        callback('请输入正确的nickName')
                                    }
                                }
                            }],
                            initialValue: dinfo.nickName
                        })(
                            <Input type="text" />
                        )}
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <FormItem {...formItemLayout} label="年龄">
                        {getFieldDecorator('age', {
                            rules: [{
                                required: true,
                            }],
                            initialValue: dinfo.age
                        })(
                            <InputNumber min={18} max={80} type="text"/>
                        )}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem {...formItemLayout} label="地址">
                        {getFieldDecorator('address', {
                            rules: [{
                                required: true,
                            }, {
                                validator: ''
                            }],
                            initialValue: dinfo.address
                        })(
                            <Input type="text"  />
                            // <Cascader options={options} onChange={changeAdd} />
                        )}
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <FormItem {...formItemLayout} label="创建时间">
                        {getFieldDecorator('createTime', {
                            initialValue: dinfo.createTime
                        })(
                            <Input type="text" disabled />
                        )}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem {...formItemLayout} label="性别">
                        {getFieldDecorator('isMale', {
                            rules: [{
                                required: true,
                            }],
                            initialValue: dinfo.isMale
                        })(
                            <RadioGroup>
                                <Radio value={0}>男</Radio>
                                <Radio value={1}>女</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <FormItem {...formItemLayout} label="名称">
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true,
                            }, {
                                validator: (rule, value, callback) => {
                                    if ((/^[\u4e00-\u9fa5]{2,4}$/gm).test(value)) {
                                        callback()
                                    } else{
                                        callback('请输入正确的名称')
                                    }
                                }
                            }],
                            initialValue: dinfo.name
                        })(
                            <Input type="text"/>
                        )}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem {...formItemLayout} label="身份证号">
                        {getFieldDecorator('idNo', {
                            rules: [{
                                required: true,
                            }, {
                                validator: (rule, value, callback) => {
                                    if ((/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[X])$)$/).test(value)) {
                                        callback()
                                    } else{
                                        callback('请输入正确的身份证号')
                                    }
                                }
                            }],
                            initialValue: dinfo.idNo
                        })(
                            <Input type="text" />
                        )}
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <FormItem {...formItemLayout} label="邮箱"> 
                        {getFieldDecorator('emile', {
                            rules: [{
                                required: true, message: '请输入邮箱'
                            }, {
                                type: 'email', message: '请输入正确格式的邮箱地址'
                            }],
                            initialValue: dinfo.emile
                        })(
                            <Input type="text"/>
                        )}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem {...formItemLayout} label="电话号码">
                        {getFieldDecorator('tel', {
                            rules: [{
                                required: true,
                            }, {
                                validator: (rule, value, callback) => {
                                    if ((/^1[0-9]{10}$/).test(value)) {
                                        callback()
                                    } else{
                                        callback('请输入正确的手机号')
                                    }
                                }
                            }],
                            initialValue: dinfo.tel
                        })(
                            <Input type="text" />
                        )}
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <FormItem {...formItemLayout} label="颜色">
                        {getFieldDecorator('color', {
                            rules: [{
                                required: true,
                            }, {
                                validator: ''
                            }],
                            initialValue: dinfo.color
                        })(
                            <Input type="color"/>
                        )}
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem {...formItemLayout} label="状态">
                        {getFieldDecorator('status', {
                            rules: [{
                                required: true,
                            }],
                            initialValue: dinfo.status
                        })(
                            <Select >
                                {statusList.map(d => <Option className={styles.mr10} value={d.value}  key={d.value}>{d.name}</Option>)}
                            </Select >
                        )}
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <FormItem {...formItemLayout} label="图片">
                        {getFieldDecorator('avatar', {
                            rules: [{
                                required: true,
                            }],
                            initialValue: dinfo.avatar
                        })(
                            <Input type="text"/>
                            // <UploadImg {...uploadProps} ></UploadImg>
                        )}
                    </FormItem>
                </Col>
            </Row>
        </Form>
    )

}
export default Form.create()(Info)