import { authMiddleware } from "./middleware/user";


export default authMiddleware

export const config ={
    matcher: [
        'api/log'
    ]
}