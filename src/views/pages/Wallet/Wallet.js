import React, { useEffect, useState } from 'react'

import {
    CRow,
    CCol,
    CWidgetStatsA,
} from '@coreui/react'

import api from '../../../Services/DataControlService'

const Wallet = () => {
    const [amount, setAmount] = useState(0)
    const [approved, setApproved] = useState(0)
    const [pending, setPending] = useState(0)
    const [available, setAvailable] = useState(0)

    useEffect(() => {
        if (localStorage.getItem("role") === "user") {
            const fetchWallet = async () => {
                const data = await api.get("v2/wallet/amount", {
                    headers: {
                        authorization: 'Bearer '.concat(localStorage.getItem("token")),
                    },
                });

                setAmount(data.data.msg.wallet);
            };

            const fetchAmountDetails = async () => {
                const data = await api.get("v2/user/month/balance", {
                    headers: {
                        authorization: 'Bearer '.concat(localStorage.getItem("token")),
                    },
                });

                setApproved(data.data.msg.approve_amount)
                setAvailable(data.data.msg.remaining)
                setPending(data.data.msg.pending_amount)
            }

            fetchWallet()
            fetchAmountDetails()
        }
    }, [amount])

    return (
        <CRow className='d-flex justify-content-center'>
            <CCol sm={3} lg={4}>
                <CWidgetStatsA
                    className="mb-4"
                    color="info"
                    value={`£ ${amount}`}
                    title="Wallet Amount"
                />
            </CCol>
            <CCol sm={3} lg={4}>
                <CWidgetStatsA
                    className="mb-4"
                    color="info"
                    value={`£ 2000`}
                    title="Monthly Limit"
                />
            </CCol>
            <CCol sm={3} lg={4}>
                <CWidgetStatsA
                    className="mb-4"
                    color="info"
                    value={`£ ${available}`}
                    title="Available Funds for request"
                />
            </CCol>
            <CCol sm={3} lg={4}>
                <CWidgetStatsA
                    className="mb-4"
                    color="info"
                    value={`£ ${approved}`}
                    title="Approved Funds"
                />
            </CCol>
            <CCol sm={3} lg={4}>
                <CWidgetStatsA
                    className="mb-4"
                    color="info"
                    value={`£ ${pending}`}
                    title="Pending Requested Funds"
                />
            </CCol>
        </CRow>
    )
}

export default Wallet