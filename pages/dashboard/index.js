/* This example requires Tailwind CSS v2.0+ */
import { useEffect, useState, useRef, useContext} from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import api from '../../helpers/get'
import { Context } from '../../context'

import List from '../../components/List'
import CardList from '../../components/cardList'
import Modal from '../../components/Modal'
import NewLicenceForm from '../../components/forms/NewLicenceForm'
import Navbar from '../../components/Navbar'
import classNames from 'classnames'


export default function Dashboard() {
  
    const router = useRouter()
    // const { email } = router.query
    const [user, setUser ] = useState({
      name: "",
      email: ""
    })

    const { state, dispatch } = useContext(Context)

    const { email } = state.user
    const { adding } = state.licences.adding

    const swrOptions = {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }

    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
      // console.log("User ", router.query)
      console.log("STATE >>> ", state)
      // setUser({...user, email: email})
      setUser({...user, email: email})

      // fetchLicences()
  }, [router])

    const fetcher = (...args) => api.get(...args).then(res => res.json())
    const { data, mutate, isValidating, error } = useSWR(email ? [`/app-licences?email=${email}`, 'withCredentials']: null, fetcher, swrOptions)
    const { data:applications, mutate:mutateApps, isValidating:validateApps, error:appsErr } = useSWR(data ? [`/applications?email=${email}`, 'withCredentials']: null, fetcher, swrOptions)

    // if(!data) return "Loading data"
    // if(error) return "An error has occurred fetching the data"

    const btnClasses = classNames({
      'bg-gray-200': validateApps || !applications,
      'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500': !validateApps && applications

    })

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
        dispatch({
          type: "ADDING_LICENCE"
        })
        // send a request to the API to update the source
       await api.post('/issue-user-licence', formData, 'protected') 
       // trigger a revalidation (refetch) to make sure our local data is correct
       dispatch({
        type: "ADDED_LICENCE"
      })
       if(!error && !appsErr) {
          mutate()
       }
       return 'success'
      }

      const deactivateLicence = async(id) => {
        const formData = {
          licenceKey: id
        }
         await api.post('/toggle-licence-status', formData, 'protected')
         mutate()
      } 

      const listHeadings = [
        'user / application',
        "licence code",
        "Expires",
        "Type",
        "Status",
        "Disable"
      ]

       console.log("DATA ", user.email, data)
       console.log("Applications", applications)
  return (
    <div>
      { user && 
     <Navbar user={user}/>

      }

      <header className="bg-white shadow">
      <div className="container mx-auto flex justify-between py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          
            <button
            onClick={() => applications && setShowModal(true)}
            type="button"
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${btnClasses}`}
          >
         
            Add Licence
          </button>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <CardList />
          { user.email && data && 
            <List canToggle={true} toggledId={'licence'} headings={listHeadings} exclude={["created", "uses"]} listData={data} validating={adding} toggleAction={deactivateLicence}/>
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
                  setOpen={(e) => setShowModal(e)}
              />
                }
            </Modal>
          }
        </div>
      </main>
    </div>
  )
}
