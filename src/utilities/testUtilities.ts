import { queryByAttribute } from '@testing-library/react';

export const getByLabel = (label: string) => queryByAttribute.bind(null, label);

export const getById = (id: string) => queryByAttribute.bind(null, id);
