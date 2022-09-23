import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import Notifications from '../pages/Notifications/Notifications';
import RecentUsers from '../pages/recentUsers/RecentUsers';
import RequestAmount from '../pages/RequestAmount/RequestAmount';
import FundNotification from '../pages/FundNotification/FundNotification';
import SuperFundNotification from '../pages/SuperAdminNotify/SuperAdminNotify';
import SAREquestLogs from '../pages/RequestLogs/SAREquestLogs';
import AREquestLogs from '../pages/RequestLogs/ARequestLogs';
import UREquestLogs from '../pages/RequestLogs/URequestLogs';

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
      {localStorage.getItem("role") === "super-admin" && <SuperFundNotification />}
      {localStorage.getItem("role") === "super-admin" && <SAREquestLogs />}
      {localStorage.getItem("role") === "admin" && <Notifications />}
      {localStorage.getItem("role") === "admin" && <FundNotification />}
      {localStorage.getItem("role") === "admin" && <RecentUsers />}
      {localStorage.getItem("role") === "admin" && <AREquestLogs />}
      {localStorage.getItem("role") === "user" && <Wallet />}
      {localStorage.getItem("role") === "user" && <RequestAmount />}
      {localStorage.getItem("role") === "user" && <UREquestLogs />}
      <div></>
    </>
  )
}

export default Dashboard