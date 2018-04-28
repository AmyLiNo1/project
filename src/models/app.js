
export default {

  namespace: 'app',

  state: {
    collapsed: true
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
  }
  
};
