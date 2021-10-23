import { LockClosedIcon } from '@heroicons/react/solid'
import { useState, useEffect, useContext } from 'react'
import { Context } from '../../context'
import Router from 'next/router'
import api from '../../helpers/get'

export default function Example() {

  const [user, setUser] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const { state , dispatch } = useContext(Context)
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (user.email && user.password) {
      setLoading(true)
      const response = await api.post('/login', user, 'protected')
      console.log(response.status)
      const result = await response.text()
      const parsed = JSON.parse(result)
      console.log(parsed.accessToken)
      // TODO: Remove password from user object
      if (response.status === 200) {
        setLoading(false);
        localStorage.setItem('access_token', parsed['accessToken'])
        localStorage.setItem('user', user.email)
        dispatch({
          type: "LOGGED_IN_USER",
          payload: user
        })
        console.log("STATE ", state)
      delete user['password']
        Router.push({
          pathname: `licences/`,
          // query: {email: user.email}
        })
      }

    }
  }

  useEffect(() => {
    console.log('User ', user)
  }, [user])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm rounded overflow-hidden shadow-lg p-8 justify-center">

        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-16 w-auto"
              src="./icon_purple.png"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
              </a>
            </p>
          </div>
          <form
            className="mt-8 
        space-y-6"
            action="#"
            onSubmit={(e) => handleLogin(e)}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 mb-2">
                  <input
                    onChange={(e) => handleChange(e)}
                    id="email-address"
                    name="email"
                    value={user.email}
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 mb-1">
                  <input
                    onChange={(e) => handleChange(e)}
                    id="password"
                    name="password"
                    value={user.password}
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`group 
                            relative 
                            w-full 
                            flex 
                            justify-center 
                            py-2 px-4 border
                            border-transparent 
                            ${loading && 'cursor-not-allowed opacity-50'}
                            text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className={`h-5 w-5 text-indigo-500 group-hover:text-indigo-400`} aria-hidden="true" />
                </span>
                { loading? 'Logging in' : 'Sign in' }
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  )
}