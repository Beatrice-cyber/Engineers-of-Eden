const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

if (!indexedDB) {
  console.log("IndexedDB could not be found in this browser.");
}

// 2
const request = indexedDB.open("TensorsDatabase", 2);

request.onerror = function (event) {
  console.error("An error occurred with IndexedDB");
  console.error(event);
};
request.onupgradeneeded = function () {
  //1
  const db = request.result;

  //2
  const tensorStore = db.createObjectStore("tensors", { autoIncrement: true });
  //3
  tensorStore.createIndex("keypoints_axis", ["axis_changed"], {
    unique: false,
  });
};
