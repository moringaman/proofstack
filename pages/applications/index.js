/* This example requires Tailwind CSS v2.0+ */
import { useEffect, useState, useRef, useContext} from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import api from '../../helpers/get'
import { Context } from '../../context'
import { List, Modal, CardList, NewApplicationForm } from '../../components'
import { auth, fetcher } from '../../helpers'
import classNames from 'classnames'


const Applications = () => {
  
    const router = useRouter()
    // const { email } = router.query
    const [user, setUser ] = useState({
      name: "",
      email: ""
    })

    const { state, dispatch } = useContext(Context)

    let email = ""
    if(auth.isLoggedIn().hasOwnProperty('email') ) {
       email = auth.isLoggedIn().email
    } else {
       email  = state.user.email
    }
    
    // const { adding } = state.licences.adding
    const adding = false
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

    
    const { data:applications, mutate:mutateApps, isValidating:validateApps, error:appsErr } = useSWR([`/applications?email=${email}`, 'withCredentials'], fetcher, swrOptions)

    // console.log("ERROR ", appsErr)
    // if(!data) return "Loading data"
    if(appsErr?.status === 405 )  {
      console.log("OOOOPS  ", appsErr.status)
      router.push('/auth')
    }
      // return "An error has occurred fetching the data"

    const btnClasses = classNames({
      'bg-gray-200': validateApps,
      'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500': !validateApps && applications

    })

    const submitForm = async(e) => {
      e.preventDefault()
      const { appName, description, version }  = e.target
      setLoading(true)

      const formData = {
        appName: appName.value, 
        userEmail: email, 
        description: description.value, 
        version: version.value
      }

      console.log("FORMDATA ", formData)
      
       const result = await addApplication(formData)
       console.log("RESULT ", result)
       setLoading(false)
       setShowModal(false)
    }

      const addApplication = async(formData) => {
        console.log('adding applications')
        dispatch({
          type: "ADDING_APPLICATION"
        })
        // send a request to the API to update the source
       await api.post('/register-app', formData, 'protected') 
       // trigger a revalidation (refetch) to make sure our local data is correct
       dispatch({
        type: "ADDED_APPLICATION"
      })
       if(!appsErr) {
          mutateApps()
       }
       return 'success'
      }

      const deleteApplication = async(id) => {
        const formData = {
          uuid: id
        }
         await api.post('/toggle-app-status', formData, 'protected')
         mutateApps()
      } 

      const listHeadings = [
        'application',
        "Owner",
        "Created",
        "Active",
        "Description",
        "Version",
        "",
        "disable"
      ]

    //    console.log("DATA ", user.email, data)
       console.log("Applications", applications)
  return (
    <div>
      {/* { user && 
     <Navbar user={user}/>

      } */}

      <header className="bg-white shadow">
      <div className="container mx-auto flex justify-between py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">Application Managment</h1>
          
            <button
            onClick={() =>  setShowModal(true)}
            type="button"
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${btnClasses}`}
          >
         
            Add New App
          </button>
        </div>
      </header>
      <main>
        <div className="max-w-9xl mx-auto py-6 sm:px-6 lg:px-8">
            <CardList />
          {  user.email && applications?.data && 
            <List 
                pageSize={6} 
                canToggle={true} 
                toggleActive={{status: "FALSE"}} 
                toggledId={'key'} 
                headings={listHeadings} 
                exclude={["key"]} 
                listData={applications.data} 
                validating={adding} 
                toggleAction={deleteApplication}
            />
          }
          { !applications && 
          <>Loading data...</>
          }
          { 
            <Modal 
              submitForm={submitForm}
              showModal={showModal}
              title="Create New Application"
              setOpen={(e) => setShowModal(e)}
              >
                {
              <NewApplicationForm 
                  isLoading={loading} 
                  submitForm={submitForm} 
                //   data={{'email': user.email}}
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

Applications.layout = "L2"

export default Applications