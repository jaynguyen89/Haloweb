import { DateValidator, InputData, TDateOption } from 'src/utilities/data-validators/dataValidators';
import { TFieldResult } from 'src/utilities/data-validators/fieldsMediator';
import { TDateFormat } from 'src/commons/types';
import { format } from 'src/utilities/timeUtilities';

const dateFormats: TDateFormat = {
    formats: {
        date: 2,
        time: 1,
    },
};

describe('dataValidators.ts > DateValidator', () => {
    it('returns `valid` for Date before a specified beforeDate', () => {
        const options: TDateOption = { beforeDate: new Date('2024-03-24T18:30:33') };
        const dates = [
            new InputData(new Date('2023')),
            new InputData(new Date('2023-09')),
            new InputData(new Date('2023-12-23')),
            new InputData(new Date('2024-03-24T18:30')),
            new InputData(new Date('2024-03-24T18:30:32')),
        ];

        const results = dates.map(date => {
            const validator = new DateValidator(date, options, dateFormats);
            return validator.validate();
        });

        results.forEach(result => expect(result).toEqual({ isValid: true }));
    });

    it('returns `invalid` for Date on or after a specified beforeDate', () => {
        const options: TDateOption = { beforeDate: new Date('2024-03-24T18:30:33') };
        const dates = [
            new InputData(new Date('2025')),
            new InputData(new Date('2024-04')),
            new InputData(new Date('2024-03-25')),
            new InputData(new Date('2024-03-24T19:00:00')),
            new InputData(new Date('2024-03-24T18:30:33')),
            new InputData(new Date('2024-03-24T18:30:34')),
        ];

        const results = dates.map(date => {
            const validator = new DateValidator(date, options, dateFormats);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, object>([['messages.input-before-date', { date: format(options.beforeDate!, dateFormats) }]]),
        };

        results.forEach(result => expect(result).toEqual(expectation));
    });

    it('returns `valid` for Date after a specified afterDate', () => {
        const options: TDateOption = { afterDate: new Date('2024-03-24T18:30:33') };
        const dates = [
            new InputData(new Date('2025')),
            new InputData(new Date('2024-04')),
            new InputData(new Date('2024-03-25')),
            new InputData(new Date('2024-03-24T19:00:00')),
            new InputData(new Date('2024-03-24T18:31:00')),
            new InputData(new Date('2024-03-24T18:30:34')),
        ];

        const results = dates.map(date => {
            const validator = new DateValidator(date, options, dateFormats);
            return validator.validate();
        });

        results.forEach(result => expect(result).toEqual({ isValid: true }));
    });

    it('returns `invalid` for Date on or before a specified afterDate', () => {
        const options: TDateOption = { afterDate: new Date('2024-03-24T18:30:33') };
        const dates = [
            new InputData(new Date('2023')),
            new InputData(new Date('2024-02')),
            new InputData(new Date('2024-03-23')),
            new InputData(new Date('2024-03-24T17:00:00')),
            new InputData(new Date('2024-03-24T18:30:33')),
            new InputData(new Date('2024-03-24T18:30:32')),
        ];

        const results = dates.map(date => {
            const validator = new DateValidator(date, options, dateFormats);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, object>([['messages.input-after-date', { date: format(options.afterDate!, dateFormats) }]]),
        };

        results.forEach(result => expect(result).toEqual(expectation));
    });

    it('returns `valid` for Date between beforeDate and afterDate', () => {
        const options: TDateOption = {
            beforeDate: new Date('2024-03-24T18:30:33'),
            afterDate: new Date('2024-03-23T18:30:33'),
        };

        const dates = [
            new InputData(new Date('2024-03-24T18:30:32')),
            new InputData(new Date('2024-03-23T22:41:59')),
            new InputData(new Date('2024-03-24T06:16:27')),
            new InputData(new Date('2024-03-23T18:30:34')),
        ];

        const results = dates.map(date => {
            const validator = new DateValidator(date, options, dateFormats);
            return validator.validate();
        });

        results.forEach(result => expect(result).toEqual({ isValid: true }));
    });

    it('returns `invalid` for Date outside beforeDate and afterDate', () => {
        const options: TDateOption = {
            beforeDate: new Date('2024-03-24T18:30:33'),
            afterDate: new Date('2024-03-23T18:30:33'),
        };

        const dates = [
            new InputData(new Date('2024-03-24T18:30:34')),
            new InputData(new Date('2024-03-24T18:30:33')),
            new InputData(new Date('2024-03-23T18:30:32')),
            new InputData(new Date('2024-03-23T18:30:33')),
        ];

        const results = dates.map(date => {
            const validator = new DateValidator(date, options, dateFormats);
            return validator.validate();
        });

        results.forEach(result => expect(result.isValid).toBeFalsy());
    });

    it('returns `valid` for Date among a set of dates', () => {
        const options: TDateOption = {
            among: [
                new Date('2024-03-24T18:30:33'),
                new Date('2020-12-02T04:16:00'),
                new Date('2028-07-15'),
                new Date('2015-09-19T11:00:00'),
                new Date('2029-11'),
                new Date('2030'),
                new Date('2029-11-01T23:38:01'),
                new Date('2022-08'),
                new Date('2027-02-28T06:44:00'),
                new Date('2017-01-09T16:00:00'),
                new Date('2026'),
                new Date('2027-04-21'),
            ],
        };

        const dates = [
            new InputData(new Date('2026')),
            new InputData(new Date('2029-11')),
            new InputData(new Date('2028-07-15')),
            new InputData(new Date('2017-01-09T16:00:00')),
            new InputData(new Date('2020-12-02T04:16:00')),
            new InputData(new Date('2024-03-24T18:30:33')),
        ];

        const results = dates.map(date => {
            const validator = new DateValidator(date, options, dateFormats);
            return validator.validate();
        });

        results.forEach(result => expect(result).toEqual({ isValid: true }));
    });

    it('returns `invalid` for Date not among a set of dates', () => {
        const options: TDateOption = {
            among: [
                new Date('2024-03-24T18:30:33'),
                new Date('2015-09-19T13:00:00'),
                new Date('2017-02-28T06:44:00'),
                new Date('2027-04-21'),
                new Date('2029-11'),
                new Date('2026'),
            ],
        };

        const dates = [
            new InputData(new Date('2030')),
            new InputData(new Date('2022-08')),
            new InputData(new Date('2028-07-15')),
            new InputData(new Date('2017-01-09T16:00:00')),
            new InputData(new Date('2020-12-02T04:16:00')),
            new InputData(new Date('2029-11-01T23:38:01')),
        ];

        const results = dates.map(date => {
            const validator = new DateValidator(date, options, dateFormats);
            return validator.validate();
        });

        const expectation: TFieldResult = {
            isValid: false,
            messages: new Map<string, object>([[
                'messages.input-among-dates',
                { dates: options.among?.map(date => format(date, dateFormats))?.join(', ') }
            ]]),
        };

        results.forEach(result => expect(result).toEqual(expectation));
    });
});
