import React from 'react';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import useStyles from 'src/pages/LoginPage/LoginFailureMessage/styles';

export const Suspended = () => {
    const styles = useStyles();

    return (
        <div className={styles.wrapper}>
            <p>{t('login-page.suspend-message-1')}</p>
            <p>
                <Trans i18nKey='login-page.suspend-message-2'>
                    Please <a onClick={() => console.log('send email to confirm ownership')}>click here</a> to confirm
                    your
                    account ownership&nbsp;
                    and remove the Suspend status on your account.
                </Trans>
            </p>
            <p>
                <Trans i18nKey='login-page.suspend-message-3'>
                    If you've forgotten your password, please also try to <Link to='/forgot-password'>&nbsp;
                    reset password</Link> after the above step.
                </Trans>
            </p>
        </div>
    );
};

export default Suspended;
