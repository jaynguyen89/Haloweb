import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import CountryFlag from 'src/components/atoms/CountryFlag/CountryFlag';

configure({ adapter: new Adapter() });

describe('CountryFlag.tsx', () => {
    it('renders successfully', () => {
        const wrapper = shallow(<CountryFlag isoCountryCode='test' />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render CountryFlag with the given data', () => {
        const rectangle = shallow(<CountryFlag isoCountryCode='au' />);
        expect(rectangle.hasClass('fi-au')).toBeTruthy();
        expect(rectangle.hasClass('fis')).toBeFalsy();

        const square = shallow(<CountryFlag isoCountryCode='vn' variant='square' />);
        expect(square.hasClass('fi-vn')).toBeTruthy();
        expect(square.hasClass('fis')).toBeTruthy();
    });
});
