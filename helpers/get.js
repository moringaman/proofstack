const LICENCE_API_URL = process.env.LICENCE_API_URL || 'http://localhost:4000'

module.exports = {
    post: (route, data, security='none') => {
        let myHeaders = new Headers();
         myHeaders.append("Content-Type", "application/json");

         if(security === 'protected') {
             const token = localStorage.getItem('access_token')
             console.log("TOKEN ",token)
        
            myHeaders.append(
                "Authorization",
                "Bearer eyJhbGciOiJIUzI1NiJ9.bGVvbkBtb3JpbmdhbXV0dWFsLm9yZw.X0XOXqZAgKZV3kJaNC7EaN1LR9kxSYtGxzLccmpsKgo"
                );
         }
      
      var raw = JSON.stringify(data);
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        // mode: 'no-cors'
      };
      
      return fetch(`${LICENCE_API_URL}${route}`, requestOptions)
  
    },
    
    get: (route, querystring ) => {


        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
        
          const REQUEST_URL = `${LICENCE_API_URL}${route}${querystring}`
          console.log(REQUEST_URL)
         return fetch(REQUEST_URL, requestOptions)
    }
 }