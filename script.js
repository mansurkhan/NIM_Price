// Your Firebase config from Project Settings

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtAV0uL-NGu8ZI_0lQYQSBdsTxKaXmBZM",
  authDomain: "webpage-d8959.firebaseapp.com",
  databaseURL: "https://webpage-d8959-default-rtdb.firebaseio.com",
  projectId: "webpage-d8959",
  storageBucket: "webpage-d8959.firebasestorage.app",
  messagingSenderId: "321764409694",
  appId: "1:321764409694:web:1a408bf3b2fb8daf338fcf",
  measurementId: "G-Q2C38HDKKV"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.database();

document.getElementById("addBtn").onclick = () => {
  document.getElementById("modal").style.display = "flex";
};

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function addVehicle() {
  const number = document.getElementById("number").value;
  const price = document.getElementById("price").value;
  const model = document.getElementById("model").value;
  const ownerSrNumber = document.getElementById("ownerSrNumber").value;

  if (!number) return alert("Vehicle Number is required");

  const data = { number, price, model, ownerSrNumber };
  db.ref("vehicles/" + number.toLowerCase()).set(data).then(() => {
    closeModal();
    loadVehicles();
  });
}

function searchVehicle() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  if (!query) return loadVehicles();

  db.ref("vehicles/" + query).once("value", (snapshot) => {
    const val = snapshot.val();
    const list = document.getElementById("vehicleList");
    list.innerHTML = "";

    if (val) {
      list.innerHTML = renderVehicle(val);
    } else {
      list.innerHTML = "<p>No matching vehicle found.</p>";
    }
  });
}

function loadVehicles() {
  db.ref("vehicles").once("value", (snapshot) => {
    const data = snapshot.val();
    const list = document.getElementById("vehicleList");
    list.innerHTML = "";

    if (data) {
      Object.values(data).forEach((v) => {
        list.innerHTML += renderVehicle(v);
      });
    } else {
      list.innerHTML = "<p>No vehicles found. Add your first vehicle!</p>";
    }
  });
}

function renderVehicle(v) {
  return `
    <div class="vehicle">
      <strong>${v.number}</strong><br />
      Price: ${v.price}<br />
      Model: ${v.model}<br />
      Owner SR Number: ${v.ownerSrNumber}
    </div>
  `;
}

window.onload = loadVehicles;
