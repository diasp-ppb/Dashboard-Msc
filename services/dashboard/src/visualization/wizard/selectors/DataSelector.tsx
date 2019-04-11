import React from 'react'
import { Dispatch } from 'redux';
import { IAppState, DataConfig } from '../../../Interfaces';
import { connect } from 'react-redux';
import { FormGroup, HTMLSelect } from '@blueprintjs/core';

interface Props {
    data: DataConfig[]
    selectData: Function,
}
interface State {

}

class DataSelector extends React.Component<Props> {

    dataIdToArray() {
        return  this.props.data.map( (item, _index) => {
            return item.dataId;
        })
    }
    render() {

            let dataId = this.dataIdToArray();
            return (
            <FormGroup>
            <h3>Visualization Wizzard</h3>
            <div> 
                <HTMLSelect options={dataId}  onChange={ (event) => { console.log(  event.currentTarget.value );  this.props.selectData(event.currentTarget.value)}}/> 
            </div> 
            </FormGroup>
        );
    }    
}



const mapDispatchToProps = (dispatch: Dispatch) => {
    return {}
  };
  
  
const mapStateToProps = (store: IAppState) => {
    return {
        data: store.data
    }
  };
  
  
export default connect(mapStateToProps,mapDispatchToProps)(DataSelector);
