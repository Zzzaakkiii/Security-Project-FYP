import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CRow,
    CFormLabel,
    CFormTextarea,
    CCardHeader,
} from '@coreui/react'

import api from '../../../Services/DataControlService';

const RequestAmount = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [amount, setAmount] = useState();
    const [reason, setReason] = useState();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleAmountChange = e => {
        setAmount(e.target.value)
    }

    const handleReasonChange = e => {
        setReason(e.target.value)
    }

    const requestFunds = async () => {
        const request = {
            amount: amount,
            reason: reason
        };

        try {
            const response = await api.post("v2/payment/request", request, {
                headers: {
                    authorization: 'Bearer '.concat(localStorage.getItem("token")),
                }
            });
            setError(false);
            setErrorMessage("");
            setSuccess(true);
            setSuccessMessage(response.data.msg)
            return response;
        }
        catch (err) {
            setError(true);
            setErrorMessage(err.response.data.msg);
            setSuccess(false);
            setSuccessMessage("");
        }

        return 0;
    }

    return (
        <div className={location.pathname === "/dashboard" ? "bg-light min-vh-50 d-flex flex-row align-items-center" : "bg-light min-vh-100 d-flex flex-row align-items-center"}>
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCard className="p-4">
                            <CCardHeader>
                                {location.pathname === "/requestamount" &&
                                    <CButton onClick={() => navigate(-1)}><span>&#8629;</span></CButton>}
                                <strong>  Fund Request</strong>
                            </CCardHeader>
                            <CCardBody>
                                <CForm>
                                    <h1>Request Funds from Admin</h1>
                                    <p className="text-medium-emphasis">Add appropriate reason</p>
                                    <CInputGroup className="mb-4">
                                        <CFormLabel htmlFor='amount' style={{ "paddingRight": "5px" }}>
                                            Amount
                                        </CFormLabel>
                                        <CFormInput placeholder="Amount" type='number' min={0} id='amount' onChange={handleAmountChange} />
                                    </CInputGroup>
                                    <CInputGroup className="mb-4">
                                        <CFormLabel htmlFor='reason' style={{ "paddingRight": "7px" }}>
                                            Reason
                                        </CFormLabel>
                                        <CFormTextarea
                                            type="text"
                                            placeholder="Reason"
                                            id='reason'
                                            onChange={handleReasonChange}
                                        />
                                    </CInputGroup>
                                    <CRow>
                                        <CCol xs={6}>
                                            <CButton color="primary" className="px-4" onClick={requestFunds}>
                                                Submit Request
                                            </CButton>
                                        </CCol>
                                    </CRow>
                                    {error && <span style={{ color: "red", textAlign: "center", margin: "5px" }}>{errorMessage}</span>}
                                    {success && <span style={{ color: "green", textAlign: "center", margin: "5px" }}>{successMessage}</span>}
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default RequestAmount
