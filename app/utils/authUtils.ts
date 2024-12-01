// import { authOptions } from "@/lib/auth";
// import { error } from "console";
// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { NextRequest, NextResponse } from "next/server";




// export function withAuth<T extends (req: NextRequest) => Promise<NextResponse>>(
//     handler: T
// ) {
//     return async (req: NextRequest) => {
//         const session = await getServerSession(authOptions);

//         if (!session || !session.user || !session.user.id) {
//             return NextResponse.json({
//                 error: "You are unauthorised",
//                 message: "You must be logged in to access this resource"
//             }, { status: 401 })
//         }

//         try {
//             return await handler(req);
//         }
//         catch (error) {
//             console.error("API route error:", error);
//             return NextResponse.json({
//                 error: "Internal server error",
//                 message: "An unexpected error occured"
//             }, { status: 500 })
//         }
//     }
// }