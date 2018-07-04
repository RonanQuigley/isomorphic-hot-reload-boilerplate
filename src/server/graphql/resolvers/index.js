export default {
    Query: {
        posts: (_, args, context, info) => {
            return context.prisma.query.posts(
                {
                    where: {
                        OR: [
                            { title_contains: args.searchString },
                            { content_contains: args.searchString }
                        ]
                    }
                },
                info
            );
        },
        user: (_, args, context, info) => {
            return context.prisma.query.user(
                {
                    where: {
                        id: args.id
                    }
                },
                info
            );
        }
    },
    Mutation: {
        createDraft: (_, args, context, info) => {
            return context.prisma.mutation.createPost(
                {
                    data: {
                        title: args.title,
                        content: args.title,
                        author: {
                            connect: {
                                id: args.authorId
                            }
                        }
                    }
                },
                info
            );
        },
        publish: (_, args, context, info) => {
            return context.prisma.mutation.updatePost(
                {
                    where: {
                        id: args.id
                    },
                    data: {
                        published: true
                    }
                },
                info
            );
        },
        deletePost: (_, args, context, info) => {
            return context.prisma.mutation.deletePost(
                {
                    where: {
                        id: args.id
                    }
                },
                info
            );
        },
        signup: (_, args, context, info) => {
            return context.prisma.mutation.createUser(
                {
                    data: {
                        name: args.name
                    }
                },
                info
            );
        }
    }
};
