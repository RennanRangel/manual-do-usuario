document.addEventListener('DOMContentLoaded', () => {
    const searchIndex = [
        { title: "Autenticação", category: "EduAloca > Início", url: "Page/Autenticacao/autenticacao.html", keywords: ["autenticacao", "login", "entrar", "acesso"] },
        { title: "Gerenciamento", category: "EduAloca > Início", url: "Page/Gerenciamento/gerenciamento.html", keywords: ["gerenciamento", "gerenciar", "dados", "configuracao"] },
        { title: "Alocação", category: "EduAloca > Início", url: "Page/Alocacao/alocacao.html", keywords: ["alocacao", "alocar", "grade", "horarios", "grade horaria"] },
        { title: "Relatórios", category: "EduAloca > Início", url: "Page/Relatorios/relatorios.html", keywords: ["relatorios", "relatorio", "extrair", "dados", "pdf", "excel"] },

        
        { title: "Como realizar o cadastro?", category: "EduAloca > Autenticação > Credenciais", url: "Page/Autenticacao/credenciais-sistema.html", keywords: ["cadastro", "login", "registrar", "entrar"] },
        { title: "Cadastro Nível Coordenação", category: "EduAloca > Autenticação > Credenciais", url: "Page/Autenticacao/chave-nivel-coordenacao.html", keywords: ["coordenacao", "coordenador", "chave"] },
        { title: "Cadastro Nível Docente", category: "EduAloca > Autenticação > Credenciais", url: "Page/Autenticacao/chave-nivel-docente.html", keywords: ["docente", "professor", "chave"] },
        { title: "Redefinição Segura", category: "EduAloca > Autenticação > Segurança", url: "Page/Autenticacao/redefinicao-segura.html", keywords: ["senha", "redefinir", "trocar"] },
        { title: "Como recuperar a senha?", category: "EduAloca > Autenticação > Segurança", url: "Page/Autenticacao/recuperacao-senha.html", keywords: ["recuperacao", "esqueci", "senha"] },

        { title: "Cadastro de Dados", category: "EduAloca > Gerenciamento > Ações", url: "Page/Gerenciamento/cadastro.html", keywords: ["cadastrar", "novo", "registro"] },
        { title: "Atualização de Registros", category: "EduAloca > Gerenciamento > Ações", url: "Page/Gerenciamento/atualizacao.html", keywords: ["atualizar", "editar", "mudar"] },
        { title: "Exclusão de Dados", category: "EduAloca > Gerenciamento > Ações", url: "Page/Gerenciamento/exclusao.html", keywords: ["excluir", "deletar", "remover"] },
        { title: "Consulta e Filtros", category: "EduAloca > Gerenciamento > Busca", url: "Page/Gerenciamento/consulta-filtro.html", keywords: ["filtro", "buscar", "consultar"] },

        
        { title: "Bloqueio de Calendário", category: "EduAloca > Alocação > Preparação", url: "Page/Alocacao/gerenciar-dias-nao-letivos.html", keywords: ["calendario", "feriado", "bloqueio"] },
        { title: "Geração Automática", category: "EduAloca > Alocação > Processamento", url: "Page/Alocacao/geracao-alocacao.html", keywords: ["gerar", "automatico", "processar"] },
        { title: "Como gerar alocação de docentes", category: "EduAloca > Alocação > Ajustes", url: "Page/Alocacao/alocacao-docentes.html", keywords: ["gerar", "alocação", "docentes"] },
        { title: "Alocação de Salas", category: "EduAloca > Alocação > Distribuição", url: "Page/Alocacao/alocacao-salas.html", keywords: ["salas", "distribuir", "fisica"] },
        { title: "Ajustes Manuais", category: "EduAloca > Alocação > Refino", url: "Page/Alocacao/ajustar-alocacao.html", keywords: ["manuais", "ajustar", "conflitos"] },
        { title: "Homologação", category: "EduAloca > Alocação > Finalização", url: "Page/Alocacao/visualizar-alocacao.html", keywords: ["homologar", "concluir", "visualizar"] },

        
        { title: "Procedimento de Extração", category: "EduAloca > Relatórios > Geração", url: "Page/Relatorios/gerar-relatorios.html", keywords: ["extracao", "gerar", "relatorio"] },
        { title: "Formatos e Distribuição", category: "EduAloca > Relatórios > Exportação", url: "Page/Relatorios/exportar-relatorios.html", keywords: ["pdf", "excel", "csv", "exportar"] },

        
        { title: "Como visualizar e filtrar dúvidas frequentes?", category: "EduAloca > FAQ > Visualização", url: "Page/FAQ/faq-visualizar.html", keywords: ["faq", "duvidas", "perguntas", "filtrar", "ver"] },
        { title: "Como enviar dúvidas?", category: "EduAloca > Suporte > Contato", url: "Page/FAQ/faq-enviar-duvidas.html", keywords: ["suporte", "contato", "enviar", "duvida", "ajuda"] },
        { title: "Como visualizar vídeo tutorial?", category: "EduAloca > Suporte > Vídeos", url: "Page/FAQ/faq-videos.html", keywords: ["videos", "tutorial", "video", "aula", "instrucao"] },
        { title: "Central de Ajuda (FAQ)", category: "EduAloca > Início", url: "Page/FAQ/faq.html", keywords: ["faq", "ajuda", "duvidas", "perguntas"] }
    ];

    const isRoot = !window.location.pathname.includes('/Page/');
    const pathPrefix = isRoot ? '' : '../../';

    const searchInputs = document.querySelectorAll('.hero-search-input, .search-input, .search-mini input');

    searchInputs.forEach(input => {
        const dropdown = document.createElement('div');
        dropdown.className = 'search-results-dropdown';
        dropdown.style.display = 'none'; // Ensure it's hidden initially
        dropdown.innerHTML = `
            <div class="search-results-header">Top articles results</div>
            <div class="search-results-list"></div>
        `;
        input.parentElement.appendChild(dropdown);

        const listContainer = dropdown.querySelector('.search-results-list');

        input.addEventListener('input', () => {
            const term = input.value.toLowerCase().trim();

            if (term.length < 2) {
                dropdown.style.display = 'none';
                return;
            }

            const results = searchIndex.filter(item =>
                item.title.toLowerCase().includes(term) ||
                item.keywords.some(k => k.includes(term))
            ).slice(0, 5);

            if (results.length > 0) {
                renderResults(results, listContainer);
                dropdown.style.display = 'flex';
            } else {
                listContainer.innerHTML = '<div class="search-no-results">Nenhum resultado encontrado.</div>';
                dropdown.style.display = 'flex';
            }
        });

        input.addEventListener('blur', () => {
            setTimeout(() => {
                dropdown.style.display = 'none';
            }, 200);
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const term = input.value.toLowerCase().trim();
                const matched = searchIndex.find(item =>
                    item.title.toLowerCase().includes(term) ||
                    item.keywords.some(k => k.includes(term))
                );
                if (matched) {
                    window.location.href = pathPrefix + matched.url;
                }
            }
        });
    });

    function renderResults(results, container) {
        container.innerHTML = '';
        results.forEach(result => {
            const item = document.createElement('a');
            item.className = 'search-result-item';
            item.href = pathPrefix + result.url;
            item.innerHTML = `
                <span class="search-result-title">${result.title}</span>
                <span class="search-result-category">${result.category}</span>
            `;
            container.appendChild(item);
        });
    }
});
