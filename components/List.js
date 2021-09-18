/* This example requires Tailwind CSS v2.0+ */
import ToggleButton from './ToggleButton'
import _ from 'lodash'
import { useRef, useEffect, useState } from 'react'
import Pagination from './Pagination'

  export default function List(props) {

    const { licences, validating } = props

    
    const usePrevious = data => {
    const dataRef = useRef()

      useEffect(() => {
        dataRef.current = licences
      }, [data])
      return dataRef.current
    }

    const previousLicences = usePrevious(licences)
    
    let sorted = _.orderBy(licences, ['created'], ['desc'])

  const perPage = 6  
  const [sliceArray, setSliceArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = perPage;

  const paginate = (e) => {
    console.log("Paginate ", e)
    setCurrentPage(e)
  }
 
/// JSX Part
sorted = sorted.slice(
             (currentPage - 1) * productsPerPage, currentPage * productsPerPage
            )

    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      User / Application
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Licence Code
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Disable / Enable
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="table-auto">
                { validating && 
                  <tr className="animate-pulse bg-green-400">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                      <div className="flex-grow h-10"></div>
                      </div>
                    </td>
                    </tr>
                  }
                </tbody>
                <tbody className="bg-white divide-y divide-gray-200"> 
                  {licences.length > 0 && sorted.map(licence => (
                    <tr key={licence.licence}>
                      <td className="px-1 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {/* <img className="h-10 w-10 rounded-full" src={licence.image} alt="" /> */}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{licence.email}</div>
                            <div className="text-sm text-gray-500">{licence['app-name']}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{licence.licence}</div>
                        {/* <div className="text-sm text-gray-500">{licence.department}</div> */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{licence.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <ToggleButton/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination pageSelect={paginate} perPage={perPage} currentPage={currentPage} count={licences.length}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
  