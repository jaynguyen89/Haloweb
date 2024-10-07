import { faCircleUser } from '@fortawesome/free-solid-svg-icons/faCircleUser';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { Box, FormControl, FormControlLabel, InputLabel, Radio, RadioGroup, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import _cloneDeep from 'lodash/cloneDeep';
import React, { LegacyRef, useEffect, useMemo, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Trans, useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import configs from 'src/commons/configs';
import CountryFlag from 'src/components/atoms/CountryFlag/CountryFlag';
import FaIcon from 'src/components/atoms/FaIcon';
import MessageCaption from 'src/components/atoms/MessageCaption';
import Recaptcha from 'src/components/atoms/Recaptcha';
import Flasher from 'src/components/molecules/StatusIndicators/Flasher';
import { useDebounce } from 'src/hooks/eventForger';
import { useIsStageIncluded } from 'src/hooks/useStage';
import Stages from 'src/models/enums/stage';
import RegistrationBySocialAccount from 'src/pages/AccountRegistration/RegistrationBySocialAccount';
import RegistrationProfileData from 'src/pages/AccountRegistration/RegistrationProfileData';
import useStyles, { registrationBoxSx, registrationFormSx } from 'src/pages/AccountRegistration/styles';
import {
    createRegistrationData,
    fieldValidatorNameMap,
    initialRegistrationFormDataState,
    RegistrationFormFieldNames,
    TFieldKey,
    validatorOptionsMapFn,
} from 'src/pages/AccountRegistration/utilities';
import { sendRequestToRegisterAccount } from 'src/redux/actions/authenticationActions';
import { removeStage } from 'src/redux/actions/stageActions';
import { TRootState } from 'src/redux/reducers';
import {
    mapFieldsToValidators,
    TFieldToValidatorMap,
    TFormDataState,
} from 'src/utilities/data-validators/dataValidators';
import FieldsMediator, {
    TFormResult,
    TValidationOptions,
    TValidationResult,
} from 'src/utilities/data-validators/fieldsMediator';
import { surrogate } from 'src/utilities/otherUtilities';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';

const mapStateToProps = (state: TRootState) => ({
    publicData: state.publicDataStore.publicData,
    accountRegistrationResult: state.authenticationStore.accountRegistration,
});

const AccountRegistration = ({
    publicData,
    accountRegistrationResult,
}: ReturnType<typeof mapStateToProps>) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const styles = useStyles();

    const [registerBy, setRegisterBy] = React.useState<string>(RegistrationFormFieldNames.EmailAddress);

    const [formData, setFormData] = useState<TFormDataState<typeof RegistrationFormFieldNames>>(initialRegistrationFormDataState);
    const [fieldValidation, setFieldValidation] = useState<TValidationResult<TFieldKey>>();
    const [formValidation, setFormValidation] = useState<TFormResult>({ isValid: false });

    const recaptchaRef = React.createRef<LegacyRef<ReCAPTCHA> | undefined>();
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

    const isError400FromServer = useIsStageIncluded(Stages.REGISTER_ACCOUNT_BAD_REQUEST_INVALID_DATA);
    const isError409FromServer = useIsStageIncluded(Stages.REGISTER_ACCOUNT_CONFLICT_EMAIL_ADDRESS_OR_PHONE_NUMBER);

    useEffect(() => {
        return () => {
            surrogate(dispatch, removeStage(Stages.REGISTER_ACCOUNT_BAD_REQUEST_INVALID_DATA));
            surrogate(dispatch, removeStage(Stages.REGISTER_ACCOUNT_CONFLICT_EMAIL_ADDRESS_OR_PHONE_NUMBER));
            surrogate(dispatch, removeStage(Stages.REQUEST_TO_REGISTER_ACCOUNT_SUCCESS));
        };
    }, []);

    const validators: TFieldToValidatorMap<TFieldKey> = useMemo(() => {
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        const tempValidators: any = {};
        Object.values(RegistrationFormFieldNames)
            .filter(fieldName => fieldName !== RegistrationFormFieldNames.PasswordConfirm)
            .forEach(field => {
                tempValidators[field as keyof TFieldKey] = mapFieldsToValidators(
                    formData,
                    publicData,
                    validatorOptionsMapFn,
                    field as keyof TFieldKey,
                    fieldValidatorNameMap[field as keyof TFieldKey],
                );
            });
        return tempValidators as TFieldToValidatorMap<TFieldKey>;
    }, [formData]);

    const validateFormDataWithDebounce = useDebounce(() => {
        const options: TValidationOptions<TFieldKey> = {
            oneOfFields: [
                RegistrationFormFieldNames.EmailAddress,
                [
                    RegistrationFormFieldNames.AreaCode,
                    RegistrationFormFieldNames.PhoneNumber,
                ],
            ],
            optionalFields: [
                RegistrationFormFieldNames.Gender,
                RegistrationFormFieldNames.GivenName,
                RegistrationFormFieldNames.MiddleName,
                RegistrationFormFieldNames.FamilyName,
                RegistrationFormFieldNames.FullName,
            ],
        };

        const fieldsMediator = new FieldsMediator(validators, options);
        const validationResults = fieldsMediator.notifyValidationResult();

        setFieldValidation(validationResults);
        setFormValidation(fieldsMediator.validateForm());
    }, 1500);

    const handleFieldValueChange = (
        fieldName: keyof typeof RegistrationFormFieldNames,
        value: string | undefined,
    ) => {
        const formDataClone = _cloneDeep(formData);

        if ([
            RegistrationFormFieldNames.GivenName,
            RegistrationFormFieldNames.MiddleName,
            RegistrationFormFieldNames.FamilyName,
        ].includes(fieldName as RegistrationFormFieldNames)) {
            let fullName = formDataClone[RegistrationFormFieldNames.FullName].value as string | undefined;

            if (fullName === undefined) fullName = value;
            else {
                const prevValues = {
                    givenName: formDataClone[RegistrationFormFieldNames.GivenName].value,
                    middleName: formDataClone[RegistrationFormFieldNames.MiddleName].value,
                    familyName: formDataClone[RegistrationFormFieldNames.FamilyName].value,
                };

                if (fieldName === RegistrationFormFieldNames.GivenName) prevValues.givenName = value;
                if (fieldName === RegistrationFormFieldNames.MiddleName) prevValues.middleName = value;
                if (fieldName === RegistrationFormFieldNames.FamilyName) prevValues.familyName = value;

                fullName = `${prevValues.givenName} ${prevValues.middleName ?? ''} ${prevValues.familyName ?? ''}`.trim().replaceAll('  ', ' ');
            }

            formDataClone[RegistrationFormFieldNames.FullName].value = fullName;
        }

        formDataClone[fieldName].value = value;
        setFormData(formDataClone);

        validateFormDataWithDebounce();
    };

    const handleFormSubmit = () => {
        if (!formValidation.isValid) {
            alert(t('registration-page.submit-disallowed-message'));
            return;
        }

        const recaptchaTokenToSend = !configs.recaptchaEnabled ? null : (
            configs.recaptchaVisible ? recaptchaToken : (recaptchaRef.current as unknown as ReCAPTCHA)?.getValue()
        );

        if (configs.recaptchaEnabled && !recaptchaTokenToSend) {
            alert(t(`messages.${configs.recaptchaVisible ? 'recaptcha-not-clicked' : 'recaptcha-token-missing'}`));
            return;
        }

        const registrationData = createRegistrationData(formData);

        surrogate(dispatch, sendRequestToRegisterAccount(registrationData, recaptchaTokenToSend));
    };

    const CredentialInfo = useMemo(() => {
        if (registerBy === RegistrationFormFieldNames.EmailAddress)
            return (
                <>
                    <TextField
                        label={t('registration-page.email-address-label')}
                        style={{width: '100%'}}
                        value={formData[RegistrationFormFieldNames.EmailAddress].value}
                        onChange={(e) => handleFieldValueChange(RegistrationFormFieldNames.EmailAddress, e.target.value)}
                    />
                    {
                        fieldValidation && fieldValidation[RegistrationFormFieldNames.EmailAddress].isValid !== undefined &&
                        !fieldValidation[RegistrationFormFieldNames.EmailAddress].isValid && (
                        <MessageCaption
                            statuses={fieldValidation[RegistrationFormFieldNames.EmailAddress].messages as Map<string, object | undefined>}
                        />
                    )}
                </>
            );

        return (
            <Grid container spacing={1}>
                <Grid item md={4} sm={3} xs={5}>
                    <FormControl fullWidth>
                        <InputLabel id='area-code-select-label'>{t('registration-page.area-code-label')}</InputLabel>
                        <Select
                            labelId='area-code-select-label'
                            label={t('registration-page.area-code-label')}
                            value={formData[RegistrationFormFieldNames.AreaCode].value ?? ''}
                            onChange={(e) => handleFieldValueChange(RegistrationFormFieldNames.AreaCode, e.target.value as string)}
                            variant='outlined'
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
                        label={t('registration-page.phone-number-label')}
                        style={{width: '100%'}}
                        value={formData[RegistrationFormFieldNames.PhoneNumber].value}
                        onChange={(e) => handleFieldValueChange(RegistrationFormFieldNames.PhoneNumber, e.target.value)}
                    />
                </Grid>
                {
                    fieldValidation && fieldValidation[RegistrationFormFieldNames.PhoneNumber].isValid !== undefined &&
                    !fieldValidation[RegistrationFormFieldNames.PhoneNumber].isValid && (
                        <MessageCaption
                            statuses={fieldValidation[RegistrationFormFieldNames.PhoneNumber].messages as Map<string, object | undefined>}
                        />
                    )}
            </Grid>
        );
    }, [registerBy]);

    return (
        <div className={styles.registrationWrapper}>
            {accountRegistrationResult.success && (
                <Box sx={{ maxWidth: '60%', margin: 'auto' }}>
                    <Flasher
                        severity='success'
                        stage={Stages.REQUEST_TO_REGISTER_ACCOUNT_SUCCESS}
                        message={`registration-page.registration-success-by-${formData[RegistrationFormFieldNames.EmailAddress] ? 'email-address' : 'phone-number'}`}
                    />
                </Box>
            )}

            <Box sx={registrationBoxSx}>
                <Typography variant='h1' className={styles.title}>
                    {t('registration-page.title')}&nbsp;
                    <FaIcon wrapper='fa' t='obj' ic={faCircleUser}/>
                </Typography>
                <Typography variant='subtitle1' className={styles.subtitle}>
                    <Trans i18nKey='registration-page.subtitle'>
                        Already have account? <Link to='/login'>Login here</Link>.
                    </Trans>
                </Typography>

                <Grid container spacing={2} sx={registrationFormSx}>
                    {isError400FromServer && (
                        <Grid item xs={12}>
                            <Flasher
                                severity='error'
                                stage={Stages.REGISTER_ACCOUNT_BAD_REQUEST_INVALID_DATA}
                                message='registration-page.response-error-400-invalid-data'
                                messageParams={{fields: Object.keys(accountRegistrationResult.error ?? {}).join(', ')}}
                            />
                        </Grid>
                    )}

                    {isError409FromServer && (
                        <Grid item xs={12} sx={{pb: '1rem'}}>
                            <Flasher
                                severity='error'
                                stage={Stages.REGISTER_ACCOUNT_CONFLICT_EMAIL_ADDRESS_OR_PHONE_NUMBER}
                                message={`registration-page.response-error-409-conflict-${Object.keys(accountRegistrationResult.error ?? {})[0] === 'isEmailAvailable' ? 'email-address' : 'phone-number'}`}
                            />
                        </Grid>
                    )}

                    {!formValidation.isValid && formValidation.messages && (
                        <Grid item xs={12} sx={{pb: '1rem'}}>
                            <MessageCaption statuses={formValidation.messages as Map<string, object | undefined>} />
                        </Grid>
                    )}
                    {/* The Account Registration Form */}
                    <Grid item xs={12}>
                        <Typography><b>{t('registration-page.register-by')}</b></Typography>
                        <RadioGroup row
                                    value={registerBy}
                                    onChange={(e: React.ChangeEvent) => setRegisterBy(e.target.defaultValue)}
                        >
                            <FormControlLabel
                                value={RegistrationFormFieldNames.EmailAddress}
                                control={<Radio />}
                                label={t('registration-page.email-address-label')}
                            />
                            <FormControlLabel
                                value={RegistrationFormFieldNames.PhoneNumber}
                                control={<Radio />}
                                label={t('registration-page.phone-number-label')}
                            />
                        </RadioGroup>
                    </Grid>

                    <Grid item xs={12}>
                        {CredentialInfo}
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <TextField
                            label={t('registration-page.password-label')}
                            style={{width: '100%'}}
                            type={'password'}
                            value={formData[RegistrationFormFieldNames.Password].value}
                            onChange={(e) => handleFieldValueChange(RegistrationFormFieldNames.Password, e.target.value)}
                        />
                        {
                            fieldValidation && fieldValidation[RegistrationFormFieldNames.Password].isValid !== undefined &&
                            !fieldValidation[RegistrationFormFieldNames.Password].isValid && (
                            <MessageCaption
                                statuses={fieldValidation[RegistrationFormFieldNames.Password].messages as Map<string, object | undefined>}
                            />
                        )}
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            label={t('registration-page.password-confirm-label')}
                            style={{width: '100%'}}
                            type={'password'}
                            value={formData[RegistrationFormFieldNames.PasswordConfirm].value}
                            onChange={(e) => handleFieldValueChange(RegistrationFormFieldNames.PasswordConfirm, e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={t('registration-page.username-label')}
                            style={{width: '100%'}}
                            value={formData[RegistrationFormFieldNames.Username].value}
                            onChange={(e) => handleFieldValueChange(RegistrationFormFieldNames.Username, e.target.value)}
                        />
                        {
                            fieldValidation && fieldValidation[RegistrationFormFieldNames.Username].isValid !== undefined &&
                            !fieldValidation[RegistrationFormFieldNames.Username].isValid && (
                            <MessageCaption
                                statuses={fieldValidation[RegistrationFormFieldNames.Username].messages as Map<string, object | undefined>}
                            />
                        )}
                    </Grid>

                    {configs.registerAccountWithProfileData &&
                        <RegistrationProfileData
                            publicData={publicData}
                            formData={formData}
                            handleFieldValueChange={handleFieldValueChange}
                            fieldValidation={fieldValidation}
                        />
                    }

                    {configs.recaptchaEnabled && (
                        <Grid item xs={12}>
                            <Recaptcha
                                recaptchaRef={recaptchaRef as any}
                                onChange={(token) => setRecaptchaToken(token)}
                            />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Button
                            variant='contained'
                            className={styles.submitButton}
                            disabled={!formValidation.isValid}
                            onClick={!formValidation.isValid ? undefined : handleFormSubmit}
                        >
                            {t('buttons.submit')}&nbsp;
                            <FaIcon wrapper='fa' t='obj' ic={faPaperPlane} />
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {<RegistrationBySocialAccount publicData={publicData} />}
        </div>
    );
};

export default connect(mapStateToProps)(AccountRegistration);
