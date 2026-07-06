document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".feature-counter-number");
  if (!counters.length) {
    return;
  }

  const animateCounter = function (counter) {
    const target = Number(counter.getAttribute("data-target")) || 0;
    const suffix = counter.getAttribute("data-suffix") || "";
    const prefix = counter.getAttribute("data-prefix") || "";
    const duration = 2000;
    const startTime = performance.now();

    const step = function (timestamp) {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.min(Math.round(progress * target), target);
      counter.textContent = `${prefix}${value}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        counter.textContent = `${prefix}${target}${suffix}`;
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.4,
    }
  );

  counters.forEach(function (counter) {
    observer.observe(counter);
  });

  const featureCounters = document.querySelectorAll(".feature-counter");
  featureCounters.forEach(function (featureCounter) {
    const bgImage = featureCounter.getAttribute("data-bg-image");
    if (bgImage) {
      featureCounter.style.setProperty("--feature-counter-bg-image", `url('${bgImage}')`);
    }
  });
});