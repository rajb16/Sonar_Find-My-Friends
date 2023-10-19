function createUser (email, password) {
    try {
      auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
};

function signIn (email, password) {
    try {
      auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
};