const {createAccount} = require('../libs/accountsLibs');

module.exports = {
    create: async (req, res, next) => {
        try{
            let {bank_name, bank_account_number, balance, user_id} = req.body;

            try{
                let account = await createAccount(bank_name, bank_account_number, balance, user_id);
                return res.status(201).json({
                    status: true,
                    message: 'OK!',
                    data: account
                });
            } catch (err) {
                return res.status(400).json({
                    status: false,
                    message: err,
                    data: null
                })
            }
        } catch(err) {
            console.log(err)
        }
    },
}