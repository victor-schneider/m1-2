# Copilot Instructions

This document provides guidance for AI coding agents working on this project.

## Project Overview

This project is a website for purchasing event tickets, built with HTML, CSS, and JavaScript. It includes pages for browsing events, selecting seats, and making payments.

The project is structured as a set of static HTML files, each with its own corresponding CSS file. Shared styles are likely in `style.css`.

A separate, self-contained project, `FormularioInterativo-main 2/`, is included in the repository. This is an interactive payment form.

## Key Files

-   `home.html`: The main landing page.
-   `servicos.html`: Displays the list of available events.
-   `ingressosShow.html`, `ingressosRally.html`: Pages for specific event types.
-   `assentos.html`: The seat selection page.
-   `pagamento.html`: The payment page.
-   `cartao.html`: A credit card form.
-   `confirmacao.html`: The order confirmation page.
-   `style.css`: Main stylesheet.
-   `script.js`: Main JavaScript file.
-   `FormularioInterativo-main 2/`: A separate, self-contained interactive form project.

## Development Workflow

-   This is a static website. To preview changes, open the HTML files directly in a web browser.
-   There is no build process or package manager.
-   JavaScript code is written in vanilla JS in `script.js`.
-   CSS is written in plain CSS. Each page has its own CSS file, and there is a global `style.css`.

## How to Work with the Code

-   When adding a new page, create a new HTML file and a corresponding CSS file.
-   When adding new functionality, add the JavaScript code to `script.js`.
-   The `FormularioInterativo-main 2/` directory is a separate project. If you need to work on the interactive form, treat it as a distinct codebase.
-   Images for events are located in the `imagens-eventos/` directory.
-   Logo images are in the root directory.
