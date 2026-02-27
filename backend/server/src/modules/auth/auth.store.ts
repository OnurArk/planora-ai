import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { randomUUID } from "node:crypto";
import { env } from "../../config/env";
import { UserModel } from "./auth.model";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type UserStore = {
  findByEmail: (email: string) => Promise<StoredUser | null>;
  findById: (id: string) => Promise<StoredUser | null>;
  create: (input: { name: string; email: string; password: string }) => Promise<StoredUser>;
};

const mongoStore: UserStore = {
  async findByEmail(email) {
    const user = await UserModel.findOne({ email }).lean();
    if (!user) return null;

    return {
      id: String(user._id),
      name: user.name,
      email: user.email,
      password: user.password,
    };
  },
  async findById(id) {
    const user = await UserModel.findById(id).lean();
    if (!user) return null;

    return {
      id: String(user._id),
      name: user.name,
      email: user.email,
      password: user.password,
    };
  },
  async create(input) {
    const created = await UserModel.create(input);
    return {
      id: String(created._id),
      name: created.name,
      email: created.email,
      password: created.password,
    };
  },
};

const filePath = resolve(process.cwd(), env.fileAuthPath);

async function ensureStorageFile() {
  await mkdir(dirname(filePath), { recursive: true });
  try {
    await readFile(filePath, "utf-8");
  } catch {
    await writeFile(filePath, "[]", "utf-8");
  }
}

async function readUsers(): Promise<StoredUser[]> {
  await ensureStorageFile();
  const content = await readFile(filePath, "utf-8");
  try {
    const parsed = JSON.parse(content) as StoredUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeUsers(users: StoredUser[]) {
  await writeFile(filePath, JSON.stringify(users, null, 2), "utf-8");
}

const fileStore: UserStore = {
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
    const user: StoredUser = {
      id: randomUUID(),
      name: input.name,
      email: input.email,
      password: input.password,
    };
    users.push(user);
    await writeUsers(users);
    return user;
  },
};

export function getUserStore(): UserStore {
  return env.authStorage === "mongo" ? mongoStore : fileStore;
}
