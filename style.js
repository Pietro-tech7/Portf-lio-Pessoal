console.log('style.js carregado');
const githubUsername = 'Pietro-tech7'; 
const __jsStatusEl = document.getElementById('js-status');
if (__jsStatusEl) {
  __jsStatusEl.textContent = 'JS carregado';
  __jsStatusEl.classList.add('loaded');
}
const reposUrl = `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`;

const statusElement = document.getElementById('github-status');
const reposElement = document.getElementById('github-repos');

async function loadGitHubProjects() {
  try {
    const response = await fetch(reposUrl);
    if (!response.ok) {
      throw new Error('Usuário GitHub não encontrado');
    }

    const repos = await response.json();

    if (repos.length === 0) {
      statusElement.textContent = 'Nenhum repositório público encontrado.';
      return;
    }

    statusElement.textContent = 'Meus projetos mais recentes no GitHub:';
    reposElement.innerHTML = repos
      .map(repo => `
        <li class="github-card">
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
            ${repo.name}
          </a>
          <p>${repo.description || 'Sem descrição disponível.'}</p>
          <p> ${repo.stargazers_count} • Atualizado em ${new Date(repo.updated_at).toLocaleDateString('pt-BR')}</p>
        </li>
      `)
      .join('');
  } catch (error) {
    statusElement.textContent = 'Erro ao carregar projetos do GitHub.';
    reposElement.innerHTML = `<li class="github-card">${error.message}</li>`;
    console.error(error);
  }
}

loadGitHubProjects();