import React from 'react';
import { Dialog, Button, Card, HTMLSelect, IOptionProps, NumericInput, IToastProps, Intent } from '@blueprintjs/core';
import { calServer, recomendationServer } from '../../settings/Settings';
import { RecomendedThemes, RecomendationVisualizations, IAppState } from '../../Interfaces';
import { addToast } from '../../redux/actions/AppActions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface Props {
    isOpen: boolean,
    handleClose:Function,
    theme: string,
    toastMessage: Function
}



interface State {
    visualization: string,
    hasRatingComponent: string,
    hasRatingScore?: number,
    hasRatingCategoricalValue?: string,
    max: number,
    min: number
}



const ratingComponent:IOptionProps[] = [
    {
        label: "RecommendedTheme",
        value: ":RecommendedTheme",
    },
    {
        label: "VisualComplexity",
        value: ":VisualComplexity",
    },
    {
        label: "VisualAppeling",
        value: ":VisualAppeling"
    }
];


class SubmitRating extends React.Component<Props,State> {
    state:State = {
        visualization: ":barchart",
        hasRatingComponent: ":RecommendedTheme",
        hasRatingCategoricalValue: ":TravelIntention",
        max: 5,
        min: 0,
    }
   
    submitRating = () => {

        if(!this.state.visualization) {
            //MESSAGE ERROR
            return;
        } 

        let body = "{\"visualization\":\"" + this.state.visualization + "\",\"ratingStatements\":[{" ;
    

        if(this.state.hasRatingComponent === ":RecommendedTheme" ){
            if(this.state.hasRatingCategoricalValue) {
                body += "\"hasRatingComponent\":\"" + this.state.hasRatingComponent  + "\",\"hasRatingCategoricalValue\":\"" + this.state.hasRatingCategoricalValue + "\" ";      
            }
            else {
                //message error
                return;
            }
        }
        else{
            if(this.state.hasRatingComponent === ":VisualComplexity" || this.state.hasRatingComponent === ":VisualAppeling"){
                if(this.state.hasRatingScore){
                    body += "\"hasRatingComponent\":\"" + this.state.hasRatingComponent + "\",\"hasRatingScore:\"" + this.state.hasRatingScore + "\" ";
                }
                else {
                    //message error
                    return;
                }
            }
            else {
                //message error
                return;
            }
        }

        body += "}]}"


        console.log(body);

       fetch(  recomendationServer.insertrec, {
                method: 'POST',
                headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                body: body
        }).then( response => {
            if(response.ok) {
                let toast: IToastProps =
                {   
                    className: this.props.theme,
                    timeout: 5000,
                    intent: Intent.SUCCESS,
                    message: 'Dataset added',
                };

                this.props.toastMessage(toast);
            }
        }).catch((error: Error) => {
            console.log(error);
        });
    }

    selectValue() {

        let ratingComponent = this.state.hasRatingComponent;

        if(ratingComponent === ":RecommendedTheme")
        {
            return (
                <HTMLSelect options={RecomendedThemes} onChange={ (event) => {this.setState({hasRatingCategoricalValue: event.currentTarget.value})}}/> 
            );
        }
        else {
            return (
                <NumericInput 
                                max={this.state.max}
                                min={this.state.min}
                                placeholder="Enter a number..." onValueChange={ (value) => this.setState({hasRatingScore: value})}
                              />
            );
        }
    }

    render () {
        

        return (
        <Dialog
            usePortal={true}
            isOpen={this.props.isOpen}
            onClose={ () => this.props.handleClose()}
            canOutsideClickClose={true}
        >   
            <Card>
            <h2>Visualization</h2>

            <HTMLSelect options={RecomendationVisualizations} defaultValue={":barchart"} onChange={ (event) => {this.setState({visualization: event.currentTarget.value})}}/> 
            
            
            <h3>RatingComponent</h3>

            <HTMLSelect options={ratingComponent} onChange={ (event) => {this.setState({hasRatingComponent: event.currentTarget.value})}}/> 

            <h4> Value </h4>

            {this.selectValue()}            


            <Button
                style={{display: 'block', marginTop: '20px'}} 
                icon="send-to"
                onClick={() => this.submitRating()}
            >
            Submit
            </Button>

           </Card>
        </Dialog>
        );
    }
}


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        toastMessage: (toast:IToastProps) => dispatch(addToast(toast))
    }
  };

  const mapStateToProps = (store: IAppState) => {
    return {
        theme: store.currentTheme
    };
  };
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(SubmitRating);