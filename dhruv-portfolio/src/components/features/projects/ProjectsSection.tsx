"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Folder, Star, Sparkles, Terminal } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Project } from "@/types/project";
import projectsData from "@/data/projects.json";
import { useRef } from "react";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  // Calculate stats
  const totalProjects = projects.length;
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
    <section
      id="projects"
      className="py-20 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.03, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-primary/80 rounded-full blur-3xl"
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Enhanced Header with Terminal Theme */}
        <ScrollReveal>
          <div className="mb-16">
            {/* Terminal Prompt */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-6"
            >
              <Terminal className="h-4 w-4 text-primary" />
              <span className="text-primary font-mono text-sm">~/projects</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-primary font-mono"
              >
                _
              </motion.span>
            </motion.div>

            {/* Title and Description */}
            <div className="mb-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"
              >
                Featured Projects
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground max-w-3xl text-lg leading-relaxed"
              >
                A showcase of production-ready applications in{" "}
                <span className="text-primary font-semibold">
                  Full-Stack Development
                </span>
                , <span className="text-primary font-semibold">AI/ML</span>, and{" "}
                <span className="text-primary font-semibold">
                  Enterprise Software
                </span>
                . Each project demonstrates scalable architecture, clean code,
                and real-world impact.
              </motion.p>
            </div>

            {/* Enhanced Stats Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Folder className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono">
                      {totalProjects}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">
                      Projects
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Code2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono">
                      {uniqueTechnologies}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">
                      Technologies
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Star className="h-5 w-5 text-primary fill-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono">
                      {featuredProjects.length}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">
                      Featured
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono">100%</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">
                      Production
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Technology Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-mono text-muted-foreground">
                  Filter by Technology:
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {filterOptions.map((filter, index) => (
                  <motion.button
                    key={filter}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-lg font-mono text-sm transition-all border ${
                      activeFilter === filter
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30"
                        : "bg-card/50 text-muted-foreground border-border/50 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                    }`}
                  >
                    {filter}
                    {filter !== "All" && (
                      <span className="ml-2 text-xs opacity-70">
                        (
                        {
                          projects.filter((p) =>
                            p.technologies.includes(filter)
                          ).length
                        }
                        )
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Featured Projects Section */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px flex-1 bg-linear-to-r from-transparent via-primary/50 to-primary" />
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg">
                <Star className="h-4 w-4 text-primary fill-primary" />
                <span className="text-sm font-mono text-primary font-semibold">
                  Featured Work
                </span>
                <span className="text-xs font-mono text-primary/70">
                  ({featuredProjects.length})
                </span>
              </div>
              <div className="h-px flex-1 bg-linear-to-l from-transparent via-primary/50 to-primary" />
            </motion.div>

            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {featuredProjects.map((project, index) => (
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
        {otherProjects.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px flex-1 bg-linear-to-r from-transparent via-border to-primary/30" />
              <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border border-border/50 rounded-lg">
                <Code2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-mono text-muted-foreground font-semibold">
                  More Projects
                </span>
                <span className="text-xs font-mono text-muted-foreground/70">
                  ({otherProjects.length})
                </span>
              </div>
              <div className="h-px flex-1 bg-linear-to-l from-transparent via-border to-primary/30" />
            </motion.div>

            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {otherProjects.map((project, index) => (
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
          onPrevious={filteredProjects.length > 1 ? handlePrevious : undefined}
        />
      </div>
    </section>
  );
}
