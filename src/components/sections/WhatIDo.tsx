"use client"

import { motion } from "framer-motion"
import { Cpu, Zap, Database, Code, Rocket } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: <Cpu className="h-4 w-4" />,
    title: "AI Automation & Agents",
    description: "Building autonomous systems that replace manual, repetitive work using LLMs and logic loops.",
    area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
  },
  {
    icon: <Zap className="h-4 w-4" />,
    title: "API & Backend Systems",
    description: "Connecting, scaling, and orchestrating software to work together seamlessly at any scale.",
    area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
  },
  {
    icon: <Database className="h-4 w-4" />,
    title: "Data Pipelines & Scraping",
    description: "Collecting, cleaning, and moving data reliably from the edges of the web into your systems.",
    area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
  },
  {
    icon: <Code className="h-4 w-4" />,
    title: "No-Code → Code Products",
    description: "Turning rough ideas into production-grade software faster by bridging the gap between tools.",
    area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
  },
  {
    icon: <Rocket className="h-4 w-4" />,
    title: "Rapid MVP Shipping",
    description: "Launching working products instead of slide decks. I prioritize 'done' over 'perfect'.",
    area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
  }
]

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6 transition-transform duration-200 active:scale-[0.98]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export function WhatIDo() {
  return (
    <section className="py-12 px-6 md:py-24">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Specialization</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight italic">What I Actually Do</h2>
        </motion.div>
        
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
          {services.map((service) => (
            <GridItem
              key={service.title}
              area={service.area}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
