import { assert } from 'chai';
import { UserRoles } from './constants';
describe('Rank tests', function () {
    it('Regular User', async function () {
        assert.strictEqual(UserRoles.RegularUser, 0);
    });
    it('Priviledged User', async function () {
        assert.strictEqual(UserRoles.PrivilegedUser, 1);
    });
    it('Admin User', async function () {
        assert.strictEqual(UserRoles.AdminUser, 2);
    });
});
