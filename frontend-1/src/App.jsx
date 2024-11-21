// App.jsx sets up the routes for the application using Routes and Route components from react-router-dom.
// The routes define paths which are mapped to components that are rendered when the path is matched.

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

import InitialSetup from './components/InitialSetup';
import ProjectList from './components/ProjectList';
import CreateProject from './components/CreateProject';
import MainWindow from './components/MainWindow';
import ProjectHome from './components/ProjectHome';

/* Screeninng components */
import Screening from './components/Screening/Screening';
import ScreeningOverview from './components/Screening/ScreeningOverview';
import RegulationsOverview from './components/Screening/RegulationsOverview';
import ProjectInfo from './components/Screening/ProjectInfo';
import EnvironmentalSensitivity from './components/Screening/EnvironmentalSensitivity';
import TriggeredActivities from './components/Screening/TriggeredActivities';
import ImpactPrediction from './components/Screening/ImpactPrediction';
import CompetentAuthority from './components/Screening/CompetentAuthority';
import ScreeningDecision from './components/Screening/ScreeningDecision';

/* Scoping components */
import Scoping from './components/Scoping/Scoping';
import ScopingOverview from './components/Scoping/ScopingOverview';
import ScopingPlan from './components/Scoping/ScopingPlan';
import ScopingResults from './components/Scoping/ScopingResults';
import StakeholderConsultation from './components/Scoping/StakeholderConsultation';
import KeyImpacts from './components/Scoping/KeyImpacts';
import Alternatives from './components/Scoping/Alternatives';
import TermsOfReference from './components/Scoping/TermsOfReference';

/* Geoprocessing components */
import GeoData from './components/Geoprocessing/GeoData';


const App = () => {
    return (
        <Router>
            <Routes>
                {/* Initial routes */}
                <Route path="/" element={<InitialSetup />} />
                <Route path="/projects" element={<ProjectList />} />
                <Route path="/create-project" element={<CreateProject />} /> 

                {/* Project Home page */}
                <Route path="/project/:id" element={<Navigate to="/project/:id/home" />} />

                {/* Main window as parent for all steps */}
                <Route path="/project/:id/*" element={<MainWindow />}>
                    {/* Default home route */}
                    <Route path="home" element={<ProjectHome />} />

                    {/* Geoprocessing rendered inside MainContent */}
                    <Route path="geo-data" element={<GeoData />} />

                    {/* Screening and its substeps rendered inside MainContent */}
                    <Route path="screening" element={<Screening />}>
                        {/* Redirect to Screening Overview if no substep is selected */}
                        <Route index element={<Navigate to="overview" replace />} /> 
                        <Route path="overview" element={<ScreeningOverview />} />
                        <Route path="regulations" element={<RegulationsOverview />} />
                        <Route path="project-info" element={<ProjectInfo />} />
                        <Route path="environmental-sensitivity" element={<EnvironmentalSensitivity />} />
                        <Route path="triggered-activities" element={<TriggeredActivities />} />
                        <Route path="impact-prediction" element={<ImpactPrediction />} />
                        <Route path="competent-authority" element={<CompetentAuthority />} />
                        <Route path="screening-decision" element={<ScreeningDecision />} />
                    </Route>

                    {/* Scoping and its substeps rendered inside MainContent */}
                    <Route path="scoping" element={<Scoping />}>
                        {/* Redirect to Scoping Overview if no substep is selected */}
                        <Route index element={<Navigate to="overview" replace />} />
                        <Route path="overview" element={<ScopingOverview />} />
                        <Route path="scoping-plan" element={<ScopingPlan />} />
                        <Route path="scoping-results" element={<ScopingResults />} />
                        <Route path="stakeholder-consultation" element={<StakeholderConsultation />} />
                        <Route path="key-impacts" element={<KeyImpacts />} />
                        <Route path="alternatives" element={<Alternatives />} />
                        <Route path="terms-of-reference" element={<TermsOfReference />} />
                    </Route>

                </Route>
            </Routes>
        </Router>
    );
}; 

export default App;
