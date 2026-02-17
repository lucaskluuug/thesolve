import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, FlaskConical, Award, ChevronLeft, ChevronRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import heroProduct from "@/assets/hero-product.png";
import heroSlide2 from "@/assets/hero-slide2.jpg";
import heroSlide3 from "@/assets/hero-slide3.jpg";

const slides = [
  {
    image: heroBg,
    title: (
      <>
        Sua nutrição
        <br />
        diária.
        <br />
        <span className="text-primary">Resolvida.</span>
      </>
    ),
    subtitle: "The Solve · Daily Greens",
    description:
      "Superfoods, fibras, vitaminas e minerais em uma dose. Energia limpa, foco e bem-estar todos os dias.",
  },
  {
    image: heroProduct,
    title: (
      <>
        Summer
        <br />
        Superfoods.
        <br />
        <span className="text-primary">The Solve.</span>
      </>
    ),
    subtitle: "Edição Limitada",
    description:
      "Disposição, bronze e leveza. Sabor abacaxi com hortelã em uma fórmula exclusiva de superfoods.",
    light: true,
  },
  {
    image: heroSlide2,
    title: (
      <>
        Energia
        <br />
        limpa.
        <br />
        <span className="text-primary">Todos os dias.</span>
      </>
    ),
    subtitle: "75+ ingredientes funcionais",
    description:
      "Um scoop por dia para transformar sua saúde. Fórmula baseada em ciência com resultados reais.",
    light: true,
  },
  {
    image: heroSlide3,
    title: (
      <>
        Nutrição
        <br />
        completa.
        <br />
        <span className="text-primary">Simplificada.</span>
      </>
    ),
    subtitle: "Vitaminas · Minerais · Superfoods",
    description:
      "Tudo que seu corpo precisa em uma única dose diária. Praticidade e saúde sem complicação.",
  },
];

export const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning]
  );

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];
  const isLight = slide.light;

  return (
    <>
      {/* Carousel Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background slides */}
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <img
              src={s.image}
              alt={`Slide ${i + 1}`}
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute inset-0 ${
                s.light
                  ? "bg-gradient-to-r from-white/80 via-white/50 to-transparent"
                  : "bg-gradient-to-r from-black/70 via-black/40 to-transparent"
              }`}
            />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-2xl">
            <p
              className={`text-sm sm:text-base font-semibold uppercase tracking-[0.2em] mb-6 transition-colors duration-500 ${
                isLight ? "text-foreground/60" : "text-white/70"
              }`}
            >
              {slide.subtitle}
            </p>

            <h1
              className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[0.95] mb-6 transition-colors duration-500 ${
                isLight ? "text-foreground" : "text-white"
              }`}
            >
              {slide.title}
            </h1>

            <p
              className={`text-lg sm:text-xl max-w-lg mb-10 leading-relaxed transition-colors duration-500 ${
                isLight ? "text-foreground/60" : "text-white/70"
              }`}
            >
              {slide.description}
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-base gap-2 font-bold"
                asChild
              >
                <a href="#produtos">
                  Comprar agora
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={`rounded-full px-8 text-base ${
                  isLight
                    ? "border-foreground/20 text-foreground hover:bg-foreground/5"
                    : "border-white/30 text-white hover:bg-white/10 hover:text-white"
                }`}
                asChild
              >
                <a href="#beneficios">Saiba mais</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prev}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-brand-md hover:bg-background transition-colors"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-brand-md hover:bg-background transition-colors"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-primary"
                  : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Ir para slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 py-5">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">
                Fórmula baseada em ciência
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FlaskConical className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">
                75+ ingredientes funcionais
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">
                Qualidade premium garantida
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
