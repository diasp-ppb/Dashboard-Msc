import React  from 'react';
import { Button, Divider, ButtonGroup,  ControlGroup, HTMLTable, H6, H4, Classes } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState, DataConfig } from '../../Interfaces';
import classNames from 'classnames';
import './DataSourceList.css'

interface Props {
    items: DataConfig[];
}

class DataSourceList extends React.Component<Props> {
    
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
                </tbody>
                
              </HTMLTable>
            

       
    }
}   

  const mapDispatchToProps = (_dispatch: Dispatch) => {
    return {}
  };

  const mapStateToProps = (store: IAppState) => {
    return {
        items: store.data,
    };
  };
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(DataSourceList);