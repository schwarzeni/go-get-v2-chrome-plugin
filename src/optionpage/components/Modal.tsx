import * as React from 'react'
import {VideoInfo} from '../../extension/interfaces';
import {
  DeleteVideoEvent, DeleteVideoMessage, GetMessageEvent, GetVideoInfoByKey, ResponseDataMap, UpdateVideoPathEvent,
} from '../../global-data';

export interface ModalProp {
  VideoInfo: VideoInfo
  $Contaienr: JQuery
}

export interface ModalState {
  VideoInfo: VideoInfo
}

export class Modal extends React.Component<ModalProp, ModalState> {
  constructor(prop: ModalProp) {
    super(prop)
    this.state = {
      VideoInfo: this.props.VideoInfo
    }
  }

  // TODO: learning later
  componentWillReceiveProps(nextProps: ModalProp) {
    this.setState({ VideoInfo: nextProps.VideoInfo });
    if (this.state.VideoInfo) {
      chrome.runtime.sendMessage({Msg: GetVideoInfoByKey, Key: this.state.VideoInfo.webpageUrl}, (vi: VideoInfo) => {
        this.setState({VideoInfo: vi});
        (document.getElementById("save_path_input") as HTMLFormElement).value = this.state.VideoInfo ? this.state.VideoInfo.savePath : "";
      })
    }
  }

  componentDidMount() {
    this.props.$Contaienr.on("show.bs.modal", (e) => {
    })

    document.getElementById("delete_btn").onclick = () => {
      chrome.runtime.sendMessage({Msg: DeleteVideoEvent, WebPageUrl: this.state.VideoInfo.webpageUrl}, () => {
        this.props.$Contaienr.modal("hide")
      })
    }

    document.getElementById("save_btn").onclick = () => {
      let savePath:string = (document.getElementById("save_path_input") as HTMLFormElement).value
      let video:VideoInfo = this.state.VideoInfo;
      video.savePath = savePath
      this.setState({"VideoInfo": video})

      chrome.runtime.sendMessage({Msg: UpdateVideoPathEvent, VideoInfo: this.state.VideoInfo}, () => {
        this.props.$Contaienr.modal("hide")
        this.setState({VideoInfo: null})
      })
    }
  }

  render() {
    return (
        <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                  aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">{this.state.VideoInfo ?this.state.VideoInfo.title : ""}</h4>
              </div>
              <div className="modal-body">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <div className="navbar navbar-default">
                      <div className="container-fluid">
                        <div className="collapse navbar-collapse">
                          <form className="navbar-form navbar-left">
                            <div className="form-group">
                              <input className="form-control" placeholder="Set save path" id="save_path_input"/>
                              <button type="button" className="btn btn-default" id="save_btn">Save</button>
                              <button type="button" className="btn btn-danger" id="delete_btn">Delete</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="panel-body" style={{overflow: 'scroll'}} id="result_area">
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
        </div>
    )
  }
}