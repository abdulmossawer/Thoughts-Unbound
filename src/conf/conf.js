const conf = {
  appwriteUrl: String(import.meta.env.VITE_REACT_APPWRITE_URL),
  appwriteProjectID: String(import.meta.env.VITE_REACT_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_REACT_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_REACT_APPWRITE_COLLECTION_ID),
  appwriteCommentsCollectionId: String(import.meta.env.VITE_REACT_APPWRITE_COMMENTS_COLLECTION_ID), 
  appwriteBucketId: String(import.meta.env.VITE_REACT_APPWRITE_BUCKET_ID),
};

export default conf;





