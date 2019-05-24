import React from 'react';
import { Dialog, InputGroup, Button, Card, HTMLSelect, IOptionProps } from '@blueprintjs/core';
import { DataConfig } from '../../Interfaces';
import  DownloadButton  from '../../components/button/DownloadButton'
import { calServer } from '../../settings/Settings';
import { SELECT } from '@blueprintjs/core/lib/esm/common/classes';
import { Label } from 'recharts';

interface Props {
    isOpen: boolean,
    handleClose:Function
}

interface hasRatingComponent {
    ratingComponent: string,
    ratingScore?: string,
}

interface State {
    visualization: string,
    rating: hasRatingComponent;
}


export default class SubmitRating extends React.Component<Props,State> {
    state:State = {
        visualization: ":barchart",
        rating: {
            ratingComponent: ":RecomendedTheme",
        },
    }

    submitRating = () => {
      /*  fetch(  calServer.submitReason, {
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
        });*/
    }

    render () {
        const visualizations:IOptionProps[] = [
            {
                label: "BAR_CHART",
                value: ":barchart",
            },
            {
                label: "LINE_CHART",
                value: ":linechart",
            }
        ];

        const ratingComponent:IOptionProps[] = [
            {
                label: "BAR_CHART",
                value: ":barchart",
            },
            {
                label: "LINE_CHART",
                value: ":linechart",
            }
        ];

        return (
        <Dialog
            usePortal={true}
            isOpen={this.props.isOpen}
            onClose={ () => this.props.handleClose()}
            canOutsideClickClose={true}
        >   
            <Card>
            <h2>Visualization</h2>

            <HTMLSelect options={visualizations} defaultValue={":barchart"} onChange={ (event) => {this.setState({visualization: event.currentTarget.value})}}/> 
            

            <h3>RatingComponent</h3>

            <HTMLSelect options={ratingComponent} defaultValue={":RecomendedTheme"} onChange={ (event) => {this.setState({visualization: event.currentTarget.value})}}/> 

            <h4> Value </h4>

            <InputGroup/>
            


            
            <Button 
                icon="send-to"
                onClick={this.submitRating}
            >
            Submit
            </Button>

           </Card>
        </Dialog>
        );
    }
}