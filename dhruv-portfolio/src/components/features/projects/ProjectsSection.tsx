"use client";

import { useState, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Code2,
  Folder,
  Star,
  Sparkles,
  ExternalLink,
  Github,
  Rocket,
} from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatCard, StatCardGrid } from "@/components/ui/StatCard";
import { FilterButton, FilterButtonGroup } from "@/components/ui/FilterButton";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { Project } from "@/types/project";
import projectsData from "@/data/projects.json";
import Link from "next/link";

// Lazy load ProjectModal - only loads when user opens a project
const ProjectModal = dynamic(
  () => import("./ProjectModal").then((mod) => ({ default: mod.ProjectModal })),
  {
    ssr: false,
  }
);

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [activeStatIndex, setActiveStatIndex] = useState<number | null>(null);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const galleryRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const isGalleryInView = useInView(galleryRef, {
    once: true,
    margin: "-100px",
  });

  // Memoized computed values
  const projects = useMemo(
    () =>
      (projectsData as Project[]).sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }),
    []
  );

  // Get popular technologies for filter buttons (top 6)
  const { filterOptions, technologyCounts } = useMemo(() => {
    const counts = projects
      .flatMap((p) => p.technologies)
      .reduce((acc, tech) => {
        acc[tech] = (acc[tech] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const popular = Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([tech]) => tech);

    return { filterOptions: ["All", ...popular], technologyCounts: counts };
  }, [projects]);

  // Filter projects based on active filter
  const { filteredProjects, filteredFeatured, filteredOther } = useMemo(() => {
    const filtered =
      activeFilter === "All"
        ? projects
        : projects.filter((p) => p.technologies.includes(activeFilter));

    return {
      filteredProjects: filtered,
      filteredFeatured: filtered.filter((p) => p.featured),
      filteredOther: filtered.filter((p) => !p.featured),
    };
  }, [projects, activeFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const featuredCount = projects.filter((p) => p.featured).length;
    const uniqueTechnologies = new Set(projects.flatMap((p) => p.technologies))
      .size;

    return [
      {
        icon: Folder,
        value: totalProjects,
        label: "Projects",
        color: "#3b82f6",
      },
      {
        icon: Code2,
        value: `${uniqueTechnologies}+`,
        label: "Technologies",
        color: "#8b5cf6",
      },
      {
        icon: Star,
        value: featuredCount,
        label: "Featured",
        color: "#f59e0b",
        fill: true,
      },
      { icon: Sparkles, value: "100%", label: "Production", color: "#10b981" },
    ];
  }, [projects]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleNext = () => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex(
      (p) => p.id === selectedProject.id
    );
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setSelectedProject(filteredProjects[nextIndex]);
  };

  const handlePrevious = () => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex(
      (p) => p.id === selectedProject.id
    );
    const previousIndex =
      (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedProject(filteredProjects[previousIndex]);
  };

  return (
    <>
      {/* Hero-Style Introduction Section */}
      <section
        id="projects"
        className="min-h-screen relative overflow-hidden flex items-center"
        ref={heroRef}
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Centered Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Section Header using reusable component */}
            <SectionHeader
              terminalPath="~/projects"
              title="Building the Future"
              description={
                <>
                  A curated collection of{" "}
                  <span className="text-primary font-semibold">
                    {projects.length} production-ready projects
                  </span>{" "}
                  spanning{" "}
                  <span className="text-primary font-semibold">
                    Full-Stack Development
                  </span>
                  ,{" "}
                  <span className="text-primary font-semibold">
                    AI/ML Solutions
                  </span>
                  , and{" "}
                  <span className="text-primary font-semibold">
                    Enterprise Applications
                  </span>
                  . Each project showcases scalable architecture, clean code
                  practices, and measurable real-world impact.
                </>
              }
              isInView={isHeroInView}
            />

            {/* Quick Stats using reusable component */}
            <StatCardGrid
              columns={4}
              className="mb-6 sm:mb-8 max-w-3xl mx-auto"
            >
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                  color={stat.color}
                  fill={stat.fill}
                  isActive={activeStatIndex === index}
                  onMouseEnter={() => setActiveStatIndex(index)}
                  onMouseLeave={() => setActiveStatIndex(null)}
                />
              ))}
            </StatCardGrid>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center px-2">
              <Button
                size="lg"
                className="group w-full sm:w-auto h-11 sm:h-12"
                onClick={() => {
                  document
                    .getElementById("project-gallery")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Rocket className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-y-0.5 transition-transform" />
                <span className="text-sm sm:text-base">Explore Projects</span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group w-full sm:w-auto h-11 sm:h-12"
                asChild
              >
                <Link
                  href="https://github.com/Dhruv-413"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base">View on GitHub</span>
                  <ExternalLink className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Scroll Indicator using reusable component */}
          <ScrollIndicator
            text="Scroll to explore"
            targetId="project-gallery"
            isInView={isHeroInView}
          />
        </div>
      </section>

      {/* Project Gallery Section */}
      <section
        id="project-gallery"
        className="py-12 sm:py-16 md:py-20 relative overflow-hidden"
        ref={galleryRef}
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Technology Filters using reusable component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isGalleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              <Code2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              <span className="text-xs sm:text-sm font-mono text-muted-foreground">
                Filter by Technology:
              </span>
            </div>
            <FilterButtonGroup>
              {filterOptions.map((filter, index) => (
                <FilterButton
                  key={filter}
                  label={filter}
                  isActive={activeFilter === filter}
                  count={
                    filter !== "All" ? technologyCounts[filter] : undefined
                  }
                  onClick={() => setActiveFilter(filter)}
                  animationDelay={0.1 + index * 0.05}
                  isInView={isGalleryInView}
                />
              ))}
            </FilterButtonGroup>
          </motion.div>

          {/* Featured Projects Section */}
          {filteredFeatured.length > 0 && (
            <div className="mb-12 sm:mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isGalleryInView ? { opacity: 1, x: 0 } : {}}
                className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
              >
                <div className="h-px flex-1 bg-linear-to-r from-transparent via-primary/50 to-primary" />
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 border border-primary/20 rounded-lg">
                  <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary fill-primary" />
                  <span className="text-xs sm:text-sm font-mono text-primary font-semibold">
                    Featured Work
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-primary/70">
                    ({filteredFeatured.length})
                  </span>
                </div>
                <div className="h-px flex-1 bg-linear-to-l from-transparent via-primary/50 to-primary" />
              </motion.div>

              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
              >
                {filteredFeatured.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    <ProjectCard
                      project={project}
                      onClick={() => handleProjectClick(project)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* Other Projects Section */}
          {filteredOther.length > 0 && (
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isGalleryInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
              >
                <div className="h-px flex-1 bg-linear-to-r from-transparent via-border to-primary/30" />
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-muted/50 border border-border/50 rounded-lg">
                  <Code2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                  <span className="text-xs sm:text-sm font-mono text-muted-foreground font-semibold">
                    More Projects
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-muted-foreground/70">
                    ({filteredOther.length})
                  </span>
                </div>
                <div className="h-px flex-1 bg-linear-to-l from-transparent via-border to-primary/30" />
              </motion.div>

              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
              >
                {filteredOther.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.2 + index * 0.05,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    <ProjectCard
                      project={project}
                      onClick={() => handleProjectClick(project)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center p-6 rounded-full bg-muted/50 border border-border/50 mb-4">
                <Code2 className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-6">
                No projects match the selected technology filter.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter("All")}
                className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-mono text-sm hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                Show All Projects
              </motion.button>
            </motion.div>
          )}

          {/* Modal */}
          <ProjectModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onNext={filteredProjects.length > 1 ? handleNext : undefined}
            onPrevious={
              filteredProjects.length > 1 ? handlePrevious : undefined
            }
          />
        </div>
      </section>
    </>
  );
}
