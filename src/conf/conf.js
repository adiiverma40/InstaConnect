const conf = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProject:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteUsernamecollection:String(import.meta.env.VITE_APPWRITE_USERNAME_DB),
    appwriteDatabase:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteBucket:String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default conf
