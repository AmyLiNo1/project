import { logoutFun } from '../services/api'
export default {

  namespace: 'app',

  state: {
    collapsed: false,
    loginFlag: false,
    userName: '',
    menu: []
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(( {pathname, search} ) => { 
        // 页面初始调接口
        if (pathname === '/login') {
          dispatch({ type: 'updateState', payload: {menu: [], userName: '', loginFlag: false}});
          window.sessionStorage.removeItem('userName')
          window.sessionStorage.removeItem('menu')
        }
      });
      const userName = window.sessionStorage.getItem('userName')
      const menu = JSON.parse(window.sessionStorage.getItem('menu'))
      if (userName && menu) {
        dispatch({
          type: 'updateState',
          payload: {
            loginFlag: true,
            userName,
            menu
          },
        })
      }


    },
  },

  reducers: {
    updateState(state, { payload }) {
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
                  type: 'list/toPath',
                  payload: {
                    key: 'to',
                    id: 'login'
                  }
                })
      },
  }
  
};
