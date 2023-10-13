const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    addAccount: async (req, res) => {
        const userId = parseInt(req.body.userId);
        try {
            const user = await prisma.users.findUnique({
                where: {
                    id: userId
                },
            });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const newAccount = await prisma.bank_accounts.create({
                data: {
                    bank_name: req.body.bank_name,
                    bank_account_number: req.body.bank_account_number,
                    balance: BigInt(req.body.balance),
                    user: {
                        connect: {
                            id: userId
                        },
                    },
                }
            });

            return res.json({
                data: {
                    id: newAccount.id,
                    bank_name: newAccount.bank_name,
                    bank_account_number: newAccount.bank_account_number,
                    balance: Number(newAccount.balance),
                },
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error adding account' });
        }
    },

    // Menampilkan Semua Akun dengan Pagination
    getAccount: async (req, res) => {
        try {
            const accounts = await prisma.bank_accounts.findMany();
            const accountsData = accounts.map(account => ({
                id: account.id,
                bank_name: account.bank_name,
                bank_account_number: account.bank_account_number,
                balance: Number(account.balance)
            }));

            return res.json({
                data: accountsData
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error getting account' });
        }
    },

    // Menampilkan detail Akun beserta User dan Profilenya
    getAccountById: async (req, res) => {
        const accountId = parseInt(req.params.accountId);

        try {
            const account = await prisma.bank_accounts.findUnique({
                where: {
                    id: accountId
                },
                include: {
                    user: true
                }
            });

            if (!account) {
                return res.status(404).json({ error: 'Account not found' });
            }

            const accountData = {
                id: account.id,
                bank_name: account.bank_name,
                bank_account_number: account.bank_account_number,
                balance: Number(account.balance),
                user: account.user,
            };

            return res.json({
                data: accountData
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error getting account detail' });
        }
    }
};
