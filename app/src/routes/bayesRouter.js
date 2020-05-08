const include = require('../../modules.js');
// const auth = require('./../middleware/authentication');
const bayesController = require('../controllers/bayesController.js')
const router = include.express.Router();

router.get('/', bayesController.bayes);

module.exports = router
