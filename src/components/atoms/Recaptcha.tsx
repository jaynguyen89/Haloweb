import { Typography } from '@mui/material';
import React, { FunctionComponent, LegacyRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Trans } from 'react-i18next';
import configs from 'src/commons/configs';

const Recaptcha: FunctionComponent<{
    onChange?: (token: string | null) => void,
    recaptchaRef?: LegacyRef<ReCAPTCHA> | undefined,
}> = ({
    onChange,
    recaptchaRef,
}) => {
    if (!configs.recaptchaEnabled) return null;

    return (
        <>
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={'something'}
                size={configs.recaptchaVisible ? 'normal' : 'invisible'}
                onChange={configs.recaptchaVisible ? onChange : undefined}
            />

            {!configs.recaptchaVisible && (
                <Typography>
                    <Trans i18nKey='recaptcha-intro'>
                        This site is protected by reCAPTCHA, and the Google <a href='https://policies.google.com/privacy'>Privacy Policy</a> and <a href='https://policies.google.com/terms'>Terms of Service</a> apply.
                    </Trans>
                </Typography>
            )}
        </>
    );
};

export default Recaptcha;
