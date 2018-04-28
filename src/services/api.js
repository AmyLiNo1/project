import { request, config } from '../utils'
import qs from 'qs';
const { api } = config
const { list } = api

export async function getList (payload) {
  return request({
    url: 'http://localhost:8000/api/list',
    method: 'get',
    payload
  })
}