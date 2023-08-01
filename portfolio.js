var typed = new Typed(".text",{
    strings:["Frontend Developer","Web Developer","Programmer"],
    typespeed:100,
    backspeed:100,
    backDelay:1000,
    loop:true});

    const articles = new Map([
        ["certificate1", { tx: "-90%", tz: "-70vmin", ry: "60deg" }],
        ["certificate2", { tz: "-110vmin" }],
        ["certificate3", { tx: "90%", tz: "-70vmin", ry: "-60deg" }]
      ]);
      window.addEventListener("load", () => {
        const main = document.querySelector("main");
        for (const [id, { tx, tz, ry }] of articles.entries()) {
          main.appendChild(makeArticleElement(id, tx, tz, ry));
        }
        document.addEventListener("click", ({ target }) => {
          const targetId = target.closest("article")?.id;
          let [itx, itz, iry] = [0, 0, 0]; // inversed transformation to apply to the main element
          if (targetId && main.dataset.focus !== targetId) {
            // zoom in
            const { tx, tz, ry } = articles.get(targetId) || {};
            [itx, itz, iry] = [tx, tz, ry].map(inverseTransformation);
            main.setAttribute("data-focus", targetId);
          } else {
            // zoom out
            main.removeAttribute("data-focus");
          }
          main.style.transform = `rotateY(${iry}) translate3d(${itx}, 0, ${itz})`;
        });
      });
      // e.g. turn "90%" into "-90%" or "-10vmin" into "10vmin"
      function inverseTransformation(transform) {
        if (!transform) return 0;
        const [_, value, unit] = transform.match(/(-?\d+)(.*)/);
        return `${-Number(value)}${unit}`;
      }
      function makeArticleElement(id, tx = 0, tz = 0, ry = 0) {
        const img = document.createElement("img");
        img.src = `${id}.jpeg`;
        img.width = 100; // Set the width of the images to 100px
        img.height = 100; // Set the height of the images to 100px
        const button = document.createElement("button");
        button.appendChild(img);
        const element = document.createElement("article");
        element.id = id;
        element.style.transform = `translate3d(${tx}, 0, ${tz}) rotateY(${ry})`;
        element.appendChild(button);
        return element;
      }

      document.addEventListener("DOMContentLoaded", function() {
        const portfolioSection = document.getElementById("portfolio");
        const portfolioContent = document.querySelector("#portfolio .container");
        portfolioContent.classList.add("section-content", "hidden");
      
        document.addEventListener("scroll", function() {
          const scrollPosition = window.scrollY;
          const portfolioOffsetTop = portfolioSection.offsetTop;
      
          if (scrollPosition >= portfolioOffsetTop - 200) {
            portfolioContent.classList.remove("hidden");
            portfolioContent.classList.add("show");
          } else {
            portfolioContent.classList.remove("show");
            portfolioContent.classList.add("hidden");
          }
        });
      });
      document.addEventListener("DOMContentLoaded", function() {
        const educationSection = document.querySelector(".education");
        const educationContent = document.querySelector(".education .container");
        educationContent.classList.add("section-content", "right-to-left", "hidden");
      
        document.addEventListener("scroll", function() {
          const scrollPosition = window.scrollY;
          const educationOffsetTop = educationSection.offsetTop;
      
          if (scrollPosition >= educationOffsetTop - 200) {
            educationContent.classList.remove("hidden");
            educationContent.classList.add("show");
          } else {
            educationContent.classList.remove("show");
            educationContent.classList.add("hidden");
          }
        });
      });
      