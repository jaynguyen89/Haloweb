import React, { FunctionComponent } from 'react';
import { configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { renderWithTheme, shallowWithTheme } from 'src/commons/themes/themeMock';
import '@testing-library/jest-dom';
import DimOverlay from 'src/components/atoms/DimOverlay';

configure({ adapter: new Adapter() });

describe('DimOverlay.tsx', () => {
    it('renders successfully', () => {
        const wrapper = shallowWithTheme(<DimOverlay />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('is able to render inside component', () => {
        const MockComponent: FunctionComponent = ({ children }) => {
            return (
                <section style={{width: '100%', height: '100%', margin: 0, padding: 0}}>
                    <p>Mock Component</p>
                    {children}
                </section>
            );
        };

        const wrapper = renderWithTheme(<MockComponent><DimOverlay /></MockComponent>);

        const divTag = wrapper.container.getElementsByTagName('div')[0];
        expect(divTag).toBeVisible();
        expect(divTag.classList.value.includes('dimOverlay')).toBe(true);
    });
});
