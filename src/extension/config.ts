import {VideoInfo, WebsiteInfo} from './interfaces';

export const BilibiliID = '0';
export const BilibiliPluginId = '1';
export const YoukuId = '2';
export const IqiyiId = '3';
export const TencentId = '4';

export const DefaultsavePathId = '1000';

/**
 * 默认存储路径
 */
export const DefaultSavePath = '~/Downloads/';


/**
 * 右击菜单的ID
 * @type {string}
 */
export const MenuId = "mainMenu";

/**
 * b站信息
 */
export const InfoBili: WebsiteInfo = {api: 'playurl?cid=', Id: BilibiliID};

/**
 * b站插件信息
 */
export const InfoBiliPlugin: WebsiteInfo = {api: '.php?cid=', Id: BilibiliPluginId};

/**
 *  优酷信息
 */
export const InfoYoukuPlugin: WebsiteInfo = {api: 'm3u8?vid=', Id: YoukuId};

/**
 * 爱奇艺信息
 */
export const InfoIqiyi: WebsiteInfo = {api: 'dash?tvid', Id: IqiyiId}

/**
 * 腾讯信息
 */
export const InfoTencent: WebsiteInfo = {api: 'm3u8?ver', Id: TencentId}

export const WebsiteInfoArray: WebsiteInfo[] = [InfoBili, InfoBiliPlugin, InfoYoukuPlugin, InfoIqiyi, InfoTencent];
