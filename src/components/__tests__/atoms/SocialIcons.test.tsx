import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { renderWithTheme } from 'src/commons/themes/themeMock';
import SocialIcons from 'src/components/atoms/SocialIcons/SocialIcons';

const mockHandler = jest.fn() as Function;
const icons = [
    { iconName: 'facebook', handler: mockHandler },
    { iconName: 'google', handler: mockHandler },
    { iconName: 'twitter', handler: mockHandler },
    { iconName: 'instagram', handler: mockHandler },
    { iconName: 'microsoft', handler: mockHandler },
    { iconName: 'linkedin', handler: mockHandler },
    { iconName: 'aws', handler: mockHandler },
];

configure({ adapter: new Adapter() });

describe('SocialIcons', () => {
    it('renders successfully', () => {
        const wrapperGrid = shallow(
            // @ts-ignore-next-line
            <SocialIcons icons={icons} />
        );

        expect(toJson(wrapperGrid)).toMatchSnapshot();

        const wrapperInline = shallow(
            // @ts-ignore-next-line
            <SocialIcons icons={icons} variant='inline' />
        );

        expect(toJson(wrapperInline)).toMatchSnapshot();
    });

    it('is able to render inline and grid layouts', () => {
        const wrapperGrid = renderWithTheme(
            // @ts-ignore-next-line
            <SocialIcons icons={icons} />
        );

        const gridIcons = wrapperGrid.container.getElementsByTagName('img');
        expect(gridIcons.length).toBe(icons.length);

        icons.forEach((entry, i) => {
            expect(gridIcons[i].classList.value.includes('makeStyles-icon')).toBe(true);
            expect(gridIcons[i].classList.value.includes('inlineIcon')).toBe(false);
        });

        const wrapperInline = renderWithTheme(
            // @ts-ignore-next-line
            <SocialIcons icons={icons} variant='inline' />
        );

        const inlineIcons = wrapperInline.container.getElementsByTagName('img');
        expect(inlineIcons.length).toBe(icons.length);

        icons.forEach((entry, i) => {
            expect(inlineIcons[i].classList.value.includes('makeStyles-icon')).toBe(false);
            expect(inlineIcons[i].classList.value.includes('inlineIcon')).toBe(true);
        });
    });
});
