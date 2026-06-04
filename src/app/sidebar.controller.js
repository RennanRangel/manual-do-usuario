document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-button");
  const sidebar = document.querySelector(".sidebar");

  if (menuButton && sidebar) {
    menuButton.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-closed");
      sidebar.classList.toggle("active");
    });
  }

  function obterCaminhoAtual() {
    return decodeURIComponent(window.location.pathname);
  }

  function obterNomeArquivo(caminho) {
    if (!caminho) return "";
    return caminho.split(/[/\\]/).pop().toLowerCase();
  }

  function limparDestaqueSidebar() {
    document
      .querySelectorAll(
        ".sidebar .section-link.active, .sidebar .sidebar-toggle.active, .sidebar .sidebar-submenu a.active",
      )
      .forEach((el) => {
        el.classList.remove("active");
      });
  }

  function fecharSubmenus() {
    document.querySelectorAll(".sidebar-group").forEach((group) => {
      group.classList.remove("is-open");
      const toggle = group.querySelector(".sidebar-toggle");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function expandirGrupo(group) {
    if (!group) return;
    const toggle = group.querySelector(".sidebar-toggle");
    group.classList.add("is-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "true");
    }
  }

  function recolherGrupo(group) {
    if (!group) return;
    const toggle = group.querySelector(".sidebar-toggle");
    group.classList.remove("is-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
    }
  }

  function obterSubtopicoDaPaginaAtual() {
    const arquivoAtual = obterNomeArquivo(obterCaminhoAtual());
    let subtopico = null;

    document.querySelectorAll(".sidebar-submenu a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      if (obterNomeArquivo(href) === arquivoAtual) {
        subtopico = link;
      }
    });

    return subtopico;
  }

  function obterGrupoDaPaginaAtual() {
    const subtopico = obterSubtopicoDaPaginaAtual();
    return subtopico ? subtopico.closest(".sidebar-group") : null;
  }

  function marcarTopicoAtual() {
    const arquivoAtual = obterNomeArquivo(obterCaminhoAtual());
    limparDestaqueSidebar();

    document
      .querySelectorAll(".sidebar-list > li > .section-link[href]")
      .forEach((link) => {
        const href = link.getAttribute("href");
        if (!href) return;
        if (obterNomeArquivo(href) === arquivoAtual) {
          link.classList.add("active");
        }
      });

    const subtopicoAtual = obterSubtopicoDaPaginaAtual();
    if (subtopicoAtual) {
      subtopicoAtual.classList.add("active");

      const toggle = subtopicoAtual
        .closest(".sidebar-group")
        ?.querySelector(".sidebar-toggle");
      if (toggle) {
        toggle.classList.add("active");
      }
    }
  }

  function alternarGrupo(group) {
    if (!group) return;

    const estavaAberto = group.classList.contains("is-open");

    if (estavaAberto) {
      recolherGrupo(group);
    } else {
      fecharSubmenus();
      expandirGrupo(group);
    }

    marcarTopicoAtual();
  }

  if (sidebar) {
    sidebar.addEventListener("click", (event) => {
      const toggle = event.target.closest(".sidebar-toggle");
      if (!toggle) return;

      event.preventDefault();
      event.stopPropagation();
      alternarGrupo(toggle.closest(".sidebar-group"));
    });
  }

  function iniciarSidebar() {
    const grupoAtual = obterGrupoDaPaginaAtual();
    marcarTopicoAtual();
    if (grupoAtual) {
      expandirGrupo(grupoAtual);
    }
  }

  iniciarSidebar();

  const indiceLinks = document.querySelectorAll(".indice-pagina a");
  const sections = Array.from(indiceLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (sections.length) {
    window.addEventListener("scroll", () => {
      let current = sections[0];
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= 200) current = section;
      });
      indiceLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${current.id}`,
        );
      });
    });
  }

  window.alternarNavegacao = function () {};
});
