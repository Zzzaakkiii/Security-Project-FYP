import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilPeople,
} from '@coreui/icons'

import api from '../../../Services/DataControlService';
const moment = require('moment');

const AREquestLogs = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role === "admin") {
            const fetchRequests = async () => {
                const data = await api.get("v2/admin/balance/sheet", {
                    headers: {
                        authorization: 'Bearer '.concat(localStorage.getItem("token")),
                    },
                })
                setRequests(data.data.msg);
            }

            fetchRequests();
        }
    }, [])

    return (
        <CRow>
            <CCol xs>
                <CCard className="mb-4">
                    <CCardHeader>
                        {location.pathname === "/alogs" &&
                            <CButton onClick={() => navigate(-1)}><span>&#8629;</span></CButton>}
                        <strong>  Fund Request Logs</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead color="light">
                                <CTableRow>
                                    <CTableHeaderCell className="text-center">
                                        <CIcon icon={cilPeople} />
                                        <span> User</span>
                                    </CTableHeaderCell>
                                    <CTableHeaderCell>Requested Amount</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Request Reason</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Request Status</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Request Time</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {requests.map((item, index) => (
                                    <CTableRow v-for="item in notifications" key={item._id}>
                                        <CTableDataCell>
                                            {item.user.email}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {item.amount}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {item.reason}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {item.approval}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {moment(item.created_at).format('dddd, MMMM Do YYYY, h:mm:ss a')}
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

export default AREquestLogs