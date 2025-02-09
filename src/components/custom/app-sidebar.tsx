"use client";

import * as React from "react";
import { GalleryVerticalEnd, Plus } from "lucide-react";
import { useState } from "react";

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
import { NavMain } from "./nav-main";
import { NavHistory } from "./nav-history";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { sidebarData } from "../../data/sidebar";
import { ServerBalance } from "./server-balance";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const router = useRouter();

  const isExpanded = state === "expanded";
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const handleClickCreatePoll = () => {
    router.push("/agent/");
  };

  const handleFaucetRequest = () => {
    setRefetchTrigger((prev) => !prev);
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex items-center gap-2">
        <div className="p-2">
          <div
            className={`flex ${
              isExpanded ? "flex-row" : "flex-col"
            } items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 dark:from-indigo-600 dark:to-pink-500 p-2`}
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white/20 dark:bg-black/30 text-white">
              <GalleryVerticalEnd className="size-4" />
            </div>

            {isExpanded && (
              <div className="flex-1">
                <span className="truncate text-lg font-semibold text-white">
                  Glance
                </span>
              </div>
            )}

            <ServerBalance refetchTrigger={refetchTrigger} />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-center w-full mt-3">
            <Button
              variant={"ghost"}
              className="rounded-lg text-[14px] font-semibold backdrop-blur-md
                                bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100
                                text-black dark:text-white transition-all duration-300
                                group-hover:-translate-y-0.2 border border-black/10 dark:border-white/10
                                hover:shadow-md dark:hover:shadow-neutral-800/50"
              onClick={handleClickCreatePoll}
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
        <NavMain items={sidebarData.navMain} />
        <NavHistory histories={sidebarData.histories} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser onFaucetRequest={handleFaucetRequest} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
