import { toPascalCase } from 'src/utilities/stringUtilities';

describe('stringUtilities > toPascalCase', () => {
    it('returns empty string for empty string', () => {
        const result = toPascalCase('');
        expect(result).toEqual('');
    });

    it('returns `Sample` for `sample`', () => {
        const result = toPascalCase('Sample');
        expect(result).toEqual('Sample');
    });

    it('returns `SampleText` for `SampleText`', () => {
        const result = toPascalCase('SampleText');
        expect(result).toEqual('SampleText');
    });
});
