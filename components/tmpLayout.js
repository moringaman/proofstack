import { useRouter } from 'next/router'
import Link from 'next/link'


const tmpLayout = ({children}) => {

    const router = useRouter()

    const manageLinks =[
        { name: 'Applications', link: '/applications'},
        { name: 'Licences', link: '/licences'}

    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

const renderLayout = (children) => {
    return (
        <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
    <aside
      className="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-indigo-500"
    >
      <div className="sidebar-header flex items-center justify-center py-4">
        <div className="inline-flex">
            <Link
                href="/"
            >
  <a href="#" className="inline-flex flex-row items-center">
             <img
                className="h-8 w-8 mr-3"
                src="./icon_white.png"
                alt="Workflow"
              />
            <span className="leading-10 text-gray-100 text-2xl font-bold ml-1">Proofstack</span>
          </a>
            </Link>
        </div>
      </div>
      <div className="sidebar-content px-4 py-6">
        <ul className="flex flex-col w-full">
          <li className="my-px">
              <Link href="/dashboard">
              <a
              href="#"
              className={classNames(
                router.pathname === "/dashboard"
                ? 'flex flex-row items-center h-10 px-3 rounded-lg text-gray-700 bg-gray-100'
                : 'flex flex-row items-center h-10 px-3 rounded-lg text-gray-300  hover:text-gray-700'
            )}
            >
              <span className="flex items-center justify-center text-lg text-gray-400">
                <svg
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </span>
              <span className="ml-3">Dashboard</span>
            </a>
              </Link>
          </li>
          <li className="my-px">
            <span className="flex font-medium text-sm text-gray-300 px-4 my-4 uppercase">Manage</span>
          </li>
          {
              manageLinks.map(item => (
                <li className="my-px">
                    <Link href={item.link}>
                    <a
                  href="#"
                  className={classNames(
                      router.pathname === item.link
                      ? 'flex flex-row items-center h-10 px-3 rounded-lg text-gray-700 bg-gray-100'
                      : 'flex flex-row items-center h-10 px-3 rounded-lg text-gray-300  hover:text-gray-700'
                  )}
                >
                  <span className="flex items-center justify-center text-lg text-gray-400">
                    <svg
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      />
                    </svg>
                  </span>
                  <span className="ml-3">{item.name}</span>
                </a>
                    </Link>
              </li>
              ))
          }
         
          {/* <li className="my-px">
            <a
              href="#"
              className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="flex items-center justify-center text-lg text-gray-400">
                <svg
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
              <span className="ml-3">Clients</span>
              <span
                className="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto"
              >1k</span>
            </a>
          </li> */}
          <li className="my-px">
            <a
              href="#"
              className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:text-gray-700"
            >
              <span className="flex items-center justify-center text-lg text-green-400">
                <svg
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <span className="ml-3">Add new</span>
            </a>
          </li>
          <li className="my-px">
            <span className="flex font-medium text-sm text-gray-300 px-4 my-4 uppercase">Account</span>
          </li>
          <li className="my-px">
            <a
              href="#"
              className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="flex items-center justify-center text-lg text-gray-400">
                <svg
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <span className="ml-3">Profile</span>
            </a>
          </li>
          <li className="my-px">
            <a
              href="#"
              className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="flex items-center justify-center text-lg text-gray-400">
                <svg
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </span>
              <span className="ml-3">Notifications</span>
              <span
                className="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto"
              >10</span>
            </a>
          </li>
          <li className="my-px">
            <a
              href="#"
              className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="flex items-center justify-center text-lg text-gray-400">
                <svg
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <span className="ml-3">Settings</span>
            </a>
          </li>
          <li className="my-px">
            <a
              href="#"
              className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="flex items-center justify-center text-lg text-red-400">
                <svg
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <span className="ml-3">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
    <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
      <header className="header bg-white shadow py-4 px-4">
        <div className="header-content flex items-center flex-row">
          <form action="#">
            <div className="hidden md:flex relative">
              <div
                className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <input
                id="search"
                type="text"
                name="search"
                className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-300 w-full h-10 focus:outline-none focus:border-indigo-400"
                placeholder="Search..."
              />
            </div>
            <div className="flex md:hidden">
              <a href="#" className="flex items-center justify-center h-10 w-10 border-transparent">
                <svg
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </a>
            </div>
          </form>
          <div className="flex ml-auto">
            <a href className="flex flex-row items-center">
              <img
                src="https://pbs.twimg.com/profile_images/378800000298815220/b567757616f720812125bfbac395ff54_normal.png"
                alt
                className="h-10 w-10 bg-gray-200 border rounded-full"
              />
              <span className="flex flex-col ml-2">
                <span className="truncate w-20 font-semibold tracking-wide leading-none">John Doe</span>
                <span className="truncate w-20 text-gray-500 text-xs leading-none mt-1">Manager</span>
              </span>
            </a>
          </div>
        </div>
      </header>
      <div className="main-content flex flex-col flex-grow p-4">
            { children }
      </div>
      <footer className="footer px-4 py-6">
        <div className="footer-content">
          <p className="text-sm text-gray-600 text-center">© Proofstack 2021. All rights reserved. <a href="https://webnostix.co.uk">by Webnostix</a></p>
        </div>
      </footer>
    </main>
  </div>
    )
}

return (
    <>
    { renderLayout(children) }
    </>
)
}

export default tmpLayout