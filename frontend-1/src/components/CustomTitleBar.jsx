// CustomTitleBar.jsx for displaying the title, user profile, and quick settings
import { useContext } from 'react';
import { ProjectContext } from './Context/ProjectContext';
import { Text, Group, Image, Divider, ActionIcon } from '@mantine/core';
import { IconAd } from '@tabler/icons-react';
import PlaceholderLogo from './Logo/placeholder-logo.png';


const CustomTitleBar = () => {
    const { project } = useContext(ProjectContext);

    const minimizeWindow = () => {
        window.electronAPI.minimize();
    };

    const maximizeWindow = () => {
        window.electronAPI.maximize();
    };

    const closeWindow = () => {
        window.electronAPI.close();
    };

    
    return (
        <div className="title-bar-wrapper">
            <Group position="apart" className="custom-title-bar" padding="md">
                <Group spacing="sm">
                    <Image src={PlaceholderLogo} alt="Logo" width={30} />
                    <Text className="title">{project ? `EIAT - ${project.name}` : 'Loading...'}</Text>
                </Group>
                <Group spacing="xs">
                    <ActionIcon onClick={minimizeWindow} variant="light" color="blue">
                        <IconAd />
                    </ActionIcon>
                    <ActionIcon onClick={maximizeWindow} variant="light" color="blue">
                        <IconAd />
                    </ActionIcon>
                    <ActionIcon onClick={closeWindow} variant="light" color="red">
                        <IconAd />
                    </ActionIcon>
                </Group>
            </Group>
            <Divider />
        </div>
    );
};

export default CustomTitleBar;
