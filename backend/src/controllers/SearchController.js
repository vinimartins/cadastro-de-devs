const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(req, res) {
        try {
            const { latitude, longitude, techs } = req.query
            const techsArray = parseStringAsArray(techs)
            const devs = await Dev.find({
                techs: {
                    $in: techsArray
                },
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [latitude, longitude]
                        },
                        $maxDistance: 10000, //10km
                    }
                }
            })
            return res.json({ devs })

        } catch (err) { return res.status(500).send(err) }
    },
}