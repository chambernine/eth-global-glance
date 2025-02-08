import { BookOpen, Bot, Settings2 } from "lucide-react";
import { models } from "./models";

export const sidebarData = {
  navMain: [
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: models.map((model) => ({
        title: model.name,
        url: `/agent/models/${model.id}`,
      })),
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
      ],
    },
  ],
  histories: [
    {
      name: "Design Engineering",
      url: "#",
    },
    {
      name: "Sales & Marketing",
      url: "#",
    },
    {
      name: "Travel",
      url: "#",
    },
  ],
};
