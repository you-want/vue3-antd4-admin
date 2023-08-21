import http from "@/api/http";

// console开发机:创建
export const consoleMachines = (params: any) => {
  return http.post(`/api/development/v1/consoleMachines`, params);
};

// 开发机:列表
export const machines = (params: any) => {
  return http.get(`/api/development/v1/machines`, params);
};

// 开发机:创建
export const machinesPost = (params: any) => {
  return http.post(`/api/development/v1/machines`, params);
};

// 开发机:修改
export const machinesPut = (params: any) => {
  return http.put(`/api/development/v1/machines/${params.name}`, params);
};

// 开发机:删除
export const machinesDelete = (params: any) => {
  return http.delete(`/api/development/v1/machines/${params.name}`, params);
};

// 开发机:开机
export const machinesStart = (params: any) => {
  return http.get(`/api/development/v1/machines/${params.name}/start`, params);
};

// 开发机:关机
export const machinesStop = (params: any) => {
  return http.get(`/api/development/v1/machines/${params.name}/stop`, params);
};

// SSHKey:列表
export const sshKeys = (params: any) => {
  return http.get(`/api/development/v1/ssh-keys`, params);
};

// SSHKey:创建
export const sshKeysPost = (params: any) => {
  return http.post(`/api/development/v1/ssh-keys`, params);
};

// SSHKey:删除
export const sshKeysDelete = (params: any) => {
  return http.delete(`/api/development/v1/ssh-keys/${params.name}`, params);
};

// 存储类:列表
export const storageClasses = (params: any) => {
  return http.get(`/api/storage/v1/storage-classes`, params);
};

// 存储卷:列表
export const volumes = (params: any) => {
  return http.get(`/api/storage/v1/volumes`, params);
};

// 存储卷:创建
export const volumesPost = (params: any) => {
  return http.post(`/api/storage/v1/volumes`, params);
};

// 存储卷:创建
export const volumesDelete = (params: any) => {
  return http.delete(`/api/storage/v1/volumes/${params.name}`, params);
};




