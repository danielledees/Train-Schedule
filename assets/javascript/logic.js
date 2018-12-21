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
  var newDest = $("#destination-input").val().trim();
  var firstTrain = $("#first-train-input").val().trim();
  var newFreq = $("#freq-input").val().trim();

  //object to hold new train input

  var newTrain = {
    train: trainName,
    destination: newDest,
    first: firstTrain,
    freq: newFreq,
  };

  //pushes user input to database
  database.ref().push(newTrain);

  console.log(newTrain.train);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.freq);


  //clear all text boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#freq-input").val("");

});


//keeps track of every new train added
database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val());

  //store in variable
  var trainName =  snapshot.val().train;
  var newDest =  snapshot.val().destination;
  var firstTrain  = snapshot.val().first;
  var newFreq = snapshot.val().freq;
  
   //figure out and format time
  //split time between hours and minutes 14:13 becomes [14,13]
  var timeSplit = firstTrain.split(':');

  var startTime = moment().hours(timeSplit[0]).minutes(timeSplit[1]);

  //console says subtract one year isn't a function but it's working ?
  var formattedTrainTime = startTime.subtract(1, "years");

  //max moment is time now
  var maxMoment = moment.max(moment(), formattedTrainTime);

  var timeMinutes;
  var timeArrival;

  //if the time now is same as new train time entered
  if(maxMoment === formattedTrainTime) {
    timeArrival = formattedTrainTime.format("hh:mm A");
    timeMinutes = formattedTrainTime(moment(), "minutes");
    
    //if not tells calculates how many minutes left
  } else {
    var differenceTimes = moment().diff(formattedTrainTime, "minutes");
    var timeRemainder = differenceTimes % newFreq
    timeMinutes = newFreq - timeRemainder
    timeArrival = moment().add(timeMinutes, "m").format("hh:mm A");
  }
  //print new train info
  console.log(trainName);
  console.log(newDest);
  console.log(firstTrain);
  console.log(newFreq);
  console.log(timeArrival, "This time should be formatted");


//create new row
var newRow = $("<tr>").append(
  $("<th>").text(trainName),
  $("<td>").text(newDest),
  $("<td>").text(newFreq),
  $("<td>").text(timeArrival),
  $('<td>').text(timeMinutes),
 
  
);

//update html with new row
$("#train-table > tbody").append(newRow);


});

