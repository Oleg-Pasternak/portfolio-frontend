import { useRef, useEffect, useState } from "react";
import { gsap } from 'gsap';
import parse from 'html-react-parser';
import { Rendition } from "src/constants/interfaces";
import { Img } from "src/components/ui/Img";
import Button from "src/components/ui/Button";

interface HeroProps {
  title: string;
  description: string;
  projectLogo?: Rendition;
  websiteUrl?: string;
  iosUrl?: string;
  color1?: string;
  color2?: string;
  darkMode?: boolean;
  advancedHero?: boolean;
}

export default function Hero(props : HeroProps) {
  const titleRef = useRef(null);
  const scrollContainerRef = useRef(null);

  let [title, setTitle] = useState("Hello!");
  const titles = [
    'Hello!',
    'Hola!',
    'Olá!',
    'Hei!',
    '여보세요!',
    'γεια!',
    'Kaixo!',
    '你好!',
    'こんにちは!',
		'Ç’kemi!',
		'اسلا عليكم!',
		'Вітаю!',
		'Aloha!',
		'Ciao!'
	];

	const updateTitle = () => {
    // get index of title based on it from titles array
    const index = titles.indexOf(title);
    
    // get next index
    const nextIndex = index + 1 === titles.length ? 0 : index + 1;
		setTitle(titles[nextIndex]);
	};

	useEffect(() => {
			const intervalID = setInterval(updateTitle, 3000);
			setTimeout(() => {
				updateTitle
			}, 3000);
			return () => clearInterval(intervalID);
	}, [updateTitle])


  useEffect(() => {
    const text: any = titleRef.current;

    gsap.timeline({
      scrollTrigger: {
        trigger: text,
        scrub: 1,
        start: "top 90%",
        end: "bottom 30%",
      },
    });

    if (props.darkMode || props.advancedHero) {
      const container = text.parentNode;
      const scrollContainer = scrollContainerRef.current;
    
      const updateOpacityAndPosition = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        const opacity = 1 - scrollY / window.innerHeight * 1.4;
        const scrollOpacity = 1 - scrollY / window.innerHeight * 3;
        const blur = scrollY / window.innerHeight * 5;
        
        // Use gsap.to for a smoother transition without delay
        gsap.to(container, {
          opacity,
          duration: 0.05, // Adjust the duration as needed
          ease: "power2.inOut", // Choose an ease that fits your preference
        });
    
        // Use another gsap.to for blur with delay
        gsap.to(container, {
          webkitFilter: `blur(${blur}px)`,
          duration: 0.05, // Adjust the duration as needed
          ease: "power2.inOut", // Choose an ease that fits your preference
          delay: 0.3, // Add a delay to the blur effect
        });
    
        // Use gsap.to to move the container upwards without delay
        gsap.to(container, {
          y: -(scrollY)*0.8, // Move the container upwards based on the scroll position
          duration: 0, // Adjust the duration as needed
          ease: "power2.inOut", // Choose an ease that fits your preference
          delay: 0, // No delay for the container movement
        });

        gsap.to(scrollContainer, {
          opacity: scrollOpacity,
          duration: 0, // Adjust the duration as needed
          ease: "power2.inOut", // Choose an ease that fits your preference
        });
      };
    
      updateOpacityAndPosition(); // Initial setup
    
      // Listen to the scroll event and update opacity and position
      window.addEventListener("scroll", updateOpacityAndPosition);
    
      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("scroll", updateOpacityAndPosition);
      };
    }    
  }, []);
    
  return (
    <div className={props.advancedHero ? 'hero hero-advanced' : 'hero'}>
      <div className="hero-inner">
          {props.advancedHero && titles.map((title_value, index) => (
            <div key={index} className={title_value == title ? 'hero-greetings hero-greetings-visible' : 'hero-greetings'}>{title_value}</div> 
          ))}
          {!props.projectLogo && props.title && (
            <h1 
                style={{background: `-webkit-linear-gradient(30deg, ${props.color1} 0%, ${props.color2} 100%, ${props.color2} 100%)`, backgroundClip: 'revert-layer'}}
                className={!props.color1 || !props.color2 ? 'hero-inner-title' : 'hero-inner-title--gradient'}
                ref={titleRef}
            >
                {props.title}
            </h1>
          )}
          {props.projectLogo && (
            <Img image={props.projectLogo} alt='Project logo' />
          )}
          <div className="hero-inner-description">
            {parse(props.description)}
          </div>
          <div className="hero-inner-buttons">
            {props.websiteUrl && (
              <Button 
                link={props.websiteUrl}
              >
                Open
              </Button>
            )}
            {props.iosUrl && (
              <Button 
                link={props.iosUrl}
                ios
              />
            )}
          </div>
      </div>
      <a href="#projects" className="hero-scroll-down" ref={scrollContainerRef}><span /></a>
    </div>
  )
}
  