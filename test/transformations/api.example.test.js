'use strict';

describe('TRANSFORMATIONS TEST', () => {
    it('Access alive API', (done) => {

        let options = {
            method: 'GET',
            url: '/v1/alive'
        };

        server.inject(options, (response) => {
            expect(response).to.have.property('statusCode', 200);
            done();
        });

    });

});