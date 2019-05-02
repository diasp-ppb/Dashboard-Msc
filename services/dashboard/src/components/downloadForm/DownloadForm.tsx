import React from 'react';
import { Dialog, InputGroup, Button, Card } from '@blueprintjs/core';
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

    submitReason = () => {
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
                this.setState({reason: "reason wasn't accepted, retry",
                               reasonSended: false})
            }else {
                //TOAST
                this.setState({reasonSended: true});
            }
        }).catch((error: Error) => {
            console.log("errpe")
        });
    }

    render () {
        let {dataConfig}= this.props;
        let {reason} = this.state;
        return (
        <Dialog
            usePortal={true}
            isOpen={this.props.isOpen}
            onClose={ () => this.props.handleClose()}
            canOutsideClickClose={true}
        >   
            <Card>
            <h2>Reason</h2>


            <InputGroup
                    large={true}
                    onChange={ (event:any) => this.setState({reason: event.target.value})}
                    placeholder="Fill the reason"
                    value={this.state.reason}
            />
            
            <Button 
                icon="send-to"
                onClick={this.submitReason}
            >
            Submit
            </Button>


            {reason.length > 5 && this.state.reasonSended &&
            <DownloadButton fileName={dataConfig.dataId + ".txt"} fileContent={dataConfig.data}/>                          
            }

           </Card>
        </Dialog>
        );
    }
}