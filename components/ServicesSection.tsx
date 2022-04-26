import { useEffect, useState } from "react";
import { AnimatedIcon } from "./AnimatedIcon";

export default function Services() {
  const [descs, setdescs] = useState<string[]>();
  useEffect(() => {
    if (window.innerWidth > 768) {
      setdescs([
        "Build your own metaverse, or host an event in one of our metaverses!",
        "From  building NFT Marketplaces to designing NFT Collections , we’ll advise and create what your brand needs!",
        "For any crypto project to succeed, Tokenomics becomes make or break. From P2E to  Governance tokens, find out today what your brand needs",
        "Community is the single most important component of web3. Work with us to supercharge your brand and dominate your community growth!",
      ]);
    } else {
      setdescs([
        "Building Metaverses and Hosting Events",
        "NFT Marketplaces & NFT Collections design",
        "P2E, Governance, LP etc<br/>Token Economy Sorted",
        "Crush your Discord and Dominate your socials !",
      ]);
    }
  }, []);

  return (
    <>
      <div className="flex flex-row flex-wrap justify-center items-center w-full max-w-5xl">
        <AnimatedIcon
          src="services/ss21.png"
          id="s2"
          desc={descs ? descs[1] : ""}
        />
        <AnimatedIcon
          src="services/ss01.png"
          id="s1"
          reverse
          desc={descs ? descs[0] : ""}
        />
        <AnimatedIcon
          src="services/ss31.png"
          id="s3"
          reverse
          desc={descs ? descs[2] : ""}
        />
        <AnimatedIcon
          src="services/ss41.png"
          id="s4"
          desc={descs ? descs[3] : ""}
        />
      </div>
    </>
  );
}
