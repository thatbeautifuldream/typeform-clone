import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default async function Home() {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 2500));
  return (
    <main>
      <Nav />
      <Footer />
    </main>
  );
}
