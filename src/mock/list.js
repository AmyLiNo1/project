var Mock = require('mockjs')
let list = Mock.mock({
        'list|1-100': [{
            'id|+1': 1,
            nickName: '@last',
            'age|11-99': 1,
            address: '@county(true)',
            createTime: '@datetime',
            'isMale|0-1': 1,
            avatar () {
              return Mock.Random.image('30x30', Mock.Random.color(), '#757575', 'png', this.nickName.substr(0, 1))
            },
            'name': /^[\u4e00-\u9fa5]{2,3}$/,
            'idNo': /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[X])$)$/,
            'emile': /^([a-z0-9]+[.]?)*[a-z0-9]+@gomeholdings\.com$/,
            'tel': /^(1)[0-9]{10}$/,
            'color': /^#[0-9a-f]{6}/,
            'status|00-12': 1,
        }],
        
    })
    let columns = [], statusList = []
    for (let item in list.list[0]) {
        columns.push({title: item, dataIndex: item, key: item})
    }
    for (let i = 0; i < 13; i++) {
        statusList.push({name: '状态'+i, value: i, key: i})
    }
module.exports = {
    [ 'GET /api/list'](req, res) {
        let begintime = req.query.begintime
        let lists = []
        for (let i of list.list) {
            if (req.query.status && i.status === Number(req.query.status)) {
                lists.push(i)
            } else {
                lists = list.list
            }
        }
      res.json({status: 200, message: 'success', data: lists, statusList})
    },
    [ 'GET /api/detail'](req, res) {
        for (let item of list.list) {
            if (item.id = req.query.id) {
                res.json({status: 200, message: 'success', data: {ainfo: item, binfo: item, cinfo: item, dinfo: item}, statusList})
                return;
            }
        }
    },
    [ 'POST /api/edit'](req, res) {
        list.list[req.body.ainfo.id-1] = req.body.ainfo
        res.json({status: 200, message: '更新成功'})
    },
    [ 'DELETE /api/delete'](req, res) {
        for (let i in list.list) {
            if (req.body.id === Number(i)) {
                list.list.splice(i-1, i);
                res.json({status: 200, message: '删除成功'})
            }
        }
    },
    [ 'POST /api/save'](req, res) {
        req.body.detail.ainfo.id = list.list.length
        list.list.unshift(req.body.ainfo)
        res.json({status: 200, message: (req.body.type === 'save' ? '保存' : '新增') + '成功'})
    },
};