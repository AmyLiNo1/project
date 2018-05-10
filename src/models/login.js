import { loginFun } from '../services/api' 
import { routerRedux } from 'dva/router'

export default {

    namespace: 'login',
  
    state: {},
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    reducers: {
      updateState(state, { payload }) {
        return { ...state, ...payload };
      }
    },
  
    effects: {
      * login ({
                 payload,
               }, { call, put, select }) {
                const data = yield call(loginFun, payload)
                if (data.status === 200) {
                  yield put({
                    type: 'app/updateState',
                    payload: {
                      loginFlag: true,
                      menu: data.menu,
                      userName: payload.userName
                    }
                  })
                  window.sessionStorage.setItem('menu', JSON.stringify(data.menu))
                  window.sessionStorage.setItem('userName', payload.userName)
                  yield put(routerRedux.push(`/list`))
                }
      },
    }
    
  };
  