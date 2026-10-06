import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { NewBookingModal } from '../modals/NewBookingModal';

// Screens
import { DashboardScreen } from '../screens/DashboardScreen';
import { MemberDashboardScreen } from '../screens/MemberDashboardScreen';
import { MemberOverviewScreen } from '../screens/member/MemberOverviewScreen';
import { MemberGolfScreen } from '../screens/member/MemberGolfScreen';
import { MemberTennisScreen } from '../screens/member/MemberTennisScreen';
import { MemberDiningScreen } from '../screens/member/MemberDiningScreen';
import { MemberEventsScreen } from '../screens/member/MemberEventsScreen';
import { MemberReservationsScreen } from '../screens/member/MemberReservationsScreen';
import { MemberProfileScreen } from '../screens/member/MemberProfileScreen';
import { UnifiedInboxScreen } from '../screens/UnifiedInboxScreen';
import { ConversationDetailScreen } from '../screens/ConversationDetailScreen';
import { MasterCalendarScreen } from '../screens/MasterCalendarScreen';
import { EventInquiriesScreen } from '../screens/EventInquiriesScreen';
import { EventDetailScreen } from '../screens/EventDetailScreen';
import { VenuesPackagesScreen } from '../screens/VenuesPackagesScreen';
import { TeeSheetScreen } from '../screens/TeeSheetScreen';
import { GolfBookingDetailScreen } from '../screens/GolfBookingDetailScreen';
import { FacilityBookingsScreen } from '../screens/FacilityBookingsScreen';
import { MemberDirectoryScreen } from '../screens/MemberDirectoryScreen';
import { PaymentsTransactionsScreen } from '../screens/PaymentsTransactionsScreen';
import { AIReviewQueueScreen } from '../screens/AIReviewQueueScreen';
import { KnowledgeRulesScreen } from '../screens/KnowledgeRulesScreen';
import { ReportsScreen } from '../screens/ReportsScreen';
import { StaffPermissionsScreen } from '../screens/StaffPermissionsScreen';
import { IntegrationsHealthScreen } from '../screens/IntegrationsHealthScreen';
import { ConfigurationScreen } from '../screens/ConfigurationScreen';

export const AppLayout: React.FC = () => {
  const { activeScreen, currentRole, language } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newBookingModalOpen, setNewBookingModalOpen] = useState(false);

  const renderScreen = () => {
    // Role-based strict isolation
    if (currentRole === 'member') {
      switch (activeScreen) {
        case 'member_golf':
          return <MemberGolfScreen />;
        case 'member_tennis':
          return <MemberTennisScreen />;
        case 'member_dining':
          return <MemberDiningScreen />;
        case 'member_events':
          return <MemberEventsScreen />;
        case 'member_reservations':
          return <MemberReservationsScreen />;
        case 'member_profile':
          return <MemberProfileScreen />;
        case 'member_dashboard':
        default:
          return <MemberOverviewScreen />;
      }
    }

    // Admin / Staff view: if activeScreen is member_dashboard, redirect to Admin Dashboard
    if (activeScreen === 'member_dashboard') {
      return <DashboardScreen />;
    }

    switch (activeScreen) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'inbox':
        return <UnifiedInboxScreen />;
      case 'conversation_detail':
        return <ConversationDetailScreen />;
      case 'master_calendar':
        return <MasterCalendarScreen />;
      case 'event_inquiries':
        return <EventInquiriesScreen />;
      case 'event_detail':
        return <EventDetailScreen />;
      case 'venues_packages':
        return <VenuesPackagesScreen />;
      case 'tee_sheet':
        return <TeeSheetScreen />;
      case 'golf_booking_detail':
        return <GolfBookingDetailScreen />;
      case 'facility_bookings':
        return <FacilityBookingsScreen />;
      case 'member_directory':
        return <MemberDirectoryScreen />;
      case 'payments_transactions':
        return <PaymentsTransactionsScreen />;
      case 'ai_review_queue':
        return <AIReviewQueueScreen />;
      case 'knowledge_rules':
        return <KnowledgeRulesScreen />;
      case 'reports':
        return <ReportsScreen />;
      case 'staff_permissions':
        return <StaffPermissionsScreen />;
      case 'integrations_health':
        return <IntegrationsHealthScreen />;
      case 'configuration':
        return <ConfigurationScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans text-neutral-900">
      
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area (offset by 72px on lg screens for sidebar) */}
      <div className="lg:pl-72 flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <TopHeader
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenNewBooking={() => setNewBookingModalOpen(true)}
        />

        {/* Viewport Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderScreen()}
        </main>
      </div>

      {/* Global New Booking / Hold Modal */}
      <NewBookingModal
        isOpen={newBookingModalOpen}
        onClose={() => setNewBookingModalOpen(false)}
      />

    </div>
  );
};
