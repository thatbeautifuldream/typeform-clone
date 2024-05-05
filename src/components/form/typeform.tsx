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
import { FORM_SUBMIT_URL } from "@/lib/constants";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import Progress from "@/components/layout/progress";

export default function Typeform() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
      id: 5,
      type: "text",
      name: "email",
      text: "Email you'd like to register with?",
      subText:
        "We will keep all our communications with you through this email. Do check your spam inbox if you can't find our application received email.[ 🔴DEVELOPER NOTICE: Responses submitted to this form will be forwarded to the email you input here, for you to test data submissions.]",
      placeholder: "name@example.com",
      isRequired: true,
    },
    {
      id: 6,
      type: "text",
      name: "phone",
      text: "Your phone number",
      subText:
        "We won't call you unless it is absolutely required to process your application.",
      placeholder: "089621 8845",
      isRequired: true,
    },
  ];

  type FieldName = keyof Inputs;

  const next = async () => {
    const field = steps[currentStep].name as FieldName;
    const output = await form.trigger(field as FieldName, {
      shouldFocus: true,
    });
    if (!output) return;
    if (currentStep < steps.length - 1) {
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

  async function submitForm(values: Inputs) {
    if (currentStep === steps.length - 1) {
      console.log({ values });
      try {
        const response = await fetch(FORM_SUBMIT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          toast.error("Error submitting the form. Please try again.");
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Data posted successfully:", data);
        toast.success("Form submitted successfully");
        setIsSubmitted(true);
      } catch (error) {
        console.error("Error posting data:", error);
        toast.error("Error submitting the form. Please try again later.");
      }
    } else {
      console.log({ values });
      next();
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="space-y-8 w-full">
          <img
            src="/assets/thankyou.gif"
            alt="Completed"
            className="w-1/2 w-50 mx-auto rounded-lg"
          />
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              Thank you for submitting the form
            </h1>
            <p className="text-lg text-gray-600">
              We will get back to you soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <Progress currentStep={currentStep} totalSteps={steps.length} />
      </div>
      {/* Form Container */}
      <div className="flex items-center justify-center w-full h-screen">
        <Form {...form}>
          <motion.div
            key={currentStep}
            className="w-full"
            initial={{ y: delta >= 0 ? "100%" : "-100%", opacity: 0 }}
            exit={{ y: delta >= 0 ? "-100%" : "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <form
              onSubmit={form.handleSubmit(submitForm)}
              className="space-y-8 w-full"
              onKeyDown={(e) => {
                if (currentStep < steps.length - 1) {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    next();
                  }
                }
              }}
            >
              <FormField
                control={form.control}
                name={steps[currentStep].name as FieldName}
                render={({ field }) => (
                  <FormItem>
                    {currentStep > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        className=" font-bold"
                        onClick={prev}
                      >
                        Back
                      </Button>
                    )}
                    <p className="text-foreground/50 text-sm">
                      Step {steps[currentStep].id} of {steps.length}
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
                    <p className="text-gray-500">
                      {steps[currentStep].subText}
                    </p>
                    <FormControl>
                      <Input
                        placeholder={
                          steps[currentStep].placeholder
                            ? steps[currentStep].placeholder
                            : "Type your answer here..."
                        }
                        autoFocus={true}
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
              {/* Form Actions/Buttons */}
              <div className="flex items-center gap-x-2 whitespace-normal">
                {currentStep < steps.length - 1 && (
                  <Button
                    id="next"
                    type="button"
                    className="text-white font-bold"
                    onClick={next}
                  >
                    Next
                  </Button>
                )}
                {currentStep === steps.length - 1 && (
                  <Button
                    type="submit"
                    className="text-white font-bold"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                )}
                <p className="text-foreground text-xs">
                  press{" "}
                  <span className="font-semibold leading-none">Enter ↵</span>
                </p>
              </div>
            </form>
          </motion.div>
        </Form>
      </div>
    </>
  );
}
