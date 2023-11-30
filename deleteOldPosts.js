const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { collection, getDocs, deleteDoc } = require('firebase/firestore');

admin.initializeApp();

exports.scheduledFunction = functions.pubsub
  .schedule('every 24 hours')
  .timeZone('your-timezone') // Set your timezone, e.g., 'America/New_York'
  .onRun(async (context) => {
    try {
      const filesCollection = collection(admin.firestore(), 'files');
      const userID = 'user_id'; // Replace with the actual user ID
      const userFilesCollection = collection(filesCollection, userID, 'userFiles');

      const querySnapshot = await getDocs(userFilesCollection);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const batch = admin.firestore().batch();

      querySnapshot.forEach((doc) => {
        const createdAt = doc.data().createdAt.toDate(); // Assuming createdAt is a Firestore timestamp field
        if (createdAt < yesterday) {
          batch.delete(doc.ref);
        }
      });

      await batch.commit();
      console.log('Scheduled function executed successfully.');
    } catch (error) {
      console.error('Error executing scheduled function:', error);
    }
  });
