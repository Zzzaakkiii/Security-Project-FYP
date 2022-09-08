import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CCardHeader,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import api from '../../../Services/DataControlService';
const _token = localStorage.getItem("token");

const CreatAdmin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleFNameChange = e => {
        setFirstName(e.target.value)
    }

    const handleLNameChange = e => {
        setLastName(e.target.value)
    }

    const handleEmailChange = e => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value)
    }

    const onSubmit = async () => {
        const res = await adminCreate();
        if (res) {
            setSuccess(true);
            setSuccessMessage(res.data.msg)
        } else {
            setSuccess(false);
            setSuccessMessage("");
        }
    }

    const adminCreate = async () => {
        const request = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
        };

        try {
            const response = await api.post("v3/create/admin", request, {
                headers: {
                    authorization: 'Bearer '.concat(_token),
                },
            });
            setError(false);
            setErrorMessage("");
            setSuccess(false);
            setSuccessMessage("");
            return response;
        }
        catch (err) {
            setError(true);
            setErrorMessage(err.response.data.msg);
        }

        return 0;
    }

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardHeader>
                                {location.pathname === "/createAdmin" &&
                                    <CButton onClick={() => navigate(-1)}><span>&#8629;</span></CButton>}
                                <strong>  Create Admin</strong>
                            </CCardHeader>
                            <CCardBody className="p-4">
                                <CForm>
                                    <h1>Create New Admin</h1>
                                    <p className="text-medium-emphasis">Add credentials of new Admin</p>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                        </CInputGroupText>
                                        <CFormInput placeholder="First Name" autoComplete="FirstName" onChange={handleFNameChange} />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                        </CInputGroupText>
                                        <CFormInput placeholder="Last Name" autoComplete="LastName" onChange={handleLNameChange} />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>@</CInputGroupText>
                                        <CFormInput placeholder="Email" autoComplete="email" onChange={handleEmailChange} />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormInput
                                            type="password"
                                            placeholder="Password"
                                            autoComplete="new-password"
                                            onChange={handlePasswordChange}
                                        />
                                    </CInputGroup>
                                    <div className="d-grid">
                                        <CButton color="success" onClick={onSubmit}>Create Admin</CButton>
                                    </div>
                                </CForm>
                                {error && <span style={{ color: "red", textAlign: "center", margin: "5px" }}>{errorMessage}</span>}
                                {success && <span style={{ color: "green", textAlign: "center", margin: "5px" }}>{successMessage}</span>}
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default CreatAdmin
