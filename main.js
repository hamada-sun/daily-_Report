import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// 設定情報
const firebaseConfig = {
  apiKey: "AIzaSyCcpWQW_R-ER2CVB3t5dTP67OGsk7FBO2A",
  authDomain: "daily-report-41234.firebaseapp.com",
  projectId: "daily-report-41234",
  storageBucket: "daily-report-41234.firebasestorage.app",
  messagingSenderId: "499933100228",
  appId: "1:499933100228:web:c48f67c40dba892da5b191"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Cloud Firestoreの初期化
const db = getFirestore(app);

// Cloud Firestoreから取得したデータを表示
const fetchHistoryData = async () => {
  let tags = "";

  // reportsコレクションデータを取得
  const querySnapshot = await getDocs(collection(db, "reports"));

  // データをテーブル票の形式に合わせてHTMLに挿入
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    tags += `<tr><td>${doc.data().date}</td><td>${doc.data().name}</td><td>${doc.data().work}</td><td>${doc.data().comment}</td></tr>`
  });
  document.getElementById("js-history").innerHTML = tags;
}

// Cloud Firestoreから取得したデータを表示する
if(document.getElementById("js-history")) {
  fetchHistoryData(getDocs, collection, db);
}

// Cloud Firestoreにデータを送信する
const submitData = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  try {
    const docRef = await addDoc(collection(db, "reports"), {
      date: new Date(),
      name: formData.get("name"),
      work: formData.get("work"),
      Comment: formData.get("comment")
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Cloud Firestoreにデータを送信する
if(document.getElementById("js-form")) {
  document.getElementById("js-form").addEventListener("submit", (e) => submitData(e));
};