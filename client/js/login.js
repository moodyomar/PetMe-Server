$(() => {
  init();
})

const init = () => {
  $("#id_form").on("submit", (evt) => {

    evt.preventDefault();
    let bodyData = {
      email: $("#id_email").val(),
      password: $("#id_pass").val()
    }
    tryLogIn(bodyData)

    console.log(bodyData);
  })
}

const tryLogIn = async (bodyData) => {
  let url = "http://localhost:3000/users/login";
  let data = await doApiMethod(url,"POST",bodyData);

  if(data.token){
    // saving token in localstorage
    localStorage.setItem("tok",data.token)
    window.location.href = "myinfo.html";
  }
  else{
    alert("User name or password worng!");
  }
  console.log(data);
}