import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import {
  CAvatar,
  CCard,
  CCardBody,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCardHeader
} from '@coreui/react'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

import Notifications from '../pages/Notifications/Notifications';
import api from '../../Services/DataControlService';

const moment = require('moment');

const Dashboard = () => {

  const navigate = useNavigate();

  const [recetUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [])

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
    const fetchUsers = async () => {
      const data = await api.get("v1/recent/user", {
        headers: {
          authorization: 'Bearer '.concat(localStorage.getItem("token")),
        },
      });
      console.log(data.data.msg)
      setRecentUsers(data.data.msg);
    };

    const interval = setInterval(() => {
      fetchUsers();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
    }
  }, [])

  return (
    <>
      {localStorage.getItem("role") === "admin" && <Notifications />}
      {localStorage.getItem("role") === "admin" && <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              Recent Logins
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>First Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Last Name</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Last Login</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {recetUsers.map((item) => (
                    <CTableRow v-for="item in tableItems" key={item._id}>
                      <CTableDataCell>
                        <div>{item.first_name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.last_name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.email}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{moment(item.last_login).format('dddd, MMMM Do YYYY, h:mm:ss a')}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      }
      {/* <WidgetsDropdown />
      <WidgetsBrand withCharts /> */}
    </>
  )
}

export default Dashboard
