import React, { useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
} from "@mantine/core";
import {
  TablerIcon,
  IconHome2,
  IconSearch,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
} from "@tabler/icons";
import { MantineLogo } from "@mantine/ds";
import Link from "next/link";

import { signIn, signOut } from "next-auth/react";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
  href: string;
}

function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  href,
}: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <Link href={href} legacyBehavior>
        <UnstyledButton
          onClick={onClick}
          className={cx(classes.link, { [classes.active]: active })}
        >
          <Icon stroke={1.5} />
        </UnstyledButton>
      </Link>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: "Home", href: "/Quizz" },
  { icon: IconSearch, label: "Search", href: "/WordsList" },
  { icon: IconSettings, label: "Settings", href: "/Settings" },
];

export function NavbarMinimal() {
  const [active, setActive] = useState(2);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <Navbar height={"100%"} width={{ base: 80 }} p="md">
      <Center>
        <MantineLogo type="mark" size={30} />
      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink
            icon={IconSwitchHorizontal}
            label="Change account"
            href={"/"}
            onClick={() => signIn()}
          />
          <NavbarLink
            icon={IconLogout}
            label="Logout"
            href={"/"}
            onClick={() => signOut()}
          />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
