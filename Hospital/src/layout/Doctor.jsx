import React from 'react'
import { Outlet } from 'react-router-dom'

const Doctor = () => {
  return (
    <div>
      <main >
        <Outlet />
      </main>
    </div>
  )
}

export default Doctor;
