let userData

$(() => {
  init();
})

const init = async() => {
  // checking if token recived
  userData = await checkToken("http://localhost:3000/users/userInfo");
  let url = "http://localhost:3000/users/userCards"
  // making a new route that will take the card we made
  let cardsData = await doApiMethod(url,"GET");
  createCards(cardsData);
  console.log(cardsData);
}


const createCards = (_ar) => {
  _ar.map(item => {
    let card = new Card("#id_row",item);
    card.render();
  })
} 


