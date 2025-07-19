/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  GoogleMap,
  Marker,
  InfoWindow,
  OverlayView,
  Polygon,
  Polyline,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import styles from "./Map.module.css";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";

type Pin = {
  id: string;
  lat: number;
  lng: number;
  title: string;
  description: string;
};

type EventDetails = {
  id: string;
  order: number;
  text_content: string;
  image_url: string;
};

type Fence = {
  title: string;
  color: string;
  coords: { lat: number; lng: number }[];
  center_lat: number;
  center_lng: number;
};

type MapProps = {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  pins: Pin[];
  details: EventDetails[];
};

const mapOptions = {
  streetViewControl: true,
  mapTypeControl: true,
  fullscreenControl: true,
  zoomControl: true,
  draggable: true,
  scrollwheel: true,
};

function createArcCurve(
  start: google.maps.LatLngLiteral,
  end: google.maps.LatLngLiteral,
  arcHeight = 0.2, // quanto maior, mais curvo
  numPoints = 100
): google.maps.LatLngLiteral[] {
  const latMid = (start.lat + end.lat) / 2;
  const lngMid = (start.lng + end.lng) / 2;

  // direção perpendicular para a elevação do arco
  const dx = end.lng - start.lng;
  const dy = end.lat - start.lat;
  const normal = { lat: -dy, lng: dx };

  // normalizando o vetor
  const length = Math.sqrt(normal.lat * normal.lat + normal.lng * normal.lng);
  normal.lat /= length;
  normal.lng /= length;

  // ponto de controle elevado (no meio do caminho, mas acima)
  const controlPoint = {
    lat: latMid + normal.lat * arcHeight,
    lng: lngMid + normal.lng * arcHeight,
  };

  // criar pontos ao longo da curva quadrática
  const curve: google.maps.LatLngLiteral[] = [];
  for (let t = 0; t <= 1; t += 1 / numPoints) {
    const x =
      (1 - t) * (1 - t) * start.lng +
      2 * (1 - t) * t * controlPoint.lng +
      t * t * end.lng;
    const y =
      (1 - t) * (1 - t) * start.lat +
      2 * (1 - t) * t * controlPoint.lat +
      t * t * end.lat;
    curve.push({ lat: y, lng: x });
  }

  return curve;
}

export default function Map({ center, zoom = 12, pins }: MapProps) {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [showFence, setShowFence] = useState(true);
  const [showPinsList, setShowPinsList] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);

  const {
    data: fences,
    loading,
    error,
  } = useFetch<Fence[]>("https://bibleatlas.vercel.app/api/fences");

  const handleMapLoad = (map: google.maps.Map) => {
    map.setMapTypeId("satellite");
    mapRef.current = map;
  };

  const goToPin = (pin: Pin) => {
    if (mapRef.current) {
      mapRef.current.panTo({ lat: pin.lat, lng: pin.lng });
      mapRef.current.setZoom(13);
      setActiveMarker(pin.id);
    }
  };

  return (
    <div className={styles.mainContainer}>
      {fences !== null && fences.length >= 1 ? (
        <div className={styles.toggleFences}>
          <button onClick={() => setShowFence(!showFence)}>
            {showFence ? "Ocultar cercas" : "Mostrar cercas"}
          </button>
        </div>
      ) : (
        <div></div>
      )}

      <div className={styles.togglePins}>
        <button onClick={() => setShowPinsList(!showPinsList)}>
          {showPinsList ? "Ocultar" : "Navegar entre Pins"}
        </button>
      </div>

      {showPinsList && (
        <div className={styles.pinsList}>
          {pins.map((pin) => (
            <button
              key={pin.id}
              className={styles.pinItem}
              onClick={() => goToPin(pin)}
            >
              {pin.title}
            </button>
          ))}
        </div>
      )}

      <GoogleMap
        mapContainerClassName={styles.mapContainer}
        center={center}
        zoom={zoom}
        options={mapOptions}
        onLoad={handleMapLoad}
      >
        {showFence &&
          fences !== null &&
          fences.map((fence) => (
            <div key={fence.title}>
              <Polygon
                paths={fence.coords}
                options={{
                  fillColor: fence.color,
                  fillOpacity: 0.3,
                  strokeColor: fence.color,
                  strokeOpacity: 1,
                  strokeWeight: 2,
                  clickable: false,
                  editable: false,
                  draggable: false,
                  geodesic: true,
                  zIndex: 1,
                }}
              />
              <OverlayView
                position={{ lat: fence.center_lat, lng: fence.center_lng }}
                mapPaneName={OverlayView.OVERLAY_LAYER}
              >
                <div className={styles.fenceTitle}>{fence.title}</div>
              </OverlayView>
            </div>
          ))}

        {pins.map((pin) => (
          <div key={pin.id}>
            <OverlayView
              position={{ lat: pin.lat, lng: pin.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className={styles.floatingTitle}>{pin.title}</div>
            </OverlayView>

            <Marker
              position={{ lat: pin.lat, lng: pin.lng }}
              onClick={() => setActiveMarker(pin.id)}
            />

            {activeMarker === pin.id && (
              <InfoWindow
                position={{ lat: pin.lat, lng: pin.lng }}
                onCloseClick={() => setActiveMarker(null)}
              >
                <div className={styles.infoWindowContainer}>
                  <Link href="/histories">
                    <h3 className={styles.infoWindowTitle}>{pin.title}</h3>
                  </Link>
                  <p className={styles.infoWindowDesc}>{pin.description}</p>
                </div>
              </InfoWindow>
            )}
          </div>
        ))}
        {/* {pins.length >= 2 &&
          pins.slice(0, -1).map((pin, index) => (
            <Polyline
              key={`polyline-${index}`}
              path={createArcCurve(
                { lat: pins[index].lat, lng: pins[index].lng },
                { lat: pins[index + 1].lat, lng: pins[index + 1].lng },
                0.02
              )}
              options={{
                strokeColor: "#0059ff",
                strokeOpacity: 0.9,
                strokeWeight: 2,
                icons: [
                  {
                    icon: {
                      path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                      scale: 3,
                      strokeColor: "#0059ff",
                    },
                    offset: "100%",
                  },
                ],
              }}
            />
          ))} */}
      </GoogleMap>
    </div>
  );
}
