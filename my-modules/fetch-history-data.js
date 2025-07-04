export const fetchHistoryData = async (getDocs, collection, db) => {
  let tags = "";

  // reportsコレクションデータを取得
  const querySnapshot = await getDocs(collection(db, "reports"));

  // データをテーブル票の形式に合わせてHTMLに挿入
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);

    let date = new Date(doc.data().date.seconds * 1000)
    let year = date.getFullYear();
    let day = date.toLocaleDateString().slice(5);
    let time = date.toLocaleTimeString().slice(0, -3);

    tags += `<tr><td>${year} ${day} ${time}</td><td>${doc.data().name}</td><td>${doc.data().work}</td><td>${doc.data().comment}</td></tr>`
  });
  document.getElementById("js-history").innerHTML = tags;
};