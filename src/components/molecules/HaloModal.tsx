import React, { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import { modalBoxSx } from 'src/commons/styles';
import FaIcon from 'src/components/atoms/FaIcon';
import Grid from '@mui/material/Grid';
import { Modal, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { IconName } from '@fortawesome/free-regular-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

type THaloModalProps = PropsWithChildren & {
    modal: {
        open: boolean,
        setOpen: (open: boolean) => void,
        onClose?: () => void,
        label: string,
        description: string,
    },
    heading: {
        icon: string,
        text: string,
    },
    button: {
        icon?: IconName | IconDefinition | string,
        text: string,
        onClick?: () => void,
        disabled?: boolean,
    }
};

const HaloModal = ({
    modal,
    heading,
    button,
    children,
}: THaloModalProps) => {
    const theme = useTheme();

    return (
        <Modal
            open={modal.open}
            onClose={() => {
                modal.setOpen(false);
                modal.onClose && modal.onClose();
            }}
            aria-labelledby={modal.label}
            aria-describedby={modal.description}
        >
            <Box sx={modalBoxSx}>
                <div className='modal-wrapper'>
                    <h3>
                        <FaIcon
                            wrapper='i'
                            ic={heading.icon}
                            color={theme.palette.secondary.main}
                        />
                        <span style={{marginLeft: '10px'}}>{heading.text}</span>
                    </h3>

                    {children}

                    <Grid container spacing={2} style={{marginBottom: '10px'}}>
                        <Grid item xs={12}>
                            <Button
                                variant='contained'
                                disabled={button.disabled}
                                onClick={button.onClick}
                            >
                                {button.text}
                                {button.icon && (
                                    <FaIcon wrapper='i' t='obj' ic={button.icon} />
                                )}
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Box>
        </Modal>
    );
};

export default HaloModal;