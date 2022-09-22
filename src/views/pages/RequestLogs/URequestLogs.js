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

const URequestLogs = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role === "user") {
            const fetchRequests = async () => {
                const data = await api.get("v2/user/balance/sheet", {
                    headers: {
                        authorization: 'Bearer '.concat(localStorage.getItem("token")),
                    },
                })
                setRequests(data.data.msg);
            }

            const interval = setInterval(() => {
                fetchRequests();
            }, 2000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [])

    return (
        <CRow>
            <CCol xs>
                <CCard className="mb-4 mt-4">
                    <CCardHeader>
                        {location.pathname === "/ulogs" &&
                            <CButton onClick={() => navigate(-1)}><span>&#8629;</span></CButton>}
                        <strong>  Approved Fund Request</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead color="light">
                                <CTableRow>
                                    <CTableHeaderCell className="text-center">Requested Amount</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Request Time</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Request Status</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {requests.map((item, index) => (
                                    <CTableRow v-for="item in notifications" key={item._id}>
                                        <CTableDataCell className="text-center">
                                            {item.amount}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            {moment(item.created_at).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            Approved
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

export default URequestLogs