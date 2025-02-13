"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthToken_1 = require("./AuthToken");
describe('AuthToken', function () {
    var config;
    beforeEach(function () {
        config = {
            clientId: 'test-client',
            clientSecret: 'test-secret',
            audience: 'test-audience',
            grantType: 'client_credentials'
        };
    });
    it('should create an instance', function () {
        var auth = new AuthToken_1.default(config);
        expect(auth).toBeInstanceOf(AuthToken_1.default);
    });
    // Add more tests as needed
});
