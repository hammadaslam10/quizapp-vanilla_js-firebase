const firebaseConfig = {
  apiKey: "AIzaSyDikSQ4so2xhQfYSZDB7oUBmyHL5neQVrg",
  authDomain: "quiz-application-62c3e.firebaseapp.com",
  databaseURL: "https://quiz-application-62c3e-default-rtdb.firebaseio.com",
  projectId: "quiz-application-62c3e",
  storageBucket: "quiz-application-62c3e.appspot.com",
  messagingSenderId: "735923061897",
  appId: "1:735923061897:web:1116e21f87dab8ebc37258"
};
var change={
scoreboard:0,
id:"sd",
}
  
  



questionsArray = [
  {
      question: "Why so JavaScript and Java have similar name?",
      answer: 2,
      options: [
          "JavaScript is a stripped-down version of Java",
          "JavaScript's syntax is loosely based on Java's",
          "They both originated on the island of Java",
          "None of the above",
      ]
  },
  {
      question: "When a user views a page containing a JavaScript program, which machine actually executes the script?",
      answer: 1,
      options: [
          "The User's machine running a Web browser",
          "The Web server",
          "A central machine deep within Netscape's corporate offices",
          "None of the above",
      ]
  },
  {
      question: "______ JavaScript is also called client-side JavaScript.",
      answer: 2,
      options: [
          "Microsoft",
          "Navigator",
          "LiveWire",
          "Native",
      ]
  },
  {
      question: "__________ JavaScript is also called server-side JavaScript.",
      answer: 3,
      options: [
          "Microsoft",
          "Navigator",
          "LiveWire",
          "Native",
      ]
  },
  {
      question: "What are variables used for in JavaScript Programs?",
      answer: 1,
      options: [
          "Storing numbers, dates, or other values",
          "Varying randomly",
          "Causing high-school algebra flashbacks",
          "None of the above",
      ]
  },
  {
      question: "_____ JavaScript statements embedded in an HTML page can respond to user events such as mouse-clicks, form input, and page navigation.",
      answer: 1,
      options: [
          "Client-side",
          "Server-side",
          "Local",
          "Native",
      ]
  },
  {
      question: "Which of the following can't be done with client-side JavaScript?",
      answer: 3,
      options: [
          "Validating a form",
          "Sending a form's contents by email",
          "Storing the form's contents to a database file on the server",
          "None of the above",
      ]
  },
  {
      question: "Which of the following are capabilities of functions in JavaScript?",
      answer: 3,
      options: [
          "Return a value",
          "Accept parameters and Return a value",
          "Accept parameters",
          "None of the above",
      ]
  },
  {
      question: "Which of the following is not a valid JavaScript variable name?",
      answer: 1,
      options: [
          "2names",
          "_first_and_last_names",
          "FirstAndLast",
          "None of the above",
      ]
  },
  {
      question: "Which of the following attribute can hold the JavaScript version?",
      answer: 1,
      options: [
          "LANGUAGE",
          "SCRIPT",
          "VERSION",
          "None of the above",
      ]
  }
]

var app = firebase.initializeApp(firebaseConfig);
var count = 0;
var score =0;
 
var options = document.getElementsByName("option")
function calc(){
 
  for(var i = 0; i < options.length; i++){
      if(options[i].checked){
          var ans = options[i].value
          
          // score++
          // // alert(score)
          if(i == questionsArray[count].answer){
            score++
             console.log(score)
         }
         options[i].checked = false
          
      }
  }
 
  
} 


let btn = document.querySelector("button");

btn.addEventListener("click", active);

function active() {
  var change=document.getElementById("submission")
  if(count==questionsArray.length){
    change.innerHTML="submit"
    
    btn.classList.toggle("is_active");

  }

  
}

function showques(e) {
  var quest = document.getElementById("ques")
  quest.innerHTML = "Q" + (e + 1) + ")" + questionsArray[e].question
  var options = document.getElementsByClassName("option");
  for (var i = 0; i < options.length; i++) {
    options[i].innerHTML = questionsArray[e].options[i]
  }
}
function nextques(){
  var optns = document.getElementsByName("option")
    var btn = document.getElementById("next_btn")
    var cond = false;
    for(var i = 0; i < optns.length; i++){
        if (optns[i].checked == true){
          calc()
       
          cond = true
        }
    }
    if(cond){
    if(count < questionsArray.length-1){
        count++
        showques(count)
        }
        else{
            alert("You have secured " + score + " marks")
            app.database().ref('/userdetails').child(change.id).update({ score: score })
           
            change.scoreboard=score;
alert(change.scoreboard)
alert(change.id)
window.open("./main.html")
          }
    }
}

const timer = document.getElementById('stopwatch');

var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;

function startTimer() {
  if (stoptime == true) {
    stoptime = false;
    timerCycle();
  }
}
function stopTimer() {
  if (stoptime == false) {
    stoptime = true;
  }
}

function timerCycle() {
  if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if (hr < 10 || hr == 0) {
      hr = '0' + hr;
    }
    if (sec == 20) {
      stopTimer()
      
      alert("over")
      window.close("./main.html")
    }
    timer.innerHTML = hr + ':' + min + ':' + sec;

    setTimeout("timerCycle()", 1000);
  }
}

function resetTimer() {
  timer.innerHTML = '00:00:00';
}






function getUserData() {
  app.database().ref('/users').on("child_added", function (data) {
    console.log(data)
    console.log(data.key)
    console.log(data.val())
  })
}


function deleteData() {
  app.database().ref('/').remove()
}


app.database().ref('/userdetails').on("child_added",function(data){
  console.log(data.parentNode)
  change.id=data.key;
  console.log(data.key)
  console.log()

})
 
 
function verify(){
  var firstname=document.getElementById('fname').value
  var lastname = document.getElementById('lname').value
  var age=document.getElementById('age').value
  var fs=document.getElementById('fname')

  var obj={
    firstname:firstname,
    lastname:lastname,
    score:0,
    age:age,
    
   
    
      
    }
    alert("you have only 20 seconds to complete the quiz")
       app.database().ref('/').child('userdetails').push(obj)
  
       window.open("./main.html")
       .then(function(success){
    console.log(success,'success')
       })
       .catch(function(err){
    console.log(err,'err')
       })
  }

