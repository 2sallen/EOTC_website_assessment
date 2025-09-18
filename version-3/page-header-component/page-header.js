class PageHeader extends HTMLElement {
    static observedAttributes = ["current-page"]
    #shadowRoot;
    #currentPage;
    #html;
    #css;
    
    constructor(){
        super();
    }

    async connectedCallback() {
        await this.getData();


        this.#shadowRoot = this.attachShadow({ mode: "open" });
        this.#shadowRoot.innerHTML = this.#html;

        this.#shadowRoot.getElementById("page-title").innerHTML = this.#currentPage;

        const style = document.createElement("style");
        style.textContent = this.#css;

        if(this.#currentPage == "adrenalin forest &\nte rauparaha arena") {
            this.#shadowRoot.getElementById("page-title").parentNode.classList.add("long-title");
        }

        this.#shadowRoot.appendChild(style);

        this.markCurrentPage();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.#currentPage = newValue;
        this.markCurrentPage();
    }

    markCurrentPage() {
        if(this.#shadowRoot && this.#currentPage) {
            var div = this.#shadowRoot.getElementById(this.#currentPage);
            div.style.color = "#E44B4B";
            
            if(div.parentNode.className == "dropdown-menu") {
                div.parentNode.parentNode.style.color = "#E44B4B";
            }
        }
    }

    async getData() {
        try {
            var html = await fetch("page-header-component/page-header.html");
            var css = await fetch("page-header-component/page-header.css");
            
            if (!html.ok) {
                throw new Error(`HTML status: ${html.status}`);
            }
            if (!css.ok) {
                throw new Error(`HTML status: ${css.status}`);
            }
            
            this.#html = await html.text();
            this.#css = await css.text();

        } catch (error) {
            console.error(error.message)
        }
    }

    toggleDropdown() {
        var div = this.#shadowRoot.getElementById("dropdown-menu");
        if(div.style.display != "block") {
            div.style.display = "block";
        } else {
            div.style.display = "none";
        }
    }
}

customElements.define("page-header", PageHeader);