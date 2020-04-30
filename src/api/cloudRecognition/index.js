import request from '../axios';

const base = '/cloudRecognition';

export function getMonitorInfo(query) {
  return request.get(base + '/monitor/info', {params: query});
}

export function getMonitorRecognition(query) {
  return request.get(base + '/monitor/recognition', {params: query});
}

export function getMonitorFinished(query) {
  return request.get(base + '/monitor/finished', {params: query});
}

export function getMonitorHistory(query) {
  return request.get(base + '/monitor/history', {params: query});
}

export function updateMonitorPriority(data) {
  return request.post(base + '/monitor/moveToPriority', data);
}
