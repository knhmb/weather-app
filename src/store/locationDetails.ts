import { reactive, watch } from "vue";

interface LocationDetails {
  state: string;
  country: string;
  lat: number;
  lon: number;
}

const stored = localStorage.getItem("locations");
const initialLocations = stored ? JSON.parse(stored) : [];

export const locationStore = reactive({
  locationDetails: null as LocationDetails | null,
  locations: initialLocations,

  setLocation(details: LocationDetails) {
    this.locationDetails = details;
  },

  setLocations(location: any, isMyLocation = false) {
    const exists = this.locations.some((loc: any) => loc.id === location.id);
    if (!exists) this.locations.push({ ...location, isMyLocation });
  },
});

// auto save on update
watch(
  () => locationStore.locations,
  (newVal) => {
    localStorage.setItem("locations", JSON.stringify(newVal));
  },
  { deep: true }
);
