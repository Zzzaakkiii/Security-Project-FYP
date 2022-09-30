import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CCardHeader,
    CButton,
} from '@coreui/react'

import api from '../../../Services/DataControlService';
const moment = require('moment');

const RecentUsers = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [recetUsers, setRecentUsers] = useState([]);

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role === "admin") {
            const fetchUsers = async () => {
                const data = await api.get("v1/recent/user", {
                    headers: {
                        authorization: 'Bearer '.concat(localStorage.getItem("token")),
                    },
                });
                setRecentUsers(data.data.msg);
            };

            fetchUsers();
        }
    }, [])
    return (
        <CRow>
            <CCol xs>
                <CCard className="mb-4">
                    <CCardHeader>
                        {location.pathname === "/recent" &&
                            <CButton onClick={() => navigate(-1)}><span>&#8629;</span></CButton>}
                        <strong>  Recent Users</strong>
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
    )
}

export default RecentUsers;