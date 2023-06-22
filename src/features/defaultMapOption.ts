export const mapContainerStyle = {
  width: '100%',
  height: "100vh",
}

interface MapOptions {
  mapTypeId: string,
  zoom: number,
  center: { lat: number, lng: number },
}

export const mapOptions = {
  zoom: 15,
  center: { lat: 36.063053704526226, lng: 136.22288055523217 },
}  
