import AdbIcon from '@mui/icons-material/Adb';
import Typography from '@mui/material/Typography';
import React, { FunctionComponent } from 'react';
import { brandSx } from 'src/components/compounds/NavigationBar/styles';

export const LogoAndBrand: FunctionComponent<{
    variant?: 'mobile' | 'desktop'
}> = ({ variant = 'desktop' }) => {
    return (
        <>
            <AdbIcon
                sx={{
                    mr: 1,
                    display: {
                        xs: variant === 'mobile' ? 'block' : 'none',
                        md: variant === 'mobile' ? 'none' : 'flex',
                    },
                }}
            />
            <Typography
                variant='h6'
                noWrap
                component='a'
                href='/'
                sx={{
                    ...brandSx,
                    display: {
                        xs: variant === 'mobile' ? 'inline-block' : 'none',
                        md: variant === 'mobile' ? 'none' : 'flex',
                    },
                    flexGrow: variant === 'mobile' ? 1 : 0,
                }}
            >
                Halo
            </Typography>
        </>
    );
};

export default LogoAndBrand;
