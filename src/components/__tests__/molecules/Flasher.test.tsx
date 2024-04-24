import React from 'react';
import { configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import '@testing-library/jest-dom';
import { paletteMock, renderWithTheme, shallowWithTheme } from 'src/commons/themes/themeMock';
import withMocks from 'src/foundation/withMocks';
import Flasher, { TFlasher } from 'src/components/molecules/StatusIndicators/Flasher';
import { stageMock } from 'src/foundation/storeMock';
import { hexToRgb } from '@mui/material';
import { toPascalCase } from 'src/utilities/stringUtilities';

configure({ adapter: new Adapter() });

describe('Flasher.tsx', () => {
    it('renders successfully', () => {
        const wrapper = shallowWithTheme(withMocks(
            <Flasher
                stage='showcase'
                message='Test Flasher'
            />,
            true,
        ));

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('is able to render server error', () => {
        const wrapper = renderWithTheme(withMocks(
            <Flasher
                stage='SHOW_FLASHER_SERVER_ERROR'
            />,
            true,
        ));

        const collapseElement = wrapper.container.getElementsByClassName('MuiCollapse-root')[0];
        expect(collapseElement).toBeDefined();

        const alertContainer = collapseElement.getElementsByClassName('MuiAlert-root')[0];
        expect(alertContainer).toBeDefined();
        expect(alertContainer.classList.value.includes('MuiAlert-colorError')).toBeTruthy();

        const alertIconWrapper = alertContainer.getElementsByClassName('MuiAlert-icon')[0];
        expect(alertIconWrapper).toBeDefined();

        const alertIcon = alertIconWrapper.getElementsByTagName('svg')[0];
        expect(alertIcon).toBeDefined();

        const alertMessageWrapper = collapseElement.getElementsByClassName('MuiAlert-message')[0];
        expect(alertMessageWrapper).toBeDefined();

        const messageSpan = alertMessageWrapper.getElementsByTagName('span')[0];
        expect(messageSpan).toBeDefined();
        expect(messageSpan.style.color).toEqual(hexToRgb(paletteMock['error'].main));
        expect(messageSpan.textContent).toEqual(stageMock.stages.filter(x => x.name === 'SHOW_FLASHER_SERVER_ERROR')[0].message);

        const actionWrapper = collapseElement.getElementsByClassName('MuiAlert-action')[0];
        expect(actionWrapper).toBeDefined();

        const actionButton = actionWrapper.getElementsByTagName('button')[0];
        expect(actionButton).toBeDefined();

        const actionIcon = actionButton.getElementsByTagName('svg')[0];
        expect(actionIcon).toBeDefined();
    });

    it('is able to render custom messages', () => {
        const alerts: Array<Omit<TFlasher, 'stage'>> = [
            {
                message: 'This is an error message.',
                severity: 'error',
            },
            {
                message: 'This is an info message.',
                severity: 'info',
            },
            {
                message: 'This is a warning message.',
                severity: 'warning',
            },
            {
                message: 'This is a success message.',
                severity: 'success',
            },
        ];

        const wrappers = alerts.map(alert => renderWithTheme(withMocks(<Flasher stage='showcase' {...alert} />, true)));

        alerts.forEach((alert, i) => {
            const wrapper = wrappers[i];

            const collapseElement = wrapper.container.getElementsByClassName('MuiCollapse-root')[0];
            expect(collapseElement).toBeDefined();

            const alertContainer = collapseElement.getElementsByClassName('MuiAlert-root')[0];
            expect(alertContainer).toBeDefined();
            expect(alertContainer.classList.value.includes(`MuiAlert-color${toPascalCase(alert.severity)}`)).toBeTruthy();

            const alertIconWrapper = alertContainer.getElementsByClassName('MuiAlert-icon')[0];
            expect(alertIconWrapper).toBeDefined();

            const alertIcon = alertIconWrapper.getElementsByTagName('svg')[0];
            expect(alertIcon).toBeDefined();

            const alertMessageWrapper = collapseElement.getElementsByClassName('MuiAlert-message')[0];
            expect(alertMessageWrapper).toBeDefined();

            const messageSpan = alertMessageWrapper.getElementsByTagName('span')[0];
            expect(messageSpan).toBeDefined();
            expect(messageSpan.style.color).toEqual(hexToRgb(paletteMock[alert.severity].main));
            expect(messageSpan.textContent).toEqual(alert.message);

            const actionWrapper = collapseElement.getElementsByClassName('MuiAlert-action')[0];
            expect(actionWrapper).toBeDefined();

            const actionButton = actionWrapper.getElementsByTagName('button')[0];
            expect(actionButton).toBeDefined();

            const actionIcon = actionButton.getElementsByTagName('svg')[0];
            expect(actionIcon).toBeDefined();
        });
    });
});
