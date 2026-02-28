const formulasData = [
  {
    topic: "Tema 3. Análisis de los ítems",
    items: [
      {
        name: "Índice de dificultad (pj)",
        latex: "p_j = \\frac{A_j}{N_j}",
        desc: "Proporción de aciertos sobre el total de sujetos que responden al ítem.",
        vars: [
          {
            id: "aj",
            label: "Aj (Aciertos)",
            help: "Número de personas que acertaron el ítem",
          },
          {
            id: "nj",
            label: "Nj (Total Ítem)",
            help: "Número total de personas que respondieron al ítem",
          },
        ],
        calc: (v) => v.aj / v.nj,
        resultLabel: "pj",
      },
      {
        name: "Índice de dificultad corregido (pcj)",
        latex: "p^c_j = p_j - \\frac{\\frac{F_j}{N_j}}{K-1}",
        desc: "Corrección del índice de dificultad considerando los fallos y el azar.",
        vars: [
          {
            id: "pj",
            label: "pj (Dificultad)",
            help: "Índice de dificultad simple calculado antes",
          },
          {
            id: "fj",
            label: "Fj (Fallos)",
            help: "Número de personas que fallaron el ítem",
          },
          {
            id: "nj",
            label: "Nj (Total Ítem)",
            help: "Número total de personas que respondieron",
          },
          {
            id: "k",
            label: "K (Opciones)",
            help: "Número de alternativas de respuesta",
          },
        ],
        calc: (v) => v.pj - v.fj / v.nj / (v.k - 1),
        resultLabel: "pcj",
      },
      {
        name: "Varianza del ítem (S²j)",
        latex: "S^2_j = p_j \\times (1 - p_j)",
        desc: "Varianza de un ítem dicotómico en función de su dificultad.",
        vars: [{ id: "pj", label: "pj", help: "Índice de dificultad (0 a 1)" }],
        calc: (v) => v.pj * (1 - v.pj),
        resultLabel: "S²j",
      },
      {
        name: "Índice de Discriminación (Dj)",
        latex: "D_j = p_s - p_i",
        desc: "Diferencia entre la proporción de aciertos del grupo superior e inferior.",
        vars: [
          {
            id: "ps",
            label: "ps (Grupo Superior)",
            help: "Proporción de aciertos en el grupo superior (ej. 27%)",
          },
          {
            id: "pi",
            label: "pi (Grupo Inferior)",
            help: "Proporción de aciertos en el grupo inferior (ej. 27%)",
          },
        ],
        calc: (v) => v.ps - v.pi,
        resultLabel: "Dj",
      },
      {
        name: "Corrección del azar (Xc)",
        latex: "X^c = X - \\frac{E}{K-1}",
        desc: "Puntuación directa corregida por el efecto de la adivinación.",
        vars: [
          {
            id: "x",
            label: "X (Puntuación Directa)",
            help: "Número total de aciertos brutos",
          },
          { id: "e", label: "E (Errores)", help: "Número total de errores" },
          {
            id: "k",
            label: "K (Opciones)",
            help: "Número de alternativas por pregunta",
          },
        ],
        calc: (v) => v.x - v.e / (v.k - 1),
        resultLabel: "Xc",
      },
    ],
  },
  {
    topic: "Tema 4. Teoría clásica de los test",
    items: [
      {
        name: "Modelo clásico lineal (Varianzas)",
        latex: "\\sigma^2_X = \\sigma^2_V + \\sigma^2_E",
        desc: "Descomposición de la varianza observada en varianza verdadera y error.",
        vars: [
          {
            id: "sv2",
            label: "σ²V (Var. Verdadera)",
            help: "Varianza de las puntuaciones verdaderas",
          },
          {
            id: "se2",
            label: "σ²E (Var. Error)",
            help: "Varianza del error de medida",
          },
        ],
        calc: (v) => v.sv2 + v.se2,
        resultLabel: "σ²X",
      },
      {
        name: "Supuestos básicos",
        latex:
          "\\begin{aligned} X &= V + E \\\\ V &= E_f(X_f) \\\\ \\rho_{E_f V} &= 0 \\\\ \\rho_{E_f E_{f'}} &= 0 \\\\ \\rho_{E_f V_k} &= 0 \\end{aligned}",
        desc: "Fundamentos teóricos del modelo clásico (no requiere cálculo).",
        vars: [],
        calc: null,
        noCalc: true,
      },
      {
        name: "Coeficiente de fiabilidad",
        latex:
          "\\rho_{XX} = \\frac{\\sigma^2_V}{\\sigma^2_X} = 1 - \\frac{\\sigma^2_E}{\\sigma^2_X}",
        desc: "Definición de fiabilidad como razón de varianzas.",
        vars: [
          { id: "sv2", label: "σ²V", help: "Varianza Verdadera" },
          { id: "sx2", label: "σ²X", help: "Varianza Observada (Total)" },
        ],
        calc: (v) => v.sv2 / v.sx2,
        resultLabel: "ρXX",
      },
      {
        name: "Condiciones de paralelismo",
        latex: "V_1 = V_2 = V \\\\ \\sigma^2_{E_1} = \\sigma^2_{E_2}",
        desc: "Dos tests son paralelos si miden lo mismo con el mismo error.",
        vars: [],
        calc: null,
        noCalc: true,
      },
      {
        name: "Fórmula de Spearman-Brown (Fiabilidad alargado)",
        latex: "\\rho_{nXX} = \\frac{n \\rho_{XX}}{1 + (n-1)\\rho_{XX}}",
        desc: "Fiabilidad estimada si se alarga el test 'n' veces.",
        vars: [
          {
            id: "n",
            label: "n",
            help: "Factor de alargamiento (veces la longitud original)",
          },
          { id: "rxx", label: "ρXX", help: "Fiabilidad del test original" },
        ],
        calc: (v) => (v.n * v.rxx) / (1 + (v.n - 1) * v.rxx),
        resultLabel: "ρnXX",
      },
      {
        name: "Hallar 'n' (Factor de alargamiento)",
        latex:
          "n = \\frac{\\rho_{nXX}(1 - \\rho_{XX})}{\\rho_{XX}(1 - \\rho_{nXX})}",
        desc: "Cuántas veces hay que alargar el test para conseguir una fiabilidad deseada.",
        vars: [
          { id: "rnxx", label: "ρnXX (Deseada)", help: "Fiabilidad objetivo" },
          { id: "rxx", label: "ρXX (Actual)", help: "Fiabilidad actual" },
        ],
        calc: (v) => (v.rnxx * (1 - v.rxx)) / (v.rxx * (1 - v.rnxx)),
        resultLabel: "n",
      },
      {
        name: "Longitud del nuevo test (J')",
        latex: "J' = n J",
        desc: "Número total de ítems del nuevo test alargado.",
        vars: [
          { id: "n", label: "n", help: "Factor de alargamiento" },
          { id: "j", label: "J", help: "Número de ítems original" },
        ],
        calc: (v) => v.n * v.j,
        resultLabel: "J'",
      },
    ],
  },
  {
    topic: "Tema 5. Fiabilidad de las puntuaciones",
    items: [
      {
        name: "Método de las dos mitades (Spearman-Brown)",
        latex: "_{SB}r_{XX} = \\frac{2 r_{xx}}{1 + r_{xx}}",
        desc: "Estimación de fiabilidad correlacionando dos mitades del test.",
        vars: [
          {
            id: "rxx",
            label: "rxx",
            help: "Correlación entre las dos mitades",
          },
        ],
        calc: (v) => (2 * v.rxx) / (1 + v.rxx),
        resultLabel: "SB rXX",
      },
      {
        name: "Coeficiente α de Cronbach",
        latex:
          "\\alpha = \\frac{J}{J-1} \\left( 1 - \\frac{\\sum S^2_{X_j}}{S^2_X} \\right)",
        desc: "Medida de consistencia interna basada en la varianza de los ítems.",
        vars: [
          { id: "j", label: "J", help: "Número de ítems del test" },
          {
            id: "sum_sj2",
            label: "ΣS²Xj",
            help: "Suma de las varianzas de cada ítem",
          },
          { id: "sx2", label: "S²X", help: "Varianza total del test" },
        ],
        calc: (v) => (v.j / (v.j - 1)) * (1 - v.sum_sj2 / v.sx2),
        resultLabel: "α",
      },
      {
        name: "Varianza del test (Matriz Var-Cov)",
        latex: "S^2_X = \\sum S^2_{X_j} + 2 \\sum S_{X_j X_j}",
        desc: "Cálculo de la varianza total sumando varianzas y covarianzas de los ítems.",
        vars: [
          {
            id: "sum_sj2",
            label: "ΣS²Xj",
            help: "Suma de varianzas de los ítems",
          },
          {
            id: "sum_sjj",
            label: "2ΣSXjXj",
            help: "Doble de la suma de covarianzas entre ítems",
          },
        ],
        calc: (v) => v.sum_sj2 + v.sum_sjj,
        resultLabel: "S²X",
      },
      {
        name: "Error típico de medida (SE)",
        latex: "S_E = S_X \\sqrt{1 - r_{XX}}",
        desc: "Desviación típica de los errores de medida.",
        vars: [
          { id: "sx", label: "SX", help: "Desviación típica del test" },
          { id: "rxx", label: "rXX", help: "Coeficiente de fiabilidad" },
        ],
        calc: (v) => v.sx * Math.sqrt(1 - v.rxx),
        resultLabel: "SE",
      },
      {
        name: "Intervalo de confianza (Límite Inferior)",
        latex: "V_{LI} = X_i - |Z_{\\alpha/2}| S_E",
        desc: "Límite inferior del intervalo de confianza para la puntuación verdadera.",
        vars: [
          { id: "xi", label: "Xi", help: "Puntuación observada del sujeto" },
          {
            id: "z",
            label: "|Zα/2|",
            help: "Valor Z crítico (1.96 para 95%, 2.57 para 99%)",
          },
          { id: "se", label: "SE", help: "Error típico de medida" },
        ],
        calc: (v) => v.xi - Math.abs(v.z) * v.se,
        resultLabel: "VLI",
      },
      {
        name: "Intervalo de confianza (Límite Superior)",
        latex: "V_{LS} = X_i + |Z_{\\alpha/2}| S_E",
        desc: "Límite superior del intervalo de confianza para la puntuación verdadera.",
        vars: [
          { id: "xi", label: "Xi", help: "Puntuación observada del sujeto" },
          {
            id: "z",
            label: "|Zα/2|",
            help: "Valor Z crítico (1.96 para 95%, 2.57 para 99%)",
          },
          { id: "se", label: "SE", help: "Error típico de medida" },
        ],
        calc: (v) => v.xi + Math.abs(v.z) * v.se,
        resultLabel: "VLS",
      },
      {
        name: "Contraste de Puntuaciones verdaderas",
        latex: "Z = \\frac{(X_1 - X_2)}{S_E \\sqrt{2}}",
        desc: "Para comprobar si dos puntuaciones observadas difieren significativamente.",
        vars: [
          { id: "x1", label: "X1", help: "Primera puntuación observada" },
          { id: "x2", label: "X2", help: "Segunda puntuación observada" },
          { id: "se", label: "SE", help: "Error típico de medida" },
        ],
        calc: (v) => (v.x1 - v.x2) / (v.se * Math.sqrt(2)),
        resultLabel: "Z",
      },
    ],
  },
  {
    topic: "Temas 6 y 7. Validez",
    items: [
      {
        name: "Índice de congruencia ítem-objetivo (Ijk)",
        latex:
          "I_{jk} = \\frac{N}{2N-2} (\\overline{X}_{jk} - \\overline{X}_j)",
        desc: "Relación entre el rendimiento en un ítem y el criterio externo.",
        vars: [
          { id: "n", label: "N", help: "Número total de sujetos" },
          {
            id: "xjk",
            label: "X̄jk",
            help: "Media del criterio en los que acertaron el ítem",
          },
          {
            id: "xj",
            label: "X̄j",
            help: "Media del criterio en el grupo total",
          },
        ],
        calc: (v) => (v.n / (2 * v.n - 2)) * (v.xjk - v.xj),
        resultLabel: "Ijk",
      },
      {
        name: "Ecuación de regresión",
        latex: "Y'_i = \\beta_0 + \\beta_1 X_i",
        desc: "Predicción de la puntuación en el criterio (Y) basada en el test (X).",
        vars: [
          {
            id: "b0",
            label: "β0 (Ordenada)",
            help: "Término independiente (ver fórmula abajo)",
          },
          {
            id: "b1",
            label: "β1 (Pendiente)",
            help: "Coeficiente de regresión (ver fórmula abajo)",
          },
          { id: "xi", label: "Xi", help: "Puntuación en el test predictor" },
        ],
        calc: (v) => v.b0 + v.b1 * v.xi,
        resultLabel: "Y'i",
      },
      {
        name: "Pendiente (β1) y Ordenada (β0)",
        latex:
          "\\beta_1 = r_{XY} \\left( \\frac{S_Y}{S_X} \\right) \\\\ \\beta_0 = \\overline{Y} - \\beta_1 \\overline{X}",
        desc: "Cálculo de los parámetros de la recta de regresión.",
        vars: [
          {
            id: "rxy",
            label: "rXY",
            help: "Correlación entre Test y Criterio",
          },
          { id: "sy", label: "SY", help: "Desviación típica del Criterio" },
          { id: "sx", label: "SX", help: "Desviación típica del Test" },
          { id: "my", label: "Ȳ", help: "Media del Criterio" },
          { id: "mx", label: "X̄", help: "Media del Test" },
        ],
        calc: (v) => {
          const b1 = v.rxy * (v.sy / v.sx);
          const b0 = v.my - b1 * v.mx;
          return `β1 = ${b1.toFixed(4)}, β0 = ${b0.toFixed(4)}`;
        },
        resultLabel: "Parámetros",
        isTextResult: true,
      },
      {
        name: "Corrección por atenuación",
        latex: "r_{V_X V_Y} = \\frac{r_{XY}}{\\sqrt{r_{XX} r_{YY}}}",
        desc: "Estima la correlación verdadera si ambos tests fueran perfectamente fiables.",
        vars: [
          { id: "rxy", label: "rXY", help: "Correlación observada" },
          { id: "rxx", label: "rXX", help: "Fiabilidad del Test X" },
          { id: "ryy", label: "rYY", help: "Fiabilidad del Criterio Y" },
        ],
        calc: (v) => v.rxy / Math.sqrt(v.rxx * v.ryy),
        resultLabel: "rVxVy",
      },
      {
        name: "Valor máximo del coeficiente de validez",
        latex: "r_{XY} \\leq \\sqrt{r_{XX} r_{YY}}",
        desc: "La validez no puede superar la raíz del producto de las fiabilidades.",
        vars: [
          { id: "rxx", label: "rXX", help: "Fiabilidad del Test" },
          { id: "ryy", label: "rYY", help: "Fiabilidad del Criterio" },
        ],
        calc: (v) => Math.sqrt(v.rxx * v.ryy),
        resultLabel: "rXY (Máx)",
      },
      {
        name: "Validez al cambiar coeficientes de fiabilidad",
        latex:
          "r_{X_2 Y_1} = \\frac{r_{X_1 Y_1}}{\\sqrt{\\frac{r_{X_1 X_1} r_{Y_1 Y_1}}{r_{X_2 X_2} r_{Y_2 Y_2}}}}",
        desc: "Ajuste de la validez cuando cambian las fiabilidades de los tests.",
        vars: [
          { id: "rx1y1", label: "rX1Y1", help: "Validez original" },
          { id: "rx1x1", label: "rX1X1", help: "Fiabilidad Test 1 (original)" },
          {
            id: "ry1y1",
            label: "rY1Y1",
            help: "Fiabilidad Criterio 1 (original)",
          },
          { id: "rx2x2", label: "rX2X2", help: "Fiabilidad Test 2 (nueva)" },
          {
            id: "ry2y2",
            label: "rY2Y2",
            help: "Fiabilidad Criterio 2 (nueva)",
          },
        ],
        calc: (v) =>
          v.rx1y1 / Math.sqrt((v.rx1x1 * v.ry1y1) / (v.rx2x2 * v.ry2y2)),
        resultLabel: "rX2Y1",
      },
    ],
  },
  {
    topic: "Tema 9. Interpretación",
    items: [
      {
        name: "Cociente Intelectual (CI)",
        latex: "CI = \\frac{EM}{EC} \\times 100",
        desc: "Ratio entre Edad Mental y Edad Cronológica.",
        vars: [
          { id: "em", label: "EM", help: "Edad Mental" },
          { id: "ec", label: "EC", help: "Edad Cronológica" },
        ],
        calc: (v) => (v.em / v.ec) * 100,
        resultLabel: "CI",
      },
      {
        name: "Puntuaciones típicas (Z)",
        latex: "Z_X = \\frac{X - \\overline{X}}{S_X}",
        desc: "Distancia de una puntuación respecto a la media en unidades de desviación típica.",
        vars: [
          { id: "x", label: "X", help: "Puntuación directa" },
          { id: "media", label: "X̄", help: "Media del grupo" },
          { id: "sx", label: "SX", help: "Desviación típica del grupo" },
        ],
        calc: (v) => (v.x - v.media) / v.sx,
        resultLabel: "ZX",
      },
      {
        name: "Puntuaciones típicas derivadas (ZT)",
        latex: "Z_T = a + b Z_X",
        desc: "Transformación lineal (ej. T=50+10Z, CI=100+15Z).",
        vars: [
          {
            id: "zx",
            label: "ZX",
            help: "Puntuación típica Z calculada antes",
          },
          { id: "a", label: "a", help: "Nueva media (ej. 50 o 100)" },
          {
            id: "b",
            label: "b",
            help: "Nueva desviación típica (ej. 10 o 15)",
          },
        ],
        calc: (v) => v.a + v.b * v.zx,
        resultLabel: "ZT",
      },
    ],
  },
  {
    topic: "Tema 10. Teoría de Respuesta al Ítem",
    items: [
      {
        name: "Modelo logístico 1 parámetro",
        latex: "P_j(\\theta) = \\frac{1}{1 + e^{-D(\\theta - b_j)}}",
        desc: "Probabilidad de acierto en función de la habilidad y la dificultad.",
        vars: [
          { id: "theta", label: "θ", help: "Habilidad del sujeto" },
          { id: "b", label: "bj", help: "Parámetro de dificultad del ítem" },
          {
            id: "d",
            label: "D",
            help: "Constante de escalamiento (usualmente 1.702)",
            default: 1.702,
          },
        ],
        calc: (v) => 1 / (1 + Math.exp(-v.d * (v.theta - v.b))),
        resultLabel: "Pj(θ)",
      },
      {
        name: "Modelo logístico 2 parámetros",
        latex: "P_j(\\theta) = \\frac{1}{1 + e^{-D \\cdot a_j(\\theta - b_j)}}",
        desc: "Incluye el parámetro de discriminación (a).",
        vars: [
          { id: "theta", label: "θ", help: "Habilidad del sujeto" },
          { id: "a", label: "aj", help: "Parámetro de discriminación" },
          { id: "b", label: "bj", help: "Parámetro de dificultad" },
          {
            id: "d",
            label: "D",
            help: "Constante de escalamiento (usualmente 1.702)",
            default: 1.702,
          },
        ],
        calc: (v) => 1 / (1 + Math.exp(-v.d * v.a * (v.theta - v.b))),
        resultLabel: "Pj(θ)",
      },
      {
        name: "Modelo logístico 3 parámetros",
        latex:
          "P_j(\\theta) = c_j + (1 - c_j) \\left[ \\frac{1}{1 + e^{-D \\cdot a_j(\\theta - b_j)}} \\right]",
        desc: "Incluye el parámetro de azar (c).",
        vars: [
          { id: "theta", label: "θ", help: "Habilidad del sujeto" },
          { id: "a", label: "aj", help: "Parámetro de discriminación" },
          { id: "b", label: "bj", help: "Parámetro de dificultad" },
          { id: "c", label: "cj", help: "Parámetro de azar (pseudo-azar)" },
          {
            id: "d",
            label: "D",
            help: "Constante de escalamiento (usualmente 1.702)",
            default: 1.702,
          },
        ],
        calc: (v) => {
          const logistic = 1 / (1 + Math.exp(-v.d * v.a * (v.theta - v.b)));
          return v.c + (1 - v.c) * logistic;
        },
        resultLabel: "Pj(θ)",
      },
      {
        name: "Error típico de estimación de θ",
        latex: "Se(\\theta) = \\frac{1}{\\sqrt{I(\\theta)}}",
        desc: "Precisión de la estimación de la habilidad basada en la información.",
        vars: [
          {
            id: "i",
            label: "I(θ)",
            help: "Función de información del test en θ",
          },
        ],
        calc: (v) => 1 / Math.sqrt(v.i),
        resultLabel: "Se(θ)",
      },
    ],
  },
];
