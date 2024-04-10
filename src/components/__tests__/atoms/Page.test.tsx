import React from 'react';
import { render, queryByAttribute } from '@testing-library/react'
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import Page from 'src/components/atoms/Page/Page';

configure({ adapter: new Adapter() });
jest.mock('src/commons/variables/cssVariables.scss', () => ({
    none: 0,
    xxsmall: 1,
    medium: 2,
}));

describe('Page', () => {
    const props = {
        pageClassName: 'page-class-name',
        containerClassName: 'container-class-name',
        pageStyle: { margin: '20px' },
        containerStyle: { padding: '30px' },
    };

    it('renders successfully', () => {
        const wrapper = shallow(
            <Page {...props}><span id='span-id'>Test Child</span></Page>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render the given child', () => {
        const wrapper = render(
            <Page {...props}>
                <span id='span-id'>Test Child</span>
            </Page>
        );

        expect(wrapper.container.getElementsByTagName('span').length).toBe(1);

        const getById = queryByAttribute.bind(null, 'id');
        expect(getById(wrapper.container, 'span-id')).toBeDefined();

        expect(wrapper.container.getElementsByClassName('page-class-name').length).toBe(1);
        expect(wrapper.container.getElementsByClassName('container-class-name').length).toBe(1);
    });
});
