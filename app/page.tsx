import CardList from '@/components/card-list';
import prisma from '@/lib/db';

export default async function Home() {
    const products = await prisma.product.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
        take: 16,
    });

    return (
        <section className="flex flex-col items-center justify-center gap-4">
            <CardList products={products} />
        </section>
    );
}
