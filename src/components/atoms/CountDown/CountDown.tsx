import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import useStyles from 'src/components/atoms/CountDown/styles';

type TCountDownProps = {
    duration: number; // seconds
    display: 'text' | 'box',
};

/* Count down is limited within 60 minutes. */
const CountDown = ({ duration, display = 'text' }: TCountDownProps) => {
    const styles = useStyles();

    const [time, setTime] = React.useState(duration);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((time) => {
                if (time === 0) {
                    clearInterval(timer);
                    return 0;
                } else return time - 1;
            });
        }, 1000);
    }, []);

    if (display === 'text')
        return (
            <span className={styles.text}>
                {`${Math.floor(time / 60)}`.padStart(2, 0)}:{`${time % 60}`.padStart(2, 0)}
            </span>
        );

    return (
        <Box className={styles.box}>
            {`${Math.floor(time / 60)}`.padStart(2, 0)}:{`${time % 60}`.padStart(2, 0)}
        </Box>
    );
};

export default CountDown;
