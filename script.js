const items = document.querySelectorAll('.item');
const container = document.querySelector('.container');
const numberOfItems = items.length;
const angleIncrement = (2 * Math.PI) / numberOfItems;
const radius = 300;

let isGalleryOpen = false;

const centerX = container.offsetWidth / 2;
const centerY = container.offsetHeight / 2;

const tl = gsap.timeline();

const colors = ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#FFC6FF', '#BDB2FF']; // Add more colors if needed
const content = [
    {
        heading: "Education",
        text: `
            <p>I've done a BS in Computer Science from The University of British Columbia, Vancouver </p>
            <p>and I'm also a dormant Chemical Engineer</p>
        `
    },
    {
        heading: "Skills",
        text: `
            <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>Node.js</li>
            <li>Express</li>
            <li>MongoDB</li>
            <li>Python</li>
            </ul>
        `
    },
    {
        heading: "Projects",
        text: `
            <p>Some projects I've worked on are: </p>
            <ul>
            <li>My Portfolio: This website which is my first foray into using GSAP for animations</li>
            <li>IttyBittyBites: A React Native app that is an AI powered recipe generator for babies</li>
            <li>Something Borrowed: A MERN Stack Lending and Borrowing app</li>
            </ul>
        `
    },
    {
        heading: "Hobbies",
        text: `
            <p>When I'm not baking treats for my husband or son, I enjoy playing open-world RPG games. I recently completed Zelda: Tears of the Kingdom and am midway into Hogwarts Legacy</p>
            <p>I'm also learning digital art with Procreate! </p>
        `
    },
    {
        heading: "Find me here",
        text: `
            <span>
                <a href="https://github.com/nyananu" target="_blank">
                <img src="./assets/github.png" alt="GitHub" style="width: 5px; height: 5px;">
            </a>
            <a href="https://www.linkedin.com/in/nyananu/" target="_blank">
                <img src="./assets/linkedin.png" alt="LinkedIn" style="width: 5px; height: 5px;">
            </a>
            </span>
        `
    },
      {
        heading: "About Me",
        text: `
            <p>I'm a software engineer with a passion for full-stack web development.</p>
            <p>I'm currently working with web animations using GSAP and Framer motion</p>
        `
    },
    {
        heading: "Experience",
        text: `
            <p>Samsung R&D : Frontend Engineer Jan 2023 - Sep 2023</p>
            <p>Article: Full-stack Web Developer May 2020 - Jan 2021</p>
        `
    },
    
];

items.forEach(function(item, index) {
    // Set a solid background color
    item.style.backgroundColor = colors[index % colors.length];

    const angle = angleIncrement * index;
    const initialRotation = (angle * 180 / Math.PI) - 90;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    gsap.set(item, {scale: 0});

    tl.to(item, {
        left: x + 'px',
        top: y + 'px',
        rotation: initialRotation,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        delay: 1
    }, index * 0.1);

    item.addEventListener('click', function() {
        if (!isGalleryOpen) {
            isGalleryOpen = true;

            const duplicate = item.cloneNode(true);
            duplicate.style.position = 'absolute';
            container.appendChild(duplicate);

            gsap.to(Array.from(items).filter(i => i != item), {
                scale: 0,
                duration: 0.5,
                ease: 'power2.in',
                stagger: 0.05
            });

            const endRotation = initialRotation > 180 ? initialRotation - 360 : initialRotation;

            gsap.to([item, duplicate], {
                rotation: endRotation,
                duration: 0.0001,
                onComplete: function() {
                    gsap.to([item, duplicate], {
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%) scale(10)",
                        duration: 1,
                        ease: "power2.out",
                        delay: 1.25,
                        onStart: function() {
                            const textContainer = document.createElement('div');
                            textContainer.innerHTML = `
                                <h3>${content[index].heading}</h3>
                                ${content[index].text}
                            `;
                            textContainer.classList.add('text-container');
                            
                            duplicate.appendChild(textContainer);
                            duplicate.classList.add('expanded');
                        }
                    });
                }
            });

            const closeGallery = function() {
                if (isGalleryOpen) {
                    gsap.to([item, duplicate], {
                        left: x + 'px',
                        top: y + 'px',
                        scale: 1,
                        rotation: initialRotation,
                        duration: 1,
                        ease: 'power2.out',
                        onComplete: function() {
                            duplicate.remove();
                            gsap.to(items, {
                                scale: 1,
                                duration: 1,
                                stagger: 0.05,
                                ease: 'power2.out',
                            });

                            item.classList.remove('expanded');
                            isGalleryOpen = false;
                        }
                    });
                }
            };

            item.addEventListener('click', closeGallery);
            duplicate.addEventListener('click', closeGallery);
        };
    });
});
