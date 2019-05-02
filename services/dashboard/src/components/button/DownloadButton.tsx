import React , { Component } from "react";


import { Button, Intent } from "@blueprintjs/core";

interface Props {
    fileName: string,
    fileContent: string, 
}

export default class DownloadButton extends Component<Props> {


   downloadFile(fileName:string,fileContent:string) {

        function fake_click(obj:any) {
          let ev = document.createEvent("MouseEvents");
          ev.initMouseEvent(
            "click",
            true,
            false,
            window,
            0,
            0,
            0,
            0,
            0,
            false,
            false,
            false,
            false,
            0,
            null
          );
          obj.dispatchEvent(ev);
    }

       function export_raw(filename:string,content:string) {
        
        let urlObject = window.URL || window;
        let export_blob = new Blob([JSON.stringify(content)]);
  
        if ('msSaveBlob' in navigator) {
          //navigator.msSaveBlob(export_blob, filename);
        } else if ('download' in HTMLAnchorElement.prototype) {
          let save_link:HTMLAnchorElement = document.createElement("a");
          save_link.target= '_blank'
          save_link.href = urlObject.createObjectURL(export_blob);
          save_link.download = filename;
          fake_click(save_link);
        } else {
          throw new Error("Neither a[download] nor msSaveBlob is available");
        }
      }
      export_raw(fileName, fileContent);
  }

    render() {
        let {fileContent, fileName } = this.props;
        return (
            <Button  intent={Intent.SUCCESS }onClick={() => this.downloadFile(fileName,fileContent)}
                    icon="download">
                    Download
            </Button>
        );
    }
}