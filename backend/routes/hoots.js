const express = require('express');
const router = express.Router();
const hootsCtrl = require('../controllers/hoots');


// creating a hoot. CREATE Functionality
router.post('/', hootsCtrl.create)

// INDEX FUNCTIONALITY
router.get('/', hootsCtrl.index)


router.get('/:hootId', hootsCtrl.show)


router.put('/:hootId', hootsCtrl.update)

router.delete('/:hootId', hootsCtrl.deleteHoot)




module.exports = router;