import { Card } from '@nextui-org/card';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg justify-center text-center">
                <Card className="w-96 p-2" shadow="sm">
                    {children}
                </Card>
            </div>
        </section>
    );
}
