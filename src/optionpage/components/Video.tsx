import * as React from 'react'
import {VideoInfo} from '../../extension/interfaces';
import {BilibiliID, BilibiliPluginId, IqiyiId, TencentId, YoukuId} from '../../extension/config';

export interface VideoProp {
  VideoInfo: VideoInfo,
  key: string
}

export class Video extends React.Component<VideoProp, any> {

  getOrigionWebsideName() {
    let name: string;
    switch (this.props.VideoInfo.webId) {
      case BilibiliID:
        name = "Bilibili 哔哩哔哩";
        break;
      case BilibiliPluginId:
        name = "Bilibili Plugin 哔哩哔哩突破区域限制插件";
        break;
      case YoukuId:
        name = "Youku 优酷";
        break;
      case TencentId:
        name = "Tencent 腾讯视频";
        break;
      case IqiyiId:
        name = "Iqiyi 爱奇艺";
        break;
      default:
        name = "unknown 未知"
    }
    return name
  }

  render() {
    return (
      <div id={this.props.VideoInfo.webpageUrl}>
        标题：{this.props.VideoInfo.title} <br/>
        地址：{this.props.VideoInfo.webpageUrl} <br/>
        来源：{this.getOrigionWebsideName()} <br/>
        保存路径：{this.props.VideoInfo.savePath}
        <hr/>
      </div>
    )
  }
}