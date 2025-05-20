import { useState, useCallback } from 'react';
import type { GeoError } from '../store/services/types';

interface UseDeviceLocationResult {
  location: { lat: number; lon: number } | null;
  locationError: GeoError | null;
  isLocating: boolean;
  fetchLocation: (highAccuracy?: boolean) => Promise<void>; // Function to trigger fetch
}

const useDeviceLocation = (): UseDeviceLocationResult => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [locationError, setLocationError] = useState<GeoError | null>(null);
  const [isLocating, setIsLocating] = useState(true);

  // Wrap the geolocation logic in a Promise to use async/await
  const getDeviceLocationPromise = (highAccuracy: boolean = false) => {
      if (!navigator.geolocation) {
        const error: GeoError = {
          code: 0, // Custom code for unsupported
          message: 'Geolocation is not supported by your browser',
        };
        return error;
      }
      navigator.geolocation.getCurrentPosition(
        success,
        error,
        {
          enableHighAccuracy: highAccuracy,
          timeout: 10000, // 10 seconds timeout
          maximumAge: 180, // Don't use cached location
        }
      );
  };

  const success = (pos: GeolocationPosition) => {
    setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
    setLocationError(null); // Ensure error is null on success
    setIsLocating(false);
  }
  const error = (err: any) => {
    setLocation(null); // Ensure location is null on error
    setLocationError(err as GeoError);
  }
  // Function to trigger the location fetch
  const fetchLocation = useCallback(async (highAccuracy: boolean = false) => {
    setIsLocating(true);
    setLocationError(null); // Clear previous error
    try {
      getDeviceLocationPromise(highAccuracy);
    } catch (err) {
      setLocation(null); // Ensure location is null on error
      setLocationError(err as GeoError);
    } finally {
      setIsLocating(false);
    }
  }, []); // Empty dependency array as fetchLocationPromise is defined inside and doesn't change

  return {
    location,
    locationError,
    isLocating,
    fetchLocation,
  };
};

export default useDeviceLocation;
