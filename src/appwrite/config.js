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
        const validChars = /^[a-zA-Z0-9._-]{1,36}$/;
        return validChars.test(slug);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        if (!this.validateSlug(slug)) {
            throw new Error("Invalid slug: Must be 36 characters or less, and only contain alphanumeric characters, periods, hyphens, and underscores.");
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
                }
            );
        } catch (error) {
            console.error("Appwrite service :: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        if (!this.validateSlug(slug)) {
            throw new Error("Invalid slug: Must be 36 characters or less, and only contain alphanumeric characters, periods, hyphens, and underscores.");
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
            throw error;
        }
    }

    async deletePost(slug) {
        if (!this.validateSlug(slug)) {
            throw new Error("Invalid slug: Must be 36 characters or less, and only contain alphanumeric characters, periods, hyphens, and underscores.");
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
            throw error;
        }
    }

    async getPost(slug) {
        if (!this.validateSlug(slug)) {
            throw new Error("Invalid slug: Must be 36 characters or less, and only contain alphanumeric characters, periods, hyphens, and underscores.");
        }

        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.error("Appwrite service :: getPost :: error", error);
            throw error;
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
            throw error;
        }
    }

    async uploadFile(file) {
        try {
            const uploadedFile = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            return uploadedFile;
        } catch (error) {
            console.error("Appwrite service :: uploadFile :: error", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        if (!fileId) {
            throw new Error("Missing fileId");
        }

        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.error("Appwrite service :: deleteFile :: error", error);
            throw error;
        }
    }

    getFilePreview(fileId) {
        if (!fileId) {
            throw new Error("Missing fileId");
        }

        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            );
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
            console.error("Appwrite service :: getPostByUser :: error", error);
            throw error;
        }
    }
}

const service = new Service();
export default service;
