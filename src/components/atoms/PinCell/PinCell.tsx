import Box from '@mui/material/Box';
import React, { FunctionComponent } from 'react';
import useStyles, { pinWrapperSx } from 'src/components/atoms/PinCell/styles';
import 'src/components/atoms/PinCell/styles.scss';

const PinCell: FunctionComponent<{
    numOfCells?: number,
    align?: 'left' | 'center' | 'right',
    disabled?: boolean,
    type?: 'number' | 'text',
}> = ({
    numOfCells = 6,
    align = 'center',
    disabled = false,
    type = 'number',
}) => {
    const styles = useStyles();

    return (
        <Box sx={{...pinWrapperSx, textAlign: align}}>
            {[...Array(numOfCells)].map((_, i) => (
                <input
                    disabled={disabled}
                    key={i}
                    id={`number-cell-${i}`}
                    className={styles.cell}
                    type={type}
                    maxLength={1}
                    inputMode='numeric'
                    onInput={(e) => {
                        if (e.currentTarget.value.length > e.currentTarget.maxLength)
                            e.currentTarget.value = e.currentTarget.value.slice(0, e.currentTarget.maxLength);
                    }}
                />
            ))}
        </Box>
    );
};

export default PinCell;
