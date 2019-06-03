import React from 'react'

import {Visualization_Types, RecomendedThemes, DataConfig, IAppState, RecomendationVisualizations} from "../../../Interfaces"

import { 
    FormGroup,
    HTMLSelect
 } from "@blueprintjs/core";
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { recomendationServer } from '../../../settings/Settings';

interface Props {
    visualizationSelected: Visualization_Types,
    selectVisualization: Function,
    selectDataId: Function,
    data: DataConfig[],
}

class VisualizationSelector extends React.Component<Props> {
    state = {
        recomendations: [
            {
              "visualization": "linechart",
              "rating": 1,
              "visualComplexity": 1,
              "visualAppeling": 1
            },
            {
              "visualization": "barchart",
              "rating": 2,
              "visualComplexity": 1,
              "visualAppeling": 1
            }
          ],
        dataIds: this.dataIdToArray(),
    }

    dataIdToArray() {
        const dataIds = this.props.data.map( (item, _index) => {
            return item.dataId;
        })

        this.props.selectDataId(dataIds[0])

        return dataIds;
    }
    



    typesToArray() {
        let types = [];
        for( let type in Visualization_Types){
            types.push(type);
        };
        return types;
    }

   

    getRecomendation(theme:string) {
      /*  fetch(recomendationServer.getrec+ "?theme="+theme, {
            method: 'get',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            this.setState({ recomendations: data });
            }
            )
          .catch((error: Error) => {
            throw error;
          });
      */
    }

    render() {
        let types = this.typesToArray();
        return (
        <FormGroup>
        <h3>Visualization Wizzard</h3>
        
        <table>
            <thead> 
                <tr>
                    <th> Data  </th>
                    <th> Visualization </th>
                    <th> Theme </th>
                </tr>
            </thead>
            
            <tbody>
                <tr> 
                    <td>

                    <HTMLSelect options={this.state.dataIds}  onChange={ (event) => { console.log(  event.currentTarget.value );  this.props.selectDataId(event.currentTarget.value)}}/> 
                
                    </td>
                    

                    <td>
                                 
                    <HTMLSelect options={types} defaultValue={types[0]} onChange={ (event) => {this.props.selectVisualization(event.currentTarget.value)}}/> 
                
                
                    </td>
                    
                    <td>
                    <HTMLSelect options={RecomendedThemes} onChange={ (event) => {
                                                                                    this.getRecomendation(event.currentTarget.value);
                                                                                    this.setState({hasRatingCategoricalValue: event.currentTarget.value})
                                                                                  }}/> 
               
                    </td>

                    </tr>
            
            </tbody>
        </table>


        <div>
            <h4> Recomendation </h4>
            
            <table> 
                <thead>
                    <tr>
                       
                    <th> Visualization </th>
                    <th> Theme Rating </th>
                    <th> Complexity</th>    
                    <th> Appleling </th>
                
                    </tr>
                    
                </thead>
                
                <tbody>
                    {
                        this.state.recomendations.map( (element:any, index) =>    {
                            let visName = RecomendationVisualizations.find( function(option) {
                                return option.value == ":" + element.visualization;
                            })
                            
                            return (    
                            <tr>
                                <td>
                                 {visName}
                                </td>
                                <td>
                                    teste
                                    //element.rating}
                                </td>
                                <td>
                                  //element.visualComplexity}
                                </td>
                                <td>
                                    //element.visualAppeling}
                                </td>
                            </tr>
                            );
                        }       
                        )
                    }
                </tbody>
            </table>


 
        </div>
        </FormGroup>
        );
    }
    
}



const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
    }
  };
  
  
const mapStateToProps = (store: IAppState) => {
    return {
        data: store.data
    }
  };
  
  
export default connect(mapStateToProps,mapDispatchToProps)(VisualizationSelector);
