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

const FundNotification = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role === "admin") {
            const fetchNotifications = async () => {
                const data = await api.get("v1/admin/request", {
                    headers: {
                        authorization: 'Bearer '.concat(localStorage.getItem("token")),
                    },
                });
                setNotifications(data.data.msg);
            };

            const interval = setInterval(() => {
                fetchNotifications();
            }, 2000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [])

    const handleApproval = (decision, id) => {
        const approve = async () => {
            const request = {
                id: id,
                status: decision,
            };

            try {
                const data = await api.put("v1/admin/update", request, {
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
                        {location.pathname === "/fundnotify" &&
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
                                            <CButton onClick={() => handleApproval("approved", item._id)}>Approve</CButton>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <CButton onClick={() => handleApproval("rejected", item._id)}>Reject</CButton>
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

export default FundNotification