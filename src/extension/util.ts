/**
 * 设置map的值
 * @param {Map<string, VideoInfo>} dataMap
 * @param {ReferAndCookie} headerInfo
 * @param infoVideo
 */
import DataMap from './dataMap';
import {ReferAndCookie, VideoInfo, WebsiteInfo} from './interfaces';
import {DefaultSavePath, DefaultsavePathId, WebsiteInfoArray} from './config';
import HttpHeader = chrome.webRequest.HttpHeader;

export function SetMapData(datamap: DataMap, headerInfo: ReferAndCookie, infoVideo: WebsiteInfo, url: string, title: string) {
  // 设置savepath
  let savepath = localStorage.getItem(DefaultsavePathId);
  if (savepath !== null && savepath !== "") {
    let savepathtitle = title;
    savepathtitle = savepathtitle
      .trim()
      .replace(new RegExp(" ", "g"), "_")
      .replace(new RegExp(String.fromCharCode(160), "g"), "_");
    if (savepath.endsWith("/")) {
      savepath = savepath + savepathtitle
    } else {
      savepath = savepath + "/" + savepathtitle
    }
  } else {
    savepath = ""
  }
  if ((datamap.Has(headerInfo.referer) && datamap.Get(headerInfo.referer).webId === infoVideo.Id) || !datamap.Has(headerInfo.referer)) {
    datamap.SetApi(headerInfo.referer, {apiUrl: url, webId: infoVideo.Id, cookie: headerInfo.cookie, savePath: savepath, webpageUrl: headerInfo.referer, title: title})
  }
}


/**
 * 获取header中的refer值和cookie值
 * @param {Array} requestHeaders Header信息
 * @returns {ReferAndCookie} refer与cookie信息
 */
export function GetReferAndCookie(requestHeaders: Array<HttpHeader>): ReferAndCookie {
  let data: ReferAndCookie = {referer: "", cookie: ""};
  for (let i = 0; i < requestHeaders.length; i++) {
    if (requestHeaders[i].name === 'Referer') {
      data.referer = requestHeaders[i].value
    }
    if(requestHeaders[i].name === 'Cookie') {
      data.cookie = requestHeaders[i].value
    }
  }
  return data
}

// 根据api的类型判断网站
// TODO：可以根据refer来进行判断
export function SelectWebInfoByUrl(url: string) : WebsiteInfo {
  for (let i = 0; i < WebsiteInfoArray.length; i++) {
    if (url.indexOf(WebsiteInfoArray[i].api) !== -1) {
      return WebsiteInfoArray[i]
    }
  }
  return null
}

// 获取页面的标题
export function GetTitle(url: string): string {
  let xhr: XMLHttpRequest = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send();

  let result = xhr.responseText;
  let matchStr = /<title[\w\s="'-]*>(.*)<\/title>/g.exec(result)
  if (matchStr && matchStr[1]) {
    return matchStr[1]
  } else {
    return ""
  }
}