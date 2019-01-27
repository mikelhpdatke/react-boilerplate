// import { authHeader } from '../auth-header';

export async function PostApi(url, json) {
  let formBody = [];
  for (let property in json) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(json[property]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }
  formBody = formBody.join('&');
  const myRequest = new Request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formBody,
  });
  // console.log(json);
  // console.log(myRequest.body);
  const result = fetch(myRequest)
    .then(response => {
      // console.log(response);
      if (response.status === 200) {
        return response.json();
      }
      console.log('err');
      return 'err';
      // return Promise.reject(new Error('err status != 200'));
      // console.log('Something went wrong on api server!');
    })
    .then(response => response)
    .catch(error => {
      console.log(`Stm went wronggggg${error}`);
    });
  return result;
}
