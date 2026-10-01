import { Routes, Route } from 'react-router-dom';
import { CrmAuthProvider } from './CrmAuthContext';
import { RequireCrmAuth } from './RequireCrmAuth';
import { CrmLayout } from './CrmLayout';
import { CrmLogin } from './pages/CrmLogin';
import { CrmDashboard } from './pages/CrmDashboard';
import { CrmLeads } from './pages/CrmLeads';
import { CrmCustomers } from './pages/CrmCustomers';
import { CrmProjects } from './pages/CrmProjects';
import { CrmPortfolio } from './pages/CrmPortfolio';
import { CrmReviews } from './pages/CrmReviews'; // 👈 Import karein
import { CrmTasks } from './pages/CrmTasks';
import { CrmFollowups } from './pages/CrmFollowups';
import { CrmTeam } from './pages/CrmTeam';

export function CrmApp() {
  return (
    <CrmAuthProvider>
      <Routes>
        <Route path="login" element={<CrmLogin />} />
        <Route
          path="*"
          element={
            <RequireCrmAuth>
              <CrmLayout>
                <Routes>
                  <Route index element={<CrmDashboard />} />
                  <Route path="leads" element={<CrmLeads />} />
                  <Route path="customers" element={<CrmCustomers />} />
                  <Route path="projects" element={<CrmProjects />} />
                  <Route path="portfolio" element={<CrmPortfolio />} />
                  <Route path="reviews" element={<CrmReviews />} /> {/* 👈 Naya Route */}
                  <Route path="tasks" element={<CrmTasks />} />
                  <Route path="followups" element={<CrmFollowups />} />
                  <Route path="team" element={<CrmTeam />} />
                </Routes>
              </CrmLayout>
            </RequireCrmAuth>
          }
        />
      </Routes>
    </CrmAuthProvider>
  );
}