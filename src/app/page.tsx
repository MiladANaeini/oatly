"use client";
import { useEffect } from "react";
import data from "./data/data.json";
import Image from "next/image";
import vaultImage from "../../public/images/NordGen.webp";

export default function Home() {

    useEffect(() => {
      if (!!document) {
        const titleElement = document.querySelector("#title-element") as HTMLDivElement;
        const firstSidebarElement = document.querySelector(
          "#first-sidebar-element"
        ) as HTMLDivElement;
        const preludeElement = document.querySelector("#prelude-element") as HTMLDivElement;
        const secondSidebarElement = document.querySelector(
          "#second-sidebar-element"
        ) as HTMLDivElement;
  
        firstSidebarElement.style.height = `${firstSidebarElement?.clientHeight +
         titleElement?.clientHeight + 16}px`;
        preludeElement.style.height = `${preludeElement?.clientHeight +
         firstSidebarElement?.clientHeight + 16}px`;
        secondSidebarElement.style.height = `${
         (preludeElement?.clientHeight - firstSidebarElement?.clientHeight) +
        secondSidebarElement?.clientHeight}px`;
      }
    }, []);
    
  return  (
    <div className="article-container">
      <div className="top-container">
        <div className="sidebar">
          <div id="first-sidebar-element">
          By {data.author} · {data.category} - {data.publishedAt}
          </div>
          <div id="second-sidebar-element">
          {data.paragraphs[0]}
          </div>
          <div>
          {data.paragraphs[1]}
          </div>
        </div>
        <div className="header">
          <h1 id="title-element">
            {data.title}
          </h1>
          <div id="prelude-element" className="prelude">
          {data.prelude}
          </div>
          <div className="image-container">
          <Image
            src={vaultImage}
            alt=""
          />
          </div>
        </div>
      </div>

      <div className="bottom-container">
      {data.paragraphs.slice(2).map((para, idx) =>
         <div key={idx}>
            <p >
              {para}
            </p>
         </div>
          )}
      </div>
    </div>
  );
}
