var firebaseConfig = {
    apiKey: "AIzaSyDSONbyBW4lcRxOxj6vyXorgKImq5s-elw",
    authDomain: "registration-ef370.firebaseapp.com",
    databaseURL: "https://registration-ef370.firebaseio.com",
    projectId: "registration-ef370",
    storageBucket: "registration-ef370.appspot.com",
    messagingSenderId: "569989941430",
    appId: "1:569989941430:web:67b7d73298a11449c5be17"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var firestore = firebase.firestore();

var docRef = firestore.collection("final");

list = [];

// display winner
const outputHeader = document.getElementById('luckyWinner');
var winnerButton = document.getElementById('winner');

function getCollection() {
	docRef.get().then(function(coll) {
		coll.forEach(doc => {
			list.push(doc.data());
		})
	})
}

// get list
getCollection();

winnerButton.addEventListener('click', function() {
	
	var winIndex = Math.floor(Math.random() * (list.length));
	console.log(winIndex); //test

	var luckyYou = list[winIndex];
	console.log(luckyYou.name); //test

	list.splice(winIndex, 1);

    outputHeader.innerText = luckyYou.name;
	});

/*function getEightLucky() {
	//console.log("func called");
	for (var i = 0; i < 8; i++) {
		var winIndex = Math.floor(Math.random() * (list.length));
	//	console.log(winIndex); //test

		var luckyYou = list[winIndex];
		luckyList.push(luckyYou);
	//	console.log(luckyYou.name); //test
		luckyName.push(luckyYou.name);

		list.splice(winIndex, 1);
	}
	//	console.log(luckyList);

		for (var i in luckyName) {
			var node = document.createElement("LI");
			console.log(luckyName[i])
			var textnode = document.createTextNode(luckyName[i]);
			node.appendChild(textnode);
			document.getElementById("myList").appendChild(node);
		}
		// outputHeader.innerText = luckyYou.name;
}
*/