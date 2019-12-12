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

var docRef = firestore.collection("Users1");

document
	.getElementById('registrationform')
	.addEventListener('submit', formSubmit);

function formSubmit(e) {
	e.preventDefault();

	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var phone = document.getElementById("phone").value;
	var timestamp = Date();

	console.log(name);

	docRef.add({
		name : name,
		phone : phone,
		email : email,
		timestamp : timestamp
	}).then(function(doc){
		console.log("Message saved");

		firestore.collection('display').doc('reg1').set({
			name : name,
			phone : phone,
			email : email,
			timestamp : timestamp,
			id: doc.id,
		}).then(function () {
			console.log('pushed to display table');
			window.location.href = "fin.html";
		}).catch(function(error) {
			console.log("Got an error", error);
		})
	}).catch(function(error) {
		console.log("Got an error: ", error);
	});

	// Redirect	
}
