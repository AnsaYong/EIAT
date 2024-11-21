// Information.jsx
import { useSelector } from 'react-redux';
import StepLayout from '@/components/Steps/StepLayout';

// Tab Components (detailed further below)
import Overview from './Overview';
import PhaseInfographic from './PhaseInfographic';
import FinancialEnvironmental from './FinancialEnvironmental';
//import LocationGIS from './Tabs/LocationGIS';
//import TeamStakeholders from './Tabs/TeamStakeholders';
//import ComplianceDocuments from './Tabs/ComplianceDocuments';
//import Timeline from './Tabs/Timeline';

const Information = () => {
    const selectedProject = useSelector((state) => state.projects.selectedProject);
    console.log('Current project from the Info tab:', selectedProject.name);

    const tabs = [
        { label: 'Overview', value: 'overview' },
        { label: 'Progress', value: 'phases' },
        { label: 'Financial & Environmental', value: 'financial-environmental' },
        //{ label: 'Location & GIS', value: 'location-gis' },
        //{ label: 'Team & Stakeholders', value: 'team-stakeholders' },
        //{ label: 'Compliance & Documents', value: 'compliance-documents' },
        //{ label: 'Timeline', value: 'timeline' },
    ];

    return (
        //<StepLayout tabs={tabs} defaultTab="overview">
        //    {[Overview, PhaseInfographic, FinancialEnvironmental, LocationGIS, TeamStakeholders, ComplianceDocuments, Timeline]}
        //</StepLayout>
        <StepLayout
            tabs={tabs}
            defaultTab="overview">
            {[Overview, PhaseInfographic]}
        </StepLayout>
    );
};

export default Information;
