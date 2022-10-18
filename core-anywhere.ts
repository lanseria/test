// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as corsAnywhere from 'cors-anywhere'
// Listen on a specific host via the HOST environment variable
const host = process.env.HOST || '0.0.0.0'
// Listen on a specific port via the PORT environment variable
const port = process.env.PORT || 8080

corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: [],
  setHeaders: {
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
}).listen(port, host, () => {
  console.log(`Running CORS Anywhere on ${host}:${port}`)
})
