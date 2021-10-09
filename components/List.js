/* This example requires Tailwind CSS v2.0+ */
import ToggleButton from './ToggleButton'
import _ from 'lodash'
import moment from 'moment'
import { useRef, useEffect, useState } from 'react'
import Pagination from './Pagination'
import classNames from 'classnames'


  export default function List(props) {

    const { licences, validating, deactivateLicence } = props

    const headings = [
      'user / application',
      "licence code",
      "Expires",
      "Status",
      "Type",
      "Disable"
    ]
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
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = perPage;

  const paginate = (e) => {
    console.log("Paginate ", e)
    setCurrentPage(e)
  }

  const renderHeadings = () => {
   return headings.map((heading, i) => (
      <th
      key={i}
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      {heading}
    </th> 
   ))
  }

  const renderStatus = (licence) => {

    let statusClass = classNames(
      {
      'bg-gray-100 text-gray-500': moment(licence.expires) < moment(new Date()),
      'bg-red-100 text-red-500': licence.status === 'inactive',
      'bg-green-100 text-green-500': licence.status === 'active',
      });

    return(
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}`}>
      {licence.status}
      </span>
    )
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
                    { renderHeadings() }
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
                        <div className="text-sm text-gray-900">{moment(licence.expires).format("MMM Do YY")}</div>
                        {/* <div className="text-sm text-gray-500">{licence.department}</div> */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {
                        renderStatus(licence)
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{licence.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <ToggleButton isEnabled={licence.status === 'inactive'} handleChange={deactivateLicence} id={licence.licence} />
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
  