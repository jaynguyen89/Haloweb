import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import '@testing-library/jest-dom';
import { withStoreMock } from 'src/foundation/storeMock';
import { renderWithTheme } from 'src/commons/themes/themeMock';
import { toPascalCase } from 'src/utilities/stringUtilities';
import { queryByRole } from '@testing-library/react';
import Toast, { TToast } from 'src/components/molecules/StatusIndicators/Toast';

configure({ adapter: new Adapter() });

describe('Toast.tsx', () => {
    it('renders successfully', () => {
        const wrapper = shallow(withStoreMock(<Toast stage='showcase' message='Toast Test' />));
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should not be visible when stage is incorrect', () => {
        const wrapper = renderWithTheme(withStoreMock(<Toast stage='invisible' message='Toast Test' />));
        const toastPresenter = queryByRole(wrapper.container, 'presentation');
        expect(toastPresenter).toBeNull();
    });

    it('renders component according to the given props', () => {
        const propses: Array<TToast> = [
            {
                message: 'Bottom Left',
                severity: 'info',
                position: { vertical: 'bottom', horizontal: 'left' },
            },
            {
                message: 'Bottom Right',
                severity: 'success',
                position: { vertical: 'bottom', horizontal: 'right' },
            },
            {
                message: 'Top Left',
                severity: 'error',
                position: { vertical: 'top', horizontal: 'left' },
            },
            {
                message: 'Top Right',
                severity: 'warning',
                position: { vertical: 'top', horizontal: 'right' },
            },
        ];

        const wrappers = propses.map((props) => renderWithTheme(withStoreMock(<Toast stage='showcase' {...props} />)));

        propses.forEach((props, i) => {
            const toastPresenter = queryByRole(wrappers[i].container, 'presentation');
            expect(toastPresenter).toBeDefined();
            expect(toastPresenter.classList.value.includes('MuiSnackbar-root')).toBeTruthy();
            expect(toastPresenter.classList.value.includes(`MuiSnackbar-anchorOrigin${toPascalCase(props.position.vertical)}${toPascalCase(props.position.horizontal)}`)).toBeTruthy();

            const alert = queryByRole(toastPresenter, 'alert');
            expect(alert).toBeDefined();
            expect(alert.classList.value.includes(`MuiAlert-color${toPascalCase(props.severity)}`)).toBeTruthy();

            const alertIcon = alert.getElementsByClassName('MuiAlert-icon')[0];
            expect(alertIcon).toBeDefined();

            const svg = alert.getElementsByTagName('svg')[0];
            expect(svg).toBeDefined();

            const alertMessage = alert.getElementsByClassName('MuiAlert-message')[0];
            expect(alertMessage).toBeDefined();
            expect(alertMessage.textContent).toEqual(props.message);

            const alertAction = alert.getElementsByClassName('MuiAlert-action')[0];
            expect(alertAction).toBeDefined();

            const actionButton = alertAction.getElementsByTagName('button')[0];
            expect(actionButton).toBeDefined();
            expect(actionButton.attributes.getNamedItem('aria-label').value).toEqual('close');
        });
    });
});
