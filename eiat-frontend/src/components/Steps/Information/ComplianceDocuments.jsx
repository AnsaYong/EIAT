import { Gauge } from '@mantine/core';
import { useSelector } from 'react-redux';

const ComplianceDocuments = () => {
    const selectedProject = useSelector((state) => state.projects.selectedProject);


    return (
        <div>
            <Gauge label="Compliance" value={selectedProject.compliance_level || 50} />
            <ul>
                {selectedProject.project_documents.map((doc) => (
                    <li key={doc.id}>{doc.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default ComplianceDocuments;