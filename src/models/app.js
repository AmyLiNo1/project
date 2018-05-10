import { logoutFun } from '../services/api'
import { routerRedux } from 'dva/router'
export default {

  namespace: 'app',

  state: {
    collapsed: false,
    loginFlag: false,
    userName: '',
    menu: [],
    defindKey: ['1']
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(( {pathname, search} ) => { 
        // 页面初始调接口
        if (pathname === '/login') {
          dispatch({ type: 'updateState', payload: {menu: [], userName: '', loginFlag: false, defindKey: ['1']}});
          window.sessionStorage.removeItem('userName')
          window.sessionStorage.removeItem('menu')
          window.sessionStorage.removeItem('defindKey')
        }
      });
      const userName = window.sessionStorage.getItem('userName')
      const menu = JSON.parse(window.sessionStorage.getItem('menu'))
      const defindKey = JSON.parse(window.sessionStorage.getItem('defindKey')) || ['1']
      if (userName && menu) {
        dispatch({
          type: 'updateState',
          payload: {
            loginFlag: true,
            userName,
            menu,
            defindKey
          },
        })
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      if (payload.defindKey) {
        window.sessionStorage.setItem('defindKey', JSON.stringify(payload.defindKey))
      }
      return { ...state, ...payload };
    }
  },

  effects: {
    * update ({
               payload,
             }, { call, put, select }) {
     if (payload) {
      yield put({
        type: 'updateState',
        payload
      })
     }
    },
    * logout ({
                 payload,
               }, { call, put, select }) {
                const data = yield call(logoutFun, payload)
                yield put({
                  type: 'toPath',
                  payload: {
                    key: 'to',
                    id: 'login'
                  }
                })
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
                 } else if (payload.key === '3') {
                  const data = yield call(deleteId, payload)
                  if (data.status === 200) {
                    const datalist = yield call(getList, payload)
                    if (datalist.status === 200) {
                      yield put({
                        type: 'updateState',
                        payload: {
                          dataSource: datalist.data,
                        } 
                      })
                    }
                  }
                 } else if (payload.key = 'to') {
                  yield put(routerRedux.push(`/${payload.id}`))
                 }
      },
  }
  
};
