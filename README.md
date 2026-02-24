# 5 Axes Dev/Tech Test

Teste interativo para identificar tendências de decisão em desenvolvimento de software com base em 5 eixos de trade-off.

## O que o projeto faz

- Aplica **25 perguntas** (escala Likert de 1 a 5).
- Calcula score **0–100 por eixo**.
- Exibe:
	- gráfico radar (Canvas);
	- interpretação por eixo (forças, risco, sugestão prática);
	- tags de perfil e recomendações rápidas.
- Permite copiar resumo textual e salvar último resultado no `localStorage`.

## Eixos avaliados

- Entrega vs Qualidade
- Produto vs Infra
- Generalista vs Especialista
- Solo vs Liderança/Alinhamento
- Conveniência/Velocidade vs Segurança/Privacidade

## Como executar

Como é um projeto estático, há duas formas simples:

1. **Abrir direto no navegador**
	 - Abra `index.html`.

2. **Servir localmente (recomendado)**
	 - Exemplo com VS Code Live Server ou qualquer servidor HTTP estático.
	 - Isso melhora compatibilidade de APIs do navegador (como clipboard).

## Estrutura do projeto

- `index.html`: estrutura das 3 telas (início, quiz, resultado).
- `styles.css`: tema, layout, responsividade e componentes visuais.
- `app.js`: dados do quiz, cálculo de score, renderização e persistência.

## Regras de score (resumo)

- Cada pergunta recebe valor de 1 a 5.
- Perguntas invertidas usam `v' = 6 - v`.
- Score por eixo:

	`score = ((soma - min) / (max - min)) * 100`

	onde:
	- `min = N * 1`
	- `max = N * 5`
	- `N = número de perguntas no eixo`

## Acessibilidade e UX

- Navegação por teclado (incluindo `Enter` para avançar no quiz).
- `aria-live` para feedbacks curtos (toast/tags).
- Barra de progresso com atributos ARIA atualizados por pergunta.

## Persistência local

- O último resultado é salvo no navegador via `localStorage`.
- Chave atual: `fiveAxesDevTechTest:lastResult:v1`.

## Possíveis próximos passos

- Exportar resultado em JSON/PDF.
- Histórico de tentativas (não apenas último resultado).
- i18n (pt-BR/en-US).
- Testes unitários para funções puras de score/interpretação.
