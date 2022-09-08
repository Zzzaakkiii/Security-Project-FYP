import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import Notifications from '../pages/Notifications/Notifications';
import RecentUsers from '../pages/recentUsers/RecentUsers';
import RequestAmount from '../pages/RequestAmount/RequestAmount';
import FundNotification from '../pages/FundNotification/FundNotification';
import SuperFundNotification from '../pages/SuperAdminNotify/SuperAdminNotify';
import Wallet from '../pages/Wallet/Wallet';

const Dashboard = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [])

  return (
    <>
      {localStorage.getItem("role") === "user" && <Wallet />}
      {localStorage.getItem("role") === "admin" && <Notifications />}
      {localStorage.getItem("role") === "admin" && <FundNotification />}
      {localStorage.getItem("role") === "admin" && <RecentUsers />}
      {localStorage.getItem("role") === "user" && <RequestAmount />}
      {localStorage.getItem("role") === "super-admin" && <SuperFundNotification />}
    </>
  )
}

export default Dashboard