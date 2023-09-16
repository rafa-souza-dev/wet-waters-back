import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(8080),
    DATABASE_URL: z.string().nonempty(),
    SUPABASE_SECRET_KEY: z.string().nonempty(),
    GITHUB_CLIENT_ID: z.string().nonempty(),
    GITHUB_CLIENT_SECRET: z.string().nonempty(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    console.error('Invalid environment variables', _env.error.format())

    throw new Error('Invalid environment variables')
}

export const env = _env.data
