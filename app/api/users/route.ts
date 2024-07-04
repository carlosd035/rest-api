import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// Esse código é o que vai rodar quando você fizer um GET em /api/users
export async function GET(request: NextRequest){
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
}

// Esse código é o que vai rodar quando você fizer um POST em /api/users
export async function POST(request: Request){
    const json = await request.json()
    const created = await prisma.user.create({
        data: json
    })

    return new NextResponse(JSON.stringify(created), { status: 201 })
}


// Como você não fez os métodos de DELETE e PUT, eles não existem na API, você pode fazer eles se quiser