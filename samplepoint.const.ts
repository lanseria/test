export const WordArray = 'LP6IRTBX'
export const IV = '0102030405060708'
export interface SamplePoint {
  'orgId': '44881'
  'orgName': '城东街道檀东社区采样点'
  'areaCode': '330902'
  'areaName': '舟山市定海区城东街道'
  'address': '东瀛路228号檀东社区警务室门口'
  'gisLng': '122.124635'
  'gisLat': '30.01878'
  'gmtUpdate': null
  'phone': null
  'workTime': '周一(08:00-11:30);周三(08:00-11:30,17:30-20:30);周六(08:00-11:30,14:00-17:30);(不含法定节假日)'
  'levelName': '社区'
  'orgType': 1
  'serviceStatus': 3
  'distanceHospital': 0
  'videoUrl': null
  'dynamicVideoUrl': null
  'isFree': 0
  'isFever': 0
  'isNeedHs': 0
  'isRed': 0
  'isYellow': 0
}
export const weekCnMap = {
  周日: 7,
  周一: 1,
  周二: 2,
  周三: 3,
  周四: 4,
  周五: 5,
  周六: 6,
}
export const excludeFading = '(不含法定节假日)'
export const includeFading = '(含法定节假日)'

export const excludeRange1 = [
  [[0, 8, 0], [0, 11, 0]],
  [[0, 13, 30], [0, 14, 40]],
  [[1, 8, 0], [1, 11, 0]],
  [[1, 13, 30], [1, 14, 40]],
  [[3, 8, 0], [3, 11, 0]],
  [[3, 13, 30], [3, 14, 40]],
  [[4, 8, 0], [4, 11, 0]],
  [[4, 13, 30], [4, 14, 40]],
  [[2, 13, 30], [2, 14, 40]],
  [[5, 13, 30], [5, 14, 40]],
]

export const excludeRange2 = [
  [[1, 8, 0], [1, 11, 0]],
  [[1, 14, 0], [1, 16, 30]],
  [[2, 8, 0], [2, 11, 0]],
  [[2, 14, 0], [2, 16, 30]],
  [[4, 8, 0], [4, 11, 0]],
  [[5, 8, 0], [5, 11, 0]],
  [[6, 8, 0], [6, 11, 0]],
]
