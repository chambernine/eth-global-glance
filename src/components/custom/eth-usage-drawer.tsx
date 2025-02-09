"use client";

import type * as React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import ProgressBalance from "../ui/progress-balance";

interface EthUsageDrawerProps {
  balance: number;
  neededEth: number;
  children: React.ReactNode;
}

export function EthUsageDrawer({
  balance,
  neededEth,
  children,
}: EthUsageDrawerProps) {
  const isEnoughBalance = balance >= neededEth;

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>ETH Usage</DrawerTitle>
          <DrawerDescription>
            Check if you have enough ETH for this action.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium">Current Balance</p>
              <p className="text-2xl font-bold">{balance} ETH</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Required ETH</p>
              <p className="text-2xl font-bold">{neededEth} ETH</p>
            </div>
          </div>
          <ProgressBalance
            balance={balance}
            neededEth={neededEth}
            className="w-full"
          />
          <p className="mt-2 text-sm text-center">
            {isEnoughBalance
              ? "You have enough ETH for this action."
              : `You need ${(neededEth - balance).toFixed(4)} more ETH.`}
          </p>
        </div>
        <DrawerFooter>
          <Button disabled={!isEnoughBalance}>Proceed</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
