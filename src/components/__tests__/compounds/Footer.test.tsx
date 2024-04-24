import React from 'react';
import { configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { renderWithTheme, shallowWithTheme } from 'src/commons/themes/themeMock';
import Footer from 'src/components/compounds/Footer/Footer';
import withMocks from 'src/foundation/withMocks';
import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
// import { publicDataMock } from 'src/models/PublicData';
import { setDefaultTheme } from 'src/redux/actions/themeActions';
import { getByAttribute } from 'src/utilities/testUtilities';

configure({ adapter: new Adapter() });

jest.mock('src/redux/actions/themeActions', () => ({
    setDefaultTheme: jest.fn(),
}));

describe('Footer.tsx', () => {
    it('renders successfully', () => {
        const wrapper = shallowWithTheme(withMocks(<Footer />));
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('has language selection dropdown', async () => {
        const wrapper = renderWithTheme(withMocks(<Footer />, true));

        const selectBox = getByAttribute('aria-labelledby')(wrapper.container, 'language-select-label');
        expect(selectBox).toBeDefined();
        userEvent.click(selectBox);

        const dropdownList = await screen.findByRole('listbox');
        expect(dropdownList).toBeDefined();

        const languageItems = dropdownList!.getElementsByTagName('li');

        expect(languageItems).toBeDefined();
        // expect(languageItems.length).toBe(publicDataMock.languages.length);
        //
        // for (const entry of languageItems) {
        //     const h6 = entry.getElementsByTagName('h6')[0];
        //     expect(h6.textContent).toEqual(publicDataMock.languages[i].display);
        // }
    });

    it('has theme selection dropdown', async () => {
        const wrapper = renderWithTheme(withMocks(<Footer />, true));

        const selectBox = getByAttribute('aria-labelledby')(wrapper.container, 'theme-select-label');
        expect(selectBox).toBeDefined();
        userEvent.click(selectBox);

        const dropdownList = await screen.findByRole('listbox');
        expect(dropdownList).toBeDefined();

        const themeItems = dropdownList!.getElementsByTagName('li');

        expect(themeItems).toBeDefined();
        // expect(themeItems.length).toBe(publicDataMock.themes.length);
        //
        // for (const entry of themeItems) {
        //     const h6 = entry.getElementsByTagName('h6')[0];
        //     expect(h6.textContent).toEqual(publicDataMock.themes[i].display);
        // }
    });
});
