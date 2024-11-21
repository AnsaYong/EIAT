import { Progress } from '@mantine/core';

const StepProgress = ({ current, total }) => (
    <Progress value={(current / total) * 100} />
);

export default StepProgress;
