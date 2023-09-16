import { Animal, Like, Post, Threat_cause, User } from "@prisma/client"

export type InMemoryData = {
    animals: Animal[]
    threat_causes: Threat_cause[]
    posts: Post[]
    users: User[]
    likes: Like[]
}
