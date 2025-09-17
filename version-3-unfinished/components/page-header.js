class PageHeader extends HTMLElement {
    static observedAttributes = ["currentPage"]
    #shadowRoot;
    #currentPage;
    #html;
    #css;
    
    constructor(){
        super();
    }

    connectedCallback() {
        this.getData();

        this.#shadowRoot = this.attachShadow({ mode: "open" });
        this.#shadowRoot.innerHTML = this.#html;
        
        const style = document.createElement("style");
        style.textContent = this.#css;
        this.#shadowRoot.appendChild(style);

        this.markCurrentPage();

    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.#currentPage = newValue;
        this.markCurrentPage();
    }

    markCurrentPage() {
        if(this.#shadowRoot && this.#currentPage) {
            this.#shadowRoot.getElementById(this.#currentPage).style.color = "#9c0000";
        }
    }

    async getData() {
        try {
            var html = await fetch("page-header.html");
            var css = await fetch("page-header.css");
            
            if (!(this.#html.ok)) {
                throw new Error(`HTML status: ${this.#html.status}`);
            }
            if (!(this.#css.ok)) {
                throw new Error(`HTML status: ${this.#css.status}`);
            }
            
            this.#html = await html.html();
            this.#css = await css.css();
            console.log(this.#html);
            console.log(this.#css);

        } catch (error) {
            console.error(error.message)
        }
    }

}

customElements.define("page-header", PageHeader);