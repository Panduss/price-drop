import {User} from "../models/user";
import {getRepository} from "fireorm";
import {AuthUser} from "../models/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export async function login(email: string, password: string): Promise<AuthUser> {
    if (!email) {
        throw new Error('Email is required!');
    }
    if (!password) {
        throw new Error('Password is required!');
    }

    console.log({email, password})
    email = email.toLowerCase();
    const auth = getAuth();
    console.log({auth, email, password})
    let credentials = await signInWithEmailAndPassword(auth, email, password)

    console.log({credentials})

    if (!credentials.user) {
        throw new Error('Failed to log in user!');
    }

    const userId = credentials.user.uid;
    const token = await credentials.user.getIdToken();
    if (userId && token) {
        const usersRepository = getRepository(User);
        const user = await usersRepository.findById(userId);
        return new AuthUser(token, user.id, user.name, user.email)
    } else {
        throw new Error('Email is not verified!');
    }
}