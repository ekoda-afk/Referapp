const firebaseConfig = {
  apiKey: "AIzaSyAXQjkmQgwNkKNO2OJP8_jIdi9EMnRb15",
  authDomain: "miniapp-f1bd1.firebaseapp.com",
  databaseURL: "https://miniapp-f1bd1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "miniapp-f1bd1",
  storageBucket: "miniapp-f1bd1.firebasestorage.app",
  messagingSenderId: "801011152023",
  appId: "1:801011152023:web:3095f6a1c75afe664f65d2"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const tg = Telegram.WebApp;
const user = tg.initDataUnsafe.user;
const userId = user.id;
const userName = user.first_name;

document.getElementById("name").innerText = userName;

const userRef = db.ref("users/" + userId);

userRef.once("value").then(snapshot => {
  if (snapshot.exists()) {
    document.getElementById("points").innerText = snapshot.val().points;
  } else {
    userRef.set({ name: userName, points: 0 });
    document.getElementById("points").innerText = 0;
  }
});

function copyReferral() {
  const link = `https://t.me/YourBot?start=${userId}`;
  navigator.clipboard.writeText(link);
  alert("Referral link copied!");
}
