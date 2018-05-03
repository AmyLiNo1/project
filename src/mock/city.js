import citydata from './citydata.json'

module.exports = {
    [ 'GET /api/provinces'](req, res) {
        const lists = []
        for (let i of citydata) {
            lists.push({label: i.n, value: i.n})
        }
      res.json({status: 200, message: 'success', data: lists})
    }
};