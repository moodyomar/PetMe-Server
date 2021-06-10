// making api request
const doAPiGet = async(_url) => {
  let resp = await fetch(_url);
  let data = await resp.json();
  return data;
}



// mkaing a CRUD request
// DELETE, PATCH , PUT , POST
const doApiMethod = async(_url,_method,_body) => {
  let resp = await fetch(_url, {
    method: _method,
    body: JSON.stringify(_body),
    headers: {
// checking the token if its valid from localstorage
      "x-auth-token":localStorage["tok"],
// telling node js to be able to read JSON
      'content-type': "application/json"
    }
  })
  let data = await resp.json();
  return data;
}