/**
 * 用于是否在当前时间段
 * 每周一至周五，9点开门，5点关门
 * 每周一晚上10点到第二天8点
 * 每周三早上10点到晚上10点
 */
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)
// const week = dayjs().add(6, 'day').day()
const openTimeRange: [number, number, number][][] = [
  [[1, 9, 0], [1, 10, 0]],
  [[2, 9, 0], [2, 17, 0]],
  [[2, 21, 0], [3, 7, 0]],
]

const isOpen = openTimeRange.some((value) => {
  const valueStartDatetime = dayjs().day(value[0][0]).hour(value[0][1]).minute(value[0][2])
  const valueEndDatetime = dayjs().day(value[1][0]).hour(value[1][1]).minute(value[1][2])
  if (dayjs().isBetween(valueStartDatetime, valueEndDatetime, 'minute', '[]'))
    return true
  else
    return false
})

console.warn(isOpen)
