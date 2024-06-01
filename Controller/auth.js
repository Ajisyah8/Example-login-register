import { query } from "../Database/db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

const getUserByEmail = async (email) => {
    const command = 'SELECT * FROM Person WHERE email = ?';
    const result = await query(command, [email]);
    return result.length > 0 ? result[0] : null;
};


async function login (email, password) {
    try {
        // Validate input
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        // Fetch user from database
        const user = await getUserByEmail(email);

        // Check if user exists and password matches
        if (user && await bcrypt.compare(password, user.password)) {
            return { success: true, message: 'Login successful' };
        } else {
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        // Handle errors
        return { success: false, message: error.message };
    }

}

async function register(email, password) {
    try {
        // Validate input
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        // Check if user with the same email already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Add new user to the database
        const command = 'INSERT INTO Person (email, password) VALUES (?, ?)';
        await query(command, [email, hashedPassword]);

        return { success: true, message: 'Registration successful' };
    } catch (error) {
        // Handle errors
        return { success: false, message: error.message };
    }
}

export {login, register};