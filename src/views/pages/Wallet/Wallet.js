import React, { useEffect, useState } from 'react'

import {
    CRow,
    CCol,
    CWidgetStatsA,
} from '@coreui/react'

import api from '../../../Services/DataControlService'

const Wallet = () => {
    const [amount, setAmount] = useState(0)

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

            fetchWallet()
        }
    }, [amount])

    return (
        <CRow className='d-flex flex-row align-items-center  min-vw-100'>
            <CCol sm={6} lg={3}>
                <CWidgetStatsA
                    className="mb-4"
                    color="info"
                    value={`£ ${amount}`}
                    title="Wallet Amount"
                />
            </CCol>
        </CRow>
    )
}

export default Wallet