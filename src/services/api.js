import { request, config } from '../utils'
import qs from 'qs';
const { api } = config
const { list } = api
const baseUrl = 'http://localhost:8000/api/'

export async function getList (payload) {
  return request({
    url: `${baseUrl}list`,
    method: 'get',
    payload
  })
}

export async function getDetail (payload) {
  return request({
    url: `${baseUrl}detail`,
    method: 'get',
    payload
  })
}

export async function getProvinces () {
  return request({
    url: `${baseUrl}provinces`,
    method: 'get',
  })
}

export async function editDetail (data) {
  return request({
    url: `${baseUrl}edit`,
    method: 'post',
    data
  })
}

export async function deleteId (data) {
  return request({
    url: `${baseUrl}delete`,
    method: 'DELETE',
    data
  })
}

export async function saveDetail (data) {
  return request({
    url: `${baseUrl}save`,
    method: 'POST',
    data
  })
}