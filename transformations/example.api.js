'use strict';

module.exports = [

    /**
     * Example API
     */
    {
        method: 'GET',
        path: '/v1/alive',
        handler: (req, res) => {
            res({
                'alive': 'true'
            });
        }
    }

];