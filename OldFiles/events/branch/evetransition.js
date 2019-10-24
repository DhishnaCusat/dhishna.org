var config = {
    apiKey: "AIzaSyAZHCLuovX2oNhccuxjetkHNgAcrWcZLGo",
    authDomain: "dhisna-ac7e0.firebaseapp.com",
    databaseURL: "https://dhisna-ac7e0.firebaseio.com",
    projectId: "dhisna-ac7e0",
    storageBucket: "dhisna-ac7e0.appspot.com",
    messagingSenderId: "1079389260336"
};
firebase.initializeApp(config);

// var branch = localStorage['branch'];
// localStorage.removeItem( 'branch' );
//
// Clear the localStorage


function showevents(branch) {
    box = document.getElementsByClassName("container")[0];
    branches = document.createElement("div");
    branches.setAttribute("class", "row sec-container");

    storage = firebase.storage();
    var database = firebase.database().ref().child('events/');

    var sn = localStorage.getItem("events");
    if(sn){
        snap = JSON.parse(sn);
        console.log(snap[branch]);
        branchdata(snap[branch]);
        box.appendChild(branches);
        load = document.getElementById("loading");
        load.parentNode.removeChild(load);

        database.once('value', function (snap) {
            localStorage.setItem("events", JSON.stringify(snap));
        })
    }
    else {
        database.once('value', function (snap) {
            branchdata(snap.val()[branch]);

            box.appendChild(branches);
        }).then(function () {
            load = document.getElementById("loading")
            load.parentNode.removeChild(load);

        });
    }
}

function branchdata(snap) {
    number = 0;
    Object.keys(snap).forEach(function (snapshot) {
        var div = document.createElement('a');
        div.setAttribute("class", "col-lg-4 ind-events col-xs-12 ");


        div.id = snapshot;

        div.setAttribute("href", "../details/?branch="+branch+"&event="+snapshot);
        if(snap[snapshot].registration==="open") {
            branches.appendChild(div);
            number += 1;
            if (number === 3) {
                number = 0;
                box.appendChild(branches);
                branches = document.createElement("div");
                branches.setAttribute("class", "row sec-container");

            }
        }
        var im = document.createElement('img');
        img = localStorage.getItem(snapshot);
        console.log(img);
        if(img){
            im.src = img;
        }
        else {
            storage.ref('events/' + branch + "/" + snapshot + "/event.svg").getDownloadURL().then(function (url) {
                // `url` is the download URL for 'images/stars.jpg'

                // This can be downloaded directly:

                // Or inserted into an <img> element:
                console.log("hello");
                im.src = url;
                localStorage.setItem(snapshot.key, url);
            }).catch(function (error) {
                console.log(error)
                // Handle any errors
            });
        }
        div.appendChild(im)
    });


}


