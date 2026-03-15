/**
 * Mobile Desktop Message Component
 * Prompts users to view detailed stats on desktop
 */

import { Monitor, Github, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { motion } from "framer-motion";

interface MobileDesktopMessageProps {
  isInView: boolean;
}

export function MobileDesktopMessage({ isInView }: MobileDesktopMessageProps) {
  const siteConfig = useSiteConfig();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="2xl:hidden mb-12"
    >
      <Card className="p-6 sm:p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/30">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-primary/10">
              <Monitor className="h-8 w-8 text-primary" aria-hidden="true" />
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">
            View Detailed Statistics on Desktop
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
            For the best experience viewing my contribution heatmap and detailed
            language statistics, please visit on a larger screen or check out my
            GitHub profile directly.
          </p>
          <Button
            asChild
            size="lg"
            className="group/link bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub profile"
            >
              <Github className="h-5 w-5 mr-2" aria-hidden="true" />
              <span className="font-semibold">Visit GitHub Profile</span>
              <ExternalLink
                className="h-5 w-5 ml-2 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"
                aria-hidden="true"
              />
            </a>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
