import request from '@/utils/request';

// 登录
export function login(data) {
  return request({
    url: 'auth/login',
    method: 'POST',
    data,
  });
}

// 根据类型获取用户信息
export function getUserInfoByType(data) {
  return request({
    url: 'user/getUserInfoByType',
    method: 'GET',
    params:data,
  });
}

// 添加医院信息
export function addHospital(data) {
  return request({
    url: 'hospital',
    method: 'POST',
    data,
  });
}

// 删除医院信息
export function deleteHospital(data) {
  return request({
    url: 'hospital/' + data ,
    method: 'DELETE',
  });
}

// 更新医院信息
export function updataHospital(data,ada) {
  return request({
    url: 'hospital/' + data ,
    method: 'PATCH',
    data:ada
  });
}

// 获取所有科室信息
export function getDepartment() {
  return request({
    url: 'primary-department',
    method: 'GET'
  });
}

// 获取所有排班信息
export function getScheduleList() {
  return request({
    url: 'schedule',
    method: 'GET'
  });
}

// 获取所有排班信息
export function addScheduleList(data) {
  return request({
    url: 'schedule',
    method: 'POST',
    data:data
  });
}