import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  className?: string;
  height?: string;
}

export const Map = ({ className = '', height = '400px' }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Set your Mapbox access token here (or use environment variable)
    mapboxgl.accessToken =
      'pk.eyJ1IjoibW9uaWljb3BzIiwiYSI6ImNsbTdtNDZvdzAyMmYzam81b2t3YnQ3aGMifQ.x-upIVaVpO5iXWoZ2hC-yQ';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [55.2708, 25.2048], // Dubai coordinates
      zoom: 10,
    });

    // Add dummy markers
    const dummyLocations = [
      { lng: 55.2708, lat: 25.2048, title: 'Location 1' },
      { lng: 55.2808, lat: 25.2148, title: 'Location 2' },
      { lng: 55.2608, lat: 25.1948, title: 'Location 3' },
      { lng: 55.2908, lat: 25.2248, title: 'Location 4' },
    ];

    dummyLocations.forEach((location) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = '#1A73EB';
      el.style.border = '2px solid white';
      el.style.cursor = 'pointer';

      new mapboxgl.Marker(el)
        .setLngLat([location.lng, location.lat])
        .setPopup(new mapboxgl.Popup().setText(location.title))
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      className={`w-full rounded-lg overflow-hidden ${className}`}
      style={{ height }}
    />
  );
};

