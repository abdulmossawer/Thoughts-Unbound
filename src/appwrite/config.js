import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  validateSlug(slug) {
    const validChars = /^[a-zA-Z0-9._-]{1,255}$/; // Increase limit to 255
    return validChars.test(slug);
  }

  async createPost({ title, slug, content, featuredImage, status, userId, userName }) {
    if (!this.validateSlug(slug)) {
      throw new Error("Invalid slug: Must be 255 characters or less, and only contain alphanumeric characters, periods, hyphens, and underscores.");
    }

    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
          userName,
        }
      );
    } catch (error) {
      console.error("Appwrite service :: createPost :: error", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    if (!this.validateSlug(slug)) {
      throw new Error("Invalid slug: Must be 255 characters or less, and only contain alphanumeric characters, periods, hyphens, and underscores.");
    }

    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.error("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    if (!this.validateSlug(slug)) {
      throw new Error("Invalid slug: Must be 255 characters or less, and only contain alphanumeric characters, periods, hyphens, and underscores.");
    }

    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    if (!this.validateSlug(slug)) {
      throw new Error("Invalid slug: Must be 255 characters or less, and only contain alphanumeric characters, periods, hyphens, and underscores.");
    }

    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      const uploadedFile = await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
      if (uploadedFile && uploadedFile.$id) {
        return uploadedFile;
      }
      throw new Error("File upload failed");
    } catch (error) {
      console.error("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    if (!fileId) {
      console.error("Appwrite service :: deleteFile :: error: Missing fileId");
      return false;
    }
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    if (!fileId) {
      console.error(
        "Appwrite service :: getFilePreview :: error: Missing fileId"
      );
      return null;
    }
    try {
      return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.error("Appwrite service :: getFilePreview :: error", error);
      return null;
    }
  }

  async getPostByUser(userId) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("userId", userId)]
      );
    } catch (error) {
      console.error("Appwrite service :: getPostsByUser :: error", error);
      return false;
    }
  }

  async createComment({ postId, userId, content, userName }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCommentsCollectionId,
        ID.unique(),
        { postId, userId, content, userName }
      );
    } catch (error) {
      console.error("Appwrite service :: createComment :: error", error);
      throw error;
    }
  }

  async getCommentsByPost(postId) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCommentsCollectionId,
        [Query.equal("postId", postId)]
      );
    } catch (error) {
      console.error("Appwrite service :: getCommentsByPost :: error", error);
      return false;
    }
  }
}

const service = new Service();
export default service;
