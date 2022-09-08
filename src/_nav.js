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
  localStorage.getItem("role") === "admin" ?
    {
      component: CNavItem,
      name: '  Notification',
      to: '/notification',
      icon: <><CBadge color="danger">9</CBadge>
        <span className="visually-hidden">unread messages</span></>,
    } : {
      component: CNavItem,
      name: '',
      to: '/',
    },

  localStorage.getItem("role") === "super-admin" ?
    {
      component: CNavItem,
      name: 'Create Admin',
      to: '/createAdmin',
      icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    } : {
      component: CNavItem,
      name: '',
      to: '/',
    },
]

export default _nav
