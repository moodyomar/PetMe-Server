$(() => {
  init();
})

const init = async() => {
  let user = await checkToken("http://localhost:3000/users/userInfo");
  printUserData(user);

  getCardsFromApi()
}

const printUserData = (user) => {
  $("#id_name").html(user.name); 
  $("#id_email").html(user.email); 
  $("#id_date").html(user.createdAt); 
}


const getCardsFromApi = async() => {
  let url = "http://localhost:3000/cards/userCardsAdded/?perPage=20";
  let data = await doApiMethod(url,"GET");
  console.log(data);
  createCards(data);
}

const createCards = (_ar) => {
  _ar.map(item => {
    let card = new Card("#id_row",item);
    card.render();
  })
} 
