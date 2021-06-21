const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.sendMessage = functions.https.onCall(async (data, context) => {
  if (!context.auth){
    throw new functions.https.HttpsError('no-credentials', 'Must be logged in.')
  }
  console.log("name = "+context.auth.token.name)
  console.log("message = "+data.message)
  return admin.firestore().collection('chat').add({
    name: context.auth.token.name,
    message: data.message,
  }).then(()=>{
    return { status:'ok' }
  });
});

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
// exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
//     .onCreate((snap, context) => {
//       // Grab the current value of what was written to Cloud Firestore.
//       const original = snap.data().original;
// 
//       // Access the parameter `{documentId}` with `context.params`
//       functions.logger.log('Uppercasing', context.params.documentId, original);
//       
//       const uppercase = original.toUpperCase();
//       
//       // You must return a Promise when performing asynchronous tasks inside a Functions such as
//       // writing to Cloud Firestore.
//       // Setting an 'uppercase' field in Cloud Firestore document returns a Promise.
//       return snap.ref.set({uppercase}, {merge: true});
//     });
