import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import toJson from 'enzyme-to-json';
import FaIcon, { TIcon } from 'src/components/atoms/FaIcon';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faStar } from '@fortawesome/free-regular-svg-icons/faStar';

configure({ adapter: new Adapter() });

describe('FaIcon.tsx', () => {
    it('renders icon with `i` wrapper', () => {
        const propss: Array<TIcon> = [
            {
                wrapper: 'i',
                ic: 'pen',
                variant: 'fas',
                animation: 'beat',
                color: 'red',
                size: '2x',
            },
            {
                wrapper: 'i',
                ic: 'twitter',
                variant: 'fab',
                animation: 'fade',
                color: 'blue',
                size: '3x',
            },
            {
                wrapper: 'i',
                ic: 'comment',
                variant: 'far',
                animation: 'flip',
                color: 'green',
                size: '1x',
            },
            {
                wrapper: 'i',
                ic: 'star',
                variant: 'far',
                animation: 'spin',
                color: 'yellow',
                size: '2x',
            },
            {
                wrapper: 'i',
                ic: 'heart',
                variant: 'fas',
                animation: 'beat',
                color: 'orange',
                size: '5x',
            },
        ];

        const wrappers = propss.map(props => render(<FaIcon {...props} />));

        wrappers.forEach((wrapper, i) => {
            const tag = wrapper.container.getElementsByTagName('i');
            expect(tag.length).toBe(1);

            expect(tag[0].classList.value.includes(`fa-${propss[i].ic}`)).toBeTruthy();
            expect(tag[0].classList.value.includes(`fa-${propss[i].animation}`)).toBeTruthy();
            expect(tag[0].classList.value.includes(`fa-${propss[i].size}`)).toBeTruthy();

            const variant =
                propss[i].variant === 'fas' ? 'fa-solid' :
                propss[i].variant === 'fab' ? 'fa-brands' : 'fa-regular';
            expect(tag[0].classList.value.includes(variant)).toBeTruthy();

            expect(tag[0].style.color).toEqual(propss[i].color);
        });
    });

    it('renders icon with `fa` wrapper', () => {
        const propss: Array<TIcon> = [
            {
                wrapper: 'fa',
                t: 'str',
                ic: 'pen',
                variant: 'fas',
                animation: 'beat',
                color: 'red',
                size: '2x',
            },
            {
                wrapper: 'fa',
                t: 'obj',
                ic: faTwitter,
                animation: 'fade',
                color: 'blue',
                size: '3x',
            },
            {
                wrapper: 'fa',
                t: 'str',
                ic: 'comment',
                variant: 'far',
                animation: 'flip',
                color: 'green',
                size: '1x',
            },
            {
                wrapper: 'fa',
                t: 'obj',
                ic: faStar,
                animation: 'spin',
                color: 'yellow',
                size: '2x',
            },
            {
                wrapper: 'fa',
                ic: 'heart',
                variant: 'fas',
                animation: 'beat',
                color: 'orange',
                size: 'sm',
            },
        ];

        const wrappers = propss.map(props => shallow(<FaIcon {...props} />));
        wrappers.forEach(wrapper => expect(toJson(wrapper)).toMatchSnapshot());
    });
});
