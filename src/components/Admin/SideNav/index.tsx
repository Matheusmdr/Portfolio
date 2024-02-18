import * as React from "react";
import {
  CalendarCheck2,
  Users,
} from "lucide-react";

import { Nav } from "@/components/Admin/SideNav/Nav";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Tabs } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useRouter } from "next/router";

export function SideNav({ children }: React.PropsWithChildren) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const defaultLayout = [265, 440, 655];
  const navCollapsedSize = 4;
  const { pathname } = useRouter();

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="!h-dvh items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out",
          )}
          onCollapse={() => {
            setIsCollapsed(true);
          }}
          onExpand={() => {
            setIsCollapsed(false);
          }}
        >
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Projetos",
                label: "",
                icon: CalendarCheck2,
                variant: pathname === "/admin/projetos" ? "default" : "ghost",
                url: "/admin/projetos",
              },
              {
                title: "Habilidades",
                label: "",
                icon: Users,
                variant:
                  pathname === "/admin/habilidades" ? "default" : "ghost",
                url: "/admin/habilidades",
              },
            ]}
          />
          <Separator />
        </ResizablePanel>
        <ResizableHandle withHandle className="text-white" />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <Separator />
            {children}
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
