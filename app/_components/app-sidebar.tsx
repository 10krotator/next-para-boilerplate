"use client"

import { Home, Search, Settings, ArrowUpRight } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar"

import Image from "next/image"
import Link from "next/link"
import Logo from "@/public/logo.svg"
import Telegram from "@/public/telegram.svg"
import Twitter from "@/public/twitter-x.svg"

// Menu items.
    const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Transfers",
        url: "#",
        icon: ArrowUpRight,
    },
    {
        title: "Search address book",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
        <SidebarContent>
            <SidebarHeader>
                <div className="flex items-center gap-3">
                    <Image src={Logo} alt="swiift.com" width={40} height={40}/>
                    <span className="text-3xl font-bold leading-tight tracking-tight">swiift</span>
                </div>
            </SidebarHeader>
            <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                        <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <div className="flex items-center justify-end gap-4 py-4 px-2">
                <Link href="https://t.me/">
                    <Image src={Telegram} alt="Telegram" className="dark:invert" width={24} height={24} />
                </Link>
                <Link href="https://x.com/_swiift">
                    <Image src={Twitter} alt="Twitter" className="dark:invert" width={24} height={24} />
                </Link>
            </div>
        </SidebarFooter>
        </Sidebar>
    )
}
