import { ErrorRounded } from '@mui/icons-material';
import { Chip, FormControl, InputLabel, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from 'src/pages/ProfilePage/styles';

type TSecurityQuestionsProps = {
    id: string,
};

const SecurityQuestions = ({
    id,
}: TSecurityQuestionsProps) => {
    const styles = useStyles();
    const { t } = useTranslation();

    return (
        <div className={styles.securityQuestions}>
            <h2>{t(`profile-page.${id}.heading`)}</h2>
            <Chip label={t(`profile-page.${id}.no-security-question`)} color='warning' icon={<ErrorRounded/>} />

            <Grid container spacing={2} className='answer-questions'>
                <Grid item md={12} sm={12} xs={12}>
                    <p>Add security questions</p>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id='security-question-1'>{t(`profile-page.${id}.select-question`)}</InputLabel>
                        <Select
                            labelId='security-question-1'
                            label={t(`profile-page.${id}.select-question`)}
                            variant='outlined'
                        >
                            <MenuItem key='question1' value='question1'>Question 1</MenuItem>
                            <MenuItem key='question2' value='question2'>Question 2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <TextField fullWidth label={t(`profile-page.${id}.answer-question`)} />
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id='security-question-1'>{t(`profile-page.${id}.select-question`)}</InputLabel>
                        <Select
                            labelId='security-question-1'
                            label={t(`profile-page.${id}.select-question`)}
                            variant='outlined'
                        >
                            <MenuItem key='question1' value='question1'>Question 1</MenuItem>
                            <MenuItem key='question2' value='question2'>Question 2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <TextField fullWidth label={t(`profile-page.${id}.answer-question`)} />
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id='security-question-1'>{t(`profile-page.${id}.select-question`)}</InputLabel>
                        <Select
                            labelId='security-question-1'
                            label={t(`profile-page.${id}.select-question`)}
                            variant='outlined'
                        >
                            <MenuItem key='question1' value='question1'>Question 1</MenuItem>
                            <MenuItem key='question2' value='question2'>Question 2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <TextField fullWidth label={t(`profile-page.${id}.answer-question`)} />
                </Grid>

                <Grid item md={12} sm={12} xs={12}>
                    <Button variant='contained' color='secondary'>{t('buttons.submit')}</Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default SecurityQuestions;
