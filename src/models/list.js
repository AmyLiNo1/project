import { getList, getDetail, getProvinces, editDetail } from '../services/api' 
import moment, { locale } from 'moment';
import { routerRedux } from 'dva/router'
import { message } from 'antd';
const dateFormat = 'YYYY/MM/DD'
export default {

    namespace: 'list',
  
    state: {
      dataSource: [], // 列表数据
      statusList: [], // 人员1的状态码值表
      queryConfig1: {tabKey: 1, status: '', begintime: moment().subtract(1, 'month').format(dateFormat), endtime: moment().format(dateFormat)}, // 人员1的查询条件
      queryConfig2: {tabKey: 2}, // 人员2的查询条件
      detail: {}, // 人员详情
      options: [] // 城市列表
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
        history.listen(( {pathname, search} ) => { 
          // 页面初始调接口
          if (pathname === '/list') {
            dispatch({ type: 'lists', payload: {tabKey: 1}});return;
          }
          if (search) {
            let id = search.replace('?id=','')
            dispatch({ type: 'detail', payload: {id}});
            dispatch({type: 'provinces'})
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
      // 更新state
      * updateConfig ({
                 payload,
               }, { call, put, select }) {
       if (payload) {
        yield put({
          type: 'updateState',
          payload
        })
       }    
      },
      // 跳转路由
      * toPath ({
                 payload,
               }, { call, put, select }) {
                 if (payload.key === '0') {
                  yield put(routerRedux.push(`/list`))
                 } else if (payload.key === '1') {
                  yield put(routerRedux.push(`/detail?id=${payload.id}`))
                 } else if (payload.key === '2') {
                  yield put(routerRedux.push(`/edit?id=${payload.id}`))
                 }
                
      },
      // 获取详情接口
      * detail ({
                 payload,
               }, { call, put, select }) {
                const data = yield call(getDetail, payload)
                if (data.status === 200) {
                  yield put({
                    type: 'updateState',
                    payload: {
                      detail: data.data,
                      statusList: data.statusList
                    } 
                  })
                }
                
      },
      // 获取省的接口
      *provinces ({
                 payload,
               }, { call, put, select }) {
                const data = yield call(getProvinces)
                if (data.status === 200) {
                  yield put({
                    type: 'updateState',
                    payload: {
                      options: data.data
                    } 
                  })
                }
                
      },
      // 编辑接口
      *edit ({
        payload,
      }, { call, put, select }) {
        console.log(payload)
        const data = yield call(editDetail, payload)
        if (data.status === 200) {
          message.success(data.message)
          yield put(routerRedux.push(`/list`))
        } else {
          message.error(data.message)
        }
      },
      
      

    }

  };
  