import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../../Database/DB';
import User from '../../../../../Database/userModel';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
const jwt_key = process.env.JWT_TOKEN;

connectDB();

export async function GET(req: NextRequest) {
    try {
        const token = req.headers.get('Authorization')?.split(' ')[1];
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const decodedToken = jwt.verify(token, jwt_key!) as { id: string };
        const userId = decodedToken.id;
        console.log(userId);
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            name: user.name,
            email: user.email,
            mobile: user.mobile
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ err }, { status: 500 });
    }
}
