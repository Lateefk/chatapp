import React from 'react'

export const Navbar = () => {
  return (
    <nav className='fixed top-0 w-full bg-opacity-50 bg-white backdrop-filter backdrop-blur-lg shadow-lg py-4'>

      <div className="container mx-auto px-4">

        <div className="flex justify-between items-center">

          <h1 className="text-xl font-bold text-amber-400">Banter</h1>
        </div>
        <button>Logout</button>
      </div>

    </nav>
  )
}
