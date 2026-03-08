import React from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Tilt from "react-parallax-tilt";

const ProjectCard = ({
  imgUrl,
  title,
  description,
  gitUrl,
  previewUrl,
  internal,
  organization,
  dateLabel,
  flow,
  tools = [],
}) => {
  const showLinks = !internal && (gitUrl !== "#" || previewUrl !== "#");

  return (
    <Tilt tiltMaxAngleX={7} tiltMaxAngleY={7} perspective={1000} className="h-full">
      <div className="glass-card h-full overflow-hidden border border-slate-600/25 transition duration-300 hover:border-secondary-400/40">
        <div
          className="group relative h-52 md:h-60"
          style={
            imgUrl
              ? { background: `url(${imgUrl}) center/cover no-repeat` }
              : {
                  background:
                    "linear-gradient(120deg, rgba(14,165,233,0.38), rgba(20,184,166,0.26), rgba(15,23,42,0.84))",
                }
          }
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/45 to-transparent" />
          <div className="absolute inset-0 hidden items-center justify-center gap-3 bg-slate-950/75 transition-all duration-300 group-hover:flex">
            {showLinks ? (
              <>
                {gitUrl !== "#" && (
                  <Link
                    href={gitUrl}
                    target="_blank"
                    className="group/link relative flex h-12 w-12 items-center justify-center rounded-full border border-slate-300/60"
                  >
                    <CodeBracketIcon className="h-7 w-7 text-slate-200 transition group-hover/link:text-white" />
                  </Link>
                )}
                {previewUrl !== "#" && (
                  <Link
                    href={previewUrl}
                    target="_blank"
                    className="group/link relative flex h-12 w-12 items-center justify-center rounded-full border border-slate-300/60"
                  >
                    <EyeIcon className="h-7 w-7 text-slate-200 transition group-hover/link:text-white" />
                  </Link>
                )}
              </>
            ) : (
              <p className="rounded-full border border-secondary-400/30 bg-secondary-400/10 px-4 py-2 text-xs font-semibold tracking-wide text-secondary-300">
                {internal ? "Enterprise Internal Project" : "Details Available On Request"}
              </p>
            )}
          </div>
          {internal && (
            <span className="absolute left-3 top-3 rounded-full border border-primary-400/40 bg-primary-500/20 px-3 py-1 text-[11px] font-semibold tracking-wide text-primary-200">
              Confidential Client Work
            </span>
          )}
        </div>
        <div className="p-5">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {dateLabel && (
              <span className="rounded-full border border-slate-500/40 bg-slate-800/70 px-2 py-1 text-[11px] font-semibold tracking-wide text-slate-200">
                {dateLabel}
              </span>
            )}
            {organization && (
              <span className="rounded-full border border-secondary-400/30 bg-secondary-500/10 px-2 py-1 text-[11px] font-semibold tracking-wide text-secondary-200">
                {organization}
              </span>
            )}
          </div>
          <h5 className="mb-2 text-lg font-semibold text-white">{title}</h5>
          <p className="text-sm leading-relaxed text-slate-300">{description}</p>
          {flow && (
            <p className="mt-3 rounded-lg border border-cyan-400/25 bg-cyan-500/10 px-3 py-2 text-xs font-medium leading-relaxed text-cyan-100">
              <span className="mr-1 font-semibold text-cyan-200">Flow:</span>
              {flow}
            </p>
          )}
          {tools.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={`${title}-${tool}`}
                  className="rounded-full border border-slate-500/40 bg-slate-800/60 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-slate-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Tilt>
  );
};

export default ProjectCard;
