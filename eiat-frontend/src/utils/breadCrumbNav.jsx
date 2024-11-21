import { Breadcrumbs, Anchor } from '@mantine/core';

const StepBreadcrumbs = ({ steps, currentStep, onStepChange }) => (
    <Breadcrumbs>
        {steps.map((step, index) => (
            <Anchor
                key={index}
                href="#"
                onClick={() => onStepChange(step.value)}
                style={{
                    fontWeight: step.value === currentStep ? 'bold' : 'normal',
                }}
            >
                {step.label}
            </Anchor>
        ))}
    </Breadcrumbs>
);

export default StepBreadcrumbs;
