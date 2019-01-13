var config = {
    apiKey: "AIzaSyAZHCLuovX2oNhccuxjetkHNgAcrWcZLGo",
    authDomain: "dhisna-ac7e0.firebaseapp.com",
    databaseURL: "https://dhisna-ac7e0.firebaseio.com",
    projectId: "dhisna-ac7e0",
    storageBucket: "dhisna-ac7e0.appspot.com",
    messagingSenderId: "1079389260336"
};
firebase.initializeApp(config);

function showdetails(branch, event) {
    var database = firebase.database().ref().child('events/' + branch + '/' + event);
    var det = document.getElementById('detail-content');
    var rul = document.getElementById('rules-content');
    var cap = document.getElementById('eve-caption');
    var fee = document.getElementById('eve-fee');
    var on1 = document.getElementById('org1-name');
    var op1 = document.getElementById('org1-ph');
    var on2 = document.getElementById('org2-name');
    var op2 = document.getElementById('org2-ph');
    var storage = firebase.storage();
    database.once('value', function (snap) {
        document.getElementById('eve-name').innerHTML = event;
        cap.innerHTML = snap.val().caption;
        det.innerText = snap.val().description;
        rul.innerText = snap.val().rules;
        fee.innerHTML = "REGISTRATION FEE: " + snap.val().fee;
        on1.innerHTML = snap.val().coordinators.crd1.name;
        op1.innerHTML = snap.val().coordinators.crd1.number;
        on2.innerHTML = snap.val().coordinators.crd2.name;
        op2.innerHTML = snap.val().coordinators.crd2.number;
        insta_link = snap.val().insta;
        if (!insta_link){
            reg = document.getElementById("registerbtn");
            reg.parentNode.removeChild(reg);
            fee.parentNode.removeChild(fee);
        }
        storage.ref('events/' + branch + "/" + event + "/cr1.jpg").getDownloadURL().then(function (url) {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:

            // Or inserted into an <img> element:
            console.log(url);
            var org = document.getElementById('org1-img');
            org.src = url;
        }).catch(function (error) {
            console.log(error)
            // Handle any errors
        });
        storage.ref('events/' + branch + "/" + event + "/crd2.jpg").getDownloadURL().then(function (url) {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:

            // Or inserted into an <img> element:
            console.log(url);
            var org = document.getElementById('org2-img');
            org.src = url;
        }).catch(function (error) {
            console.log(error)
            // Handle any errors
        });
    }).then(function () {
        load = document.getElementById("loading")
        load.parentNode.removeChild(load);

    });


}

function pay() {
    firebase.auth().onAuthStateChanged(function (user) {
        // if (user) {
        //     firebase.database().ref('/events/' + branch + '/' + event).once('value').then(function (snapshot) {
        //         eve = snapshot.val();
        //         insta_link = eve.insta;
        //         insta_link += "?data_name=";
        //         uuid = user.uid;
        //         insta_link += uuid;
        //         insta_link += "&data_readonly=data_name";
        //         document.location = insta_link;
        //
        //
        //     });
        // }
        // else {
        //     document.location = "../../signup"
        // }
        firebase.database().ref('/events/' + branch + '/' + event).once('value').then(function (snapshot) {
            eve = snapshot.val();
            insta_link = eve.insta;
            console.log(insta_link)
            document.location = insta_link;

        });
    });
}