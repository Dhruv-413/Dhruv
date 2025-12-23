"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Code2,
  Folder,
  Star,
  Sparkles,
  Terminal,
  ArrowDown,
  ExternalLink,
  Github,
  Rocket,
} from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { Button } from "@/components/ui/button";
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

  const projects = (projectsData as Project[]).sort((a, b) => {
    // Featured projects first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    // Then by date
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Get popular technologies for filter buttons (top 6)
  const technologyCounts = projects
    .flatMap((p) => p.technologies)
    .reduce((acc, tech) => {
      acc[tech] = (acc[tech] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const popularTechnologies = Object.entries(technologyCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([tech]) => tech);

  const filterOptions = ["All", ...popularTechnologies];

  // Filter projects based on active filter
  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.technologies.includes(activeFilter));

  const filteredFeatured = filteredProjects.filter((p) => p.featured);
  const filteredOther = filteredProjects.filter((p) => !p.featured);

  // Calculate stats
  const totalProjects = projects.length;
  const featuredProjects = projects.filter((p) => p.featured);
  const uniqueTechnologies = new Set(projects.flatMap((p) => p.technologies))
    .size;

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
            {/* Terminal Prompt */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              <Terminal className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              <span className="text-primary font-mono text-xs sm:text-sm">
                ~/projects
              </span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-primary font-mono text-xs sm:text-sm"
              >
                _
              </motion.span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6">
              <span className="bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Building the Future
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed px-2">
              A curated collection of{" "}
              <span className="text-primary font-semibold">
                {totalProjects} production-ready projects
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
            </p>

            {/* Quick Stats - Unified Elegant Design */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-3xl mx-auto">
              {[
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
                  value: featuredProjects.length,
                  label: "Featured",
                  color: "#f59e0b",
                  fill: true,
                },
                {
                  icon: Sparkles,
                  value: "100%",
                  label: "Production",
                  color: "#10b981",
                },
              ].map((stat, index) => {
                const Icon = stat.icon;
                const isActive = activeStatIndex === index;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    onMouseEnter={() => setActiveStatIndex(index)}
                    onMouseLeave={() => setActiveStatIndex(null)}
                    className="group relative"
                  >
                    <div
                      className={`relative p-3 sm:p-4 bg-card/50 backdrop-blur-sm rounded-xl border overflow-hidden transition-all duration-300 ${
                        isActive
                          ? "border-primary shadow-2xl shadow-white/15"
                          : "border-border/50 hover:border-primary/30"
                      }`}
                    >
                      {/* Animated Gradient Background */}
                      <div
                        className={`absolute inset-0 rounded-xl transition-opacity duration-500 ${
                          isActive
                            ? "opacity-15"
                            : "opacity-0 group-hover:opacity-10"
                        }`}
                        style={{
                          background: `linear-gradient(135deg, ${stat.color}40 0%, transparent 60%)`,
                        }}
                      />

                      {/* Scan Line Effect */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-x-0 h-px"
                          style={{ backgroundColor: `${stat.color}60` }}
                          initial={{ top: 0 }}
                          animate={{ top: "100%" }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      )}

                      <div className="relative flex flex-col items-center gap-1.5 sm:gap-2">
                        <motion.div
                          className="p-2 sm:p-2.5 rounded-lg transition-colors"
                          style={{ backgroundColor: `${stat.color}20` }}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon
                            className={`h-5 w-5 sm:h-6 sm:w-6 ${
                              stat.fill ? "fill-current" : ""
                            }`}
                            style={{ color: stat.color }}
                          />
                        </motion.div>
                        <div className="text-center">
                          <div className="text-xl sm:text-2xl font-bold font-mono">
                            {stat.value}
                          </div>
                          <div className="text-[10px] sm:text-xs text-muted-foreground">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Top-Right Corner Accent */}
                    <div
                      className={`absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full blur-xl transition-opacity duration-300 ${
                        isActive
                          ? "opacity-60"
                          : "opacity-0 group-hover:opacity-40"
                      }`}
                      style={{ backgroundColor: stat.color }}
                    />
                  </motion.div>
                );
              })}
            </div>

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

          {/* Scroll Indicator - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isHeroInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer"
              onClick={() => {
                document
                  .getElementById("project-gallery")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="text-xs font-mono">Scroll to explore</span>
              <ArrowDown className="h-5 w-5" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Project Gallery Section */}
      <section
        id="project-gallery"
        className="py-12 sm:py-16 md:py-20 relative overflow-hidden"
        ref={galleryRef}
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Technology Filters */}
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
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pb-2">
              {filterOptions.map((filter, index) => (
                <motion.button
                  key={filter}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isGalleryInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-mono text-xs sm:text-sm transition-all border touch-manipulation active:scale-95 whitespace-nowrap shrink-0 ${
                    activeFilter === filter
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30"
                      : "bg-card/50 text-muted-foreground border-border/50 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                  }`}
                >
                  {filter}
                  {filter !== "All" && (
                    <span className="ml-1.5 sm:ml-2 text-[10px] sm:text-xs opacity-70">
                      (
                      {
                        projects.filter((p) => p.technologies.includes(filter))
                          .length
                      }
                      )
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
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
