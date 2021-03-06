import request from '../axios';

// const base = './';
const base = process.env.PUBLIC_URL || '';

export function getMonitorInfo(query) {
  return request.get(base + '/monitor/info', {params: query});
}

export function getMonitorRecognition(query) {
  return request.get(base + '/monitor/recognition', {params: query});
}

export function getMonitorFinished(query) {
  return request.get(base + '/monitor/finished', {params: query});
}

export function getMonitorWait(query) {
  return request.get(base + '/monitor/waitList', {params: query});
}

export function getMonitorHistory(query) {
  return request.get(base + '/monitor/history', {params: query});
}

export function updateMonitorPriority(data) {
  return request.post(base + '/monitor/moveToPriority', data);
}
