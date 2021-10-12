import React, { useState, useContext } from "react";
import { Context } from "../../context";

const HomePage = () => {
    const {state, dispatch } = useContext(Context) 
    return(
        <>
        HomePage
        <div>
            <button
             type="button"
             className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => dispatch(
                {
                 type: "LOGGED_IN_USER",
                 payload: "leon duffus"
                }
            )}
            >
                Log in
            </button>
            <button
             type="button"
             className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => dispatch(
                {
                 type: "LOGGED_IN_USER",
                 payload: null
                }
            )}
            >
                Log out
            </button>
        </div>
        <div>
            {JSON.stringify(state)}
        </div>
        </>
    ) 
}

export default HomePage