/* This example requires Tailwind CSS v2.0+ */
import ToggleButton from './ToggleButton'
import _ from 'lodash'
import moment from 'moment'
import elipsify from '../helpers/ui/elipsify'
import { useRef, useEffect, useState } from 'react'
import Pagination from './Pagination'
import classNames from 'classnames'
import { ChevronDoubleLeftIcon } from '@heroicons/react/outline'


export default function List(props) {

  const { listData, validating, canToggle, toggleAction, toggleActive, headings, exclude, toggledId, pageSize, doubled=[]} = props


  const types = { 
    INACTIVE: 'inactive'
  }

  // const previouslistData = usePrevious(listData)

  let sorted = _.orderBy(listData, ['date_from'], ['desc'])

  console.log("SORTED ", sorted)
  const perPage = pageSize
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = perPage;

  const paginate = (e) => {
    console.log("Paginate ", e)
    setCurrentPage(e)
  }

  console.log("DATA --->>> ", listData)

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

  const renderListItems = (el, doubled=[]) => {
    let rendered = Object.keys(el).map((obj, i) => (
        <>
          {
            obj !== doubled[1] && !exclude.includes(obj) &&
          
            <td className="px-1 py-4 whitespace-nowrap" key={i} >
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {["expired", "active", "disabled", "inactive"].includes(el[obj]) ? renderStatus(el[obj]) : formatted(el[obj])}
                  </div>
                  {
                    obj === doubled[0] &&
                    <div key={i} className="text-sm font-medium text-gray-600">{formatted(el[doubled[1]])}</div>
                  }
                </div>
              </div>
            </td>

          }
        </>
      )
    )

    return <>{rendered}</>
  }

  const renderStatus = (data) => {
    
    let statusClass = classNames(
      {
        'bg-gray-100 text-gray-500': data === 'expired',//moment(data, moment.ISO_8601, true).isValid() && moment(data) < moment(new Date()),
        'bg-red-100 text-red-500': data === 'inactive',
        'bg-green-100 text-green-500': data === 'active',
      });

    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}`}>
        {data}
      </span>
    )
  }

  

  /// JSX Part
  sorted = sorted.slice(
    (currentPage - 1) * productsPerPage, currentPage * productsPerPage
  )



  const formatted = (element) => {
    
    if (moment(element, moment.ISO_8601, true).isValid() === true) return moment(element).format("MMM Do YY")
    // if (['expired', 'active', 'disabled', 'inactive'].includes(element)) return renderStatus(element)
    return elipsify(element, 15)
  }

  const renderToggleButton = (el, i) => {
    console.log("ELEMENT ", el)
    console.log('active? prop ', toggleActive[Object.keys(toggleActive)[0]], 'element val ', el[toggleActive[Object.keys(toggleActive)[0]]])
    console.log("enabled ", toggleActive[Object.keys(toggleActive)[0]] !== el[toggleActive[Object.keys(toggleActive)[0]]])

    return (
      <>
      {
      el.inactive !== 'expired'  ?
      <ToggleButton 
      isEnabled={el[toggleActive[Object.keys(toggleActive)[0]]] === toggleActive[Object.keys(toggleActive)[0]]} 
      handleChange={toggleAction} 
      id={el[toggledId]}
      key={i}
      />
      :
      <ToggleButton grayedOut={true} isEnabled={true}/>
      }
     
      </>
    )
  }


  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {renderHeadings()}
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="table-auto">
                {validating &&
                  <tr className="animate-pulse bg-green-400">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="flex-grow h-10"></div>
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
              <tbody>
                {listData.length > 0 && sorted.map((el, i) => (
                  <>
                    <tr className="divide-y-2" key={i}>
                      {
                        renderListItems(el, doubled)
                      }
                      <td className="divide-y-2 px-6 py-4 whitespace-nowrap text-right text-sm font-medium ">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td>
                      {canToggle &&
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" key={i}>
                          {
                          renderToggleButton(el, i)
                          }
                        </td>
                      }
                    </tr>
                  </>
                )
                )}
              </tbody>
            </table>
            <Pagination pageSelect={paginate} perPage={perPage} currentPage={currentPage} count={listData.length} />
          </div>
        </div>
      </div>
    </div>
  )
}
