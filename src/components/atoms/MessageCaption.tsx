import { AlertColor, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { isArray } from 'lodash';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import vars from 'src/commons/variables/cssVariables.scss';

interface IMessage {
    message: string,
    options?: Record<string, string>,
    type?: AlertColor,
}

interface IStatus {
    statuses: Array<string> | Map<string, object | undefined>,
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
    const { t } = useTranslation();
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
        return (
            <p className={clsx(styles.messageCaption, color)}>
                {t((props as IMessage).message, (props as IMessage).options)}
            </p>
        );

    const statuses = (props as IStatus).statuses;
    if (isArray(statuses))
        return (
            <>
                {(statuses as Array<string>).map((status, i) => (
                    <p key={i} className={clsx(styles.messageCaption, color)}>{t(status)}</p>
                ))}
            </>
        );

    return (
        <>
            {Array.from((statuses as Map<string, object | undefined>).entries()).map((entry, i) => {
                const [status, options] = entry;
                return (
                    <p key={i} className={clsx(styles.messageCaption, color)}>{t(status, options)}</p>
                );
            })}
        </>
    );
};

export default MessageCaption;
