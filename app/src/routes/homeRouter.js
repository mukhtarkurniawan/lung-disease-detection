const include = require('../../modules.js');
// const auth = require('./../middleware/authentication');
const homeController = require('../controllers/homeController.js')
const router = include.express.Router();

router.get('/', homeController.getHomePage);

module.exports = router
