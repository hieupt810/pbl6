import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import {
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Navbar as NextUINavbar,
} from '@nextui-org/navbar';
import { link as linkStyles } from '@nextui-org/theme';
import { User } from '@nextui-org/user';
import clsx from 'clsx';
import NextLink from 'next/link';

import { Logo } from '@/components/icons';
import { ThemeSwitch } from '@/components/theme-switch';
import { siteConfig } from '@/config/site';
import { getSessionDetail } from '@/utils/session';

export const Navbar = async () => {
    const session = await getSessionDetail();

    return (
        <NextUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="max-w-fit gap-3">
                    <NextLink
                        className="flex items-center justify-start gap-1"
                        href="/"
                    >
                        <Logo />
                        <p className="font-bold text-inherit">ACME</p>
                    </NextLink>
                </NavbarBrand>
                <ul className="ml-2 hidden justify-start gap-4 lg:flex">
                    {siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.href}>
                            <NextLink
                                className={clsx(
                                    linkStyles({ color: 'foreground' }),
                                    'data-[active=true]:font-medium data-[active=true]:text-primary',
                                )}
                                color="foreground"
                                href={item.href}
                            >
                                {item.label}
                            </NextLink>
                        </NavbarItem>
                    ))}
                </ul>
            </NavbarContent>

            <NavbarContent
                className="hidden basis-1/5 sm:flex sm:basis-full"
                justify="end"
            >
                <NavbarItem className="hidden gap-2 sm:flex">
                    <ThemeSwitch />
                </NavbarItem>

                {session ? (
                    <NavbarItem className="hidden md:flex">
                        <User
                            avatarProps={{
                                src: '/avatar.png',
                            }}
                            description={session.role}
                            name={session.email}
                        />
                    </NavbarItem>
                ) : (
                    <>
                        <NavbarItem className="hidden md:flex">
                            <Button
                                as={Link}
                                color="primary"
                                href={siteConfig.links.login}
                                variant="solid"
                            >
                                Log in
                            </Button>
                        </NavbarItem>

                        <NavbarItem className="hidden md:flex">
                            <Button
                                as={Link}
                                color="secondary"
                                href={siteConfig.links.register}
                                variant="solid"
                            >
                                Register
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>

            <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
                <ThemeSwitch />
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarMenu>
                <div className="mx-4 mt-2 flex flex-col gap-2">
                    {siteConfig.navMenuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                color={
                                    index === 2
                                        ? 'primary'
                                        : index ===
                                            siteConfig.navMenuItems.length - 1
                                          ? 'danger'
                                          : 'foreground'
                                }
                                href="#"
                                size="lg"
                            >
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </NextUINavbar>
    );
};
