import React from 'react'
import { Sidebar, IProfileFooter, ProfileFooter, SidebarContent, SidebarProps } from './Sidebar'
import useClaim from '../../apis/auth/claims'
import { UseQueryResult } from 'react-query'
import restricted from '../../Images/safe.png'

function Layout({children}: SidebarProps) {

  // TODO abstract out auth
  const claims = useClaim();
  let data = claims?.data;
  let logoutUrl = data?.find(claim => claim.type === 'bff:logout_url') 
  let nameDict = data?.find(claim => claim.type === 'name') ||  data?.find(claim => claim.type === 'sub');
  let name = nameDict?.value;

  return (    
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar>
        <ProfileFooter>
          {
            !name ? (
              <a 
              href="/bff/login?returnUrl=/"
                className="w-full inline-block bg-emerald-500 py-2 px-4 border border-transparent rounded-md text-base text-center font-medium text-white hover:bg-opacity-75"
              >
                Login
              </a>
            ) : (
              <div className="flex-shrink-0 group block md:w-full ">
                <div className="flex items-center">
                  <div>  
                    <img
                      className="inline-block h-10 w-10 md:h-9 md:w-9 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt={`${name} Avatar`}
                    />
                  </div>
                  <div className="ml-3">
                    <p className="block text-base font-medium text-white md:text-sm">{name}</p>
                    <a 
                      href={logoutUrl?.value}
                      className="block mt-1 text-sm font-medium text-emerald-200 group-hover:text-white md:text-xs"
                    >
                      Logout
                    </a>
                  </div>
                </div>
              </div>
            )
          }
        </ProfileFooter>
      </Sidebar>

      <SidebarContent>
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
      </SidebarContent>
    </div>
  )
}

export default Layout
