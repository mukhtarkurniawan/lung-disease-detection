const {
    express,
    cors
} = require('./modules.js')

const app = express()
app.use(cors())
app.use(express.json());

const { 
    homeRouter,
    bayesRouter
} = require('./src/routes/index')


app.use('/home', homeRouter)
app.use('/bayes', bayesRouter)

module.exports = app