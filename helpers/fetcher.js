import api from './get'

const fetcher = async (...args) => {
    let res = await api.get(...args)
  
    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    console.log("ARGS ", ...args)
    console.log("FECT ERR>>>", res)
    if (!res.ok) {
      // const error = new Error('An error occurred while fetching the data.')
      console.log('retrying api')
      const refreshToken = localStorage.getItem('refresh_token')

      res = await api.post('/token', {token: refreshToken} )
      console.log('refreshed? ', res)
      if(res.status === 200) {
        // put token in storage
        const refreshData = await res.json()
        localStorage.setItem('access_token', refreshData.accessToken)

        console.log('REFRESH RESPONSE ', refreshData)
        // make the request again with the new token
        res = await api.get(...args, )
        return res.json()
      } else {
        console.log('pushing to login page')
        let error = new Error('user is not authenticated')
        error.message = 're-authenticate'
        error.status = 405
        throw error
      }
      // Attach extra info to the error object.
      // error.info = await res.json()
      // error.status = res.status
      // console.log("FECT NO ERR>>> ", error.info)
      // throw error
    }

    return res.json()
  }

  export default fetcher

