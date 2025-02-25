import vars from 'src/commons/variables/cssVariables.scss';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { IMixins } from 'src/commons/interfaces';

const useStyles = makeStyles((theme: Theme) => ({
    profileWrapper: {
        display: 'flex',
    },
    profileContent: {
        // width: '100%',
        // marginLeft: vars.xxtiny,
        fontSize: vars.sh9,
        padding: `${vars.xxtiny} ${vars.xtiny}`,
        border: `${vars.xmicro} solid ${theme.palette.primary.main}`,
        borderRadius: vars.micro,
    },
    profileDetails: {
        '& h2': {
            marginTop: vars.xxtiny,
            marginBottom: vars.xxsmall,
        },
        '& .avatar-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& img': {
                width: `calc(2 * ${vars.xh3})`,
                height: `calc(2 * ${vars.xh3})`,
                borderRadius: '50%',
                borderColor: theme.palette.info.main,
                border: `${vars.micro} solid ${theme.palette.primary.dark}`,
                marginTop: vars.xxsmall,
                boxShadow: (theme.mixins as IMixins).shadowDark,
            },
            '& button': {
                position: 'absolute',
                bottom: 0,
                right: 0,
            },
        },
        '& .profile-form': {
            '& h4': {
                marginTop: vars.xxsmall,
                marginBottom: vars.xtiny,
                width: '100%',
                '& button': {
                    float: 'right',
                },
            },
        },
    },
    addressBook: {
        '& h2': {
            marginTop: vars.xxtiny,
            marginBottom: vars.xxsmall,
        },
        '& .addressText': {
            margin: vars.none,
            lineHeight: vars.sh8,
        },
        '& .other-address': {
            fontSize: vars.sh9,
            fontWeight: vars.thick,
            '& button': {
                float: 'right',
            },
        },
    },
    paymentMethods: {
        '& h2': {
            marginTop: vars.xxtiny,
            marginBottom: vars.xxsmall,
        },
        '& .payment-wrapper': {
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: vars.micro,
            padding: `${vars.micro} ${vars.xxtiny}`,
            width: '100%',
        },
        '& .payment-details': {
            width: '100%',
            '& p': {
                marginBottom: vars.none,
                marginTop: vars.xmicro,
                '&:first-child': {
                    marginTop: vars.xtiny,
                },
            },
        },
    },
    loginCredentials: {
        '& .credential': {
            '& p': {
                marginBottom: vars.none,
                '&:last-child': {
                    marginTop: vars.none,
                    '& .verification': {
                        marginLeft: vars.micro,
                    },
                },
            },
            '& a': {
                fontSize: vars.sh9,
            },
        },
        '& .add-credential': {
            '& p': {
                marginBottom: vars.micro,
                fontWeight: vars.thick,
            },
        },
    },
    securityQuestions: {
        '& .answer-questions': {
            '& p': {
                marginTop: vars.small,
                marginBottom: vars.micro,
                fontWeight: vars.thick,
            },
        },
    },
    trustedDevices: {
        '& .title': {
            marginBottom: vars.micro,
            fontWeight: vars.thick,
        },
        '& .device-info': {
            '& p': {
                marginTop: vars.none,
                marginBottom: vars.micro,
            },
            '& svg': {
                position: 'absolute',
                top: vars.xxtiny,
                right: vars.xxtiny,
            },
        },
    },
    twoFactors: {},
    visibilitySettings: {},
    preferences: {},
}));

export default useStyles;
