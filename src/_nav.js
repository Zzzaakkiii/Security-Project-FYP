import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
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
      name: 'Notification',
      to: '/notification',
    } : {
      component: CNavItem,
      name: '<- Back',
      to: '/',
    },

  localStorage.getItem("role") === "super-admin" ?
    {
      component: CNavItem,
      name: 'Create Admin',
      to: '/createAdmin',
    } : {
      component: CNavItem,
      name: '<- Back',
      to: '/',
    },
]

export default _nav
