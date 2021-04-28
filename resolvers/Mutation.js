var {_id, users, photos, tags} = require('./Vars');
module.exports = {
    postPhoto(parent, args) {
        var newPhoto = {
            id: _id++,
            ...args
        }
        photos.push(newPhoto)
        return newPhoto
    },
    postPhoto1(parent, args) {
        var newPhoto = {
            id: _id++,
            ...args.input,
            created: new Date()
        }
        photos.push(newPhoto)
        return newPhoto
    }
}