const api = `http://localhost:8000/api`
module.exports = {
  name: 'project',
  logo: '',
  api: {
    list: `${api}/list`,
    detail: `${api}/detail`,
    provinces: `${api}/provinces`
  },
}
