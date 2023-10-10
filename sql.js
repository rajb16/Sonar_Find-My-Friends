const pool = require('./database'); // Import the MySQL connection pool

// Function to add a new user to the Users table.
const addUser = (username, password, fullName, email, latitude, longitude) => {
  const sql = 'INSERT INTO Users (Username, Password, FullName, Email, Latitude, Longitude) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [username, password, fullName, email, latitude, longitude];

  return pool.execute(sql, values)
    .then(([rows]) => {
      if (rows.affectedRows > 0) {
        return true; // User added successfully
      } else {
        return false; // User not added
      }
    })
    .catch((error) => {
      throw error; // Error while executing SQL
    });
};

// Function to get an existing user's information by username.
const getUserByUsername = (username) => {
  const sql = 'SELECT * FROM Users WHERE Username = ?';
  const values = [username];

  return pool.execute(sql, values)
    .then(([rows]) => {
      if (rows.length > 0) {
        const user = rows[0];
        return user; // User information found
      } else {
        return null; // User not found
      }
    })
    .catch((error) => {
      throw error; // Error while executing SQL
    });
};

// Function to send a friend request.
const sendFriendRequest = (senderUserID, receiverUserID) => {
  const sql = 'INSERT INTO Friendships (SenderUserID, ReceiverUserID, Status) VALUES (?, ?, ?)';
  const values = [senderUserID, receiverUserID, 'requested'];

  return pool.execute(sql, values)
    .then(([rows]) => {
      if (rows.affectedRows > 0) {
        return true; // Friend request sent successfully
      } else {
        return false; // Friend request not sent
      }
    })
    .catch((error) => {
      throw error; // Error while executing SQL
    });
};

// Function to accept a friend request.
const acceptFriendRequest = (friendshipID) => {
  const sql = 'UPDATE Friendships SET Status = ? WHERE FriendshipID = ?';
  const values = ['accepted', friendshipID];

  return pool.execute(sql, values)
    .then(([rows]) => {
      if (rows.affectedRows > 0) {
        return true; // Friend request accepted successfully
      } else {
        return false; // Friend request not accepted
      }
    })
    .catch((error) => {
      throw error; // Error while executing SQL
    });
};

// Function to retrieve a user's friends.
const getUserFriends = (userID) => {
  const sql = 'SELECT U.* FROM Users U INNER JOIN Friendships F ON U.UserID = F.ReceiverUserID WHERE F.SenderUserID = ? AND F.Status = "accepted"';
  const values = [userID];

  return pool.execute(sql, values)
    .then(([rows]) => {
      const friends = rows;
      return friends;
    })
    .catch((error) => {
      throw error; // Error while executing SQL
    });
};

// Function to retrieve a user's posts (stories).
const getUserPosts = (userID) => {
  const sql = 'SELECT * FROM Stories WHERE UserID = ?';
  const values = [userID];

  return pool.execute(sql, values)
    .then(([rows]) => {
      const posts = rows;
      return posts;
    })
    .catch((error) => {
      throw error; // Error while executing SQL
    });
};

module.exports = {
  addUser,
  getUserByUsername,
  sendFriendRequest,
  acceptFriendRequest,
  getUserFriends,
  getUserPosts,
};
