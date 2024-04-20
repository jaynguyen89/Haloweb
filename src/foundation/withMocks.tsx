import React from 'react';
import { withStoreMock } from 'src/foundation/storeMock';
import { withI18nMock } from 'src/translation/i18nextMock';

/* When withStore == false, component is wrapped with i18n mock, otherwise, also wrapped with Redux store mock. */
const withMocks = (component: React.ReactElement, withStore: boolean = false) => {
    const componentWithI18n = withI18nMock(component);
    return withStore ? withStoreMock(componentWithI18n) : componentWithI18n;
};

export default withMocks;
