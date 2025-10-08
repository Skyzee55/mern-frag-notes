import rateLimit from "../lib/upstash.js"


export const rateLimiter = async (req, res , next) => {
    try {
       const {success} = await rateLimit.limit("my-rate-limit")

       if(!success) {
        return res.status(429).json({message : "Too many requests please try again later"})
       }

       next()
    } catch (error) {
        console.log(`Error in rateLimiter : ${error}`)
        res.status(500).json({message : error.message})
    }
}