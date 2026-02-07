import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { Ingredients } from "@/components/Ingredients";
import { HowItWorks } from "@/components/HowItWorks";
import { ProductGrid } from "@/components/ProductGrid";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Categories />
        <Ingredients />
        <HowItWorks />
        <ProductGrid />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
