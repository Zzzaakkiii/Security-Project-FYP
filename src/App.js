import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const CreatAdmin = React.lazy(() => import('./views/pages/createAdmin/CreateAdmin'))
const Notification = React.lazy(() => import('./views/pages/Notifications/Notifications'))
const RecentUsers = React.lazy(() => import('./views/pages/recentUsers/RecentUsers'))
const RequestAmount = React.lazy(() => import('./views/pages/RequestAmount/RequestAmount'))
const SAREquestLogs = React.lazy(() => import('./views/pages/RequestLogs/SAREquestLogs'))
const AREquestLogs = React.lazy(() => import('./views/pages/RequestLogs/ARequestLogs'))
const UREquestLogs = React.lazy(() => import('./views/pages/RequestLogs/URequestLogs'))
const FundNotification = React.lazy(() => import('./views/pages/FundNotification/FundNotification'))
const SuperFundNotification = React.lazy(() => import('./views/pages/SuperAdminNotify/SuperAdminNotify'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/createAdmin" name="Create Admin" element={<CreatAdmin />} />
            <Route exact path="/notification" name="Notifications" element={<Notification />} />
            <Route exact path="/recent" name="Recent Users" element={<RecentUsers />} />
            <Route exact path='/requestamount' name="Request Amount" element={<RequestAmount />} />
            <Route exact path='/fundnotify' name="Fund Requests" element={<FundNotification />} />
            <Route exact path='/superfundnotify' name="Super Fund Requests" element={<SuperFundNotification />} />
            <Route exact path='/salogs' name="Request SA Logs" element={<SAREquestLogs />} />
            <Route exact path='/alogs' name="Request A Logs" element={<AREquestLogs />} />
            <Route exact path='/ulogs' name="Request A Logs" element={<UREquestLogs />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
