import * as React from "react";
import {ReactPropTypes} from 'react';
import {ClearAllDataEvent, ClearAllDataMessage, GetMessageEvent, ResponseDataMap} from '../../global-data';
import {Video} from './Video';
import {VideoInfo} from '../../extension/interfaces';
import {SelectText} from '../../webui/util/util';
import {Modal} from './modal';
import SelectionResult = chrome.fileBrowserHandler.SelectionResult;
import DownloadItem = chrome.downloads.DownloadItem;
import FileSystemInfo = chrome.fileSystemProvider.FileSystemInfo;
import {DefaultsavePathId} from '../../extension/config';
import {SaveDataToLocal} from '../util';

interface VideoListComponentState {
  DataMap: Array<VideoInfo>,
  SelectedVideo: VideoInfo
}

export class VideoList extends React.Component<any, VideoListComponentState> {
  constructor(prop: ReactPropTypes) {
    super(prop);
    this.state = {
      DataMap: [],
      SelectedVideo: null
    };
    // 初始化信息
    chrome.runtime.sendMessage(GetMessageEvent, (resp: ResponseDataMap) => {
      this.setState({DataMap: resp.DataMap})
    })
  }

  componentDidMount() {

    // 初始化路径input
    (document.getElementById("default_save_folder") as HTMLFormElement).value = localStorage.getItem(DefaultsavePathId)

    // 添加处理点击事件
    // 更新数据
    document.getElementById("update_btn").onclick = () => {
      this.updateData((resp: ResponseDataMap)=>{
      })
    };

    // 获取json文件
    document.getElementById("get_json_btn").onclick = () => {
      this.updateData((resp: ResponseDataMap)=>{
        const data:string = JSON.stringify({"videos": this.state.DataMap})
        document.getElementById("json_file_area").innerText = data
        SelectText("json_file_area")
        SaveDataToLocal(data)
      })
    };

    // 清空数据
    document.getElementById("clear_all_data_btn").onclick = () => {
      chrome.runtime.sendMessage({Msg: ClearAllDataEvent}, () => {
        this.updateData(()=>{
          this.setState({SelectedVideo: null})
          document.getElementById("json_file_area").innerText = ""
        })
      })
    };

    // 设置默认保存路径
    document.getElementById("set_default_save_folder_btn").onclick = () => {
      let data = (document.getElementById("default_save_folder") as HTMLFormElement).value
      localStorage.setItem(DefaultsavePathId, data)
    };

    // 对弹出框进行初始化
    const $container = document.getElementById("box");
    $container.setAttribute("tabIndex", "-1");
    $container.setAttribute("role", "dialog")
    $container.setAttribute("aria-labelledby", "myModalLabel")
    // 监听模态框关闭事件，在模态框隐藏的时候更新数据
    $("#box").on('hide.bs.modal', (e) => {
      this.updateData(() => {})
    })
  }

  // 更新数据
  updateData(callback: Function) {
    chrome.runtime.sendMessage(GetMessageEvent, (resp: ResponseDataMap) => {
      this.setState({"DataMap": resp.DataMap})
      callback(resp)
    })
  }

  handleClick(video: VideoInfo) {
    this.state.DataMap.forEach((val, idx) => {
      if (val.webpageUrl === video.webpageUrl) {
        this.setState({"SelectedVideo": val})
        this.updateData((resp: ResponseDataMap) => {
          $("#box").modal()
        })
      }
    })

  }

  render() {
    return (
      <div>
        <div>
          <button id="update_btn">Update</button>
          <button id="get_json_btn">Get Json</button>
          <button id="clear_all_data_btn">Clear all</button>
          <input type="text" id="default_save_folder"/>
          <button id="set_default_save_folder_btn">Set Default Save Folder</button>
        </div>
        <div className="modal fade" id="box">
          <Modal
            VideoInfo={this.state.SelectedVideo}
            $Contaienr={$("#box")}/>
        </div>
        <hr/>
        { this.state.DataMap.map((data) =>
          <div key={data.webpageUrl} onClick={() => this.handleClick(data)}>
            <Video
              key={data.webpageUrl}
              VideoInfo={data}
              />
          </div>
        )}
        <hr/>
        <div id="json_file_area"></div>
        </div>)
  }
}