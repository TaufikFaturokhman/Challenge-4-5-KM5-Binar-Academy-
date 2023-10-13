const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {
    // Buat Akun User
    registerUser: async (req, res) => {
        try {
            const user = await prisma.users.create({
                data: {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    profile: {
                        create: {
                            identity_number: req.body.identity_number,
                            identity_type: req.body.identity_type,
                            address: req.body.address,
                        },
                    },
                },
            });

            return res.json({
                data: user,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ err: 'Error!' });
        }
    },

    getUsers: async (req, res) => {
        try {
            const users = await prisma.users.findMany({
                include: {
                    profile: true,
                },
            });
            return res.json({
                data: users,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ err: 'Error!' });
        }
    },

    getUserById: async (req, res) => {
        try {
            const userId = parseInt(req.params.userId);
            const user = await prisma.users.findUnique({
                where: {
                    id: userId,
                },
                include: {
                    profile: true,
                },
            });

            if (!user) {
                return res.status(404).json({ err: 'User Tidak Ada!' });
            }
            return res.json({
                data: user,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ err: 'Error user details!' });
        }
    },
};
