import { Timeline } from '@mantine/core';
import { useSelector } from 'react-redux';

const TimelineComponent = ({ project }) => (
    <Timeline active={project.timeline ? project.timeline.length - 1 : 0}>
        {project.timeline.map((event, index) => (
            <Timeline.Item title={event.title} key={index}>
                {event.description}
            </Timeline.Item>
        ))}
    </Timeline>
);

export default TimelineComponent;