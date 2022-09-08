import React from 'react'
import CIcon from '@coreui/icons-react'
import { CBadge } from '@coreui/react'
import {
  cilNotes,
  cilSpeedometer,
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Notification',
    to: '/notification',
    icon: <>
      <CBadge color="danger">9</CBadge>
      <span className="visually-hidden">unread messages</span>
    </>,
  },
  {
    component: CNavItem,
    name: 'CreateAdmin',
    to: '/createAdmin',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
]

export default _nav
