import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [newArray, setNewArray] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("role") === "admin") {
      setNewArray(navigation.filter(e => e.name !== 'Create Admin' && e.name !== 'Request Amount' && e.name !== 'Super Fund Requests' && e.name !== 'Super Request Logs' && e.name !== 'Approved Request'))
    } else if (localStorage.getItem("role") === "super-admin") {
      setNewArray(navigation.filter(e => e.name !== 'Notification' && e.name !== 'Recent Users' && e.name !== 'Request Amount' && e.name !== 'Fund Requests' && e.name !== 'Admin Request Logs' && e.name !== 'Approved Request'))
    } else if (localStorage.getItem("role") === "user") {
      setNewArray(navigation.filter(e => e.name !== 'Notification' && e.name !== 'Recent Users' && e.name !== 'Create Admin' && e.name !== 'Fund Requests' && e.name !== 'Super Fund Requests' && e.name !== 'Super Request Logs' && e.name !== 'Admin Request Logs'))
    }
  }, [])

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={newArray} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
