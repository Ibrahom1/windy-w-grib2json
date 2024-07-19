import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {  Layer } from '@sakitam-gis/mapbox-wind';
import useEffect from 'react';


const MapboxWindComponent = () => {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZW5ncmtpIiwiYSI6ImNrc29yeHB2aDBieDEydXFoY240bXExcWoifQ.WS7GVtVGZb4xgHn9dleszQ';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [69.3451, 30.3753],
      zoom: 5,
      antialias: true
    });

    map.on('load', () => {
      fetch('https://blog.sakitam.com/wind-layer/data/wind.json')
        .then(res => res.json())
        .then(data => {
          const windLayer = new Layer('wind', data, {
            windOptions: {
              colorScale: [
                "rgb(36,104, 180)",
                "rgb(60,157, 194)",
                "rgb(128,205,193 )",
                "rgb(151,218,168 )",
                "rgb(198,231,181)",
                "rgb(238,247,217)",
                "rgb(255,238,159)",
                "rgb(252,217,125)",
                "rgb(255,182,100)",
                "rgb(252,150,75)",
                "rgb(250,112,52)",
                "rgb(245,64,32)",
                "rgb(237,45,28)",
                "rgb(220,24,32)",
                "rgb(180,0,35)"
              ],
              frameRate: 16,
              maxAge: 60,
              globalAlpha: 0.9,
              velocityScale: 0.01,
              paths: 3782,
            },
            fieldOptions: {
              wrapX: true,
            },
          });
     map.addLayer(windLayer);
        });
    });
    return () => map.remove();
  }, []);

  return (
    <div id='map' style={{ position: 'absolute', top: 0, bottom: 0, width: '100%', height: '100%', background: '#202020' }} />
  );
};

export default MapboxWindComponent;