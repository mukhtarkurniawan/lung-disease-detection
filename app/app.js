const {
    express
} = require('./modules.js')

const app = express()

const { 
    homeRouter,
    bayesRouter
} = require('./src/routes/index')


app.use('/home', homeRouter)
app.use('/bayes', bayesRouter)

module.exports = app