var config = {
    apiKey: "AIzaSyAZHCLuovX2oNhccuxjetkHNgAcrWcZLGo",
    authDomain: "dhisna-ac7e0.firebaseapp.com",
    databaseURL: "https://dhisna-ac7e0.firebaseio.com",
    projectId: "dhisna-ac7e0",
    storageBucket: "dhisna-ac7e0.appspot.com",
    messagingSenderId: "1079389260336"
};
firebase.initializeApp(config);

function putindiv() {
    box = document.getElementsByClassName("container")[0];
    branches = document.createElement("div");
    branches.setAttribute("class", "row sec-container");
    tp = document.getElementById("event1");

    var database = firebase.database().ref().child('events/');
    number = 0;

    var storage = firebase.storage();

    database.once('value', function (snap) {
        snap.forEach(function (snapshot) {
            var div = document.createElement('a');
            div.setAttribute("class", "col-lg-4 ind-events col-xs-12 ");
            div.id = snapshot.key;
            div.setAttribute("href", "branch/?branch="+snapshot.key);

            if(snapshot.key === "co" || snapshot.key === "pre" || snapshot.key === "ws"){
                tp.appendChild(div)
            }
            else if (snapshot.key==="acc"){ //edit this for full events
                number += 1;
                branches.appendChild(div);
                if (number === 3) {
                    number = 0;
                    box.appendChild(branches);
                    branches = document.createElement("div");
                    branches.setAttribute("class", "row sec-container");

                }
            }
            var im = document.createElement('img');
            im.setAttribute("href", "/branch/?branch="+snapshot.key);
            img = localStorage.getItem(snapshot.key);
            console.log(img);
            if(img){
                im.src = img;
            }
            else {
                storage.ref('events/' + snapshot.key + "/branch.svg").getDownloadURL().then(function (url) {
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
        box.appendChild(branches);
    }).then(function () {
        load = document.getElementById("loading")
        load.parentNode.removeChild(load);

    })
    ;

}
