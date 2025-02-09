"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  AlertCircle,
  TrendingUp,
  Brain,
  LucideIcon,
  Wand,
  Vote,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ElegantShapeProps {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ElegantShape: React.FC<ElegantShapeProps> = ({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={`absolute inset-0 rounded-full
            bg-gradient-to-r to-transparent
            ${gradient}
            backdrop-blur-sm border-2 border-primary/20
            shadow-lg
            after:absolute after:inset-0 after:rounded-full
            after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]
            dark:after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]`}
        />
      </motion.div>
    </motion.div>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="bg-background/80 dark:bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-border dark:border-gray-800"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
        <Icon className="w-6 h-6 text-primary dark:text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-foreground dark:text-gray-100">
        {title}
      </h3>
    </div>
    <p className="text-muted-foreground dark:text-gray-400">{description}</p>
  </motion.div>
);

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.5 + i * 0.2,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-gradient-to-b from-background to-background/80 dark:from-gray-950 dark:to-gray-900">
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-blue-200/40 dark:from-blue-500/20"
          className="left-[-10%] md:left-[-5%] top-[15%]"
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-purple-200/40 dark:from-purple-500/20"
          className="right-[-5%] top-[70%]"
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-cyan-200/40 dark:from-cyan-500/20"
          className="left-[5%] bottom-[5%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-16 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 dark:bg-gray-900/80 border border-border dark:border-gray-800 mb-8 shadow-sm"
          >
            <AlertCircle className="w-5 h-5 text-primary dark:text-blue-400" />
            <span className="text-sm text-muted-foreground dark:text-gray-300 font-medium">
              AI-Powered Polling Platform
            </span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-foreground dark:text-gray-100">
                Transforming
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400">
                Social media engagement
              </span>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-lg text-muted-foreground dark:text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto">
              This innovative platform uses AI to provide real-time insights and
              create engaging polls. Discover how Glance can revolutionize your
              social media strategy.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center gap-2"
                onClick={() => router.push("/agent")}
              >
                <Brain className="w-5 h-5" />
                Try AI Agent Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-background dark:bg-gray-900 text-foreground dark:text-gray-300 rounded-full font-semibold shadow-md hover:shadow-lg transition-shadow duration-300 border border-border dark:border-gray-800 flex items-center gap-2"
                onClick={() => router.push("/demo")}
              >
                <TrendingUp className="w-5 h-5" />
                Watch Demo
              </motion.button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <FeatureCard
              icon={TrendingUp}
              title="Trending casts"
              description="Identify viral topics in real-time. Never miss what's hot."
            />
            <FeatureCard
              icon={Wand}
              title="Story wizard"
              description="Curate engaging content from social data. It makes compelling narratives."
            />
            <FeatureCard
              icon={Vote}
              title="Instant polls"
              description="Gauge public sentiment quickly. Make fast, informed decisions."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
