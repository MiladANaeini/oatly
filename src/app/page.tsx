"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import vaultImage from "../../public/images/NordGen.webp";
import { Loading } from "./components/shared/loading";
import { fetchArticleData } from "./components/data/lib/fetchArticleData";
import { dataType } from "./types/globalTypes";

export default function Home() {

  const [data,setData] = useState<dataType>()
  const [isLoading,setIsLoading] = useState<boolean>(true)

  const adjustStyles = () => {
    if (!!document) {
      const titleElement = document.querySelector("#title-element") as HTMLDivElement;
      const firstSidebarElement = document.querySelector(
        "#first-sidebar-element"
      ) as HTMLDivElement;
      const preludeElement = document.querySelector("#prelude-element") as HTMLDivElement;
      const secondSidebarElement = document.querySelector(
        "#second-sidebar-element"
      ) as HTMLDivElement;

      if(titleElement && firstSidebarElement && preludeElement && secondSidebarElement){
      firstSidebarElement.style.height = `${firstSidebarElement?.clientHeight +
       titleElement?.clientHeight + 16}px`;
      preludeElement.style.height = `${preludeElement?.clientHeight +
       firstSidebarElement?.clientHeight + 16}px`;
      secondSidebarElement.style.height = `${
       (preludeElement?.clientHeight - firstSidebarElement?.clientHeight) +
      secondSidebarElement?.clientHeight}px`;
      }
    }
  }

  useEffect(() => {
    setIsLoading(true)
    fetchArticleData()
    .then(data => {
      setData(data as dataType);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    })
    .finally(() => setIsLoading(false))
  }, []);

  useEffect(() => {
    adjustStyles()
  }, [data])  

  return (
    <>
      {isLoading ? (
      <Loading loading={isLoading} />
    ) : (
        <div className="article-container">
        <div className="top-container">
          <div className="sidebar">
            <div id="first-sidebar-element">
                <div className="tag">
                  By {data?.author} · {data?.category} - {data?.publishedAt}
              </div>
            </div>
            <div id="second-sidebar-element">
              {data?.paragraphs[0]}
            </div>
            <div>
              {data?.paragraphs[1]}
            </div>
          </div>
          <div className="header">
            <h1 id="title-element">
              {data?.title}
            </h1>
            <div id="prelude-element" className="prelude">
              {data?.prelude}
            </div>
            <div className="image-container">
              <Image src={vaultImage} alt="" />
            </div>
          </div>
        </div>
        <div className="bottom-container">
          {data?.paragraphs.slice(2).map((para, idx) =>
            <div key={idx}>
              <p>
                {para}
              </p>
            </div>
          )}
        </div>
      </div>
     )}
     </>
   );
}
