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

const SuperFundNotification = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role === "super-admin") {
            const fetchNotifications = async () => {
                const data = await api.get("v3/superadmin/request", {
                    headers: {
                        authorization: 'Bearer '.concat(localStorage.getItem("token")),
                    },
                });
                setNotifications(data.data.msg);
            };

            fetchNotifications();
        }
    }, [])

    const handleApproval = request => {
        const approve = async () => {
            try {
                const data = await api.put("v3/superadmin/update/request", request, {
                    headers: {
                        authorization: 'Bearer '.concat(localStorage.getItem("token")),
                    }
                });
                return data;
            }
            catch (err) {
                console.log(err)
            }

            return 0;
        }
        approve();
    }

    return (
        <CRow>
            <CCol xs>
                <CCard className="mb-4">
                    <CCardHeader>
                        {location.pathname === "/superfundnotify" &&
                            <CButton onClick={() => navigate(-1)}><span>&#8629;</span></CButton>}
                        <strong>  Fund Requests</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead color="light">
                                <CTableRow>
                                    <CTableHeaderCell className="text-center">
                                        <CIcon icon={cilPeople} />
                                        <span> Fund Requests</span>
                                    </CTableHeaderCell>
                                    <CTableHeaderCell>Approve</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Reject</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {notifications.map((item, index) => (
                                    <CTableRow v-for="item in notifications" key={item._id}>
                                        <CTableDataCell>
                                            <div>New Fund Request from {item.user.first_name}</div>
                                            <div className="small text-medium-emphasis">
                                                <span>needs approval of amount: {item.amount}</span>
                                            </div>
                                            <div className="small text-medium-emphasis">
                                                <span>for reason: {item.reason}</span>
                                            </div>
                                            <div>
                                                <span>{moment(item.created_at).format('dddd, MMMM Do YYYY, h:mm:ss a')}</span>
                                            </div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <CButton onClick={() => handleApproval({ status: "approved", id: item._id, user_id: item.user._id, amount: item.amount })}>Approve</CButton>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <CButton onClick={() => handleApproval({ status: "rejected", id: item._id })}>Reject</CButton>
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

export default SuperFundNotification