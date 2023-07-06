import SearchIcon from '@mui/icons-material/Search';
import React, { FunctionComponent } from 'react';
import {
    SearchIconWrapper,
    SearchWrapper,
    StyledInputBase,
    XsSearch,
} from 'src/components/compounds/NavigationBar/components';

/* eslint-disable  @typescript-eslint/no-explicit-any */
const SearchBox: FunctionComponent<{
    variant?: 'mobile' | 'desktop',
}> = ({
    variant = 'desktop',
}) => {
    const Wrapper = variant === 'mobile' ? XsSearch : SearchWrapper;
    const authenticated = false;

    return (
        <Wrapper
            style={{
                right: variant === 'mobile' ? 0 : (
                    authenticated ? '8.75rem' : '3.5rem'
                ),
            }}
        >
            <SearchIconWrapper>
                <SearchIcon color={'primary.dark' as any} />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder='Search…'
                inputProps={{ 'aria-label': 'search' }}
            />
        </Wrapper>
    );
};

export default SearchBox;
