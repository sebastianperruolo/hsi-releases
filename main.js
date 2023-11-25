(function (customElements) {
  const STYLES = `
  <style>
    .web-components {
      border: 4px dashed rgba(232, 255, 146, 0.72);
      background-color: rgba(232, 255, 146, 0.05);
    }
    .web-component iframe {
      border: 0;
      width: 100%;
      height: 100%;
      min-height: 16000px;
    }
  </style>`;

  const addEventListenerToIframe = (iframe) => {
    iframe.addEventListener('load', function () {
      console.log('El iframe se ha cargado correctamente.');
      // Aquí puedes realizar acciones adicionales una vez que el iframe se haya cargado
      // Acceder al contenido del iframe una vez que se ha cargado
    });

    // Añade un listener para el evento 'error' del iframe
    iframe.addEventListener('error', function (event) {
      console.log('Ha ocurrido un error al cargar el iframe:', event);
      // Puedes manejar el error o realizar acciones adicionales en caso de que falle la carga del iframe
    });
  };

  const createTemplate = ({
    iframeSrc,
  }) => {
    const template = document.createElement('template');
    template.innerHTML = `
          ${STYLES}
          <div class="web-component">
            <iframe src="${iframeSrc}"></iframe>
          </div>
      `;

    return template;
  };

  class HSIReleases extends HTMLElement {
    connectedCallback() {
      const template = createTemplate({
        iframeSrc: 'https://hsi.pladema.net/blog/',
      });
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      const iframe = this.shadowRoot.querySelector('iframe');
      addEventListenerToIframe(iframe);
    }
  }

  // define el web-component
  customElements.define('hsi-releases', HSIReleases);
})(window.customElements);
