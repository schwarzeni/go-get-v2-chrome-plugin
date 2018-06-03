/**
 * 默认保存路径
 */
import { MenuId} from './config';
import {GetReferAndCookie, GetTitle, SelectWebInfoByUrl, SetMapData} from './util';
import DataMap from './dataMap'
import {ReferAndCookie, VideoInfo, WebsiteInfo} from './interfaces';
import MessageSender = chrome.runtime.MessageSender;
import {
  ClearAllDataEvent,
  ClearAllDataMessage,
  DeleteVideoEvent, DeleteVideoMessage, GetMessageEvent, GetVideoInfoByKey, GetVideoInfoByKeyMessage, ResponseDataMap,
  UpdateVideoPathEvent, UpdateVideoPathMessage,
} from '../global-data';

let datamap = new DataMap()

chrome.webRequest.onSendHeaders.addListener(function(detail) {
  let headerInfo: ReferAndCookie = GetReferAndCookie(detail.requestHeaders);
  let result: WebsiteInfo = SelectWebInfoByUrl(detail.url);
  if (result !== null) {
    SetMapData(datamap, headerInfo, result, detail.url, GetTitle(headerInfo.referer))
  }
  return detail
}, {urls: [ "<all_urls>" ]}, ['requestHeaders'])

// 创建一个chrome的meun
chrome.contextMenus.create({title: "Get current page video info", id: MenuId, onclick: function(){}}, function(){
})
// 添加一个chrome的menu选项，点击获取链接
chrome.contextMenus.onClicked.addListener(function(tab) {
  if (tab.menuItemId === MenuId) {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      var url = tabs[0].url;
      if (datamap.Has(url)) {
        chrome.tabs.executeScript( {
          code: `var videoData = ${JSON.stringify(datamap.Get(url))}`
        }, function(){
          chrome.tabs.executeScript(tabs[0].id,{file: 'lib/jquery.min.js'})
          chrome.tabs.executeScript(tabs[0].id,{file: 'lib/bootstrap.min.js'})
          chrome.tabs.executeScript(tabs[0].id, {file: 'pop.js'});
        })
      }
    });
  }
});

// 更新video的信息(接收用户的保存路径)
chrome.runtime.onMessage.addListener(function(message: VideoInfo, sender: MessageSender, callBack: Function) {
  if (chrome.runtime.id === sender.id) {
    if (datamap.Has(message.webpageUrl)) {
      datamap.Set(message.webpageUrl, message)
    }
  }
});

// 接收options页获取已经抓取的视频链接的请求
chrome.runtime.onMessage.addListener(function(message: number, sender: MessageSender, callBack: Function) {
  if (message === GetMessageEvent) {
    callBack({DataMap: datamap.GetArray()})
  }
});

// 接收获取单个videoInfo的请求
chrome.runtime.onMessage.addListener(function(message: GetVideoInfoByKeyMessage, sender: MessageSender, callBack: Function) {
  if (message.Msg === GetVideoInfoByKey) {
    let videoInfo = datamap.Get(message.Key)
    callBack(videoInfo)
  }
});

// 接收options页的模态框中删除信息请求
chrome.runtime.onMessage.addListener(function(message: DeleteVideoMessage, sender: MessageSender, callBack: Function) {
  if (message.Msg === DeleteVideoEvent) {
    datamap.Delete(message.WebPageUrl)
  }
});

// 接收options页的模态框中修改路径信息请求
chrome.runtime.onMessage.addListener(function(message: UpdateVideoPathMessage, sender: MessageSender, callBack: Function) {
  if (message.Msg === UpdateVideoPathEvent) {
    datamap.SetPath(message.VideoInfo.webpageUrl, message.VideoInfo)
  }
});

// 接收options页清空数据的请求
chrome.runtime.onMessage.addListener(function (message: ClearAllDataMessage, sender: MessageSender, callback: Function) {
  if (message.Msg === ClearAllDataEvent) {
    datamap.ClearAll()
  }
})
