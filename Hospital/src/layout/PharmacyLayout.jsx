import React from 'react'
import { Outlet } from 'react-router-dom'

const PharmacyLayout = () => {
  return (
    <div>
      <main >
        <Outlet />
      </main>
    </div>
  )
}

export default PharmacyLayout;
