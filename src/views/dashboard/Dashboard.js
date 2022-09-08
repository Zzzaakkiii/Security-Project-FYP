import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

import Notifications from '../pages/Notifications/Notifications';
import RecentUsers from '../pages/recentUsers/RecentUsers';

const moment = require('moment');

const Dashboard = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [])

  return (
    <>
      {localStorage.getItem("role") === "admin" && <Notifications />}
      {localStorage.getItem("role") === "admin" && <RecentUsers />}
      {/* <WidgetsDropdown />
      <WidgetsBrand withCharts /> */}
    </>
  )
}

export default Dashboard
