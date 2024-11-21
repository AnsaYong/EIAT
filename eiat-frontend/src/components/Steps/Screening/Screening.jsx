// This is the central point for the screening step and is rendered in the MainContent
// area of the DefaultLayout component when the user selects "Screening" from the sidebar.
import { useSelector } from 'react-redux';
import StepLayout from '@/components/Steps/StepLayout';

// Screening substep components
import RegulatoryCriteria from './RegulatoryCriteria';
import InitialEnvironmentalCheck from './InitialEnvironmentalCheck';
import ProjectScopeDefinition from './ProjectScope';
import StakeholderImpactAnalysis from './StakeholderImpactAnalysis';
import PreliminaryRiskAssessment from './PreliminaryRiskAssessment';


const Screening = () => {
    const selectedProject = useSelector((state) => state.projects.selectedProject);
    console.log('Current project from the screening step:', selectedProject.name);

    const tabs = [
        { label: 'Regulatory Criteria', value: 'regulatory-criteria' },
        { label: 'Initial Environmental Check', value: 'initial-environmental-check' },
        { label: 'Project Scope Definition', value: 'project-scope' },
        { label: 'Stakeholder Impact', value: 'stakeholder-impact-analysis' },
        { label: 'Preliminary Risk Assessment', value: 'preliminary-risk-assessment' },
    ];

    return (
        <StepLayout tabs={tabs} defaultTab="regulatory-criteria">
            {[RegulatoryCriteria, InitialEnvironmentalCheck, ProjectScopeDefinition, StakeholderImpactAnalysis, PreliminaryRiskAssessment]}
        </StepLayout>
    );
};

export default Screening;