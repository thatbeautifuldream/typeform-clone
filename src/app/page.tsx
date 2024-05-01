import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import Typeform from "@/components/form/typeform";

export default async function Home() {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 2500));
  return (
    <main>
      <Nav />
      <Typeform />
      <Footer />
    </main>
  );
}
