import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import '@testing-library/jest-dom';
import Loading, { variants } from 'src/components/molecules/StatusIndicators/Loading/Loading';
import { render } from '@testing-library/react';
import { getByAttribute } from 'src/utilities/testUtilities';
import { withStoreMock } from 'src/foundation/storeMock';

configure({ adapter: new Adapter() });

describe('Loading.tsx', () => {
    it('renders successfully', () => {
        const wrapper = shallow(<Loading stage='showcase' />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should not be visible when stage is incorrect', () => {
        const wrapper = render(withStoreMock(<Loading stage='invisible' variant='falling' />));
        const loadingElement = getByAttribute('data-title')(wrapper.container, 'falling');
        expect(loadingElement).toBeNull();
    });

    it('should be visible when stage is correct', () => {
        const wrapper = render(withStoreMock(<Loading stage='LOADING_TEST' variant='falling' />));
        const loadingElement = getByAttribute('data-title')(wrapper.container, 'falling');
        expect(loadingElement).toBeDefined();
    });

    it('renders according to the specified props', () => {
        const kinds = Object.keys(variants);
        const wrappers = kinds.map(kind => render(withStoreMock(<Loading variant={kind} stage='LOADING_TEST' />)));

        kinds.forEach((kind, i) => {
            const loadingElement = getByAttribute('data-title')(wrappers[i].container, kind);
            expect(loadingElement).toBeDefined();

            const stageElement = wrappers[i].container.getElementsByClassName('stage')[0];
            expect(stageElement).toBeDefined();

            const animation = wrappers[i].container.getElementsByClassName(variants[kind])[0];
            expect(animation).toBeDefined();
        });
    });
});
