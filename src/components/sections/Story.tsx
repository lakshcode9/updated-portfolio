"use client"

import { motion } from "framer-motion"

export function MyStory() {
  return (
    <section id="story" className="py-24 px-6 md:py-32 bg-card/10">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">My Story</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">DROP OUT. BUILD. SURVIVE.</h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-8 text-lg md:text-xl text-muted-foreground leading-relaxed font-medium"
        >
          <p>
            I officially left engineering school just 3 months into my first year. 
            Real clients didn&apos;t ask me about Big O notation or greedy algorithms. They just needed their problems solved.
            So I built. I became a "businessman" who could code—always optimizing for the easiest path to the result because I had no one pushing me to go deeper.
          </p>
          <p>
            In the age of AI, that worked... until it didn&apos;t. Personal issues derailed the momentum. I lost the clients. I lost the agencies. I hit rock bottom.
            That silence forced me to realize I had drifted from what I actually loved: the technology itself.
          </p>
          <p>
            Now, I&apos;m rebuilding. But this time, I&apos;m doing it the right way. 
            I&apos;m using this sprint to master the deep engineering I skipped over, rebuild my agencies from scratch, and finally focus on 
            <span className="text-foreground font-bold"> contribution</span>—giving back to the ecosystem that made all this possible.
          </p>
          <p className="text-foreground border-l-4 border-primary pl-8 py-4 bg-primary/5 italic text-xl md:text-2xl font-bold tracking-tight">
            &quot;No more shortcuts. No more 'easy routes.' Just 180 days of deep work to become the engineer I was always meant to be.&quot;
          </p>
        </motion.div>
      </div>
    </section>
  )
}
