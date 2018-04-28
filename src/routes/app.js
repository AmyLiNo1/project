import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router'
import { MyLayout } from '../components';
// const { Header, SideBar, Footer } = MyLayout 
import { Menu, Breadcrumb, Icon, Button, Layout } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
import './app.less'
const SubMenu = Menu.SubMenu;
function App({ app, children, dispatch, history, location, match, staticContext }) {
  const { collapsed } = app
  function onCollapse(collapsed) {
    dispatch({
      type: 'app/update',
      payload: {collapsed}
    })
  }
  return (
    <div>
      <Header></Header>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="10">
              <Icon type="table" />
              <span>人员列表</span>
              <Link to={'list'}> 人员列表</Link>
            </Menu.Item>
            <Menu.Item key="11">
              <Icon type="user-add" />
              <span>新增人员</span>
            </Menu.Item>
            <Menu.Item key="12">
              <Icon type="setting" />
              <span>设置</span>
            </Menu.Item>
            <Menu.Item key="13">
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

App.propTypes = {
};

// export default connect()(App);
export default withRouter(connect(({ app }) => ({ app }))(App))