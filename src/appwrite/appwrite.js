// import { Query } from 'node-appwrite';0
import { Client, Account, ID, Databases, Query, Storage } from "appwrite";
import conf from "../conf/conf";
export const clinet = new Client();
clinet.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProject);

export const account = new Account(clinet);
const databases = new Databases(clinet);
const storage = new Storage(clinet);

//Function
//Login

async function AppwriteLogin(email, password) {
  const promise = account.createEmailPasswordSession(email, password);
  if (promise) return promise;
  else console.log("Error in Login");
}

//Logout
async function AppwriteLogout() {
  return await account.deleteSession("current");
}
//Sign Up

async function AppwriteSignUp(email, password) {
  const promise = await account.create(ID.unique(), email, password);
  const Loggin = await account.createEmailPasswordSession(email, password);
  if (Loggin) return Loggin;
  else console.log("Error SignUP");
}
//Check Logged In user
async function AppwriteGet() {
  const promise = await account.get();
  if (promise) return promise;
  else return false;
}

//Update User Name

async function AppwriteUpdateName(name) {
  const user = AppwriteGet();
  if (user) {
    const promise = await account.updateName(name);
    if (promise) return promise;
    else {
      console.log("Error Updating Name");
      return true;
    }
  } else alert("Loggin please");
}

//Upload user Details
//TODO:
async function createUserDetails(userName, bio, email, name) {
  const promise = await databases.createDocument(
    conf.appwriteDatabase,
    conf.appwriteUsernamecollection,
    ID.unique(),
    {
      username: userName,
      email: email,
      bio: bio,
      name: name,
    }
  );
  return promise;
}

// Get user Details from DataBase
//TODO: check
async function getUserDetails(email) {
  try {
    const promise = await databases.listDocuments(
      conf.appwriteDatabase,
      conf.appwriteUsernamecollection,
      [Query.equal("email", email)] // Query that matches the email attribute
    );

    // Return the first document (assuming email is unique)
    return promise.documents[0];
  } catch (error) {
    console.error("Failed to fetch user details:", error);
  }
}

//update userdetails

async function updateUserDetails(
  id,
  username,
  bio,
  imageUrl,
  name,
  profileImageId
) {
  let promise = await databases.updateDocument(
    conf.appwriteDatabase,
    conf.appwriteUsernamecollection,
    id,
    {
      username: username,
      bio: bio,
      profileImage: imageUrl,
      name: name,
      profileImageId: profileImageId,
    }
  );
  return promise;
}

// upload image to appwrite bucket
async function uploadProfileImage(file) {
  const promise = storage.createFile(conf.appwriteBucket, ID.unique(), file);
  return promise;
}

//get Image from bucket
async function getProfileImage(id , bucketId = conf.appwriteBucket) {
  const promise = await storage.getFileView(bucketId, id);
  return promise;
}

//TODO: make a search option with the help of debounce and appwrite list documents

async function searchUser(query) {
  try {
    // Search by username
    const usernamePromise = await databases.listDocuments(
      conf.appwriteDatabase,
      conf.appwriteUsernamecollection,
      [Query.search("username", query)]
    );
   

    // Search by name
    const namePromise = await databases.listDocuments(
      conf.appwriteDatabase,
      conf.appwriteUsernamecollection,
      [Query.search("name", query)]
    );
  

    // Combine or compare the results
    const usernameResults = usernamePromise.documents;
    const nameResults = namePromise.documents;

    // Combine unique users (optional, depends on requirements)
    const combinedResults = [
      ...new Map(
        [...usernameResults, ...nameResults].map((item) => [item.$id, item])
      ).values(),
    ];

    return combinedResults;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error; // or handle the error as needed
  }
}
//* Delete the previous profile image

async function deleteProfileImage(id) {
  const promise = storage.deleteFile(conf.appwriteBucket, id);
  return promise;
}


//* Details of searched user 
async function fetchUserProfile(id) {
  const promise = await databases.getDocument(
    conf.appwriteDatabase ,
    conf.appwriteUsernamecollection ,
    id
  )
  return promise
}

//* Following and Follower 
async function followFollowing(followerID , followingId) {
  const promise = databases.createDocument(
    conf.appwriteDatabase ,
    conf.appwriteFollowsCollection ,
    ID.unique(),{
      followerId: followerID,
      followingId: followingId,
      followedAt: new Date().toISOString()
    }
  )

  return promise
  
}


//* get Following list
async function followingList(followerId) {
  const promise = await databases.listDocuments(
    conf.appwriteDatabase,
    conf.appwriteFollowsCollection,
    [Query.equal('followerId', followerId)]

  )
  return promise
}


//* get Follower list
async function followerList(followingId) {
  const promise = await databases.listDocuments(
    conf.appwriteDatabase,
    conf.appwriteFollowsCollection,
    [Query.equal('followingId', followingId)] 

  )
  return promise
}

//* get Users info by username 
async function fetchUserByUsername(username) {
  const promise = databases.listDocuments(
    conf.appwriteDatabase ,
    conf.appwriteUsernamecollection ,
    [Query.equal("username" , username)]
  )
  return promise
}

//* check if user has followed or not

async function checkFollowStatus(followerId, followingId) {
  try {
    const response = await databases.listDocuments(
      conf.appwriteDatabase,
      conf.appwriteFollowsCollection,
      [
        Query.equal('followerId', followerId),
        Query.equal('followingId', followingId)
      ]
    );

    
    return response // If length > 0, the user has followed the account
  } catch (error) {
    console.error("Error checking follow status:", error);
    return false; // Return false in case of error
  }
}

async function unfollowUser(id) {
  let promise = databases.deleteDocument(
    conf.appwriteDatabase,
    conf.appwriteFollowsCollection,
    id
  )
  return promise
}

async function uploadPost(file) {
  let promise = await storage.createFile(conf.appwritePostsBucket , ID.unique(), file)
  let url = await getProfileImage( promise.$id , conf.appwritePostsBucket )
  return {
    promise,
    url
  };
}

async function uploadPostContent(username , caption , postImage , postImageId ) {
    let promise = databases.createDocument(conf.appwriteDatabase,
      conf.appwritePostsDatabase , //*collection,
      ID.unique(),
      {
        "username" : username ,
        "caption" : caption ,
        "postImage" : postImage ,
        "postImageId" : postImageId
      } 
    )
    return promise
}

export { 
  uploadPostContent,
  uploadPost,
  unfollowUser,
  checkFollowStatus,
  fetchUserByUsername,
  followerList,
  followingList,
  followFollowing,
  searchUser,
  uploadProfileImage,
  getProfileImage,
  createUserDetails,
  getUserDetails,
  AppwriteLogin,
  AppwriteLogout,
  AppwriteSignUp,
  AppwriteUpdateName,
  AppwriteGet,
  updateUserDetails,
  deleteProfileImage,
  fetchUserProfile
};
