import { AlertColor, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React, { FunctionComponent, useMemo } from 'react';
import vars from 'src/commons/variables/cssVariables.scss';

interface IMessage {
    message: string,
    type?: AlertColor,
}

interface IStatus {
    statuses: Array<string>,
    type?: AlertColor,
}

const useStyles = makeStyles((theme: Theme) => ({
    messageCaption: {
        fontSize: vars.xh10,
        fontWeight: vars.light,
        marginBottom: 0,
        marginTop: vars.h10,
        lineHeight: vars.sh9,
    },
    error: {
        color: theme.palette.error.main,
    },
    warning: {
        color: theme.palette.warning.main,
    },
    info: {
        color: theme.palette.info.main,
    },
    success: {
        color: theme.palette.success.main,
    },
}));

const MessageCaption = (props: IMessage | IStatus) => {
    const styles = useStyles();

    const color = useMemo(
        () => props.type === 'error'
            ? styles.error
            : props.type === 'warning'
            ? styles.warning
            : props.type === 'info'
            ? styles.info
            : props.type === 'success'
            ? styles.success
            : styles.error,
        [props.type],
    );

    if (props.hasOwnProperty('message'))
        return (<p className={clsx(styles.messageCaption, color)}>{(props as IMessage).message}</p>);

    return (
        <>
            {(props as IStatus).statuses.map(status => (
                <p className={clsx(styles.messageCaption, color)}>{status}</p>
            ))}
        </>
    );
};

export default MessageCaption;
