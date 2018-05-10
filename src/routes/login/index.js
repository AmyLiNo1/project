import React from 'react';
import { connect } from 'dva';
import {  Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './index.less'
import { config } from '../../utils'
const FormItem = Form.Item;


function Login({ form, dispatch }) {
  const { validateFields, getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form
  const userNameError = isFieldTouched('userName') && getFieldError('userName');
  const passwordError = isFieldTouched('password') && getFieldError('password');
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        dispatch({ type: 'login/login', payload: values })
      }
    });
  }

  return (
    <div className={styles.form}>
    <div className={styles.logo}>
      <img alt="logo" src={config.logo} />
      <span>{config.name}</span>
    </div>
    <Form onSubmit={handleSubmit} className={styles.loginForm}>
      <FormItem>
        {getFieldDecorator('userName', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input prefix={<Icon type="user" className={styles.iconType} />} placeholder="Username" />
          )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(
          <Input prefix={<Icon type="lock" />} type="password" placeholder="Password" />
          )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(
          <Checkbox>记住密码</Checkbox>
          )}
        <a className={styles.loginForgot} href="">忘记密码</a>
        <Button type="primary" htmlType="submit" className={styles.loginButton}>
          登陆
          </Button>
        <a href="">注册</a>
      </FormItem>
    </Form>
    </div>
  );
}

export default connect(({ login }) => ({ login }))(Form.create()(Login))
