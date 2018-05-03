
import React from 'react';
import { connect } from 'dva';
import { Tabs, Button } from 'antd';
import { MyList } from '../../components'
import styles from './index.css'
const { AEInfo, BEInfo, CEInfo, DEInfo } = MyList
const TabPane = Tabs.TabPane;

function Detail({ list, dispatch }) {
    const { detail, options, statusList, editFlag={} } = list
    const { ainfo, binfo, cinfo, dinfo} = detail
    const {aFlag='0', bFlag='0', cFlag='0', dFlag='0'} = editFlag;
    const AProps = { 
      ainfo, options, statusList, aFlag,
      updateConfig(payload) {
        dispatch({type: 'list/updateConfig', payload: {detail: {...detail, ...payload}}})
      },
      updateDetail(payload) {
        dispatch({type: 'list/edit', payload: {detail: {...detail, ...payload}, editFlag:{...editFlag, aFlag: '0'}}})
      }
   }
    const BProps = { binfo, options, statusList, bFlag,
      updateConfig(payload) {
        dispatch({type: 'list/updateConfig', payload: {detail: {...detail, ...payload}}})
      },
      updateDetail(payload) {
        dispatch({type: 'list/edit', payload: {detail: {...detail, ...payload}, editFlag:{...editFlag, bFlag: '0'}}})
      }
    }
    const CProps = { cinfo, options, statusList, cFlag,
      updateConfig(payload) {
        dispatch({type: 'list/updateConfig', payload: {detail: {...detail, ...payload}}})
      },
      updateDetail(payload) {
        dispatch({type: 'list/edit', payload: {detail: {...detail, ...payload}, editFlag: {...editFlag, cFlag: '0'}}})
      }
   }
    const DProps = { dinfo, options, statusList, dFlag,
      updateConfig(payload) {
        dispatch({type: 'list/updateConfig', payload: {detail: {...detail, ...payload}}})
      },
      updateDetail(payload) {
        dispatch({type: 'list/edit', payload: {detail: {...detail, ...payload}, editFlag: {...editFlag, dFlag: '0'}}})
      }
    }
    function changeTab(key) {
    }
    function goList() {
      dispatch({type: 'list/updateConfig', payload: {editFlag: {
        aFlag: '1', bFlag: '1', cFlag: '1', dFlag: '1'
      }}})
    }
  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={changeTab}>
        <TabPane tab="人员信息 1" key="1"><AEInfo {...AProps}></AEInfo></TabPane>
        <TabPane tab="人员信息 2" key="2"><BEInfo {...BProps}></BEInfo></TabPane>
        <TabPane tab="人员信息 3" key="3"><CEInfo {...CProps}></CEInfo></TabPane>
        <TabPane tab="人员信息 4" key="4"><DEInfo {...DProps}></DEInfo></TabPane>
      </Tabs>
      <div className={styles.bottonTab}><Button onClick={goList} type="primary">修改</Button></div>
    </div>
  );
}
Detail.propTypes = {
};
export default connect(({ list }) => ({list}))(Detail);