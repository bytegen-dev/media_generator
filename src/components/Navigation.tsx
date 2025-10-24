"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Menu, X, Github, Globe } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Update active tab based on current path
  useEffect(() => {
    const updateActiveTab = () => {
      if (pathname === "/") {
        setActiveTab("Home");
      } else if (pathname === "/settings") {
        setActiveTab("Settings");
      } else if (pathname === "/help") {
        setActiveTab("Help");
      }
    };
    updateActiveTab();
  }, [pathname]);

  const tabs = [{ name: "Home" }, { name: "Settings" }, { name: "Help" }];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "Home") {
      router.push("/");
    } else if (tab === "Settings") {
      router.push("/settings");
    } else if (tab === "Help") {
      router.push("/help");
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="border-b bg-background/95 backdrop-blur px-4 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">TTM_G</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden">
              <Button variant="outline" onClick={toggleMobileMenu}>
                Menu <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {
        <div
          className={cn(
            "fixed inset-0 z-50 md:hidden opacity-0 transition-all duration-300 ease-in-out pointer-events-none bg-background/40 backdrop-blur-md",
            isMobileMenuOpen && "opacity-100 pointer-events-auto"
          )}
        >
          {/* Backdrop */}
          <div className="fixed inset-0" />

          {/* Menu Content */}
          <div className="fixed inset-0 flex flex-col">
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleMobileMenu}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation Links - Centered */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => handleTabChange(tab.name)}
                  className={`text-2xl font-medium transition-colors ${
                    activeTab === tab.name
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Social Links - Fixed Bottom */}
            <div className="flex justify-center space-x-8 pb-8">
              <a
                href="https://github.com/bytegen-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://x.com/isaacadebayo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaXTwitter className="h-6 w-6" />
              </a>
              <a
                href="https://isaacadebayo.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      }
    </>
  );
}
