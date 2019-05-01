
import { IAppState } from '../Interfaces';

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


export const initialAppState:IAppState = {
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
          name: "vci",
          windowCount:3,
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
          },
          name: "Pombal",
          windowCount:3
        },
      {
        currentNode: {
          direction: 'row',
          first: 1, 
          second: 2,
          splitPercentage: 40,
        },
        name: "Data Source",
        windowCount:2
      }
      ],
      currentTheme: 'Blueprint',
      isOpen: false,
      currentLayer: 0,
      visualizations: [
        [],
        [],
        [],
      ],
      data: [
        {
          dataId: "dataExample1",
          data: dataExample
        },
        {
          dataId: "dataExample2",
          apiEndpoint: {
            route: "/dumbRoute"
          },
          data: dataExample2
        }
      ],
}


export const calServer = {
  submitReason: 'http://localhost:3002',
}

