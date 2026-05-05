document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.edu-nav-item.open .edu-nav-sublist').forEach(sublist => {
        sublist.style.maxHeight = sublist.scrollHeight + 'px';
    });

    inicializarSumario();
    });



function inicializarSumario() {
    const tocList = document.querySelector('.edu-toc-list');
    const mainContent = document.querySelector('.edu-main-content');
    const sidebarRight = document.querySelector('.edu-sidebar-right');

    if (!tocList || !mainContent || !sidebarRight) return;

    const headings = mainContent.querySelectorAll('h2, h3');

    if (headings.length === 0) {
        sidebarRight.style.display = 'none';
        return;
    }

    const tocTitle = document.createElement('div');
    tocTitle.className = 'edu-toc-title';
    tocTitle.textContent = 'NESTA PÁGINA';
    tocList.before(tocTitle);

    headings.forEach((heading) => {
        if (!heading.id) {
            heading.id = heading.textContent.toLowerCase().trim()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, '') 
                .replace(/\s+/g, '-')
                .replace(/[^\w-]+/g, '');
        }

        const li = document.createElement('li');
        li.className = `edu-toc-item edu-toc-${heading.tagName.toLowerCase()}`;

        const a = document.createElement('a');
        a.href = `#${heading.id}`;
        a.className = 'edu-toc-link';
        a.textContent = heading.textContent;

        li.appendChild(a);
        tocList.appendChild(li);
    });
}


function alternarNavegacao(event, element) {
    const parent = element.parentElement;
    const sublist = parent.querySelector('.edu-nav-sublist');

    if (sublist) {
        const isOpen = parent.classList.contains('open');
        const currentPath = window.location.pathname;
        const targetHref = element.getAttribute('href');
        const targetFile = targetHref.split('/').pop();

       
        if (currentPath.endsWith(targetFile)) {
            event.preventDefault();

            if (isOpen) {
                parent.classList.remove('open');
                sublist.style.maxHeight = '0px';
            } else {
                document.querySelectorAll('.edu-nav-item.open').forEach(item => {
                    if (item !== parent) {
                        item.classList.remove('open');
                        const otherSublist = item.querySelector('.edu-nav-sublist');
                        if (otherSublist) otherSublist.style.maxHeight = '0px';
                    }
                });

                parent.classList.add('open');
                sublist.style.maxHeight = sublist.scrollHeight + 'px';
            }
        } else {
            parent.classList.add('open');
        }
    }
}
