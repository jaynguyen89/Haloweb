import React from 'react';
import { configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import PinCell from 'src/components/atoms/PinCell/PinCell';
import { renderWithTheme, shallowWithTheme } from 'src/commons/themes/themeMock';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';

configure({ adapter: new Adapter() });

describe('PinCell.tsx', () => {
    const mockOnChange = jest.fn();

    it('renders successfully', () => {
        const wrapper = shallowWithTheme(<PinCell onChange={mockOnChange} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders correct number of cells', () => {
        const numberOfCells = [5, 6, 7];
        const wrappers = numberOfCells.map((i) =>
            renderWithTheme(<PinCell onChange={mockOnChange} numOfCells={i} />)
        );

        wrappers.forEach((wrapper, i) =>
            expect(wrapper.container.getElementsByTagName('input')).toHaveLength(numberOfCells[i])
        );
    });

    it('is able to render disabled cells', () => {
        const numberOfCells = 6;
        const wrapper = renderWithTheme(
            <PinCell
                onChange={mockOnChange}
                disabled={true}
                numOfCells={numberOfCells}
            />
        );

        const inputs = wrapper.container.getElementsByTagName('input');
        [...Array(numberOfCells)].forEach((_, i) => expect(inputs[i]).toBeDisabled());
    });

    it('is able to return correct result', async () => {
        const cellInputs = ['3', 'A', '5', 'B', '7', 'C'];
        let expectedResult = cellInputs.join('');

        let actualResult = '';
        const onChange = (v: string) => actualResult = v;

        const wrapper = renderWithTheme(
            <PinCell onChange={onChange} type='text' />
        );

        const inputs = wrapper.container.getElementsByTagName('input');
        cellInputs.forEach((_, i) => fireEvent.input(inputs[i], { target: { value: cellInputs[i] } }));

        expect(actualResult).toEqual(expectedResult);
    });
});
