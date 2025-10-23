"use client";

import { Github, Globe } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur px-4 supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between py-6 space-y-4 sm:space-y-0">
          {/* Left side - Non-profit notice */}
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Non-profit</span> (for fun only)
          </div>

          {/* Right side - Social links */}
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/bytegen-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href="https://x.com/bytegen_dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaXTwitter className="h-4 w-4" />
              <span className="text-sm">X/Twitter</span>
            </a>
            <a
              href="https://bytegen.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm">Website</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
