
import React from 'react';
import { connect } from 'dva';
import { Tabs, Button } from 'antd';
import { MyList } from '../../components'
import styles from './index.css'
const { AInfo, BInfo, CInfo, DInfo } = MyList
const TabPane = Tabs.TabPane;

function Detail({ list, dispatch }) {
    const { detail } = list
    const { ainfo, binfo, cinfo, dinfo} = detail
    const AProps = { ainfo }
    const BProps = { binfo }
    const CProps = { cinfo }
    const DProps = { dinfo }
    function changeTab(key) {
    }
    function goList() {
      dispatch({type: 'list/toPath', payload: {key: '0'}})
    }
  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={changeTab}>
        <TabPane tab="人员信息 1" key="1"><AInfo {...AProps}></AInfo></TabPane>
        <TabPane tab="人员信息 2" key="2"><BInfo {...BProps}></BInfo></TabPane>
        <TabPane tab="人员信息 3" key="3"><CInfo {...CProps}></CInfo></TabPane>
        <TabPane tab="人员信息 4" key="4"><DInfo {...DProps}></DInfo></TabPane>
      </Tabs>
      <div className={styles.bottonTab}><Button onClick={goList} type="primary">返回</Button></div>
    </div>
  );
}
Detail.propTypes = {
};
export default connect(({ list }) => ({list}))(Detail);