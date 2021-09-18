/* This example requires Tailwind CSS v2.0+ */
import { useEffect, useState, useRef} from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import api from '../../helpers/get'


import List from '../../components/List'
import CardList from '../../components/cardList'
import Modal from '../../components/Modal'
import NewLicenceForm from '../../components/forms/NewLicenceForm'
import Navbar from '../../components/Navbar'


export default function Dashboard() {
  
    const router = useRouter()
    const { email } = router.query
    const [user, setUser ] = useState({
      name: "",
      email: ""
    })

    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
      console.log("User ", router.query)
      setUser({...user, email: email})
      // fetchLicences()
  }, [router])

    const fetcher = (...args) => api.get(...args).then(res => res.json())
    const { data, mutate, isValidating, error } = useSWR(email ? [`/app-licences?email=${email}`, 'withCredentials']: null, fetcher)
    const { data:applications, mutate:mutateApps, isValidating:validateApps, error:appsErr } = useSWR(data ? [`/applications?email=${email}`, 'withCredentials']: null, fetcher)

    // if(!data) return "Loading data"
    // if(error) return "An error has occurred fetching the data"

    const submitForm = async(e) => {
      e.preventDefault()
      const {email, application, type, duration } = e.target
      setLoading(true)

      const formData = {
        userEmail: email.value,
        appId: application.value,
        duration: duration.value,
        type: type.value,
      }
      
       const result = await addLicence(formData)
       setLoading(false)
       setShowModal(false)
    }

      const addLicence = async(formData) => {
        console.log('adding licence')
        // send a request to the API to update the source
       await api.post('/issue-user-licence', formData, 'protected') 
       // trigger a revalidation (refetch) to make sure our local data is correct
        mutate()
       return 'success'
      }

       console.log("DATA ", user.email, data)
       console.log("Applications", applications)
  return (
    <div>
      { user && 
     <Navbar user={user}/>

      }

      <header className="bg-white shadow">
      <div className="container mx-auto flex justify-between py-6 px-4">
        {/* <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"> */}
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          {
            applications?.data && 
            <button
            onClick={() => setShowModal(true)}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {!data || loading && 
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 241 241" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M241 120.5C241 96.6674 233.933 73.3699 220.692 53.5538C207.451 33.7377 188.632 18.2929 166.613 9.17252C144.595 0.0521564 120.366 -2.33415 96.9916 2.31537C73.6169 6.96489 52.1459 18.4414 35.2936 35.2936L59.1514 59.1514C71.285 47.0178 86.7442 38.7547 103.574 35.4071C120.404 32.0594 137.848 33.7776 153.702 40.3442C169.555 46.9109 183.105 58.0311 192.638 72.2987C202.172 86.5663 207.26 103.34 207.26 120.5H241Z" fill="white" fillOpacity="0.72"/>
            <path d="M241 120.5C241 140.316 236.113 159.827 226.772 177.303C217.43 194.78 203.923 209.683 187.446 220.692C170.97 231.701 152.032 238.477 132.311 240.42C112.59 242.362 92.6946 239.411 74.3867 231.827C56.0787 224.244 39.9236 212.263 27.3522 196.944C14.7809 181.626 6.18135 163.444 2.31537 144.008C-1.5506 124.573 -0.563692 104.484 5.18869 85.5207C10.9411 66.5576 21.2814 49.3059 35.2936 35.2936L59.1514 59.1514C49.0626 69.2403 41.6176 81.6615 37.4759 95.3149C33.3341 108.968 32.6236 123.432 35.4071 137.426C38.1906 151.42 44.3822 164.511 53.4336 175.54C62.485 186.569 74.1167 195.196 87.2984 200.656C100.48 206.116 114.805 208.241 129.004 206.842C143.203 205.444 156.838 200.565 168.701 192.638C180.564 184.712 190.29 173.981 197.015 161.398C203.741 148.815 207.26 134.768 207.26 120.5H241Z" fill="white" fillOpacity="0.4"/>
            </svg>
            }
            {/* <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" /> */}
            Add Licence
          </button>
          }
          
          {/* </div> */}
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <CardList />
          { user.email && data && 
            <List licences={data} validating={loading && isValidating}/>
          }
          { !data && 
          <>Loading data...</>
          }
          { applications?.data &&
            <Modal 
              submitForm={submitForm}
              showModal={showModal}
              title="Issue New App Licence"
              setOpen={(e) => setShowModal(e)}
              >
                {applications?.data && 
              <NewLicenceForm 
                  isLoading={loading} 
                  submitForm={submitForm} 
                  data={{'select1':applications.data}}
              />
                }
            </Modal>
          }
        </div>
      </main>
    </div>
  )
}
