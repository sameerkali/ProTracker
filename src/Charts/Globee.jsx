import React, { useEffect } from 'react';
import * as echarts from 'echarts';
// import 'echarts-gl';

const ROOT_PATH = 'https://echarts.apache.org/examples';

const Globee = () => {
  useEffect(() => {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom, 'dark');

    let option;

    const fetchData = async () => {
      try {
        const response = await fetch(ROOT_PATH + '/data-gl/asset/data/flights.json');
        const data = await response.json();

        const airports = data.airports.map(item => ({
          coord: [item[3], item[4]]
        }));

        function getAirportCoord(idx) {
          return [data.airports[idx][3], data.airports[idx][4]];
        }

        const routesGroupByAirline = {};
        data.routes.forEach(route => {
          const airline = data.airlines[route[0]];
          const airlineName = airline[0];
          if (!routesGroupByAirline[airlineName]) {
            routesGroupByAirline[airlineName] = [];
          }
          routesGroupByAirline[airlineName].push(route);
        });

        const pointsData = [];
        data.routes.forEach(airline => {
          pointsData.push(getAirportCoord(airline[1]));
          pointsData.push(getAirportCoord(airline[2]));
        });

        const series = data.airlines.map(airline => {
          const airlineName = airline[0];
          const routes = routesGroupByAirline[airlineName];
          if (!routes) {
            return null;
          }
          return {
            type: 'lines3D',
            name: airlineName,
            effect: {
              show: true,
              trailWidth: 2,
              trailLength: 0.15,
              trailOpacity: 1,
              trailColor: 'rgb(30, 30, 60)'
            },
            lineStyle: {
              width: 1,
              color: 'rgb(50, 50, 150)',
              opacity: 0.1
            },
            blendMode: 'lighter',
            data: routes.map(item => [
              airports[item[1]].coord,
              airports[item[2]].coord
            ])
          };
        }).filter(series => !!series);

        series.push({
          type: 'scatter3D',
          coordinateSystem: 'globe',
          blendMode: 'lighter',
          symbolSize: 2,
          itemStyle: {
            color: 'rgb(50, 50, 150)',
            opacity: 0.2
          },
          data: pointsData
        });

        option = {
          legend: {
            selectedMode: 'single',
            left: 'left',
            data: Object.keys(routesGroupByAirline),
            orient: 'vertical',
            textStyle: {
              color: '#fff'
            }
          },
          globe: {
            environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
            heightTexture: ROOT_PATH + '/data-gl/asset/bathymetry_bw_composite_4k.jpg',
            displacementScale: 0.1,
            displacementQuality: 'high',
            baseColor: '#000',
            shading: 'realistic',
            realisticMaterial: {
              roughness: 0.2,
              metalness: 0
            },
            postEffect: {
              enable: true,
              depthOfField: {
                enable: false,
                focalDistance: 150
              }
            },
            temporalSuperSampling: {
              enable: true
            },
            light: {
              ambient: {
                intensity: 0
              },
              main: {
                intensity: 0.1,
                shadow: false
              },
              ambientCubemap: {
                texture: ROOT_PATH + '/data-gl/asset/lake.hdr',
                exposure: 1,
                diffuseIntensity: 0.5,
                specularIntensity: 2
              }
            },
            viewControl: {
              autoRotate: false
            },
            silent: true
          },
          series: series
        };

        myChart.setOption(option);

        window.addEventListener('keydown', () => {
          series.forEach((series, idx) => {
            myChart.dispatchAction({
              type: 'lines3DToggleEffect',
              seriesIndex: idx
            });
          });
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      window.removeEventListener('keydown', () => {});
    };
  }, []);

  return <div id="main" style={{ width: '100%', height: '800px' }} />;
};

export default Globee;
