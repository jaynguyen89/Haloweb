import SearchIcon from '@mui/icons-material/Search';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
    const Wrapper = variant === 'mobile' ? XsSearch : SearchWrapper;
    const authenticated = false;
    const isMobileView = variant === 'mobile';

    return (
        <Wrapper
            style={{
                right: isMobileView ? 0 : (
                    authenticated ? '8.75rem' : '3.5rem'
                ),
                marginBottom: isMobileView ? '1rem' : 0,
            }}
        >
            <SearchIconWrapper>
                <SearchIcon color={'primary.dark' as any} />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder={t('navMenu.search')}
                inputProps={{ 'aria-label': 'search' }}
            />
        </Wrapper>
    );
};

export default SearchBox;
