import React from 'react';
import { Dialog, TextArea, Intent, Label, Button } from '@blueprintjs/core';
import { DataConfig } from '../../Interfaces';
import  DownloadButton  from '../../components/button/DownloadButton'
import { calServer } from '../../settings/Settings';

interface Props {
    isOpen: boolean,
    handleClose:Function,
    dataConfig: DataConfig,
}

export default class DownloadForm extends React.Component<Props> {
    state = {
        reason: "",
        reasonSended: false,
    }

    handleClose() {
        this.props.handleClose();
    }


    submitReason() {
        fetch(  calServer.submitReason, {
                method: 'POST',
                headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                body: JSON.stringify({
                reason: this.state.reason,
                dataId: this.props.dataConfig.dataId,
         })
        }).then( response => {
            if(!response.ok) {

            }else {
                //TOAST
                this.setState({reasonSended: true});
            }
        }).catch((error: Error) => {
            throw error;
        });
    }

    render () {
        let {dataConfig}= this.props;
        let {reason} = this.state;
        return (
        <Dialog
            usePortal={true}
            isOpen={this.props.isOpen}
            onClose={this.handleClose}
            canOutsideClickClose={true}
        >   

            <Label>
                Reason
                <TextArea
                    large={true}
                    intent={Intent.PRIMARY}
                    onChange={ (event) => this.setState({reason: event.target.value}) }
                    value={this.state.reason}
                />
            </Label>

            <Button 
                icon="send-to"
                onClick={this.submitReason}
            />

            {reason.length > 5 && this.state.reasonSended &&
            <DownloadButton fileName={dataConfig.dataId + ".txt"} fileContent={dataConfig.data}/>                          
            }
        </Dialog>
        );
    }
}