import { Classes } from '@blueprintjs/core';
import React from 'react';

import {
  Button,
  Drawer,
} from "@blueprintjs/core";

import {
  AppState,
} from './Interfaces';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import "../node_modules/react-mosaic-component/react-mosaic-component.css";
import './App.css';
import Layer from './layer/Layer'

const dataExample = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

const dataExample2 = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
];

interface Props {

}

class App extends React.PureComponent<Props> {

  constructor(props:Props) {
    super(props);
  }

  state: AppState = {
    layers: [
      {
        currentNode: {
          direction: 'row',
          first: 2,
          second: {
            direction: 'column',
            first: 1,
            second: 3,
          },
          splitPercentage: 40,
        },
      },
      {
        currentNode: {
          direction: 'row',
          first: 1,
          second: {
            direction: 'column',
            first: 2,
            second: 3,
          },
          splitPercentage: 40,
        }
    }
    ],
    currentTheme: 'Blueprint',
    isOpen: false,
    currentLayer: 0,
    visualizations: [
      [
        {
          type: 'Barchart', 
          data: dataExample,
          nodeId: 1,
        }
      ],
      [
        {
          type: 'Barchart',
          data: dataExample2,
          nodeId: 3
        }
      ]
    ]
  };

 
  renderMenuLayers() {
  
    return Object.keys(this.state.layers).map( (_item, index) => {
      return (
      <Button onClick={() => this.selectLayer(index)} icon="volume-up" key={index}>
        {index}
      </Button>);
    })
  }

  render() {

    return (
      <div className="react-mosaic-example-app" >
        <Drawer
                    className={this.state.currentTheme}
                    icon="info-sign"
                    onClose={this.handleDrawer}
                    title="Urban Menu"
                    autoFocus={true}
                    canEscapeKeyClose={true}
                    canOutsideClickClose={true}
                    enforceFocus={true}
                    hasBackdrop={true}
                    isOpen={this.state.isOpen}
                    size={Drawer.SIZE_SMALL}
                    usePortal={false}
                    vertical={false}
                    style={{left: 0}}
        >
        <div className={Classes.DRAWER_BODY}>
            <div className={Classes.DIALOG_BODY}>
                {this.renderMenuLayers()}
            </div>
        </div>

          <div className={Classes.DRAWER_FOOTER}>Urban Dash Footer</div>
        </Drawer>
        {this.getCurrentLayer()}  
        </div>
    );
  }

  handleDrawer = () => {
    let newStatus = !this.state.isOpen;
    this.setState( (state) => {return {...state, isOpen: newStatus}})
  }

  private getCurrentLayer() {
    return (
      <Layer theme={this.state.currentTheme} 
       layerState={this.state.layers[this.state.currentLayer]}  
       updateTree={this.updateTree}
       drawerToggle={this.handleDrawer}
       visualizations={this.state.visualizations[this.state.currentLayer]}
      />
    )
  }


  updateTree = (currentNode: any) => {
    this.setState( (state) => {
      const list = this.state.layers.map((item, j) => {
        if (j === this.state.currentLayer) {
          return {...item, currentNode: currentNode}
        } else {
          return item;
          }
        });

        return {
          ...state, layers: list
        };
      });
    };


  private selectLayer = ( index: number) => {
    this.setState( (state) =>{ 
                  return {
                    ...state, 
                    currentLayer: index,
                    isOpen: false,
                  } 
                })


    console.log(this.state.currentLayer); 
  };
};


export default App;