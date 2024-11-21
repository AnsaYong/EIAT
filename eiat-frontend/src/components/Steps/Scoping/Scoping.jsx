import { useSelector } from 'react-redux';


const Scoping = () => {

    const selectedProject = useSelector((state) => state.projects.selectedProject);
    console.log('Current project from the scoping step:', selectedProject.name);
    console.log('Current project description - scoping step:', selectedProject.description);


    return (
        <div>
            <h1>Scoping</h1>
        </div>
    );
};

export default Scoping;