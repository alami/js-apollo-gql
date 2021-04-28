var {_id, users, photos, tags} = require('./Vars');
module.exports = {
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
    allPhotosD: (parent, args) => {
        args.after
        photos
    }
}