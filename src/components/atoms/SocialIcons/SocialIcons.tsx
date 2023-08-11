import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, { useMemo } from 'react';
import {
    FacebookLogoSvg,
    GoogleLogoSvg,
    InstagramLogoSvg,
    LinkedInLogoSvg,
    MicrosoftMailLogoSvg,
    TwitterLogoSvg,
    AwsLogoSvg,
} from 'src/assets/images';
import _isEmpty from 'lodash/isEmpty';
import useStyles from 'src/components/atoms/SocialIcons/styles';

type TIcon = {
    title: string,
    icon: string,
    handler?: Function,
};

const socialIcons = {
    facebook: {
        title: 'Facebook',
        icon: FacebookLogoSvg,
        handler: undefined,
    } as TIcon,
    google: {
        title: 'Google',
        icon: GoogleLogoSvg,
        handler: undefined,
    },
    twitter: {
        title: 'Twitter',
        icon: TwitterLogoSvg,
        handler: undefined,
    },
    instagram: {
        title: 'Instagram',
        icon: InstagramLogoSvg,
        handler: undefined,
    },
    microsoft: {
        title: 'Microsoft',
        icon: MicrosoftMailLogoSvg,
        handler: undefined,
    },
    linkedin: {
        title: 'Linkedin',
        icon: LinkedInLogoSvg,
        handler: undefined,
    },
    aws: {
        title: 'AWS',
        icon: AwsLogoSvg,
        handler: undefined,
    },
};

export type TSocialIcon = {
    icons: Array<{
        iconName: keyof typeof socialIcons,
        handler?: Function,
    }>,
    variant?: 'inline' | 'grid',
    iconSize?: number,
    sx?: SxProps<Theme>,
};

const SocialIcons = ({
    icons,
    variant = 'grid',
    iconSize = 40,
    sx,
}: TSocialIcon) => {
    const styles = useStyles();

    const selectedIcons = useMemo(() => {
        const filteredIcons = new Array<TIcon>();
        Object.keys(socialIcons).forEach(iconKey => {
            const found = icons.filter(icon => icon.iconName === iconKey);
            if (!_isEmpty(found)) {
                const currentIcon = socialIcons[iconKey as keyof typeof socialIcons];
                currentIcon.handler = found[0].handler;
                filteredIcons.push(currentIcon);
            }
        });

        return filteredIcons;
    }, [icons]);

    const size = useMemo(
        () => variant === 'inline' ? iconSize * 0.75 : iconSize,
        [iconSize, variant],
    );

    if (variant === 'inline') {
        return (
            <Box className={styles.iconBox}>
                {
                    selectedIcons.map(icon =>
                        <Box
                            key={icon.title}
                            className={styles.inlineIcon}
                            sx={sx}
                            component='img'
                            src={icon.icon}
                            width={size}
                            height={size}
                        />)
                }
            </Box>
        );
    }

    return (
        <Grid container spacing={2}>
            {
                selectedIcons.map(icon =>
                    <Grid item sm={2} xs={4} key={icon.title}>
                        <Box
                            className={styles.icon}
                            sx={sx}
                            component='img'
                            src={icon.icon}
                            width={size}
                            height={size}
                        />
                    </Grid>)
            }
        </Grid>
    );
};

export default SocialIcons;
