const header = document.querySelector("[data-header]");
const revealNodes = document.querySelectorAll(".reveal");
const translationButtons = document.querySelectorAll("[data-translation-tabs] button");
const translationPanel = document.querySelector("[data-translation-panel]");
const scrollButtons = document.querySelectorAll("[data-scroll-to]");
const aiTopicButtons = document.querySelectorAll("[data-ai-topic]");
const aiRandomButton = document.querySelector("[data-ai-random]");
const aiText = document.querySelector("[data-typing]");
const resourceToggle = document.querySelector("[data-toggle-resources]");
const resourceList = document.querySelector("[data-resource-list]");

const translations = [
  {
    original: "mujhe stress ho raha hai yaar",
    translated: "I’m feeling stressed right now."
  },
  {
    original: "kal exam hai aur bahut tension ho rahi hai",
    translated: "My exam is tomorrow and I’m feeling very tense."
  },
  {
    original: "I barely slept last night because I was anxious.",
    translated: "నాకు ఆందోళనగా ఉండటం వల్ల నిన్న రాత్రి బాగా నిద్రపోలేదు."
  },
  {
    original: "enna panradhu nu theriyala, romba pressure ah irukku",
    translated: "I do not know what to do; it feels like a lot of pressure."
  }
];

const aiPrompts = {
  exam: "“You mentioned feeling overwhelmed about college recently. Want to talk about what has been on your mind today?”",
  college: "“Last time, college pressure felt heavy. Should we separate what is urgent from what is just making noise?”",
  sleep: "“You said sleep has been difficult lately. Want to look at what usually happens right before bedtime?”",
  anxiety: "“I remember you described a tight, restless feeling. We can slow this down together, one thought at a time.”"
};

const setHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 12);
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealNodes.forEach((node) => revealObserver.observe(node));
window.addEventListener("scroll", setHeader, { passive: true });
setHeader();

translationButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    translationButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const data = translations[index];
    const fields = translationPanel.querySelectorAll("strong");
    translationPanel.animate([
      { opacity: 0.55, transform: "translateY(6px)" },
      { opacity: 1, transform: "translateY(0)" }
    ], { duration: 260, easing: "ease-out" });
    fields[0].textContent = data.original;
    fields[1].textContent = data.translated;
  });
});

scrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(button.dataset.scrollTo)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

aiTopicButtons.forEach((button) => {
  button.addEventListener("click", () => {
    aiTopicButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    aiText.textContent = aiPrompts[button.dataset.aiTopic];
    aiText.animate([
      { opacity: 0.45, transform: "translateY(8px)" },
      { opacity: 1, transform: "translateY(0)" }
    ], { duration: 260, easing: "ease-out" });
  });
});

aiRandomButton?.addEventListener("click", () => {
  const inactive = [...aiTopicButtons].find((button) => !button.classList.contains("active"));
  inactive?.click();
});

resourceToggle?.addEventListener("click", () => {
  const isHidden = resourceList.hasAttribute("hidden");
  resourceList.toggleAttribute("hidden", !isHidden);
  resourceToggle.textContent = isHidden ? "Hide Support Resources" : "View Support Resources";
});
