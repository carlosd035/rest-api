import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest){
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
}

export async function POST(request: Request){
    const json = await request.json()
    const created = await prisma.user.create({
        data: json
    })

    return new NextResponse(JSON.stringify(created), { status: 201 })
}
