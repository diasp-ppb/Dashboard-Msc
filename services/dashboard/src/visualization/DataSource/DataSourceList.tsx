import React  from 'react';
import { Button, EditableText, ButtonGroup, HTMLTable, Classes, IToastProps, Intent } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState, DataConfig, Theme } from '../../Interfaces';
import classNames from 'classnames';
import './DataSourceList.css'
import { addDataConfig, addToast } from '../../redux/actions/AppActions';
import { api } from '../../data/Data';
import DownloadForm from '../../components/downloadForm/DownloadForm';
import { sendEvent } from '../../analytics/Analytics';


interface Props {
    items: DataConfig[];
    addDataConfig: Function;
    toastMessage: Function;
    theme: string,
}

interface State {
    dataId: string,
    route: string,
    data: any[],
    downloadForm: boolean,
    selectedData: string,
}

const DEFAULT_VALUE = "";
const EMPTY_ARRAY: [] = [];
class DataSourceList extends React.Component<Props, State> {
    
    state = {
        dataId: DEFAULT_VALUE,
        route: DEFAULT_VALUE,
        data: EMPTY_ARRAY,
        downloadForm: false,
        selectedData: "",
    }

    closeDownloadForm = () =>  {
        this.setState({downloadForm: false})
    }

    downloadForm = (dataId: string) => {
        this.setState({
            downloadForm:true,
            selectedData: dataId,
        })
    }

    //TODO BUTTONS FUNCTIONS    
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
                            <Button icon="download" onClick={() => this.downloadForm(item.dataId)} />
                        </ButtonGroup>
                     </td>

                   </tr>
        })
    }

    fetchData = () => {
        if(this.state.route == DEFAULT_VALUE) return;

        api<any>(this.state.route)
        .then( (data:any) => {

            let toast: IToastProps =
                {   
                    className: this.props.theme,
                    timeout: 5000,
                    intent: Intent.SUCCESS,
                    message: 'Dataset added',
                };

            this.props.toastMessage(toast);
            this.addNewEntry(data);
        })
        .catch((error: Error) => {
            console.log(error) //TOAST DISPATCH TO USER
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
                        <Button icon="plus" onClick={this.fetchData}/>  
                     </ButtonGroup>
                 </td>
               </tr>
    }

    addNewEntry = (data:any) =>  {
        //from remote location
        if(this.state.dataId !== DEFAULT_VALUE && this.state.route !== DEFAULT_VALUE) {
            let newEntry:DataConfig = {
                dataId: this.state.dataId,
                apiEndpoint: {
                    route: this.state.route
                },
                data: data
            }
            this.props.addDataConfig(newEntry);
            sendEvent("ADDED_NEW_DATASOURCE");
        }
        //from drop location //TODO interface not implemented  
        else if(this.state.dataId !== DEFAULT_VALUE && this.state.data !== EMPTY_ARRAY)
        {
            let newEntry:DataConfig = {
                dataId: this.state.dataId,
                data: this.state.data,
            }
            this.props.addDataConfig(newEntry);
            sendEvent("ADDED_NEW_DATASOURCE");
        }
    }
    resetState = () => {
        this.setState({
            dataId: DEFAULT_VALUE,
            data: EMPTY_ARRAY,
            route: DEFAULT_VALUE,
        })
    }
    
    render() {
        let selectedData = this.props.items.find( (item) => {
            return item.dataId === this.state.selectedData;
        });

        return (
            <div>
                <HTMLTable className={classNames(Classes.HTML_TABLE_BORDERED, Classes.HTML_TABLE_STRIPED, Classes.HTML_TABLE)}>
                 <thead>
                    <tr>
                     <th>Data Id</th>
                     <th>DataSource</th>
                     <th>Options</th>
                    </tr>
                </thead>

                <tbody>
                    {this.cellsRenderer()}
                    {this.newCellRenderer()}
                </tbody>
                
              </HTMLTable>

              {
                selectedData &&
                  <DownloadForm 
                isOpen={this.state.downloadForm}
                dataConfig={selectedData}
                handleClose={this.closeDownloadForm}
              />
              }
                
            </div>
                );
    }
}   

  const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addDataConfig: (newEntry: DataConfig) => dispatch(addDataConfig(newEntry)),
        toastMessage: (toast:IToastProps) => dispatch(addToast(toast))

    }
  };

  const mapStateToProps = (store: IAppState) => {
    return {
        items: store.data,
        theme: store.currentTheme,
    };
  };
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(DataSourceList);