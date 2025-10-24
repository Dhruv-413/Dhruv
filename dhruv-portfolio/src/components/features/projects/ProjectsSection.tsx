"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Project } from "@/types/project";
import projectsData from "@/data/projects.json";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = (projectsData as Project[]).sort((a, b) => {
    // Featured projects first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    // Then by date
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleNext = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setSelectedProject(projects[nextIndex]);
  };

  const handlePrevious = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    const previousIndex =
      (currentIndex - 1 + projects.length) % projects.length;
    setSelectedProject(projects[previousIndex]);
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        {/* Header with Scroll Animation */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Code2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-mono text-primary">
                Featured Work
              </span>
            </div>
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              Featured Projects
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A showcase of my work in Full-Stack Development, AI/ML, and
              Enterprise Software. Each project demonstrates my commitment to
              building scalable, efficient solutions with real-world impact.
            </p>
          </div>
        </ScrollReveal>

        {/* Projects grid - Clean layout without filters */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProjectCard
                project={project}
                onClick={() => handleProjectClick(project)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onNext={projects.length > 1 ? handleNext : undefined}
          onPrevious={projects.length > 1 ? handlePrevious : undefined}
        />
      </div>
    </section>
  );
}
