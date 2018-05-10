import { message } from 'antd';
import { saveDetail } from '../services/api'
export default {

    namespace: 'add',
  
    state: {
        detail: {ainfo: {}, binfo: {}, cinfo: {}, dinfo: {}}, options: {}, statusList: [{value: '0', name: '11'}]
    },
  
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
      * save ({
                 payload,
               }, { call, put, select }) {
       const data = yield call(saveDetail, payload)
       if (data.status === 200) {
        message.success(data.message)
       }
      },
    }
    
  };
  