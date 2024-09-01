/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";
import companies from "../data/companies.json";
import Autoplay from "embla-carousel-autoplay";

export function LandingPage() {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py20">
      <section className="text-center ">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Finde deinen Traumjob{" "}
          <span className="flex items-center gap-2 gradient-title">
            und bekomme ein
          </span>
          <span className="text-green-400 underline">Experte</span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Erkunde tausende Stellenangebote oder finde den perfekten Kandidat
        </p>
      </section>

      <div className="flex gap-6 justify-center">
        <Link to="/jobs">
          <Button variant={"blue"}>Finde einen Job</Button>
        </Link>
        <Link to="/post-job">
          <Button variant={"violet"}>Erstelle einen Job</Button>
        </Link>
      </div>

      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full py-10"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }: any) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-blue-300">
              Für Arbeitssuchende
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Suchen und bewerben Sie sich auf Stellen, verfolgen Sie
              Bewerbungen und vieles mehr.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-blue-300">
              Für Arbeitgeber
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Stellen ausschreiben, Bewerbungen verwalten und die besten
              Bewerber finden.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
