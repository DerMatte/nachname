import MotionText from "./MotionText";
import Balancer from "react-wrap-balancer";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import supabase from "@/lib/supabase";

// export const dynamic = "force-dynamic";

const getGradient = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json",
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
};

export default async function Home() {
  async function regenerateGradient() {
    "use server";
    // ...
    console.log("server");

    // const data = await kv.get("gradients");
    // const dataLenght = await kv.strlen("gradients");
    const dataLenght = 500;

    const randInt = Math.floor(Math.random() * dataLenght);
    console.log(randInt);
    // const gradientNumber = await kv.set("gradientNumber", randInt);
    // console.log(gradientNumber);

    const degreeArray = [0, 45, 90, 135, 180, 225, 270, 315, 45, 45];

    const degree = degreeArray[Math.floor(Math.random() * degreeArray.length)];

    // await kv.set("degree", degree);
    revalidatePath("/");
  }
  // const data = await getGradient();

  const degree = 45;
  // const gradient = data;
  const gradient = {
    name: "The Sky And The Sea",
    colors: ["#F7941E", "#004E8F"],
  };
  // const gradient = {
  // name: "The Sky And The Sea",
  // colors: ["#F7941E", "#004E8F"],
  // };
  // console.log(data);
  // console.log(degree);

  let { data: supaGradients, error } = await supabase
    .from("gradients")
    .select("*");

  console.log(supaGradients);

  return (
    <main
      className="h-screen w-full overflow-x-hidden mix-blend-plus-lighter bg-slate-800 invert flex flex-col justify-center items-center relative"
      style={{
        backgroundImage: `linear-gradient(${degree}deg, ${gradient.colors.join(
          ","
        )})`,
      }}
    >
      <MotionText text="Pallhon" />
      <footer className="absolute bottom-8 font-medium group text-center	">
        <Balancer>
          <span className="">
            Family is everything{" "}
            <span className=" group-hover:hidden inline-block transition duration-200 ">
              {"<3"}
            </span>
            <span className=" group-hover:inline-block hidden transition duration-200 ">
              {"❤️"}
            </span>{" "}
          </span>
          <span>&#183;</span>
          <span> </span>
          <a
            href={`https://uigradients.com/#${gradient.name
              .replace(/\s/g, "")
              .trim()}`}
            className="hover:underline "
          >
            Theme: {gradient.name}
          </a>
          <Suspense>
            <form action={regenerateGradient}>
              <button
                type="submit"
                className="py-2 px-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  hover:bg-accent hover:text-accent-foreground"
              >
                Regenerate Worldwide
              </button>
            </form>
          </Suspense>
        </Balancer>
      </footer>
    </main>
  );
}
