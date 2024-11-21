import { useSelector } from 'react-redux';


const Mapping = () => {

    const selectedProject = useSelector((state) => state.projects.selectedProject);
    console.log('Current project from the map view:', selectedProject.name);
    console.log('Current project description - map view:', selectedProject.description);


    return (
        <div>
            <h1>Map View</h1>
        </div>
    );
};

export default Mapping;