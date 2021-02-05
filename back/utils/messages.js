'use strict'
class Message {
    success(message, data) {
        return {
            error: 0,
            data: data,
            message: message
        }
    }

    error(message) {
        return {
            error: -1,
            data: null,
            message: message
        }
    }
}

module.exports = new Message();