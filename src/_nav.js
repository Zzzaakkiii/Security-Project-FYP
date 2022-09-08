import React from 'react'
import CIcon from '@coreui/icons-react'
import { CBadge } from '@coreui/react'
import {
  cilNotes,
  cilSpeedometer,
  cilBell,
  cilUser,
  cilMoney
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
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Fund Requests',
    to: '/fundnotify',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Create Admin',
    to: '/createAdmin',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Recent Users',
    to: '/recent',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Request Amount',
    to: '/requestamount',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
]

export default _nav
