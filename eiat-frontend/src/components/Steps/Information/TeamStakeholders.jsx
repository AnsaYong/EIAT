import { Carousel } from '@mantine/carousel';
import { Avatar, Text } from '@mantine/core';
import { useSelector } from 'react-redux';

const TeamStakeholders = () => {
    const selectedProject = useSelector((state) => state.projects.selected);

    return (
        <Carousel>
            {selectedProject.team_members.map((member) => (
                <div key={member.id}>
                    <Avatar src={member.photo_url} />
                    <Text>{member.name}</Text>
                </div>
            ))}
        </Carousel>
    );
};

export default TeamStakeholders;