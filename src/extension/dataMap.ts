import {VideoInfo} from './interfaces';
export default class DataMap {
  map: Map<string, VideoInfo>;
  constructor() {
    this.map = new Map<string, VideoInfo>()
  }
  Set(refer: string, video: VideoInfo) {
    this.map.set(refer, video)
  }
  SetApi(refer: string, video: VideoInfo) {
    let m = this.map.get(refer);
    if (m) {
      m.apiUrl = video.apiUrl;
    } else {
      m = video
    }
    this.map.set(refer, m)
  }
  SetPath(refer: string, video: VideoInfo) {
    let m = this.map.get(refer)
    if (m) {
      m.savePath = video.savePath
    } else {
      m = video
    }
    this.map.set(refer, m)
  }
  Has(refer: string): boolean {
    return this.map.has(refer)
  }
  Get(refer: string): VideoInfo {
    return this.map.get(refer)
  }
  GetArray(): Array<VideoInfo> {
    let arr : Array<VideoInfo>= [];
    if (this.map.size === 0) {
      return []
    }
    this.map.forEach((val, key, m) => {
      arr.push(val)
    });
    return arr;
  }
  Delete(key: string) {
    this.map.delete(key);
  }
  ClearAll() {
    this.map.clear()
  }
}