'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Link } from '@nextui-org/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import loginHandler from './action';

import { FormInput } from '@/components/input';
import { title } from '@/components/primitives';
import { LoginSchema, LoginType } from '@/types/LoginSchema';

export default function LoginPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: { email: '', password: '' },
        mode: 'onBlur',
    });

    async function onSubmit(data: LoginType) {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) =>
            formData.append(key, value),
        );

        const res = await loginHandler(formData);

        if (res && res.status === 200) router.push('/');
    }

    return (
        <>
            <CardHeader className="justify-center">
                <span className={title({ color: 'violet', size: 'md' })}>
                    Login
                </span>
            </CardHeader>

            <CardBody>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormInput
                        required
                        errorMessage={errors.email?.message}
                        formValidate={register('email')}
                        isDisabled={isSubmitting}
                        placeholder="Email"
                        type="text"
                    />

                    <FormInput
                        required
                        errorMessage={errors.password?.message}
                        formValidate={register('password')}
                        isDisabled={isSubmitting}
                        placeholder="Password"
                        type="password"
                    />

                    <Button
                        aria-disabled={isSubmitting}
                        color="primary"
                        isLoading={isSubmitting}
                        type="submit"
                    >
                        <span>Login</span>
                    </Button>
                </form>
            </CardBody>

            <Divider />

            <CardFooter className="justify-center gap-1">
                <span>Don&apos;t have an account?</span>
                <Link href="/auth/register" underline="hover">
                    Register
                </Link>
                <span>here.</span>
            </CardFooter>
        </>
    );
}
