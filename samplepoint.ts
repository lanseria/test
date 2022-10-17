import { promisify } from 'node:util'
import stream from 'node:stream'
import fs from 'node:fs'
import got from 'got'
import CryptoJS from 'crypto-js'
import type { SamplePoint } from './samplepoint.const'
import strTimeRangeMap from './strTimeRangeMap.json'
import { IV, WordArray, excludeRange1, excludeRange2, weekCnMap } from './samplepoint.const'

async function fetchData() {
  const pipeline = promisify(stream.pipeline)

  const t = {
    orgName: '',
    pageNum: 1,
    pageSize: 1000,
    areaName: '舟山市',
    levelName: '',
    serviceStatus: '',
    gisLat: '',
    gisLng: '',
    isFree: '',
    isRed: '',
    isYellow: '',
    isNeedHs: '',
    isLive: '0',
  }

  const w = CryptoJS.enc.Utf8.parse(WordArray)

  const O = CryptoJS.enc.Hex.parse(IV)

  let n = typeof t == 'string' ? t : JSON.stringify(t)
  n = CryptoJS.DES.encrypt(CryptoJS.enc.Utf8.parse(n), w, {
    iv: O,
  }).toString()

  await pipeline(
    got.stream('https://hsddcx.wsjkw.zj.gov.cn/client-api/search/getNucleicAcidOrgList', {
      method: 'POST',
      headers: {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'ali-version': '7.6.15',
        'channel': 'H5',
        'content-type': 'application/json; charset=UTF-8',
        'sec-ch-ua': '"Chromium";v="106", "Microsoft Edge";v="106", "Not;A=Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-resp-encrypt': '1',
        'cookie': 'zh_choose_undefined=s; cna=mY3RG1dwbXQCAf////8KdmNX; ZJZWFWSESSIONID=62fe0943-2e4a-49f4-bc51-e52855a21288; cssstyle=1',
        'Referer': 'https://hsddcx.wsjkw.zj.gov.cn/webapp/app-mobile/epidMap',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      body: n,
    }),
    fs.createWriteStream('data.txt'),
  )
}

async function parseData() {
  const data = fs.readFileSync('./data.txt', 'utf8')

  const w = CryptoJS.enc.Utf8.parse('LP6IRTBX')

  const T = CryptoJS.enc.Hex.parse('0102030405060708')

  const i = data.replace(/\s+/g, '')
  const base64 = CryptoJS.enc.Base64.parse(i) as CryptoJS.lib.WordArray
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const res = CryptoJS.DES.decrypt({
    ciphertext: base64,
  }, w, {
    iv: T,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8)
  const r = JSON.parse(res)
  const resData: SamplePoint[] = r.result.t.data
  fs.writeFileSync('./data.json', JSON.stringify(resData, null, 2))
  /// 原始数据
  const workTimeList = resData.map(m => m.workTime)
  const workTimeListSet = new Set(workTimeList)
  const newWorkTimeList = Array.from(workTimeListSet)
  fs.writeFileSync('./workTime.json', JSON.stringify({ newWorkTimeList }, null, 2))
  /// 处理数据
  /**
  // const chunk = (arr: [], size: number) =>
  //   Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
  //     arr.slice(i * size, i * size + size),
  //   )
  // const strTimeRangeMap = {}
  // const split_workTimeList = workTimeList.map((m) => {
  //   const split = m.split(';')
  // split.map((str) => {
  //   if (str.startsWith('周')) {
  //     const numstr = str.match(/\((\d+)\:(\d+)\-(\d+)\:(\d+)\)/)
  //     const strstr = str.match(/(\W+)\(\d+\:\d+\-\d+\:\d+\)/)
  //     if (strstr && strstr[1]) {
  //       const realStr = strstr[1]
  //       if (realStr.includes('至')) {
  //         const strarr = realStr.split('至')
  //         const weeknum = strarr.map(mm => weekCnMap[mm]).sort((x, y) => x - y)

  //         if (weeknum.includes(undefined)) {
  //           if (str === '周一周二(08:00-11:00,14:00-16:30)周四至周六(08:00-11:00)') {
  //             console.log('周一周二(08:00-11:00,14:00-16:30)周四至周六(08:00-11:00) include')
  //             strTimeRangeMap['周一周二(08:00-11:00,14:00-16:30)周四至周六(08:00-11:00)'] = excludeRange2
  //           }
  //           else {
  //             console.log(str)
  //           }
  //         }
  //         else {
  //           const theRes = []
  //           for (let i = weeknum[0]; i <= weeknum[1]; i++) {
  //             let newI = i
  //             if (newI === 7)
  //               newI = 0
  //             const theR = [
  //               [
  //                 newI, +numstr[1], +numstr[2],
  //               ],
  //               [
  //                 newI, +numstr[3], +numstr[4],
  //               ],
  //             ]
  //             theRes.push(theR)
  //           }
  //           strTimeRangeMap[str] = theRes
  //         }
  //       }
  //       else {
  //         const weekArr = chunk(realStr, 2).map(mm => weekCnMap[mm])
  //         // console.log(weekArr)
  //         if (weekArr.includes(undefined)) {
  //           if (str === '周一周三周四周六周日(08:00-11:00,13:30-14:40)周二周五(13:30-14:40)') {
  //             console.log('周一周三周四周六周日(08:00-11:00,13:30-14:40)周二周五(13:30-14:40) include')
  //             strTimeRangeMap['周一周三周四周六周日(08:00-11:00,13:30-14:40)周二周五(13:30-14:40)'] = excludeRange1
  //           }
  //           else {
  //             console.log(str)
  //           }
  //         }
  //         else {
  //           const theRes = weekArr.map((mmm) => {
  //             let newI = mmm
  //             if (newI === 7)
  //               newI = 0
  //             return [
  //               [
  //                 newI, +numstr[1], +numstr[2],
  //               ],
  //               [
  //                 newI, +numstr[3], +numstr[4],
  //               ],
  //             ]
  //           })
  //           // console.log(theRes)
  //           strTimeRangeMap[str] = theRes
  //         }
  //       }
  //     }
  //   }
  // })
  // })
  // const split_workTimeListSet = new Set(split_workTimeList)
  // const split_newWorkTimeList = Array.from(split_workTimeListSet)
  // fs.writeFileSync('./split_workTime.json', JSON.stringify({ split_newWorkTimeList }, null, 2))
  // fs.writeFileSync('./strTimeRangeMap.json', JSON.stringify(strTimeRangeMap, null, 2))
  ///
  // if (str)
  //   const s = '周一周三周五(14:00-16:00)'
  // const s1 = '周一至周日'
  // const ms = s.match(/\((\d+)\:(\d+)\-(\d+)\:(\d+)\)/)
  // const ms1 = s.match(/(\W+)\(\d+\:\d+\-\d+\:\d+\)/)
  // console.log(+ms[1], +ms[2], +ms[3], +ms[4])
  // console.log(ms1[1])
  // console.log(s1.split('周'))
   */
  /// 添加时间
  // console.log(strTimeRangeMap)
  const formartData = resData.map((item) => {
    const splitTimeArr = item.workTime.split(';')
    const openTimeRange = []
    splitTimeArr.forEach((str) => {
      if (strTimeRangeMap[str])
        openTimeRange.push(...strTimeRangeMap[str])
    })
    return {
      ...item,
      openTimeRange,
    }
  })
  fs.writeFileSync('./formartData.json', JSON.stringify(formartData))
}

async function main() {
  const isExist = fs.existsSync('./data.txt')
  if (isExist)
    await fetchData()

  await parseData()
}

main()
