const express = require('express')
const router = express.Router()
const userController = require('./controllers/userControllers')
const accountControllers = require('./controllers/accountControllers')
const transactionControlers = require('./controllers/transactionControlers')
const checkToken = require('./middleware/checkToken')

router.get('/', (req, res) => {
    return res.json({
        message: "Hello World"
    })
})

router.post('/auth/register', userController.registerUser)
router.post('/auth/login', userController.loginUser)
router.get('/auth/authenticate', checkToken, userController.getProfile)

// router.post('/users', userController.registerUser)
// router.get('/users', userController.getUsers)
// router.get('/users/:userId', userController.getUserById)
// router.post('/accounts', accountControllers.addAccount)
// router.get('/accounts', accountControllers.getAccount)
// router.get('/accounts/:accountId', accountControllers.getAccountById)
// router.post('/transactions', transactionControlers.addTransaction)
// router.get('/transactions', transactionControlers.getTransaction)
// router.get('/transactions/:transactions', transactionControlers.getTransactionById)

module.exports = router

  