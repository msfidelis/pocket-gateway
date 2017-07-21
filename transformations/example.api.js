module.exports = [

    /**
     * V1 Alive Method
     */
    {
        method: 'GET',
        path: '/v1/alive',
        handler: (req, res) => {
            res({
                'alive': 'true'
            })
        }
    }

]