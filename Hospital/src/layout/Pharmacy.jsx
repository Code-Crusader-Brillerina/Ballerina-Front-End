import React from 'react'
import { Outlet } from 'react-router-dom'

const Pharmacy = () => {
  return (
    <div>
      <main >
        <Outlet />
      </main>
    </div>
  )
}

export default Pharmacy;
