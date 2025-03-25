import React, { ReactNode } from 'react'
import Navbar from '../components/Navabr'
import Sidebar from '../components/Sidebar'

const layout : React.FC<{children : ReactNode}> = ( { children }) => {
  return (
    <div>
      <Navbar />

      <div className="grid grid-cols-12 h-screen">
        {/* Sidebar */}
        <div className="col-span-2">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="col-span-10 flex flex-col">
          {/* Main Content */}
          <main className="flex-1 bg-gray-100">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default layout