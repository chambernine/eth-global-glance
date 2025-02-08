"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Share2, ArrowLeft, ArrowRight } from "lucide-react";
import Orb from "@/components/ui/orb";
import Image from "next/image";
import { models } from "@/data/models";
import { useToast } from "@/hooks/use-toast";
import ConfettiEffect from "@/components/ui/confetti-effect";
import usePollService from "@/service/poll";

interface EmotionStyle {
  id: string;
  emoji: string;
  name: string;
}

const emotionStyles: EmotionStyle[] = [
  { id: "funny", emoji: "😂", name: "Funny" },
  { id: "formal", emoji: "🧐", name: "Formal" },
  { id: "casual", emoji: "😊", name: "Casual" },
  { id: "excited", emoji: "🎉", name: "Excited" },
];

const steps = ["Select AI Model", "Create Poll"];

export default function CreatePoll() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", ""]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const { createPoll } = usePollService();

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleShare = () => {
    console.log({
      model: selectedModel,
      emotion: selectedEmotion,
      question,
      answers,
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return !!selectedModel;
      case 1:
        return !!question && answers.every((a) => a.trim() !== "");
      default:
        return false;
    }
  };

  const fetchPollQuestion = async () => {
    try {
      setIsLoading(true);
      const { data } = await createPoll({
        category: selectedModel,
      });

      setCurrentStep(currentStep + 1);
      setShowConfetti(true);

      setQuestion(data.question);
      setAnswers(data.choices || ["", ""]);
    } catch {
      toast({
        title: "Error",
        description: "Failed to generate poll question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    if (currentStep < steps.length - 1 && canProceed()) {
      if (currentStep === 0) {
        await fetchPollQuestion();
        setShowConfetti(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2
                  ${
                    index <= currentStep
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted bg-background text-muted-foreground"
                  }`}
              >
                {index + 1}
              </div>
              <div className="text-sm text-center">{step}</div>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 h-1 bg-muted w-full" />
          <motion.div
            className="absolute top-0 left-0 h-1 bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep + 1) * (100 / steps.length)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">Select AI Model</h2>
              <RadioGroup
                value={selectedModel}
                onValueChange={setSelectedModel}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {models.map((model) => (
                  <div key={model.id}>
                    <RadioGroupItem
                      value={model.id}
                      id={model.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={model.id}
                      className="flex flex-col items-center justify-center h-56 rounded-lg border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <div className="w-full md:w-1/2 h-[200px] relative">
                        <Orb
                          hoverIntensity={0.25}
                          rotateOnHover={true}
                          hue={model.orbHue}
                          forceHoverState={true}
                        >
                          <Image
                            src={model.imgUrl || "/default-image.png"}
                            alt={model.name}
                            width={200}
                            height={200}
                            className="rounded-[100%]"
                          />
                        </Orb>
                      </div>
                      <div className="font-semibold">{model.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {model.category}
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {currentStep === 1 && (
            <Card>
              <CardContent className="pt-6 space-y-6">
                <h2 className="text-2xl font-bold mb-6">Create Your Poll</h2>
                <div className="space-y-2">
                  <Label htmlFor="question">Question</Label>
                  <Textarea
                    id="question"
                    placeholder="Enter your poll question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="resize-none"
                    disabled
                  />
                </div>

                <div className="space-y-4">
                  <Label>Answer Choices</Label>
                  {answers.map((answer, index) => (
                    <Input
                      key={index}
                      placeholder={`Answer ${index + 1}`}
                      value={answer}
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                      disabled
                    />
                  ))}
                </div>

                <div className="space-y-2">
                  <Label>Choose Emotion Style</Label>
                  <RadioGroup
                    value={selectedEmotion}
                    onValueChange={setSelectedEmotion}
                    className="flex justify-between"
                  >
                    {emotionStyles.map((emotion) => (
                      <div
                        key={emotion.id}
                        className="flex flex-col items-center"
                      >
                        <RadioGroupItem
                          value={emotion.id}
                          id={emotion.id}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={emotion.id}
                          className="flex flex-col items-center justify-center cursor-pointer"
                        >
                          <div className="text-4xl mb-2 transition-transform hover:scale-110 peer-data-[state=checked]:scale-125">
                            {emotion.emoji}
                          </div>
                          <div className="text-sm font-medium peer-data-[state=checked]:text-primary">
                            {emotion.name}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {currentStep === steps.length - 1 ? (
          <Button onClick={handleShare} disabled={!canProceed()}>
            <Share2 className="w-4 h-4 mr-2" />
            Share on Farcaster
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={!canProceed() || isLoading}>
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : null}
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
      <ConfettiEffect
        trigger={showConfetti}
        emoji="⭐"
        particleCount={{
          primary: 40,
          secondary: 10,
          circles: 20,
        }}
      />
    </div>
  );
}
