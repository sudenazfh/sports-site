import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import SignupUser from './pages/SignupUser.jsx'
import SignupAgent from './pages/SignupAgent.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import SetNewPassword from './pages/SetNewPassword.jsx'
import EventCheckout from './pages/EventCheckout.jsx'
import PaymentProcessing from './pages/PaymentProcessing.jsx'
import RegistrationConfirmed from './pages/RegistrationConfirmed.jsx'
import MembershipPlan from './pages/MembershipPlan.jsx'
import MembershipPayment from './pages/MembershipPayment.jsx'
import MembershipComplete from './pages/MembershipComplete.jsx'
import UserDashboard from './pages/UserDashboard.jsx'
import Browse from './pages/Browse.jsx'
import Favourites from './pages/Favourites.jsx'
import AttendedEvents from './pages/AttendedEvents.jsx'
import Messages from './pages/Messages.jsx'
import Notifications from './pages/Notifications.jsx'
import NotificationDetails from './pages/NotificationDetails.jsx'
import ProfileSettings from './pages/ProfileSettings.jsx'
import EventScreen from './pages/EventScreen.jsx'
import AgentProfile from './pages/AgentProfile.jsx'
import AgentDashboard from './pages/agent/AgentDashboard.jsx'
import AgentIncome from './pages/agent/AgentIncome.jsx'
import AgentIncomeDetails from './pages/agent/AgentIncomeDetails.jsx'
import AgentMemberDetail from './pages/agent/AgentMemberDetail.jsx'
import AgentEventReviews from './pages/agent/AgentEventReviews.jsx'
import CreateEvent from './pages/agent/CreateEvent.jsx'
import AgentMyEvents from './pages/agent/AgentMyEvents.jsx'
import AgentRequests from './pages/agent/AgentRequests.jsx'
import AgentMembers from './pages/agent/AgentMembers.jsx'
import AgentProfileSettings from './pages/agent/AgentProfileSettings.jsx'
import EventDetails from './pages/agent/EventDetails.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import { AccountRequests, Accounts, EventRequests } from './pages/admin/AdminLists.jsx'
import SystemIncome from './pages/admin/SystemIncome.jsx'
import AdminReports from './pages/admin/AdminReports.jsx'
import AdminAccountView from './pages/admin/AdminAccountView.jsx'
import AdminAccountRequestView from './pages/admin/AdminAccountRequestView.jsx'
import AdminAccountReport from './pages/admin/AdminAccountReport.jsx'
import AdminAgentView from './pages/admin/AdminAgentView.jsx'
import AdminUserView from './pages/admin/AdminUserView.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupUser />} />
        <Route path="/signup-agent" element={<SignupAgent />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/set-new-password" element={<SetNewPassword />} />
        <Route path="/checkout" element={<EventCheckout />} />
        <Route path="/checkout/:id" element={<EventCheckout />} />
        <Route path="/checkout/processing" element={<PaymentProcessing />} />
        <Route path="/checkout/confirmed" element={<RegistrationConfirmed />} />
        <Route path="/membership" element={<MembershipPlan />} />
        <Route path="/membership/payment" element={<MembershipPayment />} />
        <Route path="/membership/complete" element={<MembershipComplete />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/attended-events" element={<AttendedEvents />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/notification-details" element={<NotificationDetails />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/event" element={<EventScreen />} />
        <Route path="/event/:id" element={<EventScreen />} />
        <Route path="/agent-profile" element={<AgentProfile />} />
        <Route path="/agent/agent-profile" element={<AgentProfile role="agent" />} />
        <Route path="/visitor" element={<Browse visitor />} />
        <Route path="/visitor/event" element={<EventScreen visitor />} />
        <Route path="/visitor/event/:id" element={<EventScreen visitor />} />
        <Route path="/visitor/agent" element={<AgentProfile visitor />} />
        <Route path="/agent/browse" element={<Browse role="agent" />} />
        <Route path="/agent/event/:id" element={<EventScreen role="agent" />} />
        <Route path="/agent/dashboard" element={<AgentDashboard />} />
        <Route path="/agent/income" element={<AgentIncome />} />
        <Route path="/agent/income/events" element={<AgentIncomeDetails kind="events" />} />
        <Route path="/agent/income/members" element={<AgentIncomeDetails kind="members" />} />
        <Route path="/agent/members/:id" element={<AgentMemberDetail />} />
        <Route path="/agent/event-reviews/:id" element={<AgentEventReviews />} />
        <Route path="/agent/create-event" element={<CreateEvent />} />
        <Route path="/agent/create-event/:id" element={<CreateEvent />} />
        <Route path="/agent/my-events" element={<AgentMyEvents />} />
        <Route path="/agent/requests" element={<AgentRequests />} />
        <Route path="/agent/members" element={<AgentMembers />} />
        <Route path="/agent/messages" element={<Messages role="agent" />} />
        <Route path="/agent/notifications" element={<Notifications role="agent" />} />
        <Route path="/agent/profile" element={<AgentProfileSettings />} />
        <Route path="/agent/event-details" element={<EventDetails />} />
        <Route path="/agent/event-details/:id" element={<EventDetails />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/event-requests" element={<EventRequests />} />
        <Route path="/admin/account-requests" element={<AccountRequests />} />
        <Route path="/admin/accounts" element={<Accounts />} />
        <Route path="/admin/events" element={<Browse role="admin" />} />
        <Route path="/admin/system-income" element={<SystemIncome />} />
        <Route path="/admin/messages" element={<Messages role="admin" />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/report-view" element={<CreateEvent mode="report" />} />
        <Route path="/admin/reported-event/:id" element={<EventScreen role="admin" />} />
        <Route path="/admin/event-view" element={<CreateEvent mode="admin" />} />
        <Route path="/admin/event-view/:id" element={<CreateEvent mode="admin" />} />
        <Route path="/admin/account-view" element={<AdminAccountView />} />
        <Route path="/admin/account-view/:id" element={<AdminAccountView />} />
        <Route path="/admin/account-request-view" element={<AdminAccountRequestView />} />
        <Route path="/admin/account-report" element={<AdminAccountReport />} />
        <Route path="/admin/agent-view" element={<AdminAgentView />} />
        <Route path="/admin/user-view" element={<AdminUserView />} />
        <Route path="/admin/user-view/:id" element={<AdminUserView />} />
        <Route path="/admin/event-participants" element={<EventDetails admin />} />
        <Route path="/admin/event-reviews/:id" element={<AgentEventReviews admin />} />
        <Route path="/admin/profile" element={<ProfileSettings role="admin" />} />
      </Routes>
    </BrowserRouter>
  )
}
