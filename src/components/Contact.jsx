import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { openingHours, socials } from "../../constants";

const Contact = () => {

    useGSAP(() => {

        const titleSplit = SplitText.create('#contact h2', {type: 'words'});

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#contact',
                start: 'top center'
            },
            ease: 'power1.inOut'
        });

        //now animate the timeline
        timeline
        .from(titleSplit.words, {
            opacity: 0,
            yPercent: 100,
            stagger: 0.02
        })
        .from('#contact h3, #contact p', {
            opacity: 0,
            yPercent: 100,
            stagger: 0.02
        })
        .to('#f-right-leaf', {
            y: '-50',
            duration: 1,
            ease: 'power1.inOut'
        })
        .to('#f-left-leaf', {
            y: '-50',
            duration: 1,
            ease: 'power1.inOut'
        }, '<');

    });

    return (
        <footer id="contact">

            <img src="/images/footer-right-leaf.png" alt="leaf-right" id="f-right-leaf" />
            <img src="/images/footer-left-leaf.png" alt="leaf-left" id="f-left-leaf" />

            <div className="content">

                <h2>
                    Where to find us
                </h2>

                <div>
                    <h3>
                        Visit our bar
                    </h3>
                    <p>
                        123 Random Street, Burlington, On, Canada, M983A4
                    </p>
                </div>

                <div>
                    <h3>
                        Contact us
                    </h3>
                    <p>
                        (905) 123-4567
                    </p>
                    <p>
                        guptask.7@gmail.com
                    </p>
                </div>

                <div>
                    <h3>
                        Open every day
                    </h3>
                    {openingHours.map((time) => (
                        <p key={time.day}>
                            {time.day} : {time.time}
                        </p>
                    ))}
                </div>

                <div>
                    <h3>
                        Socials
                    </h3>
                    <div className="flex-center gap-5">
                        {socials.map((social) => (
                            <a 
                                href={social.url} 
                                key={social.name}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                            >
                                <img src={social.icon} alt={social.name} />
                            </a>
                        ))}
                    </div>
                </div>

            </div>

        </footer>
    )
}

export default Contact