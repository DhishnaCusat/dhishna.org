var db = firebase.firestore();

var id = '';

db.collection("display").doc("reg2")
    .onSnapshot(function (doc) {
        var id = doc.data().id;
        db.collection("Users2").doc(id).get()
            .then(function (doc) {
                person = doc.data();
                person['id'] = doc.id;
                if (doc.exists) {
                    console.log("Document data:", doc.data().name);
                    document.getElementById("name").innerHTML = "" + doc.data().name;
                } else {
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
    });

function addName(){
    console.log(person);
    db.collection("final").add(person).then(doc => {
        console.log('dbadd');
        alert('Confirmed');
    })

}
