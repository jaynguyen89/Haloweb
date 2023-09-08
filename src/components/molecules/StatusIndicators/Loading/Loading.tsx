import React from 'react';
import { Box } from '@mui/material';
import 'src/components/molecules/StatusIndicators/Loading/loading.scss';
import { useIsStageIncluded } from 'src/hooks/useStage';

const variants = {
    falling: 'dot-falling',
    elastic: 'dot-elastic',
    pulsing: 'dot-pulse',
    flashing: 'dot-flashing',
    colliding: 'dot-collision',
    rotating: 'dot-carousel',
    jumping: 'dot-typing',
    circling: 'dot-windmill',
    floating: 'dot-floating',
};

type TLoading = {
    variant?: keyof typeof variants,
    stage: string,
};

const Loading = ({
    stage,
    variant = 'elastic',
}: TLoading) => {
    const visible = stage === 'showcase' || useIsStageIncluded(stage);
    if (!visible) return null;

    return (
        <div data-title={variants[variant]}>
            <div className='stage'>
                <div className={variants[variant]} />
            </div>
        </div>
    );
};

export default Loading;
