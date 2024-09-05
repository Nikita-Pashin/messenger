import { getTokenPayload } from "@/shared/helpers/getTokenPayload/getTokenPayload";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { cookies } = req;
    const accessToken = cookies.get('access_token');

    if (!accessToken || !('value' in accessToken) || typeof accessToken.value !== 'string') {
      throw new Error('Something went wrong!');
    }

    const token = accessToken.value;
    let tokenPayload;
    
    try {
      tokenPayload = getTokenPayload(token);
    } catch (e) {
      
      return NextResponse.json({ error: 'Unauthorized' }, {
        status: 401,
        headers: { "Set-Cookie": `access_token=null; Secure; HttpOnly; SameSite=None; Path=/; Max-Age=0;` }
      });
    } 
    
    if (typeof tokenPayload === 'string') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(tokenPayload, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}