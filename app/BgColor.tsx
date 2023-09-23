"use client";

import { useState, useTransition, useEffect } from "react";
import clsx from "clsx";

type Gradient = {
  name: string;
  colors: string[];
};

type Gradients = Gradient[];

const BgColor = ({
  children,
  className,
  gradient,
  degree,
}: {
  children: React.ReactNode;
  className: string;
  gradient: Gradient;
  degree: number;
}) => {
  const [bgGradient, setBgGradient] = useState(
    gradient
      ? gradient
      : {
          name: "Windy",
          colors: ["#acb6e5", "#86fde8"],
        }
  );
  const [startTransition, isPending] = useTransition();

  //   useEffect(() => {
  //     startTransition(() => {
  //       setBgGradient(gradient); // oder jede andere Farbe, zu der Sie wechseln möchten
  //     });
  //   }, [gradient, startTransition]);

  return (
    <main
      className={clsx(
        "h-screen w-full overflow-x-hidden mix-blend-plus-lighter bg-slate-800 invert flex flex-col justify-center items-center relative",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(${degree}deg, ${bgGradient.colors.join(
          ","
        )})`,
        // transition: isPending ? "background 1s" : undefined,
      }}
    >
      {children}
    </main>
  );
};

export default BgColor;
