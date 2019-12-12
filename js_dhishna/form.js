
// Your web app's Firebase configuration
   var firebaseConfig = {
     apiKey: "AIzaSyAFEIc_Po4HPQ7mOg1SSL_lg56mJw0qAcE",
     authDomain: "campus-ambassador-b3c7a.firebaseapp.com",
     databaseURL: "https://campus-ambassador-b3c7a.firebaseio.com",
     projectId: "campus-ambassador-b3c7a",
     storageBucket: "campus-ambassador-b3c7a.appspot.com",
     messagingSenderId: "714049994844",
     appId: "1:714049994844:web:6a8c6363605c9b4bfc2699",
     measurementId: "G-6JS999HH5P"
   };
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
   firebase.analytics();


$(document).ready(function() {
	console.log("document ready");

	var db = firebase.firestore();

	$("#ca-form").submit(function() {
		var name = $("#name").val();
		var email = $("#email").val();
		var phone = $("#phone").val();
		var college = $("#college").val();
		var sem = $("#semester").val();
		var exp = $("#exp").val();
		var timestamp = Date();
		var why = $("#why").val();
		$('#btn1').html("Submitting...")

		db.collection("ca").add({
			name: name.trim(),
			email : email.trim(),
			phone : phone.trim(),
			college : college.trim(),
			sem : sem.trim(),
			exp : exp.trim(),
			why : why.trim(),
			timestamp : timestamp
		}).then(function(docRef) {
			console.log("Message saved");
			window.location.href = "fin.html";
		}).catch(function(err) {
			console.log("Got an error: ", err);
			alert("Error submitting data");
		});

		return false;
	});	
});