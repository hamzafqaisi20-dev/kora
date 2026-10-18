import { ref, computed } from 'vue';

// Default reference coordinates: Riyadh, Saudi Arabia
const userCoords = ref({
  lat: 24.7136,
  lng: 46.6753,
  city: 'الرياض (افتراضي)',
});

const isDetecting = ref(false);
const hasDetected = ref(false);
const locationError = ref(null);

export function useGeolocation() {
  // Haversine formula to compute great-circle distance between two points in km
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return parseFloat(d.toFixed(1));
  };

  const detectLocation = () => {
    isDetecting.value = true;
    locationError.value = null;

    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          userCoords.value = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            city: 'موقعك الفعلي (GPS)',
          };
          isDetecting.value = false;
          hasDetected.value = true;
        },
        (err) => {
          console.warn('Geolocation warning/fallback:', err.message);
          // Fallback to high-fidelity center coordinates in Riyadh
          userCoords.value = {
            lat: 24.7742,
            lng: 46.6380,
            city: 'شمال الرياض (حطين)',
          };
          isDetecting.value = false;
          hasDetected.value = true;
        },
        { timeout: 7000, maximumAge: 60000 }
      );
    } else {
      userCoords.value = {
        lat: 24.7742,
        lng: 46.6380,
        city: 'الرياض (محاكاة)',
      };
      isDetecting.value = false;
      hasDetected.value = true;
    }
  };

  const simulateLocation = (city) => {
    if (city === 'riyadh') {
      userCoords.value = { lat: 24.7742, lng: 46.6380, city: 'الرياض (حطين)' };
    } else if (city === 'jeddah') {
      userCoords.value = { lat: 21.5855, lng: 39.1123, city: 'جدة (الكورنيش)' };
    } else if (city === 'khobar') {
      userCoords.value = { lat: 26.2886, lng: 50.2114, city: 'الخبر (الواجهة)' };
    }
    hasDetected.value = true;
  };

  return {
    userCoords,
    isDetecting,
    hasDetected,
    locationError,
    calculateDistance,
    detectLocation,
    simulateLocation,
  };
}
