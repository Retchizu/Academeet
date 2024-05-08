const filterUsersByInterests = (users, currentUserInterests) => {
  const filteredUsers = [];

  // Iterate through all the users
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    let isMatch = false;

    // Check if the user's interests match with the current user's interests
    for (let j = 0; j < user.userTopic.length; j++) {
      if (currentUserInterests.includes(user.userTopic[j])) {
        isMatch = true;
        break;
      }
    }

    // If there's a match, add the user to the filteredUsers array
    if (isMatch) {
      filteredUsers.push(user);
    }
  }
  // Return the filteredUsers array and the uniqueInterests array
  return { filteredUsers };
};

export { filterUsersByInterests };
