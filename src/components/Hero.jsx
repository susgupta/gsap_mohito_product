import { useGSAP } from "@gsap/react"
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {

    const videoRef = useRef();

    const isMobile = useMediaQuery({maxWidth: 767});

    useGSAP(() => {

        //define how to animate the text parts using gsap splittext

        const heroSplit = new SplitText('.title', {
            type: 'chars, words'
        });

        const paragraphSplit = new SplitText('.subtitle', {
            type: 'lines'
        });

        //apply animations

        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.75,
            ease: 'expo.out',
            stagger: 0.05
        });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.05,
            delay: 1
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        })
        .to('.right-leaf', {y: 200}, 0)
        .to('.left-leaf', {y: -200}, 0);

        //control video scroll start and end based on screen scroll
        const startValue = isMobile ? 'top 50%' : 'center 60%';
        const endValue = isMobile ? '120% top' : 'bottom top';

        const videoTimeLine = gsap.timeline({
            scrollTrigger: {
                trigger: "video",
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
            },
        });

        //the trick is to tie the video duration to the scroll effect including reverse and forward based on scroll direction
        videoRef.current.onloadedmetadata = () => {
            videoTimeLine.to(videoRef.current, {
		        currentTime: videoRef.current.duration,
	        });
        }

    }, []);

    return (
        <>
            <section id='hero' className='noisy'>
                <h1 className='title'>
                    Sushil Bar
                </h1>

                <img src="/images/hero-left-leaf.png" alt="left-leaf" className='left-leaf'/>

                <img src="/images/hero-right-leaf.png" alt="right-leaf" className='right-leaf'/>

                <div className="body">
                    <div className="content">

                        <div className="space-y-5 hidden md:block">
                            <p>
                                Cool. Crisp. Classic
                            </p>
                            <p className="subtitle">
                                Sip the Spirit <br /> of Summer
                            </p>
                        </div>

                        <div className="view-cocktails">
                            <p className="subtitle">
                                Every cocktail on our menu is a blend of premium ingredients,
                                creative flair, and timeless recipes — designed to delight your
                                senses.
                            </p>
                            <a href="#cocktails">View cocktails</a>
                        </div>
                    </div>
                </div>
            </section>

            <div className="video absolute inset-0">
                <video
                    ref={videoRef} 
                    src="/videos/output.mp4" 
                    muted
                    playsInline
                    preload="auto"
                />
            </div>
        </>
    )
}

export default Hero