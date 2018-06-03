import {css} from './boostrap.min.css';
import {VideoInfo} from '../../extension/interfaces';
import {
  DeleteVideoEvent, GetVideoInfoByKey, GetVideoInfoByKeyMessage, UpdateVideoPathEvent,
  UpdateVideoPathMessage
} from '../../global-data';

// 想弹出菜单中添加信息
export function GeneratePopMenu(videoData: VideoInfo) {
  chrome.runtime.sendMessage(<GetVideoInfoByKeyMessage>{
    Msg: GetVideoInfoByKey,
    Key: videoData.webpageUrl
  }, (videoInfo: VideoInfo) => {
    if (videoInfo) {
      videoData = videoInfo;
    }
    let $box = document.getElementById("box");
    const $biliElem = document.getElementsByClassName("report-wrap-module")[0]
    if ($biliElem) {
      $biliElem.setAttribute("style", "z-index: 0;");
    }
    if (!$box) {
      let inejctWrapper = document.createElement("div");

      inejctWrapper = document.createElement("div");
      inejctWrapper.setAttribute("class", "modal fade");
      inejctWrapper.setAttribute("tabindex", "-1");
      inejctWrapper.setAttribute("role", "dialog");
      inejctWrapper.setAttribute("id", "box");
      inejctWrapper.setAttribute("aria-labelledby", "myModalLabel");
      inejctWrapper.innerHTML = `
  <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">Result</h4>
        </div>
        <div class="modal-body">
          <div class="panel panel-default">
            <div class="panel-heading">
              <div class="navbar navbar-default">
                <div class="container-fluid">
                   <div class="collapse navbar-collapse">
                     <form class="navbar-form navbar-left"> 
                       <div class="form-group"> 
                         <input class="form-control" placeholder="Set save path" id="save_path_input"> 
                         <button type="button" class="btn btn-default" id="save_btn">Save</button>
                         <button type="button" class="btn btn-default" id="select_all_btn">Select All</button>    
                       </div>
                     </form>
                   </div>
                </div>
              </div>
            </div>
            <div class="panel-body" style="overflow: scroll" id="result_area">
              {"videos": [${videoData ? JSON.stringify(videoData) : "Cannot fetch url, refresh page to retry"}]}
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  `
      $box = inejctWrapper;
      document.body.insertBefore(inejctWrapper, document.body.firstChild);

      inejctWrapper = document.createElement("div");
      inejctWrapper.setAttribute("id", "thrid_party_css");
      inejctWrapper.innerHTML = `<style>${css}</style>`;
      document.body.insertBefore(inejctWrapper, document.body.firstChild)
    }
    // 显示出弹出框
    $("#box").modal();
    const inputValue: HTMLFormElement = <HTMLFormElement>document.getElementById("save_path_input");
    inputValue.value = videoData.savePath

    // 全选内容
    $("#select_all_btn").on("click", function () {
      SelectText("result_area")
    })

    // 修改保存路径
    $("#save_btn").on("click", function () {
      let $resultArea: HTMLElement = document.getElementById('result_area');
      let $input: HTMLFormElement = <HTMLFormElement>document.getElementById('save_path_input');
      let videoInfo: VideoInfo = JSON.parse($resultArea.innerText)
      videoInfo.savePath = $input.value
      let stringifyData: string = JSON.stringify(videoInfo)
      $resultArea.innerText = stringifyData

      chrome.runtime.sendMessage(<UpdateVideoPathMessage>{Msg: UpdateVideoPathEvent, VideoInfo: videoInfo}, () => {
      })

    })
  })
}

// 全选div下的所有文字
export function SelectText(elementId: string) {
  let sel: Selection, range;
  let el = document.getElementById(elementId); //get element id
  sel = window.getSelection();
  if (sel.toString() == '') { //no text selection
    window.setTimeout(function () {
      range = document.createRange(); //range object
      range.selectNodeContents(el); //sets Range
      sel.removeAllRanges(); //remove all ranges from selection
      sel.addRange(range);//add Range to a Selection.
    }, 1);
  }
}
