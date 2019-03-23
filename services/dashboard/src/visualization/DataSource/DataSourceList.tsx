import React  from 'react';
import { Button, EditableText, ButtonGroup, HTMLTable, Classes } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState, DataConfig } from '../../Interfaces';
import classNames from 'classnames';
import './DataSourceList.css'
import { addDataConfig } from '../../redux/actions/AppActions';

interface Props {
    items: DataConfig[];
    addDataConfig: Function;
}

interface State {
    dataId: string,
    route: string,
    data: any,
}

const DEFAULT_VALUE = "";

class DataSourceList extends React.Component<Props, State> {
 
    state = {
        dataId: DEFAULT_VALUE,
        route: DEFAULT_VALUE,
        data: DEFAULT_VALUE,
    }

    cellsRenderer = () => {
        return this.props.items.map ( (item, index) => {
            return <tr key={index}>
                     <td>
                        {item.dataId}
                     </td>
                     <td> 
                        {item.apiEndpoint&& item.apiEndpoint.route }
                     </td>
                     <td>   
                        <ButtonGroup minimal={true} vertical={false}>
                           
                            <Button icon="edit"/>   
                            
                            <Button icon="delete" />
                          
                        </ButtonGroup>
                     </td>

                   </tr>
        })
    }
    newCellRenderer = () => {
        return <tr>
                 <td>
                     <EditableText  onChange={(value) => this.setState( {dataId: value })}/>
                 </td>
                 <td>
                     <EditableText  onChange={(value) => this.setState( {route: value })}/>
                 </td>
                 <td>
                     <ButtonGroup minimal={true} vertical={false}>    
                        <Button icon="plus" onClick={this.addNewEntry}/>   
                     </ButtonGroup>
                 </td>
               </tr>
    }

    addNewEntry = () =>  {

        if(this.state.dataId != DEFAULT_VALUE && this.state.route != DEFAULT_VALUE) {
            let newEntry:DataConfig = {
                dataId: this.state.dataId,
                apiEndpoint: {
                    route: this.state.route
                },
                data: {}
            }
            this.props.addDataConfig(newEntry);
        } else
        if(this.state.dataId != DEFAULT_VALUE && this.state.data != DEFAULT_VALUE)
        {
            let newEntry:DataConfig = {
                dataId: this.state.dataId,
                data: this.state.data,
            }
            this.props.addDataConfig(newEntry);

        }
    }
    resetState = () => {
        this.setState({
            dataId: DEFAULT_VALUE,
            data: DEFAULT_VALUE,
            route: DEFAULT_VALUE,
        })
    }
    
    render() {
        return <HTMLTable className={classNames(Classes.HTML_TABLE_BORDERED, Classes.HTML_TABLE_STRIPED, Classes.HTML_TABLE)}>
                 <thead>
                    <tr>
                     <th>DATA ID</th>
                     <th>API ROUTE</th>
                     <th>OPTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    {this.cellsRenderer()}
                    {this.newCellRenderer()}
                </tbody>
                
              </HTMLTable>
            

       
    }
}   

  const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addDataConfig: (newEntry: DataConfig) => dispatch(addDataConfig(newEntry))
    }
  };

  const mapStateToProps = (store: IAppState) => {
    return {
        items: store.data,
    };
  };
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(DataSourceList);