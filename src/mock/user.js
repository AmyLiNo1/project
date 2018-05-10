
let menu = [{
    id: '1',
    icon: 'table',
    name: '列表',
    route: '/list',
  }, {
    id: '2',
    icon: 'user',
    name: '新增',
    route: '/add',
  }, {
    id: '3',
    icon: 'setting',
    name: '设置',
    route: '/set',
  }, {
    id: '4',
    nkey: '2',
    icon: 'dashboard',
    name: 'Dashboard',
    route: '/dashboard',
  }, {
    id: '5',
    key: '4',
    icon: 'dashboard',
    name: 'Dashboard',
    route: '/dashboard',
  }, {
    id: '6',
    key: '4',
    icon: 'dashboard',
    name: 'Dashboard',
    route: '/dashboard',
  }]
    
module.exports = {
    [ 'POST /api/login'](req, res) {
        if (req.body.userName && req.body.password){
            res.json({status: 200, message: '成功', menu})
        }
    },
    [ 'POST /api/logout'](req, res) {
      if (req.body.userName){
          res.json({status: 200, message: '成功'})
      }
  },
};