import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { allCocktails } from "../../constants";

const Menu = () => {

    const contentRef = useRef();

    //track index
    const [currentIndex, setCurrentIndex] = useState(0);

    //and yes want this animation to run everytime index changes
    useGSAP(() => {
        
        gsap.fromTo('#title', 
        {
            opacity: 0
        }, 
        {
            opacity: 1,
            duration: 1
        });

        gsap.fromTo('.cocktail img', 
        {
            opacity: 0,
            xPercent: -100
        }, 
        {
            xPercent: 0,
            opacity: 1,
            duration: 1,
            ease: 'power1.inOut'
        });

        gsap.fromTo('.details h2', 
        {
            yPercent: 100,
            opacity: 0
        }, 
        {
            yPercent: 0,
            opacity: 100,
            ease: 'power1.inOut'
        });

        gsap.fromTo('.details p', 
        {
            yPercent: 100,
            opacity: 0
        }, 
        {
            yPercent: 0,
            opacity: 100,
            ease: 'power1.inOut'
        });

    }, [currentIndex]);

    //total cocktails
    const totalCocktails = allCocktails.length;

    //move slide 
    const goToSlide = (index) => {

        //use slick way to use current index and is totally divisible by total, and modulus will also apply reset based on totals
        const newIndex = (index + totalCocktails) % totalCocktails;

        //update state
        setCurrentIndex(newIndex);
    };

    //get next cocktail at index
    const getCocktailAt = (indexOffSet) => {
        //use same trick with modulus operator
        return allCocktails[(currentIndex + indexOffSet + totalCocktails) % totalCocktails]
    }

    //now extract to current cocktail, prev and next
    const currentCocktail = getCocktailAt(0);
    const prevCocktail = getCocktailAt(-1);
    const nextCocktail = getCocktailAt(1);

    return (
        <section id="menu" aria-labelledby="menu-heading">

            <img src="images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf"/>
            <img src="images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf"/>

            <h2 id="menu-heading" className="sr-only">
                Cocktail Menu
            </h2>

            <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
                {allCocktails.map((cocktail, index) => {
                    //need function block not immediate return as need logic for active cocktail

                    const isActive = index === currentIndex;

                    return (
                        <button key={cocktail.id} 
                                className={`${isActive ? 'text-white border-white' : 'text-white/50 border-white/50'}`}
                                onClick={() => goToSlide(index)}
                        >
                            {cocktail.name}
                        </button>
                    )
                })}
            </nav>

            <div className="content">

                <div className="arrows">

                    <button 
                        className="text-left"
                        onClick={() => goToSlide(currentIndex - 1)}
                    >
                        <span>{prevCocktail.name}</span>
                        <img src="images/right-arrow.png" alt="right-arrow" aria-hidden="true" />
                    </button>

                    <button 
                        className="text-left"
                        onClick={() => goToSlide(currentIndex + 1)}
                    >
                        <span>{nextCocktail.name}</span>
                        <img src="images/left-arrow.png" alt="left-arrow" aria-hidden="true" />
                    </button>

                </div>

                <div className="cocktail">
                    <img src={currentCocktail.image} alt="" className="object-contain" />
                </div>

                <div className="recipe">

                    <div ref={contentRef} className="info">
                        <p>
                            Recipe for:
                        </p>
                        <p id="title">
                            {currentCocktail.name}
                        </p>
                    </div>

                    <div className="details">
                        <h2>
                            {currentCocktail.title}
                        </h2>
                        <p>
                            {currentCocktail.description}
                        </p>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default Menu