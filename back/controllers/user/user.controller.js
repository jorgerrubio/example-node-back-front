'use strict';
const Message = require('../../utils/messages');
const UserDb = require('./../../models/user');
const { unlink } = require('fs-extra');
const path = require('path');

class User {
    async all(req, res) {
        const users = await UserDb.find({deleted_at: null});
        const message = Message.success('', users);
        res.status(200).json(message);
    }

    async delete(req, res) {
        const id = req.params.id;
        if (id) {
            const user = await UserDb.findByIdAndDelete(id);
            console.log('url photo', path.resolve(`./back/public${user.photo}`));
            unlink(path.resolve(`./back/public${user.photo}`));
           /*  const user = await UserDb.findByIdAndUpdate(id, {
                deleted_at: Date.now()
            }); */
            if (user) {
                res.status(200).json(Message.success('User successfully deleted', null));
            } else {
                res.status(500).json(Message.error('User not found'));
            }
        } else {
            res.status(500).json(Message.error('Missing id parameter'));
        }
    }

    async edit(req, res) {
        const id = req.params.id;
        const {
            name,
            lastname
        } = req.body;
        if (id, name, lastname) {
            const user = await UserDb.findByIdAndUpdate(id, {
                updated_at: Date.now(), name, lastname
            });
            const message = Message.success(user ? 'User successfully edited' : 'User no found', user);
            res.status(200).json(message);
        } else {
            res.status(500).json(Message.error('Missing id parameter'));
        }
    }

    async get(req, res) {
        const id = req.params.id;
        if (id) {
            const user = await UserDb.findById(id);
            const message = Message.success(user ? '' : 'User no found', user);
            res.status(200).json(message);
        } else {
            res.status(500).json(Message.error('Missing id parameter'));
        }
    }

    async restore(req, res) {
        const id = req.params.id;
        console.log('id', id);
        if (id) {
            const user = await UserDb.findByIdAndUpdate(id, {
                deleted_at: null, updated_at: Date.now()
            });
            if (user) {
                res.status(200).json(Message.success('User successfully restore', user));
            } else {
                res.status(500).json(Message.error('User not found'));
            }
        } else {
            res.status(500).json(Message.error('Missing id parameter'));
        }
    }

    async store(req, res) {
        const {
            name,
            lastname
        } = req.body;
        const photo = `/uploads/${req.file.filename}`;
        const newUser = new UserDb({
            name, lastname, photo
        });
        try {
            await newUser.save();
            res.status(200).json(Message.success('User successfully saved', newUser));
        } catch (error) {
            res.status(500).json(Message.error('Error saving user'));
        }
    }
}

module.exports = new User();