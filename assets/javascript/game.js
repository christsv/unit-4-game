
// This code gets executed when the DOM is fully loaded
$(document).ready(function() {
   //so we are creating an array of objects to hold the characters

    var characters = {
        "Obi-Wan Kenobi": {
        name: "Obi-Wan Kenobi",
        health: 120,
        attack: 8,
        imageUrl: "assets/images/obi-wan.jpg",
        enemyAttackBack: 15
        },
        "Luke Skywalker": {
        name: "Luke Skywalker",
        health: 100,
        attack: 14,
        imageUrl: "assets/images/luke-skywalker.jpg",
        enemyAttackBack: 5
        },
        "Darth Sidious": {
        name: "Darth Sidious",
        health: 150,
        attack: 8,
        imageUrl: "assets/images/darth-sidious.png",
        enemyAttackBack: 20
        },
        "Darth Maul": {
        name: "Darth Maul",
        health: 180,
        attack: 7,
        imageUrl: "assets/images/darth-maul.jpg",
        enemyAttackBack: 25
        }
    };


var render = function(character, renderArea){
    // this will build the character and its attributes

    //this creates a div class per character
    var charDiv = $("<div class='character' data-name ='" + character.name + "'>");
    // this assigns the characters name to it
    var charName = $("<div class='character-name'>").text(character.name);
    // this assigns the image to the character
    //we use attr cause src is an attriubute given for img tag
    var charImage = $("<img alt='image' class ='character-image'>").attr("src", character.imageUrl);
    //this assigns the health to each character
    // IF YOU DONT HAVE > IT DOESNT SHOW CAREFUL!!!!
    var charHealth = $("<div class='character-health'>").text(character.health);
    //here we append all the attributes to the div we created
    charDiv.append(charName).append(charImage).append(charHealth);
    //here we append the div WITH the attributes to the renderArea
    //arguement that is passed in the funciton
    $(renderArea).append(charDiv);


};

//creating a funciton that initializes the characters into the load screen
var initializeGame = function() {
    // Loop through the characters object and call the render function on each character to render their card.
    for (var i in characters ){
   // for/in - loops through the properties of an object (w3schools)

      render(characters[i], "#characters-section");
    }
  };


  //so we created a funciton that creates a character individually
  // then we made a funciton that actually initliazes it using the funciton
  //that creates a character
initializeGame();

var updateCharacter = function(character, area){
//so this will remove all the contents and child nodes in the selected element
    $(area).empty();
//this will render the character selected into the area    
    render(character, area);
}

var deleteEnemies = function(character ){
    for (var i = 0 ; i < character.length; i++){
        render(character[i],"#available-to-attack-selection")
    }

};


var attacker;
//combatants is created to have the characters stored in an array after one is chosen
var combatants = [];

var defender;

// this the on click for clicking a character
// its .character because its a class 
//.on( events [, selector ] [, data ] )
//A selector string to filter the descendants of the selected elements that will call the handler. 
//If the selector is null or omitted, the handler is always called when it reaches the selected element.
$("#characters-section").on("click", ".character", function(){

// name gives the attributes to the clicked "this" character
//it gives the string "name" since we are calling data-name
// attacker calls the object in the characters array that was given through name  
// characters["Luke Skywalker"]
// we choose data-name because that the name that holds each element
// of the object in the characters array.
    var name = $(this).attr("data-name");
   // console.log(name) = "Luke Skywalker"
   
   // console.log(attacker) = {name: luke, health: ... object }
   //if there is no attacker 
    if(!attacker){

        attacker = characters[name];
// for every object in the character array check if it equals "name"
// which is the chosen object by the clicker
        for (var key in characters){
            if (key != name){
// for the all the ones not equal push it into the array so that we can
// put that array in the sectioned available to attack
                combatants.push(characters[key]);


              
            }
        }
    }

    //this hides the character section div when a character is selected
    $("#characters-section").hide();
    updateCharacter(attacker, "#selected-character");
 
    deleteEnemies(combatants);
});


$("#available-to-attack-selection").on("click", ".character", function(){
    var hold = $(this).attr("data-name");
    
    if(!defender){
        
        defender = characters[hold];
    // console.log(this); this shows the div character chosen to attack
    // .remove() jquery takes the element out of the DOM 
        $(this).remove();

    }
   
    //$("#available-to-attack-selection").hide();
    updateCharacter(defender, "#defender");
  //  deleteEnemies(combatants); this doesnt delete enemies exaclty look at the funciton
});

$("#attack-button").on("click", function(){

    defender.health =  defender.health - defender.health;
   // console.log(check);
    if (defender.health == 0){
        $("#defender").empty();
    }
    //withouth the defender = false it will hold the value of defender to the previous opponent
    // when click the available to attack div
  
    message("you defeated " + defender.name);
    defender = false;
});

var message = function(string){
    $("#game-message").text(string);
};

});
