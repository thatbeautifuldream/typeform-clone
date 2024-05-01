import Logo from "@/components/logo";

const Loader = () => {
  return (
    <div className="bg-background min-h-screen min-w-full flex flex-col items-center justify-center animate-pulse">
      <Logo className="w-32 h-32" />
    </div>
  );
};

export default Loader;
