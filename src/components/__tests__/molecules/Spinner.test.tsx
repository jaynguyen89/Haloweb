import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import '@testing-library/jest-dom';
import { withStoreMock } from 'src/foundation/storeMock';
import Spinner, { LabelSpinner, TLabelSpinner, TSpinner } from 'src/components/molecules/StatusIndicators/Spinner';
import { renderWithTheme } from 'src/commons/themes/themeMock';
import { toPascalCase } from 'src/utilities/stringUtilities';
import { queryByRole } from '@testing-library/react';

configure({ adapter: new Adapter() });

describe('Spinner.tsx', () => {
    it('renders successfully', () => {
        const wrapper = shallow(withStoreMock(<Spinner stage='showcase' />));
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should not be visible when stage is incorrect', () => {
        const wrapper = renderWithTheme(withStoreMock(<Spinner stage='invisible' />));
        const progressElement = wrapper.container.getElementsByClassName('MuiCircularProgress-root')[0];
        expect(progressElement).toBeUndefined();
    });

    it('renders component in various colors', () => {
        const propses: Array<TSpinner> = [
            {
                color: 'primary',
                size: 80,
                thickness: 2,
            },
            {
                color: 'secondary',
                size: 100,
                thickness: 2,
            },
            {
                color: 'error',
                size: 120,
                thickness: 3,
            },
            {
                color: 'info',
                size: 140,
                thickness: 3,
            },
            {
                color: 'success',
                size: 160,
                thickness: 4,
            },
            {
                color: 'warning',
                size: 180,
                thickness: 4,
            },
        ];

        const wrappers = propses.map(props => renderWithTheme(withStoreMock(<Spinner stage='showcase' {...props} />)));

        propses.forEach((props, i) => {
            const progressBar = queryByRole(wrappers[i].container, 'progressbar');
            expect(progressBar.classList.value.includes('MuiCircularProgress-root')).toBeTruthy();
            expect(progressBar.classList.value.includes('MuiCircularProgress-indeterminate')).toBeTruthy();
            expect(progressBar.classList.value.includes(`MuiCircularProgress-color${toPascalCase(props.color)}`)).toBeTruthy();
            expect(progressBar.style.width).toBe(`${props.size}px`);
            expect(progressBar.style.height).toBe(`${props.size}px`);

            const svg = progressBar?.getElementsByTagName('svg')[0];
            expect(svg).toBeDefined();

            const circle = svg.getElementsByTagName('circle')[0];
            expect(circle).toBeDefined();
            expect(circle.classList.value.includes('MuiCircularProgress-circle')).toBeTruthy();
            expect(circle.classList.value.includes('MuiCircularProgress-circleIndeterminate')).toBeTruthy();
            expect(circle.attributes.getNamedItem('stroke-width').value).toEqual(`${props.thickness}`);
        });
    });
});

describe('LabelSpinner.tsx', () => {
    it('renders successfully', () => {
        const wrapper = shallow(withStoreMock(<LabelSpinner stage='showcase' progress={50} />));
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should not be visible when stage is incorrect', () => {
        const wrapper = renderWithTheme(withStoreMock(<Spinner stage='invisible' progress={50} />));
        const progressElement = wrapper.container.getElementsByClassName('MuiBox-root')[0];
        expect(progressElement).toBeUndefined();
    });

    it('renders component in various colors', () => {
        const propses: Array<TLabelSpinner> = [
            {
                color: 'primary',
                size: 80,
                thickness: 2,
                progress: 25,
            },
            {
                color: 'secondary',
                size: 100,
                thickness: 2,
                progress: 35,
            },
            {
                color: 'error',
                size: 120,
                thickness: 3,
                progress: 45,
            },
            {
                color: 'info',
                size: 140,
                thickness: 3,
                progress: 55,
            },
            {
                color: 'success',
                size: 160,
                thickness: 4,
                progress: 65,
            },
            {
                color: 'warning',
                size: 180,
                thickness: 4,
                progress: 75,
            },
        ];

        const wrappers = propses.map(props => renderWithTheme(withStoreMock(<LabelSpinner stage='showcase' {...props} />)));

        propses.forEach((props, i) => {
            const progressBar = queryByRole(wrappers[i].container, 'progressbar');
            expect(progressBar.classList.value.includes('MuiCircularProgress-root')).toBeTruthy();
            expect(progressBar.classList.value.includes('MuiCircularProgress-determinate')).toBeTruthy();
            expect(progressBar.classList.value.includes(`MuiCircularProgress-color${toPascalCase(props.color)}`)).toBeTruthy();
            expect(progressBar.style.width).toBe(`${props.size}px`);
            expect(progressBar.style.height).toBe(`${props.size}px`);
            expect(progressBar.attributes.getNamedItem('aria-valuenow').value).toEqual(`${props.progress}`);

            const svg = progressBar.getElementsByTagName('svg')[0];
            expect(svg).toBeDefined();

            const circle = svg.getElementsByTagName('circle')[0];
            expect(circle).toBeDefined();
            expect(circle.classList.value.includes('MuiCircularProgress-circle')).toBeTruthy();
            expect(circle.classList.value.includes('MuiCircularProgress-circleDeterminate')).toBeTruthy();
            expect(circle.attributes.getNamedItem('stroke-width').value).toEqual(`${props.thickness}`);

            const progressLabel = wrappers[i].container.getElementsByClassName('MuiTypography-root')[0];
            expect(progressLabel).toBeDefined();
            expect(progressLabel.classList.value.includes('MuiTypography-h6')).toBeTruthy();
            expect(progressLabel.textContent).toEqual(`${props.progress}%`);
        });
    });
});
