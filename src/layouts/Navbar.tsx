import React from 'react'

const Navbar: React.FC = () => {
  return (
    <aside>
      <div className="nav">
        <ul>
          <li>
            <a href="/">Dashboard</a>
          </li>
          <li>
            <a href="/hanger">Hanger</a>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default Navbar
