// "use client";
import data from "./data/data.json";
import Image from "next/image";
import vaultImage from "../../public/images/NordGen.webp";

export default function Home() {
  return (
    <main>
      <div className="main-card">
        <Image src={vaultImage} alt="vault" />
        <h1 className="heading">
          {data.title}
        </h1>
        <div>
          By {data.author} . {data.category}
        </div>
        <div>
          {data.publishedAt}
        </div>
        <p className="prelude">
          {data.prelude}
        </p>
        <p className="paragraph">
          {data.paragraphs}
        </p>
      </div>
    </main>
  );
}
