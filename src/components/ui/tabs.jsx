import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({ className, ...props }) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "md:inline-flex h-9 mb-[20px] md:w-fit items-center justify-center rounded-lg md:p-[3px]",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative after:absolute after:left-0 after:bottom-0 after:h-[2px]  after:bg-[#888888] after:scale-x-0 data-[state=active]:after:scale-x-100 after:w-full after:duration-300 after:transition-transform  data-[state=active]:text-[#888888]  md:inline-flex  flex-1 items-center justify-center px-2 py-1 mr-[30px] text-sm font-semibold whitespace-nowrap  disabled:pointer-events-none  uppercase",
        className
      )} 
      {...props}
    />
  );
}

function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
