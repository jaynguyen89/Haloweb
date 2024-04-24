import React from 'react';
import { configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import '@testing-library/jest-dom';
import { paletteMock, renderWithTheme, shallowWithTheme } from 'src/commons/themes/themeMock';
import withMocks from 'src/foundation/withMocks';
import { stageMock } from 'src/foundation/storeMock';
import { hexToRgb } from '@mui/material';
import { toPascalCase } from 'src/utilities/stringUtilities';
import StageFlasher from 'src/components/molecules/StatusIndicators/StageFlasher';

configure({ adapter: new Adapter() });

describe('StageFlasher.tsx', () => {
    it('renders successfully', () => {
        const wrapper = shallowWithTheme(withMocks(
            <StageFlasher stage='showcase' />,
            true,
        ));

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders component according to the given stage', () => {
        const stage = 'STAGE_FLASHER_TEST';
        const wrapper = renderWithTheme(withMocks(
            <StageFlasher stage={stage} />,
            true,
        ));

        const mock = stageMock.stages.filter(x => x.name === stage)[0];

        const collapseElement = wrapper.container.getElementsByClassName('MuiCollapse-root')[0];
        expect(collapseElement).toBeDefined();

        const alertContainer = collapseElement.getElementsByClassName('MuiAlert-root')[0];
        expect(alertContainer).toBeDefined();
        expect(alertContainer.classList.value.includes(`MuiAlert-color${toPascalCase(mock.type)}`)).toBeTruthy();

        const alertIconWrapper = alertContainer.getElementsByClassName('MuiAlert-icon')[0];
        expect(alertIconWrapper).toBeDefined();

        const alertIcon = alertIconWrapper.getElementsByTagName('svg')[0];
        expect(alertIcon).toBeDefined();

        const alertMessageWrapper = collapseElement.getElementsByClassName('MuiAlert-message')[0];
        expect(alertMessageWrapper).toBeDefined();

        const messageSpan = alertMessageWrapper.getElementsByTagName('span')[0];
        expect(messageSpan).toBeDefined();
        expect(messageSpan.style.color).toEqual(hexToRgb(paletteMock[mock.type].main));
        expect(messageSpan.textContent).toEqual(mock.message.replace('{{what}}', mock.messageParams.what));

        const actionWrapper = collapseElement.getElementsByClassName('MuiAlert-action')[0];
        expect(actionWrapper).toBeDefined();

        const actionButton = actionWrapper.getElementsByTagName('button')[0];
        expect(actionButton).toBeDefined();

        const actionIcon = actionButton.getElementsByTagName('svg')[0];
        expect(actionIcon).toBeDefined();
    });
});
