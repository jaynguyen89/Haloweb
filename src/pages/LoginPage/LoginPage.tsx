import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    Radio,
    RadioGroup,
    Select,
    TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import _cloneDeep from 'lodash/cloneDeep';
import React, { LegacyRef, RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Helmet } from 'react-helmet';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import configs from 'src/commons/configs';
import { debounceWait } from 'src/commons/constants';
import CountryFlag from 'src/components/atoms/CountryFlag/CountryFlag';
import FaIcon from 'src/components/atoms/FaIcon';
import MessageCaption from 'src/components/atoms/MessageCaption';
import Recaptcha from 'src/components/atoms/Recaptcha';
import AuthSocialAccounts from 'src/components/compounds/AuthSocialAccounts/AuthSocialAccounts';
import { useDebounce } from 'src/hooks/eventForger';
import { RegistrationFormFieldNames } from 'src/pages/AccountRegistration/utilities';
import useStyles, { helpBoxSx, loginBoxSx, loginFormSx } from 'src/pages/LoginPage/styles';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons/faFingerprint';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import vars from 'src/commons/variables/cssVariables.scss';
import {
    createLoginData,
    initialLoginFormDataState, LoginBy, loginFieldValidatorMap,
    LoginFormFieldNames,
    loginValidatorOptionsMapFn,
    TLoginFieldKey,
} from 'src/pages/LoginPage/utilities';
import { TRootState } from 'src/redux/reducers';
import { connect, useDispatch } from 'react-redux';
import {
    mapFieldsToValidators,
    TFieldToValidatorMap,
    TFormDataState,
} from 'src/utilities/data-validators/dataValidators';
import FieldsMediator, { TFieldMediatorOptions, TFormResult, TValidationResult } from 'src/utilities/data-validators/fieldsMediator';
import { readStorageMessage } from 'src/utilities/otherUtilities';
import { StorageKeys } from 'src/commons/enums';
import Flasher from 'src/components/molecules/StatusIndicators/Flasher';
import Stages from 'src/models/enums/stage';

const mapStateToProps = (state: TRootState) => ({
    publicData: state.publicDataStore.publicData,
});

const LoginPage = ({
    publicData,
}: ReturnType<typeof mapStateToProps>) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const styles = useStyles();

    const [loginBy, setLoginBy] = useState(LoginBy.Credentials);
    const [formData, setFormData] = useState<TFormDataState<typeof LoginFormFieldNames>>(initialLoginFormDataState);
    const [fieldValidation, setFieldValidation] = useState<TValidationResult<TLoginFieldKey>>();
    const [formValidation, setFormValidation] = useState<TFormResult>({ isValid: false });

    const recaptchaRef = React.createRef<LegacyRef<ReCAPTCHA> | undefined>();
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

    const accountActivationMessage = readStorageMessage(dispatch, StorageKeys.ACCOUNT_ACTIVATION_SUCCESS_STORAGE_KEY);

    const validators: TFieldToValidatorMap<TLoginFieldKey> = useMemo(() => {
        const tempValidators: TFieldToValidatorMap<TLoginFieldKey> = {};
        Object.values(LoginFormFieldNames)
            .filter(field => field !== LoginFormFieldNames.Trusted)
            .forEach(field => tempValidators[field] = mapFieldsToValidators(
                formData, publicData, loginValidatorOptionsMapFn, field, loginFieldValidatorMap[field], loginBy,
            ));
        return tempValidators;
    }, [formData, loginBy]);

    const validateFormDataWithDebounce = useDebounce(() => {
        const options: TFieldMediatorOptions<TLoginFieldKey> = {
            oneOfFields: [
                RegistrationFormFieldNames.EmailAddress,
                [
                    RegistrationFormFieldNames.AreaCode,
                    RegistrationFormFieldNames.PhoneNumber,
                ],
            ],
            optionalFields: loginBy === LoginBy.Credentials ? undefined : [LoginFormFieldNames.Password],
        };

        const fieldsMediator = new FieldsMediator(validators, options);
        const validationResults = fieldsMediator.notifyValidationResult();

        setFieldValidation(validationResults);
        setFormValidation(fieldsMediator.validateForm());
    }, debounceWait);

    const handleFieldValueChange = (
        fieldName: keyof typeof LoginFormFieldNames,
        value: string | undefined,
    ) => {
        const formDataClone = _cloneDeep(formData);
        formDataClone[fieldName].value = value;

        setFormData(formDataClone);
        validateFormDataWithDebounce();
    };

    const handleLogin = () => {
        if (!formValidation.isValid) {
            alert(t('messages.submit-disallowed-message'));
            return;
        }

        const recaptchaTokenToSend = !configs.recaptchaEnabled ? null : (
            configs.recaptchaVisible ? recaptchaToken : (recaptchaRef.current as unknown as ReCAPTCHA)?.getValue()
        );

        if (configs.recaptchaEnabled && !recaptchaTokenToSend) {
            alert(t(`messages.${configs.recaptchaVisible ? 'recaptcha-not-clicked' : 'recaptcha-token-missing'}`));
            return;
        }

        let loginData = createLoginData(formData);
        console.log(loginData);
    };

    return (
        <div className={styles.loginWrapper}>
            <Helmet>
                <title>Sign into Halo Marketplace</title>
                <link rel='canonical' href={window.location.href} />
                <meta name='description' content='Sign in with email address or phone number, or using social media accounts' />
            </Helmet>

            {accountActivationMessage && accountActivationMessage.targetPage === LoginPage.name && (
                <Box sx={{ maxWidth: '60%', margin: 'auto' }}>
                    <Flasher
                        stage={Stages.REQUEST_TO_ACTIVATE_ACCOUNT_SUCCESS}
                        message={accountActivationMessage.messageKey}
                    />
                </Box>
            )}

            <Box sx={loginBoxSx}>
                <Typography variant='h1' className={styles.title}>
                    {t('login-page.title')}&nbsp;
                    <FaIcon wrapper='fa' t='obj' ic={faFingerprint} />
                </Typography>

                <Grid container spacing={2} sx={loginFormSx}>
                    {!formValidation.isValid && formValidation.messages && (
                        <Grid item xs={12} sx={{pb: '1rem'}}>
                            <MessageCaption statuses={formValidation.messages as Map<string, object | undefined>} />
                        </Grid>
                    )}

                    {/* The Login Form */}
                    <Grid item xs={12}>
                        <Typography><b>{t('login-page.login-by')}</b></Typography>
                        <RadioGroup row
                                    value={loginBy}
                                    onChange={(e: React.ChangeEvent) => {
                                        const value = e.target.value;
                                        setLoginBy(value);
                                        if (value === LoginBy.OTP) handleFieldValueChange(LoginFormFieldNames.Password, undefined);
                                    }}
                        >
                            <FormControlLabel
                                value={LoginBy.Credentials}
                                control={<Radio />}
                                label={t('login-page.by-credentials')}
                            />
                            <FormControlLabel
                                value={LoginBy.OTP}
                                control={<Radio />}
                                label={t('login-page.by-otp')}
                            />
                        </RadioGroup>
                    </Grid>
                    <Grid item md={5} xs={12}>
                        <TextField
                            label={t('login-page.email-address-label')}
                            style={{width: '100%'}}
                            value={formData[LoginFormFieldNames.EmailAddress].value}
                            onChange={(e) => handleFieldValueChange(LoginFormFieldNames.EmailAddress, e.target.value)}
                        />
                        {
                            fieldValidation && fieldValidation[LoginFormFieldNames.EmailAddress].isValid !== undefined &&
                            !fieldValidation[LoginFormFieldNames.EmailAddress].isValid && (
                            <MessageCaption
                                statuses={fieldValidation[LoginFormFieldNames.EmailAddress].messages as Map<string, object | undefined>}
                            />
                        )}
                    </Grid>
                    <Grid item md={1} xs={12}>
                        <div className={styles.orLabel}>{t('labels.or')}</div>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Grid container spacing={1}>
                            <Grid item md={4} sm={3} xs={5}>
                                <FormControl fullWidth>
                                    <InputLabel
                                        id='area-code-select-label'>{t('login-page.area-code-label')}</InputLabel>
                                    <Select
                                        labelId='area-code-select-label'
                                        label={t('login-page.area-code-label')}
                                        variant='outlined'
                                        value={formData[LoginFormFieldNames.AreaCode].value ?? ''}
                                        onChange={(e) => handleFieldValueChange(LoginFormFieldNames.AreaCode, e.target.value as string)}
                                    >
                                        <MenuItem key='none' value=''>
                                            <FaIcon wrapper='fa' t='obj' ic={faMinus} />
                                        </MenuItem>
                                        {publicData.countries.map(country => (
                                            <MenuItem key={country.telephoneCode} value={country.telephoneCode}>
                                                {`${country.telephoneCode} - ${country.isoCode3Char}`}
                                                <CountryFlag isoCountryCode={country.isoCode2Char} className={styles.flagIcon} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={8} sm={9} xs={7}>
                                <TextField
                                    label={t('login-page.phone-number-label')}
                                    style={{width: '100%'}}
                                    value={formData[LoginFormFieldNames.PhoneNumber].value}
                                    onChange={(e) => handleFieldValueChange(LoginFormFieldNames.PhoneNumber, e.target.value)}
                                />
                            </Grid>
                            {
                                fieldValidation && fieldValidation[LoginFormFieldNames.PhoneNumber].isValid !== undefined &&
                                !fieldValidation[LoginFormFieldNames.PhoneNumber].isValid && (
                                <MessageCaption
                                    statuses={fieldValidation[LoginFormFieldNames.PhoneNumber].messages as Map<string, object | undefined>}
                                />
                            )}
                        </Grid>
                    </Grid>
                    {loginBy === LoginBy.Credentials && (
                        <Grid item xs={12}>
                            <TextField
                                label={t('login-page.password-label')}
                                style={{width: '100%'}}
                                type='password'
                                value={formData[LoginFormFieldNames.Password].value}
                                onChange={(e) => handleFieldValueChange(LoginFormFieldNames.Password, e.target.value)}
                            />
                            {
                                fieldValidation && fieldValidation[LoginFormFieldNames.Password].isValid !== undefined &&
                                !fieldValidation[LoginFormFieldNames.Password].isValid && (
                                <MessageCaption
                                    statuses={fieldValidation[LoginFormFieldNames.Password].messages as Map<string, object | undefined>}
                                />
                            )}
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox
                                value={formData[LoginFormFieldNames.Trusted].value}
                                onChange={(e) => handleFieldValueChange(LoginFormFieldNames.Trusted, e.target.checked)}
                            />}
                            label={t('login-page.trusted-checkbox-text')}
                        />
                    </Grid>
                    {configs.recaptchaEnabled && (
                        <Grid item xs={12}>
                            <Recaptcha
                                recaptchaRef={recaptchaRef as RefObject<ReCAPTCHA>}
                                onChange={(token) => setRecaptchaToken(token)}
                            />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Button
                            variant='contained'
                            className={styles.loginButton}
                            disabled={!formValidation.isValid}
                            onClick={!formValidation.isValid ? undefined : handleLogin}
                        >
                            {t('buttons.submit')}&nbsp;
                            <FaIcon wrapper='fa' t='obj' ic={faPaperPlane} />
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={helpBoxSx}>
                <Typography variant='subtitle2' mb={vars.micro}>
                    <Trans i18nKey='login-page.forgot-password-text'>
                        Forgot your password? Please <Link to='/forgot-password'>click here</Link> to reset password.
                    </Trans>
                </Typography>
                <Typography variant='subtitle2'>
                    <Trans i18nKey='login-page.register-account-text'>
                        Haven't had an account yet? Please <Link to='/register-account'>click here</Link> to create a new account.
                    </Trans>
                </Typography>

                <AuthSocialAccounts
                    destination={LoginPage.name}
                    socialAccountNames={publicData.supportedSocialAccounts}
                />
            </Box>
        </div>
    );
};

export default connect(mapStateToProps)(LoginPage);
export const loginPageName = LoginPage.name;
