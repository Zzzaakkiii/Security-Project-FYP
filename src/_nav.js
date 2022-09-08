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
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Login',
    to: '/login',
  },
  {
    component: CNavItem,
    name: 'Register',
    to: '/register',
  },
  {
    component: CNavItem,
    name: 'Create Admin',
    to: '/createAdmin',
  },
  {
    component: CNavItem,
    name: 'Error 404',
    to: '/404',
  },
  {
    component: CNavItem,
    name: 'Error 500',
    to: '/500',
  },
]

export default _nav
