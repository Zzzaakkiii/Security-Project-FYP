import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleSubmit = async () => {
    const res = await login();
    if (res) {
      setRole(res.data.data.role);
      setToken(res.data.data.token);
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("role", res.data.data.role);
      navigate('/dashboard', { replace: true });
    }
  }

  const login = async () => {
    const request = {
      email: email,
      password: password
    };

    try {
      const response = await api.post("v2/auth/login", request);
      setError(false);
      setErrorMessage("");
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
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" onChange={handleEmailChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={handlePasswordChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleSubmit}>
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                    {error && <span style={{ color: "red", textAlign: "center", margin: "5px" }}>{errorMessage}</span>}
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Do not have an account? Register now!</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
