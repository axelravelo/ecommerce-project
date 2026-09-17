import { it, expect, describe } from "vitest";
import { formatMoney } from "./money";
//THIS IS AN EXAMPLE OF A UNIT TEST

//Describe is used to group tests, a group of tests is called a suite
describe('formatMoney', () => {
    //Defines what the expected output will be
    it('formats 1999 cents as $19.99', () => {
        //Checks if the result is correct
        expect(formatMoney(1999)).toBe('$19.99');
    });

    it('displays 2 decimals', () => {
        //Inside each test we can have multiple tests
        expect(formatMoney(1090)).toBe('$10.90');
        expect(formatMoney(100)).toBe('$1.00');

        expect(formatMoney(0)).toBe('$0.00');

        expect(formatMoney(-999)).toBe('-$9.99');
        expect(formatMoney(-100)).toBe('-$1.00');
    });
})

