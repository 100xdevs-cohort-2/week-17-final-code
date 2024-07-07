import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export const GET = async () => {
    await client.user.create({
        data: {
            email: "asd",
            name: "adsads",
            number: "1234567890", // Provide a valid number
            password: "securepassword" // Provide a secure password
        }
    });
    return NextResponse.json({
        message: "hi there"
    });
};
