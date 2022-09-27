function show() {
  gsap.registerPlugin(ScrollTrigger);


  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });


  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}

function Page1Animation() {


  var txts = document.querySelectorAll(".txts")

  for (let i = 0; i < txts.length; i++) {
    gsap.from(txts[i], {

      opacity: 0,
      duration: 3,

      onStart: function () {
        $(txts[i]).textillate({ in: { effect: 'fadeInUp' } });
      }
    })

  }

}

function ImgAnimation() {
  gsap.to(".img-animate", {

    scrollTrigger: {
      trigger: ".img-animate",
      scroller: "#main",
      end: "top 50%",
      scrub: true,
    },
    height: "40vh",
  })

  gsap.to(".img-animate1", {

    scrollTrigger: {
      trigger: ".img-animate",
      scroller: "#main",
      end: "top 50%",
      scrub: true,
    },
    height: "50vh",
  })

}

function ImgMobileAnimation() {
  gsap.to(".img-animate", {

    scrollTrigger: {
      trigger: ".img-animate",
      scroller: "#main",
      end: "top 50%",
      scrub: true,
    },
    height: "17vh",
  })

  gsap.to(".img-animate1", {

    scrollTrigger: {
      trigger: ".img-animate",
      scroller: "#main",
      end: "top 50%",
      scrub: true,
    },
    height: "22vh",
  })

}

function TextAnimation() {

  var elems = document.querySelectorAll(".upper");
  for (let i = 0; i < elems.length; i++) {
    gsap.to(elems[i], {

      scrollTrigger: {
        trigger: elems[i],
        scroller: "#main",
        scrub: true,
      },
      opacity: 1,
      y: '-60',
    })
  }

  var elems2 = document.querySelectorAll(".upper-txt");
  for (let i = 0; i < elems.length; i++) {
    gsap.to(elems2[i], {

      scrollTrigger: {
        trigger: elems2[i],
        scroller: "#main",
        scrub: true,
      },
      opacity: 1,
      y: '-85',
    })
  }

}





if (window.innerWidth <= 500) {

  show();
  Page1Animation();
  ImgMobileAnimation();

}

else {

  show();
  Page1Animation();
  TextAnimation();
  ImgAnimation();

}