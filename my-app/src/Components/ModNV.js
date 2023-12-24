import '../Styles/ModNV.css'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faEnvelope,
  faIdCard,
  faWrench
} from '@fortawesome/free-solid-svg-icons'

function openNav () {
  document.getElementById('my_nav_link').style.width = '40%'
  document.getElementById('my_nav_link').style.display = 'block'
  document.getElementById('contact_us_mod_nv').style.display = 'block'

}

const ModNV = () => {
  return (
    <div>
      <header>
        <img src='./Assets/nom.png' className='w-28' />
        <nav id='my_nav_link' className='nav_links'>
          <ul  >
            <li>
              <a className='font-GODOFWAR' href='test'>
                <FontAwesomeIcon icon={faWrench} className=' pr-2' />
                MODERATION PAGE
              </a>
            </li>
            <li>
              <a className='font-GODOFWAR' href='test'>
                {' '}
                <FontAwesomeIcon icon={faIdCard} className=' pr-2' />
                PROFILE
              </a>
            </li>
            <li>
              <a
                className='font-GODOFWAR'
                href='test'
                id='contact_us_mod_nv'
                style={{ display: 'none' }}
              >
                <FontAwesomeIcon icon={faEnvelope} className=' pr-2' />
                CONTACT US
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <button className='mod_nv_button'>
            <a href='test'>
              {' '}
              <FontAwesomeIcon icon={faEnvelope} /> CONTACT US
            </a>
          </button>
          <div className='mod_nv_sidebar_icon'>
            <FontAwesomeIcon
              size='2x'
              icon={faBars}
              className=' w-8'
              onClick={() => openNav()}
            />
          </div>
        </div>
      </header>
    </div>
  )
}

export default ModNV
