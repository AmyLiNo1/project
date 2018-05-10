import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router'
import { MyLayout } from '../components';
// const { Header, SideBar, Footer } = MyLayout 
import { Menu, Breadcrumb, Icon, Button, Layout, Popover } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
import styles from './app.less'
const SubMenu = Menu.SubMenu;
function App({ app, children, dispatch, history, location, match, staticContext }) {
  const { collapsed=false, menu, loginFlag, userName, defindKey=['1'] } = app
  console.log(defindKey)
  function onCollapse(collapsed=false) {
    dispatch({
      type: 'app/update',
      payload: { collapsed }
    })
  }
  function logout() {
    dispatch({
      type: 'app/logout',
      payload: {userName}
    })
    dispatch({
      type: 'app/updateState',
      payload: {defindKey: ['1']}
    })
  }
  function toPath() {
    dispatch({
      type: 'app/toPath',
      payload: {key: 'to', id: 'set'}
    })
    dispatch({
      type: 'app/updateState',
      payload: {defindKey: ['3']}
    })
  }
  function changeSelect(key) {
    dispatch({
      type: 'app/updateState',
      payload: {defindKey: key.keyPath}
    })
  }
  const content = (
    <div>
      <p style={{cursor: 'pointer'}} onClick={logout}>退出登陆</p>
      <p style={{cursor: 'pointer'}} onClick={toPath}>设置账号</p>
    </div>
  );
  const menus = menu.map(item => {
    if (!item.nkey && !item.key) {
      return (<Menu.Item key={item.id}>
              <Link to={item.route}>
                {item.icon &&<Icon type={item.icon} />}
                {item.name}
              </Link>
            </Menu.Item>)
    } else if (item.nkey){
      return (<SubMenu
        key={item.id}
        title={item.icon ? <span><Icon type={item.icon} /><span>{item.name}</span></span>: <span>{item.name}</span>}
      >
       {menu.map(i => {
         if (i.key === item.id) {
           return (<Menu.Item key={i.id}>{i.name}
            <Link to={i.route}>
              {i.icon &&<Icon type={i.icon} />}
              {i.name}
            </Link>
           </Menu.Item>)
         }
       })}
      </SubMenu>)
    }
  })
  return (
    <div>
      <Header style={{ background: '#fff', padding: '0 20px 0 0 ' ,textAlign: 'right'}} >
        {loginFlag && <Popover content={content}>
          <Button type="primary">{userName}</Button>
        </Popover>}
      </Header>
      <Layout style={{ minHeight: '100vh' }}>
        {!loginFlag ? null : <Sider
          breakpoint="lg"
          collapsedWidth="0"
          collapsed={collapsed}
          onCollapse={onCollapse}
          collapsible
        >
          <div className="logo" />
          {menu.length && <Menu theme="dark" mode="inline" onClick={changeSelect} selectedKeys={defindKey}>
          {menus}
          </Menu>}
        </Sider>}
        <Layout>
          <Content style={{ margin: '24px 16px 0' }}>
            {loginFlag && <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>}
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