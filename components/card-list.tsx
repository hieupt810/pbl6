import { Product } from '@prisma/client';

import ShoppingCard from './shopping-card';

type Props = {
    products: Product[];
};

export default function CardList({ products }: Props) {
    return (
        <div className="grid grid-cols-4 gap-3">
            {products.map((product) => (
                <ShoppingCard key={product.id} product={product} />
            ))}
        </div>
    );
}
