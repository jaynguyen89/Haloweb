import { TDateFormat } from 'src/commons/types';
import { delay, format } from 'src/utilities/timeUtilities';

describe('timeUtilities.ts > format', () => {
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

describe('timeUtilities.ts > delay', () => {
    it('should pause for the specified duration', async () => {
        const startTime = Date.now();
        const delayTime = 1000; // 1 second

        await delay(delayTime);

        const endTime = Date.now();
        const elapsedTime = endTime - startTime;

        // Allow some margin of error due to setTimeout's precision
        const marginOfError = 50; // 50 milliseconds

        expect(elapsedTime).toBeGreaterThanOrEqual(delayTime - marginOfError);
        expect(elapsedTime).toBeLessThanOrEqual(delayTime + marginOfError);
    });

    it('should not pause missing duration', async () => {
        const startTime = Date.now();

        await delay(undefined);

        const endTime = Date.now();
        const elapsedTime = endTime - startTime;

        // Allow some margin of error due to setTimeout's precision
        const marginOfError = 50; // 50 milliseconds

        expect(elapsedTime).toBeLessThanOrEqual(marginOfError);
    });
});
