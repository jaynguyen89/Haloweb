import Box from '@mui/material/Box';
import React, { FunctionComponent, useEffect, useState } from 'react';
import useStyles, { pinWrapperSx } from 'src/components/atoms/PinCell/styles';
import _cloneDeep from 'lodash/cloneDeep';
import 'src/components/atoms/PinCell/styles.scss';

const PinCell: FunctionComponent<{
    numOfCells?: number,
    align?: 'left' | 'center' | 'right',
    disabled?: boolean,
    type?: 'number' | 'text',
    onChange: (pin: string) => void,
}> = ({
    numOfCells = 6,
    align = 'center',
    disabled = false,
    type = 'number',
    onChange,
}) => {
    const styles = useStyles();
    const [pin, setPin] = useState<Array<string>>([...Array(numOfCells).fill('')]);

    const handleOnInput = (value: string, index: number) => {
        if (index < numOfCells - 1 && value)
            document.getElementById(`pin-cell-${index + 1}`)?.focus();

        const pinClone = _cloneDeep(pin);
        pinClone[index] = value.toUpperCase();
        setPin(pinClone);
    };

    useEffect(() => {
        if (pin.length === numOfCells) onChange(pin.join(''));
    }, [pin]);

    return (
        <Box sx={{...pinWrapperSx, textAlign: align}}>
            {[...Array(numOfCells)].map((_, i) => (
                <input
                    disabled={disabled}
                    key={i}
                    id={`pin-cell-${i}`}
                    className={styles.cell}
                    type={type}
                    maxLength={1}
                    inputMode='numeric'
                    value={pin[i]}
                    onInput={(e) => {
                        if (e.currentTarget.value.length > e.currentTarget.maxLength) {
                            e.currentTarget.value = e.currentTarget.value.slice(0, e.currentTarget.maxLength);
                            return;
                        }

                        handleOnInput(e.currentTarget.value, i);
                    }}
                />
            ))}
        </Box>
    );
};

export default PinCell;
