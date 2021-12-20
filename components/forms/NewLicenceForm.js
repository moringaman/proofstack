import { useState } from 'react'

export default function NewLicenceForm({ data, submitForm, isLoading, setOpen }) {
    console.log('FORM DATA ', data)

    const durations = [
        {name: 'Yearly', value: 12},
        {name: 'Six Monthly', value: 6}
    ]


    return (

            <form onSubmit={(e) => submitForm(e)}>
            <div className="px-2 py-7 bg-white w-800">
                <div className="grid grid-cols-12 gap-6 mb-20">
                    <div className="col-span-12">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            // onChange={(e) => handleChange(e)}
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email-address"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="col-span-12">
                        <label htmlFor="application" className="block text-sm font-medium text-gray-700">
                            Application
                        </label>
                        <select
                            // onChange={(e) => handleChange(e)}
                            id="application"
                            name="application"
                            autoComplete="application"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            {data.select1.map(app => (
                                <option 
                                key={app.appId}
                                value={app.appId}
                                >{app.appName}</option>
                            )
                            )}
                        </select>
                    </div>
                    <div className="col-span-6">
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                            Licence Type
                        </label>
                        <select
                            // onChange={(e) => handleChange(e)}
                            id="type"
                            // value="Free"
                            name="type"
                            autoComplete="application"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option>Free</option>
                            <option>Standard</option>
                            <option>Premium</option>
                        </select>
                    </div>

                    <div className="col-span-6">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            Licence Duration
                        </label>
                        <select
                            // onChange={(e) => handleChange(e)}
                            id="duration"
                            name="duration"
                            autoComplete="application"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            {
                            durations.map(duration => (
                                <option
                                key={duration.name}
                                value={duration.value}
                                >{duration.name}</option>
                            ))
   
                        }
                        </select>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse absolute bottom-0 w-full transform -translate-x-1/4">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                    { isLoading && 
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 241 241" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M241 120.5C241 96.6674 233.933 73.3699 220.692 53.5538C207.451 33.7377 188.632 18.2929 166.613 9.17252C144.595 0.0521564 120.366 -2.33415 96.9916 2.31537C73.6169 6.96489 52.1459 18.4414 35.2936 35.2936L59.1514 59.1514C71.285 47.0178 86.7442 38.7547 103.574 35.4071C120.404 32.0594 137.848 33.7776 153.702 40.3442C169.555 46.9109 183.105 58.0311 192.638 72.2987C202.172 86.5663 207.26 103.34 207.26 120.5H241Z" fill="white" fillOpacity="0.72"/>
            <path d="M241 120.5C241 140.316 236.113 159.827 226.772 177.303C217.43 194.78 203.923 209.683 187.446 220.692C170.97 231.701 152.032 238.477 132.311 240.42C112.59 242.362 92.6946 239.411 74.3867 231.827C56.0787 224.244 39.9236 212.263 27.3522 196.944C14.7809 181.626 6.18135 163.444 2.31537 144.008C-1.5506 124.573 -0.563692 104.484 5.18869 85.5207C10.9411 66.5576 21.2814 49.3059 35.2936 35.2936L59.1514 59.1514C49.0626 69.2403 41.6176 81.6615 37.4759 95.3149C33.3341 108.968 32.6236 123.432 35.4071 137.426C38.1906 151.42 44.3822 164.511 53.4336 175.54C62.485 186.569 74.1167 195.196 87.2984 200.656C100.48 206.116 114.805 208.241 129.004 206.842C143.203 205.444 156.838 200.565 168.701 192.638C180.564 184.712 190.29 173.981 197.015 161.398C203.741 148.815 207.26 134.768 207.26 120.5H241Z" fill="white" fillOpacity="0.4"/>
            </svg>
            }
                  Add Licence
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                </div>
            </div>
             </form>           
    
    )
}

