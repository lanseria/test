/**
 * 核酸采样点数据结构
 * marker-icon 用于类型(医院，公众采样点)
 * marker-color status 用于状态显示(在线 #50C240， 关闭 #eeeeee)使用 datetimerange 判断
 * name 用于显示名称
 * coordinates 用于显示坐标点
 * weiboUrl 用于微博帖子显示，对其评论可以在此微博下面👇评论
 */
const samplePointGeojsonData = {
  type: 'Feature',
  properties: {
    // 显示参数
    'ID': '',
    '名称': '',
    '详情地址': '',
    '联系电话': '',
    // 医院，公众采样点
    '类型': '',
    '工作时间': '',
    // 有作用的参数
    'datetimerange': [],
    // 名称
    'name': '',
    // 在线 关闭
    'status': '',
    // 微博链接
    'weiboUrl': '',
    // #50C240 在线 #eeeeee 关闭
    'marker-color': '#eeeeee',
    // mdi:hospital-building mdi:dna
    'marker-icon': 'icon',
  },
  geometry: {
    type: 'Point',
    // WGS84
    coordinates: [],
  },
}

console.warn(samplePointGeojsonData)
/**
 * 停车位点数据结构
 * marker-icon none
 * marker-color type 用于类型显示(免费 #50C240， 收费 #F3AE1A)
 * name 用于显示名称
 * coordinates 用于显示坐标点
 * weiboUrl 用于微博帖子显示(收费可以直接张贴收费贴图)，对其评论可以在此微博下面👇评论
 */
const parkingPointGeojsonData = {
  type: 'Feature',
  properties: {
    // 显示参数
    'ID': '',
    '名称': '',
    // 收费 免费
    '类型': '',
    // 有作用的参数
    // 名称
    'name': '',
    // 收费 免费
    'type': '',
    // 微博链接
    'weiboUrl': '',
    // #50C240 免费 #F3AE1A 收费
    'marker-color': '#F3AE1A',
    'marker-icon': 'none',
  },
  geometry: {
    type: 'Point',
    // WGS84
    coordinates: [],
  },
}

console.warn(parkingPointGeojsonData)
