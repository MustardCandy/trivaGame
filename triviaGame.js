console.log("loading");
document.getElementById('replace').innerHTML = "JS Loading";
makeGame();
  function change() { //allows you to click on text and change it to this "It's November!"
    document.getElementById("center").innerHTML = "It's November!";
  }




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

/*
Make a function called
makeComplex(list, maxlen=5)
list = a list of objects with the keys of statement:<text> and value:<bool>
This function should assume that the following functions also exist in the code and should be called in this function:
makeAnd(first, second)
makeOr(first, second)
makeNot(object)
randomList(length)
Using these the function should
Make a complex response of format {statement:<text>, value:<bool>}
This statement should NOT alter the original statements.
makeNot should be randomly applied apart from makeAnd and makeOr on single statements only with a 25% chance.
You will be teaching groups how to randomList and makeComplex
we use randomList so we can pick which statements to use.
So it takes the [{statement: "I have baby legs", value: true}, {statement: "Aidan can drive", value: false}......] array of everyone's statements and
a max length
then you should figure out between 2  and the max number of statements you will do
that should be random
so take that number of things off randomList's output
then run each thing though the negation
then keep adding them into one big return randomly using either makeAnd or makeNot
*/

  function makeComplex (list, maxlen=5) {
    var randomizer = randomList(list.length); //scrambles up the list in random order
    var chance = randomNumber(0,5); //gives it a 25% chance so that the length of each statement can vary from 2-5 statements
    var notTrue = false; //tracker boolean
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
  function makeGame(){
  var playGame = true;
  var score = 0;
  var trueBtn = document.getElementById("trueBtn").addEventListener("click");
  var list = [{statement: "Bowen wears glasses", value: true}, {statement: "Aidan is only tall because he's using stilts", value: false}, {statement: "I am sus", value: true}, {statement: "Euan and Memphis are secretly twins", value: false}, {statement: "We are doing computer science stuff", value: true}, {statement: "Global warming is a conspiracy", value: false}, {statement: "Birds work for the bourgeoisie", value: true}, {statement: "The Earth is flat", value: false}, {statement: "2020 is a great year", value: false}, {statement: "Aidans uses a wig", value: false}];
  while (playGame) {
    var makeQ = makeComplex(list);
    console.log(makeQ.value);
    var pro = ("Your score is " + score + ";  The question is: " + makeQ.statement);
    document.getElementById("replace").innerHTML = pro;
  if(makeQ.value == true && trueBtn = True){
    console.log("WOrks!");
  }
    return pro;
 }
}
