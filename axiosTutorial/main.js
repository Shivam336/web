/*

Video Original Link: https://www.youtube.com/watch?v=6LyagkoRWYA

Video Continue Link:

*/

/*

Important Link to remember:

For this tutorial we use - https://jsonplaceholder.typicode.com/
This website gives us fake JSON data.
Useful for projects to check. 

*/

//To get rid of always write headers in every request, we can make it global so that every time we pass a request
// it automatically adds the header.
axios.defaults.headers.common['X-Auth-Token'] = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// GET REQUEST
function getTodos() {

  //First Way

  //axios({
  //   method:"get",
  //   url:"https://jsonplaceholder.typicode.com/todos",
  //   params:{
  //     _limit:5
  //   }
  // })
  // .then(res=>showOutput(res))
  // .catch(err=>console.log(err))

  //Second Way
  //axios.get("https://jsonplaceholder.typicode.com/todos",{params:{_limit:1}}).then(res=>showOutput(res)).catch(err=>console.log(err));

  //Third Way
  // * By default axios have get request
  //axios("https://jsonplaceholder.typicode.com/todos",{params:{_limit:4}}).then(res=>showOutput(res)).catch(err=>console.log(err));

  axios("https://jsonplaceholder.typicode.com/todos", {
    params: {
      _limit: 4
    },
    timeout:5
  }).then(res => showOutput(res)).catch(err => console.log(err));

}

// POST REQUEST
function addTodo() {
  //console.log('POST Request');

  //First Way

  // axios({
  //   method:"post",
  //   url:"https://jsonplaceholder.typicode.com/todos",
  //   data:{
  //     title:"New TODO",
  //     completed:false
  //   }
  // })
  // .then(res=>showOutput(res))
  // .catch(err=>console.log(err));

  //Second Way

  axios.post(
      "https://jsonplaceholder.typicode.com/todos", {
        title: "New Task",
        completed: true
      }
    )
    .then(res => showOutput(res))
    .catch(err => console.log(err));

}

// PUT/PATCH REQUEST
function updateTodo() {

  // Put method replace the whole data and write the new data over that id;
  // axios.put("https://jsonplaceholder.typicode.com/todos/1", {
  //   title: "Updated Task",
  //   completed: false
  // }).then(res => showOutput(res)).catch(err => console.log(err));

  // Path method update only the change values not the whole data with that id

  axios.patch("https://jsonplaceholder.typicode.com/todos/1", {
    title: "Newly Task",
    completed: false
  }).then(res => showOutput(res)).catch(err => console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  //  console.log('DELETE Request');

  axios.delete("https://jsonplaceholder.typicode.com/todos/1").then(res => showOutput(res)).catch(err => console.log(err));

}

// SIMULTANEOUS DATA
function getData() {
  //  console.log('Simultaneous Request');

  // we can make the multiple requests at same time by using axios method called "all". When all the request
  // fulfill as per promise then it returns all the response


  //First way (long way)

  // axios.all([
  //   axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
  //   axios.get("https://jsonplaceholder.typicode.com/todos")
  // ])
  // .then(res=>{
  //   console.log(res[0]),
  //   console.log(res[1]),
  //   showOutput(res[0])
  // })
  // .catch(err=>console.log(err))



  //Second way (Short way) by using spread method

  axios.all([
      axios.get("https://jsonplaceholder.typicode.com/posts?_limit=2"),
      axios.get("https://jsonplaceholder.typicode.com/todos?_limit=6")
    ])
    .then(axios.spread((posts, todos) => {
      console.log(posts);
      console.log(todos);
      showOutput(posts)
    }))
    .catch(err => console.log(err));
}

// CUSTOM HEADERS
function customHeaders() {
  //  console.log('Custom Headers');

  const config = {
    headers: {
      'Content-Type': "application/JSON",
      Authrization: "Some Token"
    }
  };

  axios.post("https://jsonplaceholder.typicode.com/todos", {
    title: "New Task",
    completed: false
  }, config).then(res => showOutput(res)).catch(err => console.log(err));

}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  //  console.log('Transform Response');
  const options = {
    method: 'post',
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "hello world"
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })
  }
  axios(options).then(res => showOutput(res));

}

// ERROR HANDLING
function errorHandling() {
//  console.log('Error Handling');

//Give error-message to any error

// axios.get("https://jsonplaceholder.typicode.com/todoss")
// .then(res=>showOutput(res))
// .catch(err=>{
//   if(err.response) 
//   {
//     //Server responded with status other than 200 range
//     console.log(err.response.data);
//     console.log(`Status Code: ${err.response.status}`);
//     console.log(err.response.headers);
    
//     if(err.response.status===404){
//       alert("Page not found");
//     }
//   }
//   else if(err.request)
//   {
//     //Request was made but no response
//     console.log(err.request);
//   }
//   else{
//     console.log(err.message);
//   }
// })


//If we want to give error message only when certain status code is found then:

axios.get("https://jsonplaceholder.typicode.com/todoss",{
  validateStatus:function(status){
    return status < 500;   // Reject only when we receive status code greater or equal 500
  }
})
.then(res=>showOutput(res))
.catch(err=>{
  if(err.response) 
  {
    //Server responded with status other than 200 range
    console.log(err.response.data);
    console.log(`Status Code: ${err.response.status}`);
    console.log(err.response.headers);
    
    if(err.response.status===404){
      alert("Page not found");
    }
  }
  else if(err.request)
  {
    //Request was made but no response
    console.log(err.request);
  }
  else{
    console.log(err.message);
  }
})

}

// CANCEL TOKEN
function cancelToken() {
//  console.log('Cancel Token');
const source = axios.CancelToken.source();
axios.get("https://jsonplaceholder.typicode.com/todos",{cancelToken:source.token})
.then(res=>showOutput(res))
.catch(thrown=>{
  if(axios.isCancel(thrown))
  {
    console.log('Request canceled: ',thrown.message);
  }
})

if(true)
{
  source.cancel('Request Canceled');
}

}

// INTERCEPTING REQUESTS & RESPONSES
// Records all the requests and responses that we got.
axios.interceptors.request.use(config => {
  console.log(`${config.method.toUpperCase()} request send to ${config.url} at ${new Date().getTime()}`);
  return config
}, err => {
  return Promise.reject(err)
});


// AXIOS INSTANCES
const axiosInstance = axios.create({
  // Other Custom Settings
  baseURL:'https://jsonplaceholder.typicode.com'
});

//axiosInstance.get("/comments").then(res=>showOutput(res)).catch(err=>console.log(err));

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
    <div class="card mt-3"> 
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);