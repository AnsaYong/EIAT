import './App.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components and layout
import { DefaultLayout } from './components/Layouts';
import LoadProjectModal from './components/Modals/LoadProjectModal';
import { ResizerProvider } from './hooks/ResizerContext';

// Redux actions
import { openLoadProjectModal } from '@/redux/modals/modalSlice';

//import { ipcRenderer } from 'electron';


function App() {
  const dispatch = useDispatch();
  const selectedProject = useSelector((state) => state.projects.selectedProject);  // Gets the current project from Redux
  const modalOpen = useSelector((state) => state.modal.loadProjectModalOpen); // Checks if the modal is open
  
  // Open the load project modal on app launch if no project is selected
  useEffect(() => {
    if (!selectedProject) {
        dispatch(openLoadProjectModal());
    }
}, [selectedProject, dispatch]);

  // Listener for online event to trigger sync process
  // useEffect(() => {
  //   const handleOnline = () => {
  //     console.log('App is back online. Syncing offline changes...');
  //     ipcRenderer.send('sync-queue'); // Trigger sync from Electron
  //     // Optionally, you can notify the user about syncing
  //   };

  //   const handleOffline = () => {
  //     console.log('App is offline. Please check your internet connection.');
  //     // Optionally, you can notify the user that they're offline
  //   };

  //   window.addEventListener('online', handleOnline);
  //   window.addEventListener('offline', handleOffline);

  //   return () => {
  //     window.removeEventListener('online', handleOnline);
  //     window.removeEventListener('offline', handleOffline);
  //   };
  // }, []);

  return (
    <ResizerProvider>
      <DefaultLayout>
        <div>
          {modalOpen && <LoadProjectModal />}
        </div>
      </DefaultLayout>
    </ResizerProvider>
  );
}

export default App;
