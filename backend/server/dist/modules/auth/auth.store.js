"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStore = getUserStore;
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const node_crypto_1 = require("node:crypto");
const env_1 = require("../../config/env");
const auth_model_1 = require("./auth.model");
const mongoStore = {
    async findByEmail(email) {
        const user = await auth_model_1.UserModel.findOne({ email }).lean();
        if (!user)
            return null;
        return {
            id: String(user._id),
            name: user.name,
            email: user.email,
            password: user.password,
        };
    },
    async findById(id) {
        const user = await auth_model_1.UserModel.findById(id).lean();
        if (!user)
            return null;
        return {
            id: String(user._id),
            name: user.name,
            email: user.email,
            password: user.password,
        };
    },
    async create(input) {
        const created = await auth_model_1.UserModel.create(input);
        return {
            id: String(created._id),
            name: created.name,
            email: created.email,
            password: created.password,
        };
    },
};
const filePath = (0, node_path_1.resolve)(process.cwd(), env_1.env.fileAuthPath);
async function ensureStorageFile() {
    await (0, promises_1.mkdir)((0, node_path_1.dirname)(filePath), { recursive: true });
    try {
        await (0, promises_1.readFile)(filePath, "utf-8");
    }
    catch {
        await (0, promises_1.writeFile)(filePath, "[]", "utf-8");
    }
}
async function readUsers() {
    await ensureStorageFile();
    const content = await (0, promises_1.readFile)(filePath, "utf-8");
    try {
        const parsed = JSON.parse(content);
        return Array.isArray(parsed) ? parsed : [];
    }
    catch {
        return [];
    }
}
async function writeUsers(users) {
    await (0, promises_1.writeFile)(filePath, JSON.stringify(users, null, 2), "utf-8");
}
const fileStore = {
    async findByEmail(email) {
        const users = await readUsers();
        return users.find((user) => user.email === email) ?? null;
    },
    async findById(id) {
        const users = await readUsers();
        return users.find((user) => user.id === id) ?? null;
    },
    async create(input) {
        const users = await readUsers();
        const user = {
            id: (0, node_crypto_1.randomUUID)(),
            name: input.name,
            email: input.email,
            password: input.password,
        };
        users.push(user);
        await writeUsers(users);
        return user;
    },
};
function getUserStore() {
    return env_1.env.authStorage === "mongo" ? mongoStore : fileStore;
}
//# sourceMappingURL=auth.store.js.map