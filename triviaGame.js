/*
 Memphis:
Aidan doesn’t take physics but acts like he does: T
Global warming is a lie: F
Bethesda made the biggest flop in gaming history:T
PC isn’t master race: F
Aidan calls any sport with a ball in it sports ball:T
Aidan thinks PC isn’t master race:F
Aidan is Extreme big brain:F
Komoto best code editor:T
Windows 10 is good:F
 Euan hates on Komoto because why not:T
 */
var keys = document.querySelector('.ultdiv');
var checkedBox = 0.0;

var display = document.querySelector('.display');
var scoreD = document.querySelector('.score');
console.log(display.textContent)
var dochandeler = document.getElementById("textbox");

var bowenTrivia = [{statement: "Bowen wears glasses", value: true}, {statement: "Aidan is only tall because he's using stilts", value: false}, {statement: "I am sus", value: true}, {statement: "Euan and Memphis are secretly twins", value: false}, {statement: "We are doing computer science stuff", value: true}, {statement: "Global warming is a conspiracy", value: false}, {statement: "Birds work for the bourgeoisie", value: true}, {statement: "The Earth is flat", value: false}, {statement: "2020 is a great year", value: false}, {statement: "Aidans uses a wig", value: false}];

function randomNumber(min, max) { //a helper function to generate a new, random number
      return Math.floor(Math.random() * (max - min) + min); //round the Math.random down and give it a range from the initial (which is the first number in the array) to the last number (length-1)
  }

  function randomList(length){ // length is just a number
    var list = []; // create an empty array to push things into
    for (var i = 0; list.length < length; i++) { //go through the number every time/breaks it down (5 = 0,1,2,3,4)
      list.push(i); // push the obtained number into the empty array to store it
    }
    var retArr = []; // create another empty array so that I can push numbers (made random) into this one to return
    while (list.length > 0) { //loops so that we make sure that we removed everything from list, made it random, and pushed it into the new array.
      var randNum = randomNumber(list[0], list.length-1); //pulling our helper function so it can randomize numbers within a specific range
      var remove = list.indexOf(randNum); //identifying and storing a random number to use in splice so that we can pull it
      retArr.push(list.splice(remove, 1)); //find the number to remove the element in the array (we only want to remove 1) and push it to a new array
    }
    return retArr; //return the new randomized list.
  }

  function makeAnd (first, second) {
    var retObj = {statement: first.statement + " and " + second.statement, value: false};
    if (first.value && second.value) {
      retObj.value = true;
      return retObj;
    }
    else {
      return retObj;
    }
  }

  function makeOr (first, second) {
    var retObj = {statement: first.statement + " or " + second.statement, value: false};
    if (first.value || second.value) {
      retObj.value = true;
      return retObj;
    }
    else {
      return retObj;
    }
  }

  function makeNot(object){
   var retObj = {statement:"It is not the case that "};
   retObj.statement += object.statement;
   retObj.value = !object.value;
   return retObj;
 }

  function makeComplex (list, maxlen=5) {
    var randomizer = randomList(list.length); //scrambles up the list in random order
    var chance = randomNumber(0,5); //gives it a 25% chance so that the length of each statement can vary from 2-5 statements
    var notTrue = false; //tracker valueean
    if (0 == chance) { //each if statement is a chance so that the length can vary (see idea for maxlen=5)
      var ran = randomizer.slice(0,2); //I only keep the first two random arrays
      var part1 = list.splice(ran[0],1); //I use that first two random array (say [9],[3]) to index and take statements from list
      var part2 = list.splice(ran[1],1);
      var list = part1.concat(part2); //this is what I care about
    }
    if (1 == chance) {
      var ran = randomizer.slice(0,3); //now I only take the first three arrays from the scrambled list
      var part1 = list.splice(ran[0],1); //do pretty much the same thing as above
      var part2 = list.splice(ran[1],1);
      var part3 = list.splice(ran[3],1);
      var concat1 = part1.concat(part2);
      var list = concat1.concat(part3);
    }
    if (2 == chance) {
      var ran = randomizer.slice(0,4); //take the first 4 things in the randomized array
      var part1 = list.splice(ran[0],1); //take the statements from list
      var part2 = list.splice(ran[1],1);
      var part3 = list.splice(ran[3],1);
      var part4 = list.splice(ran[4],1);
      var concat1 = part1.concat(part2);
      var concat2 = part3.concat(concat1);
      var list = concat2.concat(part4); //add them to each other to make the same array.
    }
    if (3 == chance) {
      var ran = randomizer.slice(0,4); //first 5 (the max length) and the below is the same as the one above but with one extra step
      var part1 = list.splice(ran[0],1);
      var part2 = list.splice(ran[1],1);
      var part3 = list.splice(ran[3],1);
      var part4 = list.splice(ran[4],1);
      var part5 = list.splice(ran[5],1);
      var concat1 = part1.concat(part2);
      var concat2 = part3.concat(concat1);
      var concat3 = part4.concat(concat2);
      var list = concat3.concat(part5);
    }
    if (4 == chance) {
      var ran = randomizer.slice(0,4);
      var part1 = list.splice(ran[0],1);
      var part2 = list.splice(ran[1],1);
      var part3 = list.splice(ran[3],1);
      var part4 = list.splice(ran[4],1);
      var part5 = list.splice(ran[5],1);
      var part6 = list.splice(ran[6],1);
      var concat1 = part1.concat(part2);
      var concat2 = part3.concat(concat1);
      var concat3 = part4.concat(concat2);
      var concat4 = part5.concat(concat3);
      var list = concat2.concat(part6);
    }
    var chanceAgain = randomNumber(0,2); //making another random chance to combine the statements in list using either makeAnd or makeOr (50% chance)
    if (chanceAgain == 0) { //now plug in makeAnd
      if (list.length == 2) {
        var retList = makeAnd(list[0], list[1]); //makes all the statements into one big statement with ands in between each
      }
      if (list.length == 3) {
        var combine = makeAnd(list[0], list[1]); //makes all the statements into one big statement with ands in between each
        var retList = makeAnd(combine,list[2]);
      }
      if (list.length == 4) {
        var combine = makeAnd(list[0], list[1]); //makes all the statements into one big statement with ands in between each
        var combine1 = makeAnd(combine,list[2]);
        var retList = makeAnd(combine1, list[3]);
      }
      if (list.length == 5) {
        var combine = makeAnd(list[0], list[1]); //makes all the statements into one big statement with ands in between each
        var combine1 = makeAnd(combine,list[2]);
        var combine2 = makeAnd(combine1, list[3]);
        var retList = makeAnd(combine2, list[4]);
      }
    }
    if (chanceAgain == 1) { //now plug in makeOr
      if (list.length == 2) {
        var retList = makeOr(list[0], list[1]); //makes all the statements into one big statement with ors in between each
      }
      if (list.length == 3) {
        var combine = makeOr(list[0], list[1]); //makes all the statements into one big statement with ors in between each
        var retList = makeOr(combine,list[2]);
      }
      if (list.length == 4) {
        var combine = makeOr(list[0], list[1]); //makes all the statements into one big statement with ors in between each
        var combine1 = makeOr(combine,list[2]);
        var retList = makeOr(combine1, list[3]);
      }
      if (list.length == 5) {
        var combine = makeOr(list[0], list[1]); //makes all the statements into one big statement with ors in between each
        var combine1 = makeOr(combine,list[2]);
        var combine2 = makeOr(combine1, list[3]);
        var retList = makeOr(combine2, list[4]);
      }
    }
    var chance = randomNumber(0,4); //rerolling the dice again, but this time for a 25% chance on whether to negate the whole statement from list or not.
    if (chance == 2) {
      notTrue = true;
    }else {
      notTrue = false;
    }
    if (notTrue == true) {
      retList = makeNot(retList);
    }
    return retList; //final statement which gives a giant a small statement of ors ands or nots
  }


var stateArr = makeComplex(bowenTrivia);
var index = 0;
var score= 0;
scoreD.textContent = "Score : " + score;
display.textContent = stateArr.statement;
keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    var key = e.target;
    var action = key.dataset.action;
    var keyContent = key.textContent;
    var displayed = display.textContent;
    //simply resets the page
    if (action === "reset") {
      location.reload()
    }
    console.log(stateArr.value);
    if (action === "true") {
      if (stateArr.value === true) {
        score += 1;
      }else{
        score -= 1;
      }
      index++;
      stateArr = makeComplex(bowenTrivia);
       display.textContent = stateArr.statement;
        index = 0;
        stateArr = makeComplex(bowenTrivia);
    }

    if (action === "false") {
      if (stateArr.value === false) {
        score+=1;
      }
      else{
        score-=1;
      }
      index++;
      stateArr = makeComplex(bowenTrivia);
      display.textContent = stateArr.statement;
      index = 0;
      stateArr = makeComplex(bowenTrivia);
      }

      scoreD.textContent = "Score: " + score;
    }
  })
