"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MaterialInput as Input } from "@/components/form/material-input";
import { cn } from "@/lib/utils";
import { formSchema, type Inputs } from "@/lib/schema";
import { useState } from "react";

export default function Typeform() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
  });

  interface Answer {
    name: string;
    value: string;
  }

  interface Step {
    id: number;
    type: "text" | "select" | "radio" | "radio-group";
    name: string;
    text: string;
    subText?: string;
    description?: string;
    options?: string[];
    placeholder?: string;
    validation?: "email" | "phone";
    condition?: (answers: Answer[]) => boolean | undefined;
    maxSelect?: number;
    isRequired?: boolean;
  }

  const steps: Step[] = [
    {
      id: 1,
      type: "text",
      name: "firstName",
      text: "What is your first name?",
      isRequired: true,
    },
    {
      id: 2,
      type: "text",
      name: "lastName",
      text: `and what is your last name, ${form.getValues("firstName")}?`,
      isRequired: true,
    },
    {
      id: 3,
      type: "select",
      name: "industry",
      text: "What industry is your company in?",
      subText: "We will personalize your learning experience accordingly",
      isRequired: true,
    },
    {
      id: 4,
      type: "radio",
      name: "role",
      text: "What is Your role in your company?",
      subText: "We want to understand how you spend your time right now.",
      description:
        "🔴 DEVELOPER NOTICE: Options in the questions ahead depend on this question's response/s.",
      options: [
        "Founder or CXO",
        "Product Team",
        "Marketing Team",
        "VC",
        "Other",
      ],
      isRequired: true,
    },
    {
      id: 7,
      type: "text",
      name: "email",
      text: "Email you'd like to register with?",
      subText:
        "We will keep all our communications with you through this email. Do check your spam inbox if you can't find our application received email.[ 🔴DEVELOPER NOTICE: Responses submitted to this form will be forwarded to the email you input here, for you to test data submissions.]",
      placeholder: "name@example.com",
      validation: "email",
      isRequired: true,
    },
    {
      id: 8,
      type: "text",
      name: "phone",
      text: "Your phone number",
      subText:
        "We won't call you unless it is absolutely required to process your application.",
      placeholder: "089621 8845",
      validation: "phone",
      isRequired: true,
    },
  ];

  function processForm(values: Inputs) {
    console.log(values);
    form.reset();
  }

  type FieldName = keyof Inputs;

  const next = async () => {
    const field = steps[currentStep].name as FieldName;
    const output = await form.trigger(field as FieldName, {
      shouldFocus: true,
    });
    if (!output) return;
    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await form.handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      next();
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Form {...form}>
        <motion.div
          key={currentStep}
          className="w-full"
          initial={{ y: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <form
            onSubmit={form.handleSubmit(processForm)}
            onKeyDown={handleKeyDown}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name={steps[currentStep].name as FieldName}
              render={({ field }) => (
                <FormItem>
                  <p className="text-foreground/50 text-sm">
                    Question {steps[currentStep].id} of {steps.length}
                  </p>
                  <FormLabel className="text-2xl font-regular">
                    {steps[currentStep].text}
                    <span
                      className={cn(
                        "text-destructive font-bold",
                        steps[currentStep].isRequired ? "" : "hidden",
                      )}
                    >
                      *
                    </span>
                  </FormLabel>
                  <p className="text-gray-500">{steps[currentStep].subText}</p>
                  <FormControl>
                    <Input
                      placeholder={
                        steps[currentStep].placeholder
                          ? steps[currentStep].placeholder
                          : "Type your answer here..."
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {steps[currentStep].description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2 whitespace-normal">
              <Button
                type="submit"
                className="text-white font-bold"
                onClick={next}
                // disabled={currentStep === steps.length - 1}
              >
                {steps[currentStep] === steps[steps.length - 1]
                  ? "Submit"
                  : "OK"}
              </Button>
              <p className="text-foreground text-xs">
                press{" "}
                <span className="font-semibold leading-none">Enter ↵</span>
              </p>
            </div>
          </form>
        </motion.div>
      </Form>
    </div>
  );
}
