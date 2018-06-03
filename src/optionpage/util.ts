export function SaveDataToLocal(data: string) {
  let blob = new Blob([data], {type: "application/json"})
  let url = URL.createObjectURL(blob);
  chrome.downloads.download({url: url, saveAs: true})
}