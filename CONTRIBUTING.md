# Contributing to Ambassador Referral Linker

[English](#english) | [Português](#português)

---

<a id="english"></a>

## English

Thank you for considering contributing to Ambassador Referral Linker.

Contributions of all sizes are welcome, whether you are fixing a bug, improving documentation, adding tests, translating the extension, or proposing a new feature.

## Ways to contribute

You can contribute in many ways:

* Fix bugs
* Improve URL handling
* Add or update supported Microsoft domains
* Improve language-neutral URL handling
* Add or improve tests
* Improve documentation
* Improve translations
* Report bugs
* Suggest new features

## Before you start

Please read the [Code of Conduct](CODE_OF_CONDUCT.md). We expect all contributors to follow it when participating in the project.

For larger changes or new features, consider opening an issue before starting development so the proposed approach can be discussed first.

The repository provides issue forms in both English and Brazilian Portuguese. Blank issues are disabled, so please select the form that best matches your contribution.

## Development setup

### Requirements

* Git
* Node.js 20
* npm
* Google Chrome, Microsoft Edge, or another Chromium-based browser

Fork the repository and clone your fork:

```bash
git clone https://github.com/YOUR-USERNAME/ambassador-referral-linker.git
cd ambassador-referral-linker
```

Install the dependencies:

```bash
npm ci
```

Run the test suite:

```bash
npm test
```

## Running the extension locally

### Google Chrome

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select the `src` directory.

### Microsoft Edge

1. Open `edge://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select the `src` directory.

After making changes to the extension, reload it from the browser's extensions page before testing the updated behavior.

## Running tests

Before submitting a pull request, run:

```bash
npm test
```

All tests must pass before the pull request can be merged.

Changes that introduce or modify behavior should include appropriate tests whenever possible.

## Making changes

Keep changes focused on a single purpose whenever possible.

Avoid including unrelated refactoring, formatting changes, or other modifications in the same pull request.

When changing existing behavior:

* Update or add tests when applicable
* Test the extension locally
* Update the documentation if user-facing behavior changes
* Update localization files when user-facing text changes
* Preserve compatibility with the currently supported Chromium-based browsers

## URL handling changes

Changes to URL processing should include tests whenever possible.

Please test at least the relevant cases below:

* URLs without query parameters
* URLs with existing query parameters
* URLs that already contain `wt.mc_id`
* Language-specific Microsoft URLs
* Language-neutral URLs
* URLs containing fragments
* Unsupported domains

Avoid modifying unrelated URL components such as fragments, query parameters, or paths unless the change specifically requires it.

## Adding or modifying supported Microsoft sites

When adding a new supported domain:

1. Confirm that the domain is owned or operated by Microsoft.
2. Verify that `wt.mc_id` tracking is appropriate for the site.
3. Test URLs both with and without existing query parameters.
4. Test language-specific URLs when applicable.
5. Add or update automated tests when applicable.
6. Update the supported sites list in `README.md` and `README_pt-br.md`.

## Localization

User-facing extension strings should use the localization files under `src/_locales`.

When adding or modifying user-facing text:

* Update the English locale
* Update the Portuguese locale when the same string is available in both languages
* Keep message keys consistent across locales
* Avoid hardcoding user-facing strings directly in JavaScript or HTML when localization can be used

Contributions that add support for additional languages are also welcome.

## Reporting bugs

Bug reports are available in both English and Brazilian Portuguese.

When opening a new issue, select the appropriate form:

* **Bug Report - English**
* **Relatar um Bug - Português (Brasil)**

Before submitting a bug report:

1. Check whether the issue has already been reported.
2. Confirm that you can reproduce it using the latest version of the extension.
3. Include the original URL and generated URL when relevant.
4. Include your browser and extension version.
5. Describe the expected behavior.
6. Describe the actual behavior.
7. Include clear reproduction steps whenever possible.
8. Do not include sensitive information or personal Contributor IDs.

When providing examples, use a placeholder Contributor ID such as:

```text
studentamb_123456
```

Screenshots or short recordings may also be helpful, but make sure they do not contain sensitive information.

## Suggesting features

Feature requests are also available in both languages:

* **Feature Request - English**
* **Sugestão de Funcionalidade - Português (Brasil)**

When suggesting a feature, describe:

* What problem or use case motivated the request
* What the feature would do
* Why it would be useful
* How you expect it to work
* Any alternatives or related solutions you have considered

For larger features, discussing the proposal before implementing it can help avoid duplicated or unnecessary work.

## Submitting a pull request

1. Fork the repository.
2. Create a new branch from `main`.
3. Follow the development setup instructions.
4. Make your changes following the guidelines in this document.
5. Run the test suite.
6. Test the extension locally when applicable.
7. Push the branch to your fork.
8. Open a pull request against the `main` branch.

For example:

```bash
git checkout -b fix/example-change
```

Use a descriptive branch name whenever possible, for example:

```text
fix/url-query-parameters
feat/new-microsoft-domain
docs/update-supported-sites
test/language-neutral-urls
```

### Pull request templates

The default pull request template is in English and is automatically loaded when opening a pull request:

```text
.github/pull_request_template.md
```

A Brazilian Portuguese version is also available at:

```text
.github/PULL_REQUEST_TEMPLATE/pt-br.md
```

If you prefer to submit your pull request in Portuguese, you may use the PT-BR template as the basis for your pull request description.

Regardless of the language used, provide enough information for maintainers to understand, test, and review the change.

Use a descriptive pull request title and clearly explain both **what changed** and **why**.

Whenever possible, keep pull requests small and focused. This makes them easier to review, test, and merge.

## Pull request checklist

Before submitting your pull request, make sure that:

* [ ] The change has a clear and focused purpose.
* [ ] You have reviewed your own changes.
* [ ] Existing tests pass with `npm test`.
* [ ] New or modified behavior includes tests when applicable.
* [ ] The extension was tested locally in a Chromium-based browser when applicable.
* [ ] Documentation was updated if user-facing behavior changed.
* [ ] Localization files were updated if user-facing text changed.
* [ ] The supported sites documentation was updated if a Microsoft domain was added or modified.
* [ ] No sensitive information or personal Contributor IDs are included.
* [ ] No unrelated changes are included in the pull request.
* [ ] The pull request clearly explains what changed and why.

## Commit message guidelines

Use clear and descriptive commit messages.

Short [Conventional Commits](https://www.conventionalcommits.org/) style prefixes are encouraged, but not required.

Examples:

```text
fix: preserve existing URL parameters
docs: update supported Microsoft sites
test: add language-neutral URL cases
feat: add support for a new Microsoft domain
```

Try to keep each commit focused on a logical change.

English commit messages are recommended to keep the project history consistent.

## Code of Conduct

By participating in this project, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

By contributing to this repository, you agree that your contributions will be licensed under the same terms as the project.

See [LICENSE](LICENSE) for details.

---

<a id="português"></a>

## Português

Obrigado por considerar contribuir com o Ambassador Referral Linker.

Contribuições de todos os tamanhos são bem-vindas, seja corrigindo um bug, melhorando a documentação, adicionando testes, traduzindo a extensão ou propondo uma nova funcionalidade.

## Formas de contribuir

Você pode contribuir de diversas maneiras:

* Corrigir bugs
* Melhorar o processamento de URLs
* Adicionar ou atualizar domínios Microsoft suportados
* Melhorar o tratamento de URLs neutras de idioma
* Adicionar ou melhorar testes
* Melhorar a documentação
* Melhorar traduções
* Reportar bugs
* Sugerir novas funcionalidades

## Antes de começar

Leia o [Código de Conduta](CODE_OF_CONDUCT.md). Esperamos que todos os contribuidores sigam essas diretrizes ao participar do projeto.

Para alterações maiores ou novas funcionalidades, considere abrir uma issue antes de iniciar o desenvolvimento para que a abordagem proposta possa ser discutida primeiro.

O repositório oferece formulários de issues em inglês e português do Brasil. Issues em branco estão desativadas, portanto escolha o formulário que melhor corresponde à sua contribuição.

## Configuração do ambiente de desenvolvimento

### Requisitos

* Git
* Node.js 20
* npm
* Google Chrome, Microsoft Edge ou outro navegador baseado em Chromium

Faça um fork do repositório e clone seu fork:

```bash
git clone https://github.com/SEU-USUARIO/ambassador-referral-linker.git
cd ambassador-referral-linker
```

Instale as dependências:

```bash
npm ci
```

Execute os testes:

```bash
npm test
```

## Executando a extensão localmente

### Google Chrome

1. Abra `chrome://extensions`.
2. Ative o **Modo do desenvolvedor**.
3. Clique em **Carregar sem compactação**.
4. Selecione o diretório `src`.

### Microsoft Edge

1. Abra `edge://extensions`.
2. Ative o **Modo de desenvolvedor**.
3. Clique em **Carregar descompactado**.
4. Selecione o diretório `src`.

Após realizar alterações na extensão, recarregue-a pela página de extensões do navegador antes de testar o comportamento atualizado.

## Executando os testes

Antes de enviar um pull request, execute:

```bash
npm test
```

Todos os testes devem ser concluídos com sucesso antes que o pull request possa ser integrado.

Alterações que introduzam ou modifiquem comportamentos devem incluir testes apropriados sempre que possível.

## Fazendo alterações

Mantenha cada alteração focada em um único objetivo sempre que possível.

Evite incluir refatorações, mudanças de formatação ou outras modificações não relacionadas no mesmo pull request.

Ao alterar comportamentos existentes:

* Atualize ou adicione testes quando aplicável
* Teste a extensão localmente
* Atualize a documentação caso o comportamento visível ao usuário seja alterado
* Atualize os arquivos de localização quando textos visíveis ao usuário forem modificados
* Preserve a compatibilidade com os navegadores baseados em Chromium atualmente suportados

## Alterações no processamento de URLs

Alterações no processamento de URLs devem incluir testes sempre que possível.

Teste pelo menos os casos relevantes abaixo:

* URLs sem parâmetros de consulta
* URLs com parâmetros de consulta existentes
* URLs que já contenham `wt.mc_id`
* URLs da Microsoft específicas de idioma
* URLs neutras de idioma
* URLs contendo fragmentos
* Domínios não suportados

Evite modificar componentes não relacionados da URL, como fragmentos, parâmetros de consulta ou caminhos, a menos que a alteração exija especificamente esse comportamento.

## Adicionando ou modificando sites Microsoft suportados

Ao adicionar um novo domínio:

1. Confirme que o domínio pertence ou é operado pela Microsoft.
2. Verifique se o uso de `wt.mc_id` é apropriado para o site.
3. Teste URLs com e sem parâmetros de consulta existentes.
4. Teste URLs específicas de idioma quando aplicável.
5. Adicione ou atualize testes automatizados quando aplicável.
6. Atualize a lista de sites suportados em `README.md` e `README_pt-br.md`.

## Localização e traduções

As strings visíveis ao usuário devem utilizar os arquivos de localização em `src/_locales`.

Ao adicionar ou modificar textos visíveis ao usuário:

* Atualize a localização em inglês
* Atualize a localização em português quando a mesma string estiver disponível nos dois idiomas
* Mantenha as chaves de mensagens consistentes entre as localizações
* Evite inserir strings visíveis ao usuário diretamente em JavaScript ou HTML quando o sistema de localização puder ser utilizado

Contribuições que adicionem suporte a outros idiomas também são bem-vindas.

## Reportando bugs

Os formulários para relato de bugs estão disponíveis em inglês e português do Brasil.

Ao abrir uma nova issue, escolha o formulário apropriado:

* **Bug Report - English**
* **Relatar um Bug - Português (Brasil)**

Antes de enviar um relato de bug:

1. Verifique se o problema já foi reportado.
2. Confirme que consegue reproduzi-lo utilizando a versão mais recente da extensão.
3. Inclua a URL original e a URL gerada quando relevante.
4. Informe a versão do navegador e da extensão.
5. Descreva o comportamento esperado.
6. Descreva o comportamento observado.
7. Inclua etapas claras para reproduzir o problema sempre que possível.
8. Não inclua informações sensíveis nem Contributor IDs pessoais.

Ao fornecer exemplos, utilize um Contributor ID fictício, como:

```text
studentamb_123456
```

Capturas de tela ou pequenas gravações também podem ser úteis, mas certifique-se de que não contenham informações sensíveis.

## Sugerindo funcionalidades

Os formulários para sugestões de funcionalidades também estão disponíveis nos dois idiomas:

* **Feature Request - English**
* **Sugestão de Funcionalidade - Português (Brasil)**

Ao sugerir uma funcionalidade, descreva:

* Qual problema ou caso de uso motivou a sugestão
* O que a funcionalidade faria
* Por que ela seria útil
* Como você espera que ela funcione
* Alternativas ou soluções relacionadas que tenha considerado

Para funcionalidades maiores, discutir a proposta antes da implementação pode ajudar a evitar trabalho duplicado ou desnecessário.

## Enviando um pull request

1. Faça um fork do repositório.
2. Crie uma nova branch a partir de `main`.
3. Siga as instruções de configuração do ambiente de desenvolvimento.
4. Faça suas alterações seguindo as diretrizes deste documento.
5. Execute os testes.
6. Teste a extensão localmente quando aplicável.
7. Envie a branch para seu fork.
8. Abra um pull request direcionado à branch `main`.

Por exemplo:

```bash
git checkout -b fix/exemplo-de-alteracao
```

Utilize nomes de branch descritivos sempre que possível, por exemplo:

```text
fix/url-query-parameters
feat/new-microsoft-domain
docs/update-supported-sites
test/language-neutral-urls
```

### Templates de pull request

O template padrão de pull request está em inglês e é carregado automaticamente ao abrir um novo pull request:

```text
.github/pull_request_template.md
```

Uma versão em português do Brasil também está disponível em:

```text
.github/PULL_REQUEST_TEMPLATE/pt-br.md
```

Se preferir enviar seu pull request em português, você pode utilizar o template PT-BR como base para a descrição do PR.

Independentemente do idioma escolhido, forneça informações suficientes para que os mantenedores possam compreender, testar e revisar a alteração.

Utilize um título descritivo e explique claramente **o que foi alterado** e **por que a alteração foi realizada**.

Sempre que possível, mantenha os pull requests pequenos e focados. Isso facilita a revisão, os testes e a integração das alterações.

## Checklist do pull request

Antes de enviar seu pull request, certifique-se de que:

* [ ] A alteração possui um objetivo claro e específico.
* [ ] Você revisou suas próprias alterações.
* [ ] Os testes existentes passam com `npm test`.
* [ ] Comportamentos novos ou modificados incluem testes quando aplicável.
* [ ] A extensão foi testada localmente em um navegador baseado em Chromium quando aplicável.
* [ ] A documentação foi atualizada caso o comportamento visível ao usuário tenha sido alterado.
* [ ] Os arquivos de localização foram atualizados caso textos visíveis ao usuário tenham sido modificados.
* [ ] A documentação de sites suportados foi atualizada caso um domínio Microsoft tenha sido adicionado ou modificado.
* [ ] Nenhuma informação sensível ou Contributor ID pessoal foi incluído.
* [ ] Nenhuma alteração não relacionada foi incluída no pull request.
* [ ] O pull request explica claramente o que foi alterado e por quê.

## Diretrizes para mensagens de commit

Use mensagens de commit claras e descritivas.

Prefixos curtos no estilo [Conventional Commits](https://www.conventionalcommits.org/) são recomendados, mas não obrigatórios.

Exemplos:

```text
fix: preserve existing URL parameters
docs: update supported Microsoft sites
test: add language-neutral URL cases
feat: add support for a new Microsoft domain
```

Procure manter cada commit focado em uma alteração lógica.

Para manter a consistência no histórico do projeto, recomenda-se utilizar mensagens de commit em inglês.

## Código de Conduta

Ao participar deste projeto, você concorda em seguir o [Código de Conduta](CODE_OF_CONDUCT.md).

## Licença

Ao contribuir com este repositório, você concorda que suas contribuições serão licenciadas sob os mesmos termos do projeto.

Consulte [LICENSE](LICENSE) para mais detalhes.