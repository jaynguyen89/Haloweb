import Box from '@mui/material/Box';
import React, { FunctionComponent } from 'react';
import useStyles, { pinWrapperSx } from 'src/components/atoms/NumberCell/styles';
import 'src/components/atoms/NumberCell/styles.scss';

const NumberCell: FunctionComponent<{
    numOfCells?: number,
    align?: 'left' | 'center' | 'right',
}> = ({
    numOfCells = 6,
    align = 'center',
}) => {
    const styles = useStyles();

    return (
        <Box sx={{...pinWrapperSx, textAlign: align}}>
            {[...Array(numOfCells)].map((_, i) => (
                <input
                    key={i}
                    id={`number-cell-${i}`}
                    className={styles.cell}
                    type='number'
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

export default NumberCell;
