import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers'

export async function middleware(request: NextRequest) {
    console.log(typeof  window)
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem('token')
        console.log(data)
    }

}
