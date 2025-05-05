"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import vaultImage from "../../public/images/NordGen.webp";
import { Loading } from "./components/shared/loading";
import { fetchArticleData } from "./lib/fetchArticleData";
import { dataType } from "./types/globalTypes";
import { ELEMENT_SPACING } from "@/constants/layoutConstants";
export default function Home() {

  const [data,setData] = useState<dataType>()
  const [isLoading,setIsLoading] = useState<boolean>(true)
   const titleRef  = useRef<HTMLDivElement>(null)
    const firstSidebarRef  = useRef<HTMLDivElement>(null)
    const preludeRef  = useRef<HTMLDivElement>(null)
    const secondSidebarRef  = useRef<HTMLDivElement>(null)
    
  const adjustStyles = () => {
      const titleElement = titleRef.current;
      const firstSidebarElement = firstSidebarRef.current;
      const preludeElement = preludeRef.current;
      const secondSidebarElement = secondSidebarRef.current;
      if(titleElement && firstSidebarElement && preludeElement && secondSidebarElement){
          firstSidebarElement.style.height = `${firstSidebarElement?.clientHeight +
           titleElement?.clientHeight + ELEMENT_SPACING}px`;
          preludeElement.style.height = `${preludeElement?.clientHeight +
           firstSidebarElement?.clientHeight + ELEMENT_SPACING}px`;
          secondSidebarElement.style.height = `${
           (preludeElement?.clientHeight - firstSidebarElement?.clientHeight) +
          secondSidebarElement?.clientHeight}px`;
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
          <div ref={firstSidebarRef} id="first-sidebar-element" >
              <div className="meta-container">
                <div className="meta-info">
                  By {data?.author} · {data?.category}
                </div>
                <div className="meta-info">
                  {data?.publishedAt}
                </div>
              </div>
            </div>
            <div ref={secondSidebarRef}>
              {data?.paragraphs[0]}
            </div>
            <div>
              {data?.paragraphs[1]}
            </div>
          </div>
          <div className="header">
           <h1 ref={titleRef}>
              {data?.title}
            </h1>
            <div ref={preludeRef} className="prelude">
              {data?.prelude}
            </div>
            <div className="image-container">
              <Image src={vaultImage} alt="vaultImage" />
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
