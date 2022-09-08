import React, { useState } from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import api from '../../../Services/DataControlService';

const Register = () => {
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
    const res = await signup();
    if (res) {
      setSuccess(true);
      setSuccessMessage(res.data.msg)
    } else {
      setSuccess(false);
      setSuccessMessage("");
    }
  }

  const signup = async () => {
    const request = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
    };

    try {
      const response = await api.post("v2/auth/signup", request);
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
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
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
                    <CButton color="success" onClick={onSubmit}>Create Account</CButton>
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

export default Register
