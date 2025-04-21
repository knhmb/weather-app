import { reactive, watch } from "vue";

interface LocationDetails {
  state: string;
  country: string;
  lat: number;
  lon: number;
}

const stored = localStorage.getItem("locations");
const initialLocations = stored ? JSON.parse(stored) : [];

const storedLocationDetails = localStorage.getItem("storedLocationDetails");
const dataStored = storedLocationDetails
  ? JSON.parse(storedLocationDetails)
  : [];

export const locationStore = reactive({
  // locationDetails: null as LocationDetails | null,
  locationDetails: dataStored,
  locations: initialLocations,

  setLocation(details: LocationDetails) {
    this.locationDetails = details;
  },

  setLocations(location: any, isMyLocation = false) {
    const exists = this.locations.some((loc: any) => loc.id === location.id);
    if (!exists) this.locations.push({ ...location, isMyLocation });
  },

  deleteLocation(id: number) {
    this.locations = this.locations.filter((loc: any) => loc.id !== id);
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

watch(
  () => locationStore.locationDetails,
  (newVal) => {
    localStorage.setItem("storedLocationDetails", JSON.stringify(newVal));
  },
  { deep: true }
);
