const {send} = require('micro');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports = async (req, res) => {
    let result = []
    const testKey = (new Date()).toUTCString();
    if (undefined === process.env.S3_BUCKET) {
        send(res, 500, 'Missing S3_BUCKET')
        return
    }

    try {
        result = await s3.listObjectsV2({Bucket: process.env.S3_BUCKET}).promise()
    } catch (e) {
        send(res, 200, e.message)
        return;
    }

    try {
        await s3.putObject({Bucket: process.env.S3_BUCKET, Key: testKey, Body: 'test'}).promise()
    } catch (e) {
        send(res, 200, e.message)
        return;
    }

    try {
        await s3.deleteObject({Bucket: process.env.S3_BUCKET, Key: testKey}).promise()
    } catch (e) {
        send(res, 200, e.message)
        return;
    }

    send(res, 200, {listObjectsV2: result, putObject: true, deleteObject: true})
};
