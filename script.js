//Challenge 1: Your Age in Days


function ageInDays(){
var birthYear = prompt('What year you born... Good friend?');
var ageInDayss = (2020-birthYear)*365;	
var h1 = document.createElement('h1');
var textAnswer= document.createTextNode('You are ' + ageInDayss + ' days old.');
	
h1.id='ageInDays';
h1.appendChild(textAnswer);

document.getElementById('flex-box-result').appendChild(h1);
}


function reset(){
	document.getElementById('ageInDays').remove();
	
}
// Challenge 2: Cat Generator
function generatecat()
{
	var image = document.createElement('img');
	var div = document.getElementById('flex-cat-gen');
	image.src="https://api.thecatapi.com/api/images/get?format=src&type=gif&size=small";
	div.appendChild(image);
}

//Challenge 3: Rock,Paper, Scissors

function rpsGame(yourChoice){
  
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = botChoicer();
  console.log(botChoice)
  results = decideWinner(humanChoice,botChoice);//also [your score(#),robot score(#)]
  message = finalMessage(results); // {'message': 'You won!','color':'green'}
  rpsFrontEnd(yourChoice.id, botChoice,message);
}

function botChoicer(){
	
	return ['rock','paper','scissors'][Math.floor(Math.random() * 3)];
}

function decideWinner(human,robot){
	if(human==robot){
		return 'tieght';
	}
	else if (((human=='rock') && (robot=='scissors'))||((human=='paper') && (robot=='rock'))||((human=='scissors') && (robot=='paper'))){
		return 'human';

	}else{
		return 'robot';
	

	}
	/*
	Other way to do it:

	var rpsData={
	'rock':{'scissors':'1/won,'rock':'0.5/tieght','paper':'0/lose'},
	'paper':{'rock':'1/won,'paper':'0.5/tieght','scissors':'0/lose'},
	'scissors':{'paper':'1/won,'scissors':'0.5/tieght','scissors':'0/lose'}
	};

	var yourScore = rpsData[human][robot];
	var robotScore = rpsData[robot][human];
	
	return [yourScore,robotScore];
	*/
}

function finalMessage(res){
	if(res=='tieght'){
		return {'message':'you tieght!','color':'yellow'};
	}
	else if (res=='human'){
		return {'message':'you won!','color':'green'};
	

	}else if (res=='robot'){
		return {'message':'you lost!','color':'red'};
}
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
	var imagesDatabase ={
		'rock':document.getElementById('rock').src,
		'paper':document.getElementById('paper').src,
		'scissors':document.getElementById('scissors').src
	}
	// Lets remove all the images

	document.getElementById('rock').remove();
	document.getElementById('paper').remove();
	document.getElementById('scissors').remove();

	var humanDiv = document.createElement('div');
	var botDiv = document.createElement('div');
	var messageDiv = document.createElement('div');

	humanDiv.innerHTML="<img src='"+imagesDatabase[humanImageChoice]+"' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
	messageDiv.innerHTML = "<h1 style='color:"+finalMessage['color']+"; font-zize: 60px; padding: 30px;'>"+finalMessage['message']+"</h1>"

	botDiv.innerHTML="<img src='"+imagesDatabase[botImageChoice]+"' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(255, 0, 0, 1);'>";

	document.getElementById('flex-box-rps-div').appendChild(humanDiv);
		document.getElementById('flex-box-rps-div').appendChild(messageDiv);

	document.getElementById('flex-box-rps-div').appendChild(botDiv);



}

// Challenge 4: Change the Color of All Buttons

var all_buttons = document.getElementsByTagName('button');

var copyAllButtons=[];
for (let i=0; i<all_buttons.length;i++){
	copyAllButtons.push(all_buttons[i].classList[1])
}

function buttonColorChange(buttonThingy){
	if (buttonThingy.value=='red'){
		buttonsRed();
	} else
	if (buttonThingy.value=='green'){
		buttonsGreen();
	} else if (buttonThingy.value==='reset'){
		buttoncolorReset();
	}else if(buttonThingy.value === 'random'){
		randomColors();
	}
}

function buttonsRed(){
	for (let i=0; i <all_buttons.length; i++){
		all_buttons[i].classList.remove(all_buttons[i].classList[1]);
		all_buttons[i].classList.add('btn-danger');
	}
}

function buttonsGreen(){
	for (let i=0; i <all_buttons.length; i++){
		all_buttons[i].classList.remove(all_buttons[i].classList[1]);
		all_buttons[i].classList.add('btn-success');
	}
}
function randomColors(){
	for (let i=0; i <all_buttons.length; i++){
		all_buttons[i].classList.remove(all_buttons[i].classList[1]);
		all_buttons[i].classList.add(['btn-primary','btn-secondary','btn-success','btn-danger','btn-warning','btn-info','btn-light','btn-dark','btn-link'][Math.floor(Math.random()*8)]);
	}
}
function buttoncolorReset(){
	for (let i=0; i <all_buttons.length; i++){
		all_buttons[i].classList.remove(all_buttons[i].classList[1]);
		all_buttons[i].classList.add(copyAllButtons[i]);
	}
}
// Challenge 5: Blackjack

let blackjackGame = {
	'you': {'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
	'dealer': {'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
	'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
	'cardsMap': {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
	'wins':0,
	'losses':0,
	'draws':0,
	'isStand':false,
	'turnsOver':false,

};
const YOU = blackjackGame['you'];
const DEALER=blackjackGame['dealer'];
const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');

const lossSound = new Audio('static/sounds/aww.mp3');
document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal)

function blackjackHit(){
	if (blackjackGame['isStand']===false){
	let card = randomCard();
	showCard(card,YOU);	
	updateScore(card,YOU);
	showScore(YOU);
	}
}
function randomCard(){
	let randomIndex = Math.floor(Math.random() *13);
	return blackjackGame['cards'][randomIndex];
}
function showCard(card,activePlayer){
	if(activePlayer['score']<=21){
	let cardImage = document.createElement('img');
	cardImage.src=`static/images/${card}.png`;
	document.querySelector(activePlayer['div']).appendChild(cardImage);
	hitSound.play();
}
}

function blackjackDeal(){
	if(blackjackGame['turnsOver']=== true){

		blackjackGame['isStand']=false;


	let yourImages = document.querySelector('#your-box').querySelectorAll('img');
	let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
	
	

	for (let i=0; i<yourImages.length;i++){
		yourImages[i].remove();
	}
	for (i=0; i<dealerImages.length;i++){
		dealerImages[i].remove();
	}
	YOU['score']=0;
	DEALER['score']=0;
	document.querySelector(YOU['scoreSpan']).style.color = 'white';
	document.querySelector(DEALER['scoreSpan']).style.color = 'white';
	document.querySelector('#your-blackjack-result').textContent=0;

	document.querySelector('#dealer-blackjack-result').textContent=0;

	document.querySelector('#blackjack-result').textContent="Let's Play";
	document.querySelector('#blackjack-result').style.color = 'black';


	blackjackGame['turnsOver']=true;
 }
}

function updateScore(card,activePlayer){
	if (card === 'A'){

	if (activePlayer['score']+blackjackGame['cardsMap'][card][1]<=21){
		activePlayer['score']+=blackjackGame['cardsMap'][card][1];
	}else{
		activePlayer['score']+=blackjackGame['cardsMap'][card][0];
	}
}else{

	activePlayer['score']+=blackjackGame['cardsMap'][card];
}
}


function showScore(activePlayer){
		if(activePlayer['score']>21 ){
			document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
			document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
		}else{
		document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
	}
	}

function sleep(ms){
	return new Promise(resolve => setTimeout(resolve,ms))
}
async function dealerLogic(){
		blackjackGame['isStand']=true; 
		
		while(DEALER['score']<16 && blackjackGame['isStand']===true){



		let card = randomCard();
		showCard(card, DEALER);
		updateScore(card, DEALER);
		showScore(DEALER);
		await sleep(1000);
		}

			blackjackGame['turnsOver']=true
			let winner= computeWinner()
			showResult(winner)
		}
	
// Compute winner and return who just won
// Update the wins, draws, losses
function computeWinner(){
	let winner;
	if(YOU['score']<=21){
		if(YOU['score']>DEALER['score']||(DEALER['score']>21)){
			blackjackGame['wins']++;
			winner=YOU;
		}else if(YOU['score']<DEALER['score']){
			blackjackGame['losses']++;
			winner=DEALER;
		}else if(YOU['score']===DEALER['score']){
			blackjackGame['draws']++;

		}

		// condition: when you bust but dealer is lucky

	}else if(YOU['score']>21 && DEALER['score']<=21){
		blackjackGame['losses']++;
		winner = DEALER;
	}else if(YOU['score']>21 && DEALER['score']>21){
		blackjackGame['draws']++;

	}
	console.log(blackjackGame);
	return winner;
}
	
function showResult(winner){
	if(blackjackGame['turnsOver']===true){
		if(winner===YOU){
			document.querySelector('#wins').textContent=blackjackGame['wins'];
			message = 'You win!';
			messageColor='green';
			winSound.play();
		}else if (winner === DEALER){
			document.querySelector('#losses').textContent=blackjackGame['losses'];
			message = 'You lost!';
			messageColor='red';
			lossSound.play();
		}else {
			document.querySelector('#draws').textContent=blackjackGame['draws'];
			message = 'You drew!';
			messageColor='black';
		}
		document.querySelector('#blackjack-result').textContent = message;
		document.querySelector('#blackjack-result').style.color = messageColor;
 }
}