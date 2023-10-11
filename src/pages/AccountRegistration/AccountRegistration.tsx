import { faCircleUser } from '@fortawesome/free-solid-svg-icons/faCircleUser';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { Box, FormControl, InputLabel, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import React, { LegacyRef, useEffect, useMemo, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Trans, useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import configs from 'src/commons/configs';
import CountryFlag from 'src/components/atoms/CountryFlag/CountryFlag';
import FaIcon from 'src/components/atoms/FaIcon';
import MessageCaption from 'src/components/atoms/MessageCaption';
import Recaptcha from 'src/components/atoms/Recaptcha';
import SocialIcons from 'src/components/atoms/SocialIcons/SocialIcons';
import { useDebounce } from 'src/hooks/eventForger';
import useStyles, { registrationBoxSx, registrationFormSx, helpBoxSx } from 'src/pages/AccountRegistration/styles';
import { TRootState } from 'src/redux/reducers';
import {
    mapFieldsToValidators,
    TFieldValidatorMap,
    TFormDataState,
} from 'src/utilities/data-validators/dataValidators';
import {
    fieldValidatorNameMap,
    initialRegistrationFormDataState,
    RegistrationFormFieldNames, TFieldKey,
    validatorOptionsMapFn,
} from 'src/pages/AccountRegistration/utilities';
import _cloneDeep from 'lodash/cloneDeep';
import FieldsMediator, { isFormDataValid, ValidationResult } from 'src/utilities/data-validators/fieldsMediator';

const mapStateToProps = (state: TRootState) => ({
    publicData: state.publicDataStore.publicData,
});

const AccountRegistration = ({
    publicData,
}: ReturnType<typeof mapStateToProps>) => {
    const { t } = useTranslation();
    const styles = useStyles();

    const [formData, setFormData] = useState<TFormDataState<typeof RegistrationFormFieldNames>>(initialRegistrationFormDataState);
    const [formValidation, setFormValidation] = useState<ValidationResult<TFieldKey>>();
    const [isFormValid, setIsFormValid] = useState(false);

    const recaptchaRef = React.createRef<LegacyRef<ReCAPTCHA> | undefined>();
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

    const validators: TFieldValidatorMap<TFieldKey> = useMemo(() => {
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        const tempValidators: any = {};
        Object.values(RegistrationFormFieldNames)
            .filter(value => value !== RegistrationFormFieldNames.PasswordConfirm)
            .forEach(field => {
                tempValidators[field as keyof TFieldKey] = mapFieldsToValidators(
                    formData,
                    publicData,
                    validatorOptionsMapFn,
                    field as keyof TFieldKey,
                    fieldValidatorNameMap[field as keyof TFieldKey],
                );
            });
        return tempValidators as TFieldValidatorMap<TFieldKey>;
    }, [formData]);

    const validateFormDataWithDebounce = useDebounce(() => {
        const fieldsMediator = new FieldsMediator(validators);
        const validationResults = fieldsMediator.notifyValidationResult();
        setFormValidation(validationResults);
        setIsFormValid(isFormDataValid(validationResults));
    }, 2000);

    const handleFieldValueChange = (
        fieldName: keyof typeof RegistrationFormFieldNames,
        value: string | undefined,
    ) => {
        const formDataClone = _cloneDeep(formData);
        formDataClone[fieldName].value = value;
        setFormData(formDataClone);

        validateFormDataWithDebounce();
    };

    const shouldAllowSubmit = useMemo(
        () => isFormValid ? !configs.recaptchaEnabled || Boolean(recaptchaToken) : false,
        [isFormValid, recaptchaToken],
    );

    useEffect(() => {
        // (recaptchaRef.current as unknown as ReCAPTCHA)?.getValue()
        if (shouldAllowSubmit) console.log('submit registration form');
    }, [shouldAllowSubmit]);

    return (
        <div className={styles.registrationWrapper}>
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
                    <Grid item md={5} xs={12}>
                        <TextField
                            label={t('registration-page.email-address-label')}
                            style={{width: '100%'}}
                            value={formData[RegistrationFormFieldNames.EmailAddress].value}
                            onChange={(e) => handleFieldValueChange(RegistrationFormFieldNames.EmailAddress, e.target.value)}
                        />
                        {
                            formValidation && formValidation[RegistrationFormFieldNames.EmailAddress].isValid !== undefined &&
                            !formValidation[RegistrationFormFieldNames.EmailAddress].isValid && (
                            <MessageCaption
                                statuses={formValidation[RegistrationFormFieldNames.EmailAddress].messages as Map<string, object | undefined>}
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
                                    <InputLabel id='area-code-select-label'>{t('registration-page.area-code-label')}</InputLabel>
                                    <Select
                                        labelId='area-code-select-label'
                                        label={t('registration-page.area-code-label')}
                                        value={formData[RegistrationFormFieldNames.AreaCode].value ?? ''}
                                        onChange={(e) => handleFieldValueChange(RegistrationFormFieldNames.AreaCode, e.target.value as string)}
                                    >
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
                                formValidation && formValidation[RegistrationFormFieldNames.PhoneNumber].isValid !== undefined &&
                                !formValidation[RegistrationFormFieldNames.PhoneNumber].isValid && (
                                <MessageCaption
                                    statuses={formValidation[RegistrationFormFieldNames.PhoneNumber].messages as Map<string, object | undefined>}
                                />
                            )}
                        </Grid>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            label={t('registration-page.password-label')}
                            style={{width: '100%'}}
                            value={formData[RegistrationFormFieldNames.Password].value}
                            onChange={(e) => handleFieldValueChange(RegistrationFormFieldNames.Password, e.target.value)}
                        />
                        {
                            formValidation && formValidation[RegistrationFormFieldNames.Password].isValid !== undefined &&
                            !formValidation[RegistrationFormFieldNames.Password].isValid && (
                            <MessageCaption
                                statuses={formValidation[RegistrationFormFieldNames.Password].messages as Map<string, object | undefined>}
                            />
                        )}
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            label={t('registration-page.password-confirm-label')}
                            style={{width: '100%'}}
                            value={formData[RegistrationFormFieldNames.PasswordConfirm].value}
                            onChange={(e) => handleFieldValueChange(RegistrationFormFieldNames.PasswordConfirm, e.target.value)}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            label={t('registration-page.username-label')}
                            style={{width: '100%'}}
                            value={formData[RegistrationFormFieldNames.Username].value}
                            onChange={(e) => handleFieldValueChange(RegistrationFormFieldNames.Username, e.target.value)}
                        />
                        {
                            formValidation && formValidation[RegistrationFormFieldNames.Username].isValid !== undefined &&
                            !formValidation[RegistrationFormFieldNames.Username].isValid && (
                            <MessageCaption
                                statuses={formValidation[RegistrationFormFieldNames.Username].messages as Map<string, object | undefined>}
                            />
                        )}
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel
                                id='area-code-select-label'>{t('registration-page.gender-label')}</InputLabel>
                            <Select
                                labelId='area-code-select-label'
                                label={t('registration-page.gender-label')}
                                value={formData[RegistrationFormFieldNames.Gender].value ?? ''}
                                onChange={(e) => handleFieldValueChange(RegistrationFormFieldNames.Gender, e.target.value as string)}
                            >
                                {publicData.genders.map(gender => (
                                    <MenuItem key={gender.index} value={gender.index}>{gender.display}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            label={t('registration-page.given-name-label')}
                            style={{width: '100%'}}
                            value={formData[RegistrationFormFieldNames.GivenName].value}
                            onChange={(e) => handleFieldValueChange(RegistrationFormFieldNames.GivenName, e.target.value)}
                        />
                        {
                            formValidation && formValidation[RegistrationFormFieldNames.GivenName].isValid !== undefined &&
                            !formValidation[RegistrationFormFieldNames.GivenName].isValid && (
                            <MessageCaption
                                statuses={formValidation[RegistrationFormFieldNames.GivenName].messages as Map<string, object | undefined>}
                            />
                        )}
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            label={t('registration-page.middle-name-label')}
                            style={{width: '100%'}}
                            value={formData[RegistrationFormFieldNames.MiddleName].value}
                            onChange={(e) => handleFieldValueChange(RegistrationFormFieldNames.MiddleName, e.target.value)}
                        />
                        {
                            formValidation && formValidation[RegistrationFormFieldNames.MiddleName].isValid !== undefined &&
                            !formValidation[RegistrationFormFieldNames.MiddleName].isValid && (
                            <MessageCaption
                                statuses={formValidation[RegistrationFormFieldNames.MiddleName].messages as Map<string, object | undefined>}
                            />
                        )}
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            label={t('registration-page.family-name-label')}
                            style={{width: '100%'}}
                            value={formData[RegistrationFormFieldNames.FamilyName].value}
                            onChange={(e) => handleFieldValueChange(RegistrationFormFieldNames.FamilyName, e.target.value)}
                        />
                        {
                            formValidation && formValidation[RegistrationFormFieldNames.FamilyName].isValid !== undefined &&
                            !formValidation[RegistrationFormFieldNames.FamilyName].isValid && (
                            <MessageCaption
                                statuses={formValidation[RegistrationFormFieldNames.FamilyName].messages as Map<string, object | undefined>}
                            />
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={t('registration-page.full-name-label')}
                            style={{width: '100%'}}
                            value={formData[RegistrationFormFieldNames.FullName].value}
                            onChange={(e) => handleFieldValueChange(RegistrationFormFieldNames.FullName, e.target.value)}
                        />
                        {
                            formValidation && formValidation[RegistrationFormFieldNames.FullName].isValid !== undefined &&
                            !formValidation[RegistrationFormFieldNames.FullName].isValid && (
                            <MessageCaption
                                statuses={formValidation[RegistrationFormFieldNames.FullName].messages as Map<string, object | undefined>}
                            />
                        )}
                    </Grid>
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
                            disabled={!shouldAllowSubmit}
                        >
                            {t('buttons.submit')}&nbsp;
                            <FaIcon wrapper='fa' t='obj' ic={faPaperPlane} />
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={helpBoxSx}>
                <p>{t('registration-page.social-registration-text')}</p>
                <SocialIcons
                    icons={[
                        {iconName: 'facebook'},
                        {iconName: 'google'},
                        {iconName: 'twitter'},
                        {iconName: 'instagram'},
                        {iconName: 'microsoft'},
                        {iconName: 'linkedin'},
                    ]}
                />
            </Box>
        </div>
    );
};

export default connect(mapStateToProps)(AccountRegistration);
