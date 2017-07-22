'use strict';

describe('PROXY TEST', () => {

    it('result on proxy', (done) => {

        let options = {
            method: 'GET',
            url: '/blog'
        };

        server.inject(options, (response) => {
            expect(response).to.have.property('result');
            done();
        });
    });

});