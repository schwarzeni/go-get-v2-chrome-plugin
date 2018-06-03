import DataMap from './extension/dataMap';
import {VideoInfo} from './extension/interfaces';

export const GetMessageEvent = 0;

export const SendMessageEvent = 1;

export const DeleteVideoEvent = 2;

export const UpdateVideoPathEvent = 3;

export const UpdateVideoApiEvent = 4

export const GetVideoInfoByKey = 5;

export const ClearAllDataEvent = 6;

export interface ClearAllDataMessage {
  Msg: number
}

export interface GetVideoInfoByKeyMessage {
  Msg: number,
  Key: string
}

export interface UpdateVideoApiMessage {
  Msg: number
  VideoInfo: VideoInfo
}

export interface UpdateVideoPathMessage {
  Msg: number
  VideoInfo: VideoInfo
}

export interface DeleteVideoMessage {
  Msg: number
  WebPageUrl: string
}

export interface ResponseDataMap {
  DataMap: Array<VideoInfo>
}