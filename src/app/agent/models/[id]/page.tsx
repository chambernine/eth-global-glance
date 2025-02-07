import { notFound } from "next/navigation";
import { getModelById, categoryColors } from "@/data/models";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Orb from "@/components/ui/orb";
import Image from "next/image";

export default async function MarketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const model = getModelById(id);

  if (!model) {
    notFound();
  }

  return (
    <div className="flex flex-col md:flex-row w-full min-h-[400px] items-center justify-center gap-4 p-4">
      {/* Orb container - takes full width on mobile, half on desktop */}
      <div className="w-full md:w-1/2 h-[400px] relative">
        <Orb
          hoverIntensity={0.25}
          rotateOnHover={true}
          hue={model.orbHue}
          forceHoverState={true}
        >
          <Image
            src={model.imgUrl || "/default-image.png"}
            alt={model.name}
            width={300}
            height={300}
            className="rounded-[100%]"
          />
        </Orb>
      </div>

      {/* Card container - takes full width on mobile, half on desktop */}
      <div className="w-full md:w-1/2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{model.name}</CardTitle>
            <p className="text-sm text-gray-500">{model.description}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 gap-2">
                <Badge className={categoryColors[model.category]}>
                  {model.category}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
