document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const content = document.getElementById("content");

  // Theme Switch Logic
  const themeBtn = document.getElementById("theme-toggle");
  const iconLight = document.querySelector(".theme-icon-light");
  const iconDark = document.querySelector(".theme-icon-dark");
  const themeText = document.getElementById("theme-text");

  function updateThemeUI(isDark) {
    if (isDark) {
      iconLight.style.display = "block";
      iconDark.style.display = "none";
      themeText.innerText = "Modo Claro";
    } else {
      iconLight.style.display = "none";
      iconDark.style.display = "block";
      themeText.innerText = "Modo Oscuro";
    }
  }

  // Initial UI state setup based on the data-theme attribute set by head script
  const currentTheme = document.documentElement.getAttribute("data-theme");
  updateThemeUI(currentTheme === "dark");

  themeBtn.addEventListener("click", () => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";

    if (newTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    localStorage.setItem("theme", newTheme);
    updateThemeUI(newTheme === "dark");
  });

  // Scroll to Top Logic
  const scrollTopBtn = document.getElementById("scroll-top-btn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Mobile Sticky Header Logic
  const sidebar = document.querySelector(".sidebar");
  window.addEventListener("scroll", () => {
    if (window.innerWidth <= 768) {
      if (window.scrollY > 10) {
        sidebar.classList.add("scrolled");
      } else {
        sidebar.classList.remove("scrolled");
      }
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      sidebar.classList.remove("scrolled");
    }
  });

  if (typeof formulasData !== "undefined") {
    // Build UI
    formulasData.forEach((section, index) => {
      // Nav Button
      const btn = document.createElement("button");
      btn.className = `nav-btn ${index === 0 ? "active" : ""}`;
      const shortTitle = section.topic.split(".")[0];
      // e.g., "Tema 3. Análisis de los ítems" -> "Tema 3"
      btn.innerHTML = `<span>${shortTitle}</span>`;

      // Allow showing the full title on hover via title attribute
      btn.title = section.topic;

      btn.onclick = () => switchTab(index);
      navbar.appendChild(btn);

      // Section
      const sectionDiv = document.createElement("div");
      sectionDiv.className = `topic-section ${index === 0 ? "active" : ""}`;
      sectionDiv.id = `section-${index}`;

      const title = document.createElement("h2");
      title.className = "section-title";
      title.innerText = section.topic;
      sectionDiv.appendChild(title);

      // Cards
      section.items.forEach((item, itemIdx) => {
        const card = document.createElement("div");
        card.className = "card";

        const h3 = document.createElement("h3");
        h3.innerText = item.name;
        card.appendChild(h3);

        const desc = document.createElement("div");
        desc.className = "description";
        desc.innerText = item.desc;
        card.appendChild(desc);

        const formula = document.createElement("div");
        formula.className = "formula-display";
        formula.innerHTML = `\\[ ${item.latex} \\]`;
        card.appendChild(formula);

        if (item.vars && item.vars.length > 0 && !item.noCalc) {
          const inputsGrid = document.createElement("div");
          inputsGrid.className = "inputs-grid";

          item.vars.forEach((v) => {
            const group = document.createElement("div");
            group.className = "input-group";

            const label = document.createElement("label");
            label.innerText = v.label;

            const input = document.createElement("input");
            input.type = "number";
            input.step = "any";
            input.id = `input-${index}-${itemIdx}-${v.id}`;

            if (v.default !== undefined) {
              input.value = v.default;
            } else {
              input.placeholder = "0.00";
            }

            const help = document.createElement("div");
            help.className = "variable-help";
            help.innerText = v.help;

            group.appendChild(label);
            group.appendChild(input);
            group.appendChild(help);
            inputsGrid.appendChild(group);

            // Calculate on enter key
            input.addEventListener("keypress", function (e) {
              if (e.key === "Enter") {
                calculate(item, index, itemIdx);
              }
            });
          });

          card.appendChild(inputsGrid);

          const btnGroup = document.createElement("div");
          btnGroup.className = "btn-group";

          const btnCalc = document.createElement("button");
          btnCalc.className = "btn-calc";
          btnCalc.innerText = "Calcular Resultado";
          btnCalc.onclick = () => calculate(item, index, itemIdx);

          const btnClear = document.createElement("button");
          btnClear.className = "btn-clear";
          btnClear.innerText = "Limpiar";
          btnClear.onclick = () => clearInputs(item, index, itemIdx);

          btnGroup.appendChild(btnCalc);
          btnGroup.appendChild(btnClear);
          card.appendChild(btnGroup);

          const resultBox = document.createElement("div");
          resultBox.className = "result-box";
          resultBox.id = `result-${index}-${itemIdx}`;
          card.appendChild(resultBox);
        } else if (item.noCalc) {
          const note = document.createElement("div");
          note.className = "info-note";
          note.innerText =
            "Fórmula de referencia teórica. No requiere cálculo.";
          card.appendChild(note);
        }

        sectionDiv.appendChild(card);
      });

      content.appendChild(sectionDiv);
    });
  }

  function switchTab(index) {
    const buttons = navbar.querySelectorAll(".nav-btn");
    buttons.forEach((btn, i) => {
      if (i === index) btn.classList.add("active");
      else btn.classList.remove("active");
    });

    const sections = document.querySelectorAll(".topic-section");
    sections.forEach((sec, i) => {
      if (i === index) sec.classList.add("active");
      else sec.classList.remove("active");
    });

    // Scroll to top logic
    if (window.innerWidth <= 768) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function calculate(item, sIdx, iIdx) {
    const values = {};
    let allFilled = true;

    item.vars.forEach((v) => {
      const input = document.getElementById(`input-${sIdx}-${iIdx}-${v.id}`);
      const val = parseFloat(input.value);
      if (isNaN(val)) {
        allFilled = false;
        input.style.borderColor = "var(--danger)";
        input.style.backgroundColor = "var(--danger-bg)";
      } else {
        input.style.borderColor = "var(--border-color)";
        input.style.backgroundColor = "var(--card-bg)";
        values[v.id] = val;
      }
    });

    const resultBox = document.getElementById(`result-${sIdx}-${iIdx}`);

    // Ensure inline display is removed so CSS class controls visibility
    resultBox.style.display = "";

    if (!allFilled) {
      resultBox.className = "result-box error";
      resultBox.innerText =
        "Error: Por favor, rellena todos los campos correctamente.";
      return;
    }

    try {
      const result = item.calc(values);
      resultBox.className = "result-box success";

      if (item.isTextResult) {
        resultBox.innerText = `${item.resultLabel}: ${result}`;
      } else {
        // Formatting very small or very large numbers avoiding scientific notation if possible
        let formattedResult = Number.isInteger(result)
          ? result
          : parseFloat(result.toFixed(4));
        resultBox.innerText = `${item.resultLabel} = ${formattedResult}`;
      }
    } catch (e) {
      resultBox.className = "result-box error";
      resultBox.innerText = "Error en el cálculo matemático.";
    }
  }

  function clearInputs(item, sIdx, iIdx) {
    item.vars.forEach((v) => {
      const input = document.getElementById(`input-${sIdx}-${iIdx}-${v.id}`);
      if (input) {
        if (v.default !== undefined) {
          input.value = v.default;
        } else {
          input.value = "";
        }
        input.style.borderColor = "var(--border-color)";
        input.style.backgroundColor = "var(--card-bg)";
      }
    });
    const resultBox = document.getElementById(`result-${sIdx}-${iIdx}`);
    if (resultBox) {
      resultBox.className = "result-box";
      resultBox.style.display = "";
      resultBox.innerText = "";
    }
  }
});
