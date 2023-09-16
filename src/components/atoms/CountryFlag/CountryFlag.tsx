import React, { CSSProperties } from 'react';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import useStyles from 'src/components/atoms/CountryFlag/styles';

// https://flagicons.lipis.dev/

interface ICountryFlag {
    isoCountryCode: string,
    variant?: 'square' | 'rectangle',
    center?: true,
    styles?: CSSProperties,
    className?: string,
}

const CountryFlag = ({
    isoCountryCode,
    variant = 'rectangle',
    center,
    styles: extraStyles,
    className: extraClasses,
}: ICountryFlag) => {
    const styles = useStyles();

    return (
        <span
            className={`fi fi-${isoCountryCode.toLowerCase()} ${variant === 'square' ? 'fis' : ''} ${center ? styles.center : undefined} ${extraClasses}`}
            style={extraStyles}
        />
    );
};

export default CountryFlag;
