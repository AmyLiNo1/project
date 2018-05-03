import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import { MyList } from '../../components/index';

const TabPane = Tabs.TabPane;
const { Person1, Person2 } = MyList

function List({list, dispatch}) {
  const { dataSource, statusList, queryConfig1, queryConfig2} = list
  const Props1 = {
    dataSource, statusList, queryConfig1,
    updateConfig(payload) {
      dispatch({type: 'list/updateConfig1', payload})
    },
    toPath(payload) {
      dispatch({type: 'list/toPath', payload})
    }
  }
  const Props2 = {
    dataSource, queryConfig2,
    updateConfig(payload) {
      dispatch({type: 'list/updateConfig2', payload})
    },
    toPath(payload) {
      dispatch({type: 'list/toPath', payload})
    }
  }
  function changeTab(tabKey) {
    let payload;
    if (tabKey === '1') {
      payload = queryConfig1
    } else if (tabKey === '2') {
      payload = queryConfig2
    }
    dispatch({type: 'list/lists', payload})
  }
  return (
    <div>
      <Tabs onChange={changeTab}>
        <TabPane tab="人员1" key="1"><Person1 {...Props1 }/></TabPane>
        <TabPane tab="人员2" key="2"><Person2 {...Props2}/></TabPane>
      </Tabs>
    </div>
  );
}

List.propTypes = {
};

export default connect(({ list }) => ({list}))(List);