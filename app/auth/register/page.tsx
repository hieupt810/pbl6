'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Link } from '@nextui-org/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import registerHandler from './action';

import { FormInput } from '@/components/input';
import { title } from '@/components/primitives';
import { RegisterSchema, RegisterType } from '@/types/RegisterSchema';

export default function RegisterPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterType>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: { email: '', password: '', confirmPassword: '' },
        mode: 'onBlur',
    });

    async function onSubmit(data: RegisterType) {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) =>
            formData.append(key, value),
        );

        const res = await registerHandler(formData);

        if (res && res.status === 200) router.push('/auth/login');
    }

    return (
        <>
            <CardHeader className="justify-center">
                <span className={title({ color: 'violet', size: 'md' })}>
                    Register
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

                    <FormInput
                        required
                        errorMessage={errors.confirmPassword?.message}
                        formValidate={register('confirmPassword')}
                        isDisabled={isSubmitting}
                        placeholder="Confirm Password"
                        type="password"
                    />

                    <Button
                        aria-disabled={isSubmitting}
                        color="primary"
                        isLoading={isSubmitting}
                        type="submit"
                    >
                        Register
                    </Button>
                </form>
            </CardBody>

            <Divider />

            <CardFooter className="justify-center gap-1">
                <span>Already have an account?</span>
                <Link href="/auth/login" underline="hover">
                    Login
                </Link>
                <span>here.</span>
            </CardFooter>
        </>
    );
}
