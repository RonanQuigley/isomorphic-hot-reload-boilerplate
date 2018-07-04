import { Prisma } from 'prisma-binding';
import typeDefs from './generated/prisma.graphql';

export default new Prisma({
    typeDefs: typeDefs,
    // use the prisma endpoint dev server
    endpoint:
        'https://eu1.prisma.sh/ronan-quigley-011516/hot-reloading-boilerplate-redux/dev',
    debug: true
});
