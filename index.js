/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i=0; i < games.length; i++) {
        let gameTemplate = games[i]
        let gameElement = document.createElement("div")
        gameElement.classList.add("game-card")

        let gameImg = gameTemplate['img'];
        let gameName = gameTemplate['name']
        let gameDescription = gameTemplate['description']
        let gameGoal = gameTemplate['goal']
        let gameRaised = gameTemplate['pledged']

        gameElement.innerHTML = `
        <img src="${ gameImg }" class="game-img"> 
        <h1> ${ gameName } </h1>
        <p> ${ gameDescription } </p> 
        <p> Goal: ${ gameGoal } </p> 
        <p> Raised: ${ gameRaised } </p> 
        `;

        gamesContainer.append(gameElement)
    }

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

const TOTAL_GAMES = GAMES_JSON.length
const TOTAL_CONTRIBUTIONS = GAMES_JSON.reduce( (acc, game) => {
    return acc + game['backers']
}, 0);
const TOTAL_RAISED = GAMES_JSON.reduce( (acc, game) => {
    return acc + game['pledged']
}, 0);

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
contributionsCard.innerHTML = `${ TOTAL_CONTRIBUTIONS.toLocaleString('en-US') }`;

const raisedCard = document.getElementById("total-raised");
raisedCard.innerHTML = `$${ TOTAL_RAISED.toLocaleString('en-US') }`;

const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${ TOTAL_GAMES.toLocaleString('en-US') }`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/
const UNFUNDED_GAMES = GAMES_JSON.filter( (game) => {
    return game['pledged'] < game['goal']
})
const FUNDED_GAMES = GAMES_JSON.filter( (game) => {
    return game['pledged'] >= game['goal']
})

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    addGamesToPage(UNFUNDED_GAMES);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    addGamesToPage(FUNDED_GAMES);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// NOTE: I reused vars from previous challenges

// grab the description container
const descriptionContainer = document.getElementById("description-container");
const NUM_OF_UNFUNDED_GAMES = UNFUNDED_GAMES.length
// use filter or reduce to count the number of unfunded games


// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `
We have raised $${TOTAL_RAISED.toLocaleString('en-US')} for ${TOTAL_GAMES.toLocaleString('en-US') + (TOTAL_GAMES==1 ? " game": " games")} thanks to the support of our backers! However, there ${(NUM_OF_UNFUNDED_GAMES==1 ? "is" : "are")} still ${NUM_OF_UNFUNDED_GAMES.toLocaleString('en-US') + (NUM_OF_UNFUNDED_GAMES==1 ? " game": " games")} that ${(NUM_OF_UNFUNDED_GAMES==1 ? " has" : " have")} still not reached ${(NUM_OF_UNFUNDED_GAMES==1 ? " its" : " their")} goals! Please consider backing ${(NUM_OF_UNFUNDED_GAMES==1 ? " this" : " these")} awesome projects!
`

// create a new DOM element containing the template string and append it to the description container
const descriptionStr = document.createElement('p')
descriptionStr.innerHTML = displayStr
descriptionContainer.append(descriptionStr)

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

let [top_game, second_game, ...others] = sortedGames;

console.log(sortedGames[0])
let {name: tName} = top_game;
let {name: sName} = second_game;
// create a new element to hold the name of the top pledge game, then append it to the correct element

const topGameElement = document.createElement("div")
topGameElement.innerHTML = `<h1>${tName}</h1>`

firstGameContainer.append(topGameElement)

// do the same for the runner up item
const secondGameElement = document.createElement("div")
secondGameElement.innerHTML = `<h1>${sName}</h1>`
secondGameContainer.append(secondGameElement)