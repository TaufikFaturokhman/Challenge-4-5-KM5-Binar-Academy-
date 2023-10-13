const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    addTransaction: async (req, res) => {
        const { source_account_id, destination_account_id, amount } = req.body;
        try {
            const sourceAccount = await prisma.bank_accounts.findUnique({
                where: {
                    id: source_account_id
                },
            });

            if (!sourceAccount) {
                return res.status(404).json({ error: 'Source account not found' });
            }

            const destinationAccount = await prisma.bank_accounts.findUnique({
                where: {
                    id: destination_account_id
                },
            });

            if (!destinationAccount) {
                return res.status(404).json({ error: 'Destination account not found' });
            }

            const newTransaction = await prisma.transactions.create({
                data: {
                    source_account_id,
                    destination_account_id,
                    amount: BigInt(amount),
                    source_account: {
                        connect: {
                            id: source_account_id
                        },
                    },
                    destination_account: {
                        connect: {
                            id: destination_account_id
                        },
                    },
                }
            });

            return res.json({
                data: {
                    id: newTransaction.id,
                    source_account_id: newTransaction.source_account_id,
                    destination_account_id: newTransaction.destination_account_id,
                    amount: Number(newTransaction.amount),
                },
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error adding transaction' });
        }
    },

    getTransaction: async (req, res) => {
        try {
            const transactions = await prisma.transactions.findMany();
            const transactionsData = transactions.map(transaction => ({
                id: transaction.id,
                source_account_id: transaction.source_account_id,
                destination_account_id: transaction.destination_account_id,
                amount: Number(transaction.amount)
            }));

            return res.json({
                data: transactionsData
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error getting transactions' });
        }
    },

    getTransactionById: async (req, res) => {
        const transactionId = parseInt(req.params.transactionId);

        try {
            const transaction = await prisma.transactions.findUnique({
                where: {
                    id: transactionId
                },
                include: {
                    source_account: true,
                    destination_account: true
                }
            });

            if (!transaction) {
                return res.status(404).json({ error: 'Transaction not found' });
            }

            const transactionData = {
                id: transaction.id,
                source_account_id: transaction.source_account_id,
                destination_account_id: transaction.destination_account_id,
                amount: Number(transaction.amount),
                source_account: transaction.source_account,
                destination_account: transaction.destination_account,
            };

            return res.json({
                data: transactionData
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error getting transaction detail' });
        }
    }
};
