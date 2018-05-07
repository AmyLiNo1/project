
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
function Add({ add, dispatch }) {
    const { detail, options, statusList } = add
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
    function save() {
      console.log(aref.current.getFieldsValue())
      dispatch({type: 'add/save', payload: {detail: {
        ainfo: aref.current.getFieldsValue(),
      //   binfo: bref.current.getFieldsValue(),
      //   cinfo: cref.current.getFieldsValue(),
      //   dinfo: dref.current.getFieldsValue(),
      }, type: 'save'}})
    }
    function submit() {
      let detailData = {}
      let errs = false
      aref.current.validateFieldsAndScroll((err, values) => {
        detailData.ainfo = values
        if (err) {
          errs = true
        }
      });
      bref.current && bref.current.validateFieldsAndScroll((err, values) => {
          detailData.binfo = values
          if (err) {
            errs = true
          }
      });
      cref.current && cref.current.validateFieldsAndScroll((err, values) => {
          detailData.cinfo = values
          if (err) {
            errs = true
          }
      });
      dref.current && dref.current.validateFieldsAndScroll((err, values) => {
          detailData.dinfo = values
          if (err) {
            errs = true
          }
      });
      if (errs) {
        message.error('请重新检查数据')
      } else {
        dispatch({type: 'add/save', payload: {detail:detailData, type: 'submit'}})
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
      <div className={styles.bottonTab}>
        <Button onClick={save}>保存</Button>
        <Button onClick={submit} type="primary">新增</Button>
      </div>
    </div>
  );
}
Add.propTypes = {
};
export default connect(({ add }) => ({add}))(Add);