import {VideoInfo} from '../extension/interfaces';
import {GeneratePopMenu} from './util/util';

declare var videoData: VideoInfo;

GeneratePopMenu(videoData);

if (videoData) {
  console.log(videoData)
}
