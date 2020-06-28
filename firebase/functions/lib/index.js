"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeed1 = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require('../permissions.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://project-1891851661445564942.firebaseio.com'
});
exports.getFeed1 = functions.https.onRequest(async (request, response) => {
    console.log('Getting something');
    const docs = await admin.firestore().collection('posts').orderBy('date', 'desc').get();
    response.json(docs.docs.map(doc => {
        return Object.assign({ postID: doc.id }, doc.data());
    }));
});
//# sourceMappingURL=index.js.map