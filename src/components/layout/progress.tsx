import { motion } from "framer-motion";

const calculatePercentageProgress = (
  currentStep: number,
  totalSteps: number,
) => {
  return (currentStep / totalSteps) * 100;
};

const Progress = ({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) => {
  const progressPercentage = calculatePercentageProgress(
    currentStep,
    totalSteps,
  );

  return (
    <motion.div
      initial={{ width: "0%" }}
      animate={{ width: `${progressPercentage}%` }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full z-50"
    >
      <div className="h-1.5 bg-primary w-full"></div>
    </motion.div>
  );
};

export default Progress;
