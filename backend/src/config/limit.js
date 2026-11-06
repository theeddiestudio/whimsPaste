import {Ratelimit} from '@upstash/ratelimit';
import {Redis} from '@upstash/redis';
import dotenv from 'dotenv'

dotenv.config();

const rateLimit = new Ratelimit ({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, '180 s') // 100 requests per 3 mins
})

export default rateLimit;