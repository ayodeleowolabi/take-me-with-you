const express = require('express');
const router = express.Router();
const countriesCtrl = require('../controllers/countries');


// creating a hoot. CREATE Functionality
router.post('/', countriesCtrl.create)

// INDEX FUNCTIONALITY
router.get('/', countriesCtrl.index)


router.get('/:countryId', countriesCtrl.show)


router.put('/:countryId', countriesCtrl.update)

router.delete('/:countryId', countriesCtrl.deleteCountry)



// '/:countryId/city/' CREATE, INDEX
// '/:countryId/city/:cityId' SHOW UPDATE, DELETE
router.post('/:countryId/city', countriesCtrl.createCity)
router.get('/:countryId/city', countriesCtrl.indexCity)
router.get('/:countryId/city/:cityId', countriesCtrl.showCity)
router.put('/:countryId/city/:cityId', countriesCtrl.updateCity)
router.delete('/:countryId/city/:cityId', countriesCtrl.deleteCity)




module.exports = router;