import {describe, expect, it} from 'vitest';

import {antdOrderToApi} from './antdOrderToApi';

describe('antdOrderToApi', () => {
    it('преобразует порядок сортировки Ant Design в формат API', () => {
        expect(antdOrderToApi('ascend')).toBe('asc');
        expect(antdOrderToApi('descend')).toBe('desc');
        expect(antdOrderToApi(null)).toBeUndefined();
    });
});
