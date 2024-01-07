const container = document.getElementById("map");
const options = {
  center: new kakao.maps.LatLng(37.3981898, 126.6479984),
  level: 6,
};
const map = new kakao.maps.Map(container, options);
const markerPosition = new kakao.maps.LatLng(37.3981898, 126.6479984);
const marker = new kakao.maps.Marker({
  position: markerPosition,
});
marker.setMap(map);

const movemap = () => {
  window.location.href = "localhost:3000/map";
};

const moveguest = () => {
  window.location.href = "localhost:3000/guest";
};
