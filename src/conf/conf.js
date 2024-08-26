const conf = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProject:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteUsernamecollection:String(import.meta.env.VITE_APPWRITE_USERNAME_DB),
    appwriteDatabase:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteBucket:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteFollowsCollection : String(import.meta.env.VITE_APPWRITE_FOLLOWS_DB),
    appwritePostsBucket : String(import.meta.env.VITE_APPWRITE_POST_BUCKET_ID),
    appwritePostsDatabase : String(import.meta.env.VITE_APPWRITE_POST_DB)
}

export default conf


