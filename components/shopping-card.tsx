'use client';

import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Product } from '@prisma/client';
import { useRouter } from 'next/navigation';

type Props = {
    product: Product;
};

export default function ShoppingCard({ product }: Props) {
    const router = useRouter();

    return (
        <Card
            isPressable
            className="w-[250px]"
            shadow="sm"
            onPress={() => router.push(`/product/${product.id}`)}
        >
            <CardBody className="overflow-visible p-0">
                <Image
                    alt={product.name}
                    className="aspect-square object-cover"
                    height={'100%'}
                    radius="lg"
                    shadow="sm"
                    src={product.image || '/fallback-image.jpg'}
                />
            </CardBody>

            <CardFooter className="flex-col items-start justify-between">
                <b className="w-full overflow-hidden truncate text-left">
                    {product.name}
                </b>
                <p className="text-left text-default-500">{product.price}</p>
            </CardFooter>
        </Card>
    );
}
