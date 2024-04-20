import { IconName } from '@fortawesome/free-regular-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { useTheme } from '@mui/material';
import React, { useMemo } from 'react';

export type TIcon = Omit<FontAwesomeIconProps, 'icon'> & {
    wrapper: 'i' | 'fa',
    t?: 'str' | 'obj', // required when wrapper === 'fa'
    ic?: IconName | IconDefinition | string,
    variant?: 'fas' | 'far' | 'fal' | 'fab' | 'fat' | 'fad',
    animation?: 'beat' | 'beat-fade' | 'bounce' | 'fade' | 'flip' | 'shake' | 'spin' | 'spin-reverse' | 'spin-pulse', // only use when wrapper === 'i'
};

const FaIcon = ({
    wrapper,
    t,
    ic,
    variant = 'fas',
    animation,
    size = '1x',
    color,
    ...props
}: TIcon) => {
    const iconColor = color ?? useTheme().palette.primary.contrastText;

    if (wrapper === 'fa') {
        if (t === undefined || ic === undefined) return <FontAwesomeIcon icon={faQuestion} size='sm' color={iconColor} />;
        if (t === 'obj') return <FontAwesomeIcon {...props} size={size} icon={ic as IconDefinition} color={iconColor} />;

        return (
            <FontAwesomeIcon
                {...props}
                size={size}
                icon={[variant, ic as IconName]}
                color={iconColor}
            />
        );
    }

    const variantName = useMemo(() =>
        variant === 'fas' ? 'fa-solid'
        : variant === 'far' ? 'fa-regular'
        : variant === 'fal' ? 'fa-light'
        : variant === 'fab' ? 'fa-brands'
        : variant === 'fat' ? 'fa-thin'
        : 'fa-duotone',
        [variant],
    );

    const animationName = useMemo(() =>
        animation === undefined ? '' : `fa-${animation}`,
        [animation],
    );

    const styles = useMemo(() =>
        animation ? {color: iconColor, display: 'block'} : {color: iconColor},
        [animation],
    );

    return (
        <i className={`${variantName} fa-${ic} ${animationName} fa-${size}`} style={styles} />
    );
};

export default FaIcon;
