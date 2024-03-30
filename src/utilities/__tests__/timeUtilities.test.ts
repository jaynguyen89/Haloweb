import { TDateFormat } from 'src/commons/types';
import { format } from 'src/utilities/timeUtilities';

describe('format', () => {
    it('should throw error if any formats is missing', () => {
        const options1: TDateFormat = {
            dateOnly: true,
            formats: {},
        };
        const test1 = () => format(new Date(), options1);
        expect(test1).toThrow();

        const options2: TDateFormat = {
            timeOnly: true,
            formats: {},
        };
        const test2 = () => format(new Date(), options2);
        expect(test2).toThrow();

        const options3: TDateFormat = {
            formats: {},
        };
        const test3 = () => format(new Date(), options3);
        expect(test3).toThrow();
    });

    it('should return date only', () => {
        const options: TDateFormat = {
            dateOnly: true,
            formats: { date: 1 },
        };
        const date = new Date('2024-03-24T18:30:33');
        const result = format(date, options);

        expect(result).toEqual('Sun, 24 Mar 2024');
    });

    it('should return time only', () => {
        const options: TDateFormat = {
            timeOnly: true,
            formats: { time: 1 },
        };
        const date = new Date('2024-03-24T18:30:33');
        const result = format(date, options);

        expect(result).toEqual('18:30');
    });

    it('should return date and time', () => {
        const options: TDateFormat = {
            formats: { date: 3, time: 2 },
        };
        const date = new Date('2024-03-24T18:30:33');
        const result = format(date, options);

        expect(result).toEqual('Sun, 24/03/2024 06.30 PM');
    });
});
