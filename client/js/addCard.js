let user;

$(() => {
  init();
})

const init = async () => {
  user = await checkToken("http://localhost:3000/users/userInfo");

  $("#id_add_form").on("submit", (evt) => {
    evt.preventDefault();

    let bodyData = {
      bizName: $("#bizName").val(),
      bizDescription: $("#bizDescription").val(),
      bizAddress: $("#bizAddress").val(),
      bizPhone: $("#bizPhone").val(),
    }

    addNewCardApi(bodyData);

    console.log(bodyData);
  })
}

const addNewCardApi = async (bodyData) => {
  let url = "http://localhost:3000/cards/"

  try {
    let newCard = await doApiMethod(url, "POST", bodyData);
    if(newCard._id){
      alert("card added , good for you!")
    }
    else{
      alert("there problem try again later");

    }
  }
  catch (err) {
    console.log(err);
    alert("there problem try again later")
  }
}