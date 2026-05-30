import config from "../../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite"; // 1. Imported Databases instead of TablesDB

export class DatabaseService {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(config.APPWRITE_URL)
            .setProject(config.APPWRITE_PROJECT_ID);

        this.databases = new Databases(this.client); // 2. Initialized Databases
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredimage, status, userid }) {
        try {
            return await this.databases.createDocument(
                config.APPWRITE_DATABASE_ID,
                config.APPWRITE_COLLECTION_ID,
                ID.unique(),
                {
                    title,
                    slug,
                    content,
                    featuredimage,
                    status,
                    userid
                }
            );
        } catch (error) {
            console.log("Error in createPost:", error);
        }
    }

    async updatePost(documentId, { title, content, featuredimage, status }) {
        try {
            return await this.databases.updateDocument(
                config.APPWRITE_DATABASE_ID,
                config.APPWRITE_COLLECTION_ID,
                documentId, // 3. Correct argument order
                {
                    title,
                    content,
                    featuredimage,
                    status,
                }
            );
        } catch (error) {
            console.log("Error in updatePost:", error);
        }
    }

    async deletePost(documentId) {
        try {
            await this.databases.deleteDocument(
                config.APPWRITE_DATABASE_ID,
                config.APPWRITE_COLLECTION_ID,
                documentId
            );
            return true;
        } catch (error) {
            console.log("Error in deletePost:", error);
            return false;
        }
    }

    async getPost(documentId) {
        try {
            return await this.databases.getDocument(
                config.APPWRITE_DATABASE_ID,
                config.APPWRITE_COLLECTION_ID,
                documentId
            );
        } catch (error) {
            console.log("Error in getPost:", error);
        }
    }

    async getActivePosts(queries = []) {
        try {
            return await this.databases.listDocuments(
                config.APPWRITE_DATABASE_ID,
                config.APPWRITE_COLLECTION_ID,
                queries
            );
        } catch (error) {
            console.log("Error in getActivePosts:", error);
            return false;
        }
    }

    async getPostBySlug(slug) {
        try {
            const response = await this.databases.listDocuments(
                config.APPWRITE_DATABASE_ID,
                config.APPWRITE_COLLECTION_ID,
                [
                    Query.equal("slug", slug),
                    Query.limit(1)
                ]
            );
            
            // 4. Mapped to old .documents array instead of .rows
            if (!response.documents || !response.documents.length) {
                throw new Error("Post not found");
            }
            return response.documents[0];
        } catch (error) {
            console.log("Error in getPostBySlug:", error);
            throw error;
        }
    }

    // --- File Upload Service ---
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.APPWRITE_BUCKET_ID,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Error in uploadFile:", error);
            return false;
        }
    }

    async downloadFile(fileId) {
        try {
            return await this.bucket.getFileDownload(
                config.APPWRITE_BUCKET_ID,
                fileId
            );
        } catch (error) {
            console.log("Error in downloadFile:", error);
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.APPWRITE_BUCKET_ID,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Error in deleteFile:", error);
            return false;
        }
    }

  
    // ✅ works on free plan
getFilePreview(fileId) {
    return this.bucket.getFileDownload(config.APPWRITE_BUCKET_ID, fileId);
}


}

export const databaseService = new DatabaseService();
