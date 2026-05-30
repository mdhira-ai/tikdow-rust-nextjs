import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import Link from "next/link"


const pages = [
    {
        href: "/",
        name: "Home"
    },
    {
        href: "/Database",
        name: "Database"
    },
    {
        href: "/settings",
        name: "settings"
    },
    {
        href:"/videocall",
        name: "video call"
    }

]




export function HomeComponent({ children }: { children?: React.ReactNode }) {
    return (
        <ResizablePanelGroup
            orientation="horizontal"
            className=" min-h-dvh"

        >
            <ResizablePanel defaultSize="25%">
                <div className="flex flex-col h-full bg-[#18181B] p-4 gap-4">
                    {/* <h1 className="text-xl font-bold">TikDow</h1> */}
                    <nav className="flex flex-col gap-2">
                        {
                            pages.map((v, k) =>

                                <Link key={k} href={v.href} className="hover:bg-[#2D838D] p-2 rounded-md transition-colors">{v.name}</Link>
                            )
                        }
                    </nav>
                </div>

            </ResizablePanel>
            <ResizableHandle className="bg-[#86D8DA]" />
            <ResizablePanel defaultSize="75%" className="bg-[#18181B]">
                {children}
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
