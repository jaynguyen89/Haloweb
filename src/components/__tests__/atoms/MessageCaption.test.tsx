import React from 'react';
import { configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { renderWithTheme } from 'src/commons/themes/themeMock';
import '@testing-library/jest-dom';
import MessageCaption, { IMessage, IStatus } from 'src/components/atoms/MessageCaption';
import withMocks from 'src/foundation/withMocks';
import _isArray from 'lodash/isArray';

configure({ adapter: new Adapter() });

const expectedMessages = {
    'error-message': 'This is an error message.',
    'info-message': 'This is an info message.',
    'success-message': 'This is a success message.',
    'warning-message': 'This is an warning message.',
    'error-status-1': 'This is an error status 1.',
    'error-status-2': 'This is an error status 2.',
    'info-status-1': 'This is an info status 1.',
    'info-status-2': 'This is an info status 2.',
    'success-status-1': 'This is a success status 1.',
    'success-status-2': 'This is a success status 2.',
    'warning-status-1': 'This is a warning status 1.',
    'warning-status-2': 'This is a warning status 2.',
};

describe('MessageCaption.tsx', () => {
    it('renders messages correctly', () => {
        const messages: Array<IMessage> = [
            {
                message: 'message-caption-test.error-message',
                options: { what: 'an error' },
                type: 'error',
            },
            {
                message: 'message-caption-test.info-message',
                type: 'info',
            },
            {
                message: 'message-caption-test.success-message',
                type: 'success',
            },
            {
                message: 'message-caption-test.warning-message',
                type: 'warning',
            },
        ];

        const wrappers = messages.map(message => renderWithTheme(withMocks(<MessageCaption {...message} />)));

        messages.forEach((message, i) => {
            const pTag = wrappers[i].container.getElementsByTagName('p')[0];

            expect(pTag).toBeDefined();
            expect(pTag.classList.value.includes('messageCaption')).toBeTruthy();
            expect(pTag.classList.value.includes(message.type!)).toBe(true);
            // @ts-ignore
            expect(pTag.textContent).toEqual(expectedMessages[message.message.split('.')[1]]);
        });
    });

    it('renders statuses correctly', () => {
        const statuses: Array<IStatus> = [
            {
                statuses: ['message-caption-test.error-status-1', 'message-caption-test.error-status-2'],
                type: 'error',
            },
            {
                statuses: new Map([
                    ['message-caption-test.info-status-1', { what: 'an info' }],
                    ['message-caption-test.info-status-2', undefined]
                ]),
                type: 'info',
            },
            {
                statuses: ['message-caption-test.success-status-1', 'message-caption-test.success-status-2'],
                type: 'success',
            },
            {
                statuses: new Map([
                    ['message-caption-test.warning-status-1', { what: 'a warning' }],
                    ['message-caption-test.warning-status-2', undefined]
                ]),
                type: 'warning',
            },
        ];

        const wrappers = statuses.map(status => renderWithTheme(withMocks(<MessageCaption {...status} />)));

        statuses.forEach((status, i) => {
            const pTags = wrappers[i].container.getElementsByTagName('p');

            const expectedLength = _isArray(status.statuses) ? (status.statuses as Array<string>).length : (status.statuses as Map<string, object | undefined>).size;
            expect(pTags.length).toBe(expectedLength);

            for (const pTag of pTags) {
                expect(pTag.classList.value.includes('messageCaption')).toBeTruthy();
                expect(pTag.classList.value.includes(status.type!)).toBe(true);
            }

            if (_isArray(status.statuses))
                (status.statuses as Array<string>).forEach((translationKey, j) =>
                    // @ts-ignore
                    expect(pTags[j].textContent).toEqual(expectedMessages[translationKey.split('.')[1]])
                );
            else
                Array.from((status.statuses as Map<string, object | undefined>).entries()).forEach((entry, j) => {
                    const [translationKey, _] = entry;
                    // @ts-ignore
                    expect(pTags[j].textContent).toEqual(expectedMessages[translationKey.split('.')[1]]);
                });
        });
    });
});
