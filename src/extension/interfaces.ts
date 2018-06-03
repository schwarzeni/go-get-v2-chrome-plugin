/**
 * @typedef {Object} ReferAndCookie
 * @property {string} referer  Referer信息
 * @property {string} cookie Cookie信息
 */
export interface ReferAndCookie {
  referer: string
  cookie: string
}

/**
 * @typedef {Object} WebsiteInfo 网站发送的一些信息
 * @property {string} api 网页获取视频分段的链接
 * @property {string} Id  网页的编号，用于后面选取parser
 */
export interface WebsiteInfo {
  api: string
  Id: string
}

/**
 * @typedef {Object} VideoInfo 视频信息
 * @property {string} title 网页名
 * @property {string} webId 类型编号
 * @property {string} apiUrl 分段链接
 * @property {string} webpageUrl 网页链接
 * @property {string} savePath 保存路径
 * @property {string} cookie 用户信息
 */
export interface VideoInfo {
  title: string
  webId: string
  apiUrl: string
  webpageUrl: string
  savePath: string
  cookie: string
}