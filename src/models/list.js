import { getList } from '../services/api' 
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD'
export default {

    namespace: 'list',
  
    state: {
      dataSource: [], // 列表数据
      statusList: [], // 人员1的状态码值表
      queryConfig1: {tabKey: 1, status: '', begintime: moment().subtract(1, 'month').format(dateFormat), endtime: moment().format(dateFormat)}, // 人员1的查询条件
      queryConfig2: {tabKey: 2}, // 人员2的查询条件
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
        history.listen(( location ) => { 
          // 页面初始调接口
          if (location.pathname === '/list') {
            dispatch({ type: 'lists', payload: {tabKey: 1}});
          } 
        });
      },
    },

    reducers: {
      // 更新状态
      updateState(state, { payload }) {
        return { ...state, ...payload };
      }
    },

    effects: {
      // 请求列表接口
      * lists ({
                 payload,
               }, { call, put, select }) {
       if (payload) {
        const data = yield call(getList, payload)
        if (data.status === 200) {
          yield put({
            type: 'updateState',
            payload: {
              dataSource: data.data,
              statusList: data.statusList
            } 
          })
        }
       }    
      },
      // 人员1 有查询条件的查询（1.更新queryConfig1 2.差接口）
      * updateConfig1 ({
                 payload,
               }, { call, put, select }) {
       if (payload) {
        yield put({
          type: 'updateState',
          payload: {
            queryConfig1: payload
          }
        })
        yield put({
          type: 'lists',
          payload
        })
       }    
      },
      // 人员2 有查询条件的查询（1.更新queryConfig2 2.差接口）
      * updateConfig2 ({
                 payload,
               }, { call, put, select }) {
       if (payload) {
        yield put({
          type: 'updateState',
          payload: {
            queryConfig2: payload
          }
        })
        yield put({
          type: 'lists',
          payload
        })
       }    
      },
    }

  };
  