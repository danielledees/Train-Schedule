// Initialize Firebase
var config = {
    apiKey: "AIzaSyAkYFbL1OSJ4gDKVYwFjn_uDV4KZwlyylg",
    authDomain: "deesrutgers1213.firebaseapp.com",
    databaseURL: "https://deesrutgers1213.firebaseio.com",
    projectId: "deesrutgers1213",
    storageBucket: "deesrutgers1213.appspot.com",
    messagingSenderId: "830235913636"
  };
  firebase.initializeApp(config);

  //var to reference database
  var database = firebase.database();

  console.log("this works");

  //Adds train when submit button is clicked

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    //user input

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var freq = $("#freq-input").val().trim();

    var newTrain = {
      train: trainName,
      destination: destination,
      first: firstTrain,
      freq: freq,
    };
    //pushes user input to database
    database.ref().push(newTrain);

    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.freq);

    alert("new train added nicely");

    //clear all text boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#freq-input").val("");

  })