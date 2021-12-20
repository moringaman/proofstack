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
                `Bearer ${token}`
                );
         }

         if(security === 'refresh') {
          const token = localStorage.getItem('refresh_token')
          console.log("TOKEN ",token)
     
         myHeaders.append(
             "Authorization",
             `Bearer ${token}`
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
    
    get: (url, credentials='' ) => {
      var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };

          if(credentials === 'withCredentials') {
              console.log("adding credentials")
             const token = localStorage.getItem('access_token')
              myHeaders.append("Authorization", `Bearer ${token}`);
              console.log("TOKEN ",token)

          }

          // const retryFetch = (url, requestOptions, retries = 4, backoff = 1000) => {
          //   const retryCodes = [404, 401, 408, 500, 502, 503, 504, 522, 524, 203]

          // return fetch(url,  requestOptions)
          //   .then(response => {
          //     console.log('STATUS', response.status)
          //     if(response.status === 200) return response.json()
          //     if (retries > 0 && retryCodes.includes(response.status)) {
          //       console.log('retries ', retries)
          //       setTimeout(() => {
          //           return retryFetch(url, requestOptions, retries - 1, backoff * 2)
          //       }, backoff)
          //     } else {
          //       throw new Error(response)
          //     }
          //   })
          //   .catch(console.error)
          // } 
         
        
          const REQUEST_URL = `${LICENCE_API_URL}${url}`
          console.log(REQUEST_URL)
         return fetch(REQUEST_URL, requestOptions)
    }
 }