import {Ratelimit} from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import 'dotenv/config'

const rateLimit = new Ratelimit({
    redis : Redis.fromEnv(),
    limiter : Ratelimit.slidingWindow(10, '20s'),
})

export default rateLimit