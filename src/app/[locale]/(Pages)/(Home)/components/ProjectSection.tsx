import SwiperButton from "@/components/application/Buttons/SwiperButton";
import ProjectCard from "@/components/application/Projects/ProjectCard";
import Heading from "@/components/shared/Heading/Heading";
import SwiperComponent from "@/components/shared/Swiper/SwiperComponent";
import { actionGetPublishedProgects } from "@/server/actions/projects";
import { Routes } from "@/utils/constants";
import Link from "next/link";
const ProjectSection = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const projects = await actionGetPublishedProgects(locale);
  return (
    <section id="projectsSection" className="section-gap section-bg relative">
      <div className="px-4 md:px-6">
        <div className="flex items-center justify-between pb-10">
          <div className="flex gap-[2px] md:gap-2">
            <SwiperButton
              className="swiper-button-prev-custom"
              direction="start"
            />
            <SwiperButton
              className="swiper-button-next-custom"
              direction="end"
            />
          </div>
          <Heading title={`projects`} className="pb-0" />
          <Link
            href={`/${locale}/${Routes.PROJECTS}`}
            className="btn btn-primary text-xs md:text-base"
          >
            View All
          </Link>
        </div>
        <SwiperComponent
          slidesPerView={2}
          spaceBetween={24}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              projectLink={`/${locale}/${Routes.PROJECT}/${project.id}`}
            />
          ))}
        </SwiperComponent>
      </div>
    </section>
  );
};

export default ProjectSection;
