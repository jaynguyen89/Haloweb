import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import '@testing-library/jest-dom';
import { queryByRole } from '@testing-library/react';
import { withStoreMock } from 'src/foundation/storeMock';
import { renderWithTheme } from 'src/commons/themes/themeMock';
import Progress, { LabelProgress, TLabelProgress } from 'src/components/molecules/StatusIndicators/Progress';
import { toPascalCase } from 'src/utilities/stringUtilities';

configure({ adapter: new Adapter() });

describe('Progress.tsx', () => {
    it('renders successfully', () => {
        const wrapper = shallow(withStoreMock(<Progress stage='showcase' />));
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should not be visible when stage is incorrect', () => {
        const wrapper = renderWithTheme(withStoreMock(<Progress stage='invisible' />));
        const progressElement = wrapper.container.getElementsByClassName('MuiLinearProgress-root')[0];
        expect(progressElement).toBeUndefined();
    });

    it('renders component in various colors', () => {
        const colors = ['primary', 'secondary', 'error', 'info', 'success', 'warning'];
        const wrappers = colors.map(color => renderWithTheme(withStoreMock(<Progress stage='showcase' color={color} />)));

        colors.forEach((color, i) => {
            const progressElement = queryByRole(wrappers[i].container, 'progressbar');
            expect(progressElement.classList.value.includes(`MuiLinearProgress-color${toPascalCase(color)}`)).toBeTruthy();
            expect(progressElement.classList.value.includes('MuiLinearProgress-indeterminate')).toBeTruthy();

            const progressBars = progressElement.getElementsByClassName('MuiLinearProgress-bar');
            expect(progressBars.length).toBe(2);
            expect(progressBars[0].classList.value.includes(`MuiLinearProgress-barColor${toPascalCase(color)}`)).toBeTruthy();
            expect(progressBars[1].classList.value.includes(`MuiLinearProgress-barColor${toPascalCase(color)}`)).toBeTruthy();
        });
    });
});

describe('LabelProgress.tsx', () => {
    it('renders successfully', () => {
        const wrapper = shallow(withStoreMock(<LabelProgress stage='showcase' progress='50' />));
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should not be visible when stage is incorrect', () => {
        const wrapper = renderWithTheme(withStoreMock(<LabelProgress stage='invisible' progress='50' />));
        const progressElement = wrapper.container.getElementsByClassName('MuiBox-root')[0];
        expect(progressElement).toBeUndefined();
    });

    it('renders component in various colors', () => {
        const propses: Array<TLabelProgress> = [
            {
                color: 'primary',
                progress: 20,
            },
            {
                color: 'secondary',
                progress: 30,
            },
            {
                color: 'error',
                progress: 40,
            },
            {
                color: 'info',
                progress: 50,
            },
            {
                color: 'success',
                progress: 60,
            },
            {
                color: 'warning',
                progress: 70,
            },
        ];
        const wrappers = propses.map(props => renderWithTheme(withStoreMock(<LabelProgress stage='showcase' {...props} />)));

        propses.forEach((props, i) => {
            const progressElement = wrappers[i].container.getElementsByClassName('MuiBox-root')[0];
            expect(progressElement).toBeDefined();

            const progressItems = progressElement.getElementsByTagName('div');
            expect(progressItems.length).toBe(2);
            expect(progressItems[0].classList.value.includes('MuiBox-root')).toBeTruthy();
            expect(progressItems[1].classList.value.includes('MuiBox-root')).toBeTruthy();

            const progressBar = queryByRole(progressItems[0], 'progressbar');
            expect(progressBar.classList.value.includes('MuiLinearProgress-root')).toBeTruthy();
            expect(progressBar.classList.value.includes('MuiLinearProgress-determinate')).toBeTruthy();
            expect(progressBar.classList.value.includes(`MuiLinearProgress-color${toPascalCase(props.color)}`)).toBeTruthy();
            expect(progressBar?.attributes.getNamedItem('aria-valuenow').value).toEqual(`${props.progress}`);

            const progressIndicator = progressBar?.getElementsByTagName('span')[0];
            expect(progressIndicator.classList.value.includes('MuiLinearProgress-bar')).toBeTruthy();
            expect(progressIndicator.classList.value.includes(`MuiLinearProgress-barColor${toPascalCase(props.color)}`)).toBeTruthy();

            const progressLabel = progressItems[1].getElementsByTagName('p')[0];
            expect(progressLabel.classList.value.includes('MuiTypography-root')).toBeTruthy();
            expect(progressLabel.classList.value.includes('MuiTypography-body2')).toBeTruthy();
            expect(progressLabel.textContent).toEqual(`${props.progress}%`);
        });
    });
});
