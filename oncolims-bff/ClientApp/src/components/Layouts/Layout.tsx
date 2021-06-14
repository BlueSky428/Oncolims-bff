import React from 'react'
import { Sidebar, IProfileFooter, ProfileFooter, SidebarProps } from './Sidebar'
import useUser from '../../apis/auth/user'
import { UseQueryResult } from 'react-query'
import restricted from '../../Images/safe.png'

interface IClaim {
  type: string;
}

function Layout({children}: SidebarProps) {
  const claims: UseQueryResult = useUser();
  let data = claims?.data;
  // @ts-ignore
  let logoutUrl = data?.find(claim => claim.type === 'bff:logout_url') 
  
  // @ts-ignore
  let name = data?.find(claim => claim.type === 'name') ||  data?.find(claim => claim.type === 'sub');

  return (    
    <div className="min-h-screen max-h-screen bg-gray-50">
      <Sidebar>
      <div className="ml-10 mt-5 space-x-4">
          {
            !name && (
              <a
                href="/bff/login?returnUrl=/"
                className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
              >
                Login
              </a>
            )
          }
          {
            name && (
              <a
                href={logoutUrl?.value}
                className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
              >
                Logout
              </a>
            )
          }
          {/* <a
            href="#"
            className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
          >
            Register
          </a> */}
        </div>
        
        {name ? 
          <div className="py-6">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
              {children} 
            </div>
          </div>
        : (
          <div className="flex flex-1 max-w-2xl mx-auto">
            <img src={restricted} alt="unauthorized" className="object-cover" />
          </div>
        )}
      </Sidebar>
    </div>
  )
}

export default Layout
