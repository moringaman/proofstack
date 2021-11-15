// import React from 'react';
import Router from 'next/router'
import api from '../helpers/get'
import jwt from 'jsonwebtoken'
import router from 'next/router'

const useAuth = (setLoading = false, dispatch, user={}) => {


   const isLoggedIn = () => {
        const { email } = user
        if (typeof window !== 'undefined') {
            if(localStorage.getItem('user') !== ''){
                // send request to server
                // if expired use refresh token to get new token
                // if invalid return user looged out
                return {loggedIn: true, email: localStorage.getItem('user')}
            } else {
        return {loggedIn: false}
            }
        }
        return {loggedIn: false}
    }

    const logIn = async() => {
        if (user.email && user.password) {
            setLoading(true)
            const response = await api.post('/login', user)
            console.log(response)
            const result = await response.text()
            const parsed = JSON.parse(result)
            // TODO: Remove password from user object
            if (response.status === 200) {
              setLoading(false);
            console.log("User >>> ", user)
              const userInfo = jwt.decode(parsed.accessToken)
              let user = {
                  email: userInfo.email,
                  name: null
              }
              localStorage.setItem('access_token', parsed['accessToken'])
              localStorage.setItem('refresh_token', parsed['refreshToken'])
              // TODO: Get user info from jwt decodeer
              localStorage.setItem('user', user.email)
              dispatch({
                type: "LOGGED_IN_USER",
                payload: user
              })
            //   console.log("STATE ", state)
            delete user['password']
              Router.push({
                pathname: `licences/`,
                // query: {email: user.email}
              })
            } else {
              setLoading(false)
              console.log(response.status)
            }
      
          }
    }

    const logOut = () => {
        // delete remote refresh tokens my calling logout route
        // delete local tokens
        // dispatch logged in user to {}
        // router push to login screen
        localStorage.removeItem('user')
        localStorage.removeItem('refresh_token')
        dispatch({
            type: "LOGGED_OUT_USER"
          })
        Router.push('/auth')
    }


    return {
        logIn,
        logOut,
        isLoggedIn,
    }
} 

export default useAuth