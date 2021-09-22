//MVP:
// Set up init that calls the get card function 

//  write function to Get card data from deck of cards api
    // draw 2 cards from draw cards endpoint when the user clicks on the their half deck, which is the event we are listening to. 
   // display the cards across from one another. 
 
// define a method to compare card values returned from the api response and assign values to the face cards. 

// highest card wins. Ties are just declared. 
// display result message on page AND reset the game. 



// Stretch Goals:
// make a full war game 
    //Created the winners pile and move winner’s cards to that pile. 
    // Terminate game when card run out.
    // Resolve ties. 
  // Add animations to the cards slide.



const app = {};

app.apiUrl = `https://deckofcardsapi.com/api/deck/new`;

// ?count=2`;


app.init = () => {
  app.startGame();
  
}

// method to make fetch request to api
app.getDeck = () => {
  const url = new URL (`${app.apiUrl}/draw`); 
  url.search = new URLSearchParams({
    count: '2'
  });
  fetch(url).then((response) => {
    return response.json();
  })
  .then((jsonResponse) => {
    app.displayCards(jsonResponse);
  }); 
}

// function to listen for clicks on deck button
app.drawCard = () => {
  const drawButton = document.querySelector('.drawCards');
  drawButton.addEventListener('click', () => {
  app.getDeck();
    
  });
}
     
// function to get img data and display to page
app.displayCards = (jsonResponse) => {
  const newCard = jsonResponse.cards;
  // console.log(newCard);

  const cardSection = document.querySelector('.displayCards');

  cardSection.innerHTML= "";
  const ulElement = document.createElement('ul');

  ulElement.innerHTML = `
    <li>
      <img src='${newCard[0].image}' alt='${newCard[0].value} of ${newCard[0].suit}'/>
    </li>
    <li>
      <img src='${newCard[1].image}' alt='${newCard[1].value} of ${newCard[1].suit}' />
    <li>
  `;

  
  cardSection.append(ulElement);
  app.compareCards(newCard);
  //  console.log(newCard[0].image);
  };

  app.compareCards = (newCard) => {

    const cardValueArray = newCard.map((card) => {
      let cardValue = parseInt(card.value);
  

      if (card.value === "KING"){
        cardValue = 13;
      }else if(card.value === "QUEEN"){
        cardValue = 12;
      }else if(card.value === "JACK"){
        cardValue = 11;
      }else if(card.value === "ACE"){
        cardValue = 1;
      }else{cardValue = card.value}
      
      return cardValue;
      
      // console.log(cardValue)
    });

    console.log(cardValueArray);

    let playerCardValue = cardValueArray[0];
    let dealerCardValue = cardValueArray[1];

    const message = document.querySelector('h2');

    if(playerCardValue > dealerCardValue) {
      message.textContent = "You win!"
    } else if (playerCardValue < dealerCardValue) {
      message.textContent = "Dealer wins!"
    } else {
      message.textContent = "It's a tie."
    }
  }
 
// method to start game when button is clicked
  // display card decks on page
app.startGame = () => {
  const startGameButton = document.querySelector('.startButton');
  startGameButton.addEventListener('click',()=>{
    const deckContainer = document.querySelector('.startingPoint');
    deckContainer.classList.remove('startingPoint');
    deckContainer.classList.add('deckContainer');
   
  });
  app.drawCard();
}


 

app.init(); 