
import React from 'react';
import { connect } from 'dva';
import { Tabs, Button, message } from 'antd';
import { MyList } from '../../components'
import styles from './index.css'
const { AEInfo, BEInfo, CEInfo, DEInfo } = MyList
const TabPane = Tabs.TabPane;
const aref = React.createRef();
const bref = React.createRef();
const cref = React.createRef();
const dref = React.createRef();
function Detail({ list, dispatch }) {
    const { detail, options, statusList } = list
    const { ainfo, binfo, cinfo, dinfo} = detail
    const AProps = { 
      ainfo, options, statusList,
      updateConfig(payload) {
        dispatch({type: 'list/updateConfig', payload: {detail: {...detail, ...payload}}})
      }
   }
    const BProps = { binfo, options, statusList,
      updateConfig(payload) {
        dispatch({type: 'list/updateConfig', payload: {detail: {...detail, ...payload}}})
      }
    }
    const CProps = { cinfo, options, statusList,
      updateConfig(payload) {
        dispatch({type: 'list/updateConfig', payload: {detail: {...detail, ...payload}}})
      }
   }
    const DProps = { dinfo, options, statusList,
      updateConfig(payload) {
        dispatch({type: 'list/updateConfig', payload: {detail: {...detail, ...payload}}})
      }
    }
    function changeTab(key) {
    }
    function goList() {
      let detailData = {}
      let errs = false
      aref.current.validateFieldsAndScroll((err, values) => {
        if (!err) {
          detailData.ainfo = values
          return false
        } else {
          errs = true
          return false
        }
      });
      bref.current && bref.current.validateFieldsAndScroll((err, values) => {
        if (!err) {
          detailData.binfo = values
          return false
        } else {
          errs = true
          return false
        }
      });
      cref.current && cref.current.validateFieldsAndScroll((err, values) => {
        if (!err) {
          detailData.cinfo = values
          return false
        } else {
          errs = true
          return false
        }
      });
      dref.current && dref.current.validateFieldsAndScroll((err, values) => {
        if (!err) {
          detailData.dinfo = values
          return false
        } else {
          errs = true
          return false
        }
      });
      if (errs) {
        message.error('请重新检查数据')
      } else {
        dispatch({type: 'list/edit', payload: {...detail, ...detailData}})
      }
    }
  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={changeTab}>
        <TabPane tab="人员信息 1" key="1"><AEInfo ref={aref} {...AProps}></AEInfo></TabPane>
        <TabPane tab="人员信息 2" key="2"><BEInfo ref={bref} {...BProps}></BEInfo></TabPane>
        <TabPane tab="人员信息 3" key="3"><CEInfo ref={cref} {...CProps}></CEInfo></TabPane>
        <TabPane tab="人员信息 4" key="4"><DEInfo ref={dref} {...DProps}></DEInfo></TabPane>
      </Tabs>
      <div className={styles.bottonTab}><Button onClick={goList} type="primary">修改</Button></div>
    </div>
  );
}
Detail.propTypes = {
};
export default connect(({ list }) => ({list}))(Detail);