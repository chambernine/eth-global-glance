"use client";

import * as React from "react";
import { BookOpen, Bot, Plus, Settings2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { NavApp } from "./nav-app";
import { NavMain } from "./nav-main";
import { NavHistory } from "./nav-history";
import { Button } from "../ui/button";
import { models } from "@/data/models";
import { useRouter } from "next/navigation";

const data = {
  navMain: [
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: models.map((model) => ({
        title: model.name,
        url: `/agent/models/${model.id}`,
      })),
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  histories: [
    {
      name: "Design Engineering",
      url: "#",
    },
    {
      name: "Sales & Marketing",
      url: "#",
    },
    {
      name: "Travel",
      url: "#",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const router = useRouter();

  const isExpanded = state === "expanded";

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavApp />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-center w-full">
            <Button
              variant={"ghost"}
              className="rounded-lg text-[14px] font-semibold backdrop-blur-md
                                bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100
                                text-black dark:text-white transition-all duration-300
                                group-hover:-translate-y-0.2 border border-black/10 dark:border-white/10
                                hover:shadow-md dark:hover:shadow-neutral-800/50"
              onClick={() => router.push("/agent/")}
            >
              <Plus className="h-4 w-4" />
              {isExpanded && (
                <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                  Create Poll
                </span>
              )}
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <NavMain items={data.navMain} />
        <NavHistory histories={data.histories} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
