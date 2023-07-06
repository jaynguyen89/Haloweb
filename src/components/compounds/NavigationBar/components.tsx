import React from 'react';
import { InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SearchWrapper = styled('div')(({ theme }) => ({
    position: 'absolute',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.light,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

export const XsSearch = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.light,
    width: '100%',
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.palette.primary.dark,
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '40ch',
        },
        [theme.breakpoints.down('md')]: {
            width: '30ch',
        },
    },
}));
