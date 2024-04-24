import { queryAllByAttribute, queryAllByText, queryByAttribute, queryByText } from '@testing-library/react';

export const getByAttribute = (attribute: string) => queryByAttribute.bind(null, attribute);

export const getAllByAttribute = (attribute: string) => queryAllByAttribute.bind(null, attribute);

export const getByText = (text: string) => queryByText.bind(null, text);

export const getAllByText = (text: string) => queryAllByText.bind(null, text);
