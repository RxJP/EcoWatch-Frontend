import React, { useState } from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { zones, getZoneColor } from '../services/zones';

const ZoneCircle = ({ zone, onSelect }) => {
  return (
    <Circle
      center={[zone.lat, zone.lng]}
      radius={zone.radius}
      pathOptions={{
        color: getZoneColor(zone.importance),
        fillColor: getZoneColor(zone.importance),
        fillOpacity: 0.7
      }}
      eventHandlers={{
        click: () => onSelect(zone)
      }}
    />
  );
};

const Map = ({ onZoneSelect }) => {
  const [selectedZone, setSelectedZone] = useState(null);

  const handleZoneSelect = (zone) => {
    setSelectedZone(zone);
    onZoneSelect(zone);
  };

  const handleClosePanel = () => {
    setSelectedZone(null);
    onZoneSelect(null);
  };

  return (
    <section id="map-section" className="section map-layout">
      <h2>Environmental Risk Map</h2>
      <div className="map-container">
        <MapContainer
          center={[22.5, 79]}
          zoom={5}
          style={{ height: '450px', flex: 2, borderRadius: '10px' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {zones.map(zone => (
            <ZoneCircle 
              key={zone.id} 
              zone={zone} 
              onSelect={handleZoneSelect} 
            />
          ))}
        </MapContainer>

        {selectedZone && (
          <aside className="zone-panel">
            <button onClick={handleClosePanel} className="close-btn">
              ✖
            </button>
            <h3>{selectedZone.name}</h3>
            <p>
              <strong>Hazard:</strong> {selectedZone.hazard}
            </p>
            <p>
              <strong>Human Impact:</strong> {selectedZone.impact}
            </p>
            <p>
              <strong>Importance:</strong> {selectedZone.importance}/10
            </p>
            <h4>🐾 Affected Species</h4>
            <ul>
              {selectedZone.species.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <h4>✏️ Related Petitions</h4>
            <div>
              {selectedZone.petitions.map((p, i) => (
                <p key={i}>
                  {p.title} — <strong>{p.count.toLocaleString()}</strong> signatures
                </p>
              ))}
            </div>
          </aside>
        )}
      </div>
    </section>
  );
};

export default Map;
