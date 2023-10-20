const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    createAccount: async (bank_name, bank_account_number, balance, user_id)=> {
        try{
            const account = await prisma.bank_accounts.create({
                data: {
                    bank_name, 
                    bank_account_number, 
                    balance, 
                    user: {
                        connect: {id:user_id}}
                    }
                })
            return account;
        } catch(err){
            console.log(err)
        }
    },
};