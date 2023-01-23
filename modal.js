class Modal extends HTMLElement {
    constructor() {
        super();
        this._modalVisible = false;
        this._modal;
        this._color = "#006664";
        this._icon = `
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.40005 13L12.2 17L18.6 9.00005M13 24.2C6.81446 24.2 1.80005 19.1856 1.80005 13C1.80005 6.81446 6.81446 1.80005 13 1.80005C19.1856 1.80005 24.2 6.81446 24.2 13C24.2 19.1856 19.1856 24.2 13 24.2Z" stroke="white" stroke-width="3"/>
            </svg>
        `;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
            .modal {
                display: none; 
                position: fixed; 
                z-index: 1; 
                padding-top: 100px;
                left: 0;
                top: 0;
                width: 100%; 
                height: 100%; 
                overflow: auto; 
                background-color: rgba(0,0,0,0.4); 
            }
            .modal-content {
                position: relative;
                background-color: #FFF;
                max-width: 550px;
                overflow: hidden;
                border-radius: 5px;
                margin: auto;
                padding-bottom: 16px;
                -webkit-animation-name: animatetop;
                -webkit-animation-duration: 0.4s;
                animation-name: animatetop;
                animation-duration: 0.4s
            }
            @media screen and (max-width: 768px) {
                .modal-content {
                    max-width: calc(100% - 24px);
                    margin-left: 12px;
                }
            }
            @keyframes animatetop {
                from {top:-300px; opacity:0}
                to {top:0; opacity:1}
            }
            @-webkit-keyframes animatetop {
                from {top:-300px; opacity:0} 
                to {top:0; opacity:1}
            }
            .modal-header {
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 16px 24px;
                background-color: ${this._color};
                color: white;
            }
            .modal-header-icon {
                width: 24px;
                height: 24px;
                margin-right: 16px;
            }
            .modal-header h4 {
                font-size: 16px;
                font-weight: 700;
                line-height: 20px;
                letter-spacing: 0em;
                text-align: left;
            }
            .modal-body {
                padding: 16px 24px 24px;
            }
            .modal-action {
                position: relative;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                padding: 0 16px;
            }
            .modal-action button {
                font-size: 12px;
                font-weight: 700;
                line-height: 16px;
                letter-spacing: 0em;
                text-align: center;
                padding: 10px 24px;
                border-radius: 5px;
                border: none;
                margin-left: 16px;
                color: #1A2128;
            }
            .modal-action button.primary-button {
                background: ${this._color};
                color: #FFF;
            }
        </style>
        <div class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-header-icon">
                        ${this._icon}
                    </div>
                    <slot name="header"><h1>Dialog Title</h1></slot>
                </div>
                <div class="modal-body">
                    <slot>
                    
                    </slot>
                </div>
                <div class="modal-action">
                    <slot name="action">
                    
                    </slot>
                </div>
            </div>
        </div>
        `
    }

    set color(value) {
        this._color = value;
        this.render();
    }
    set icon(value) {
        this._icon = value;
        this.render();
    }

    connectedCallback() {
        this._modal = this.shadowRoot.querySelector(".modal");
        this.shadowRoot.querySelector(".open").addEventListener('click', this.open.bind(this));
        this.shadowRoot.querySelector(".close").addEventListener('click', this.close.bind(this));
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector(".open").removeEventListener('click', this.open);
        this.shadowRoot.querySelector(".close").removeEventListener('click', this.close);
    }
    open() {
        this._modalVisible = true;
        this._modal.style.display = 'block';
    }
    close() {
        this._modalVisible = false;
        this._modal.style.display = 'none';
    }

    render() {
        this.shadowRoot.querySelector('.modal-header').style.backgroundColor = this._color;
        this.shadowRoot.querySelector('.modal-header-icon').innerHTML = this._icon;
    }

}
customElements.define('jumat-modal', Modal);

class ModalSuccess extends Modal {
    constructor() {
        super();
        this._color = "#006664";
        this._icon = `
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.40005 13L12.2 17L18.6 9.00005M13 24.2C6.81446 24.2 1.80005 19.1856 1.80005 13C1.80005 6.81446 6.81446 1.80005 13 1.80005C19.1856 1.80005 24.2 6.81446 24.2 13C24.2 19.1856 19.1856 24.2 13 24.2Z" stroke="white" stroke-width="3"/>
            </svg>
        `;
        this.render();
    }
}

customElements.define('jumat-modal-success', ModalSuccess);

class ModalAlert extends Modal {
    constructor() {
        super();
        this._color = "#8E601F";
        this._icon = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.76 15.92L15.36 4.4C14.5 2.85 13.31 2 12 2C10.69 2 9.49998 2.85 8.63998 4.4L2.23998 15.92C1.42998 17.39 1.33998 18.8 1.98998 19.91C2.63998 21.02 3.91998 21.63 5.59998 21.63H18.4C20.08 21.63 21.36 21.02 22.01 19.91C22.66 18.8 22.57 17.38 21.76 15.92ZM11.25 9C11.25 8.59 11.59 8.25 12 8.25C12.41 8.25 12.75 8.59 12.75 9V14C12.75 14.41 12.41 14.75 12 14.75C11.59 14.75 11.25 14.41 11.25 14V9ZM12.71 17.71C12.66 17.75 12.61 17.79 12.56 17.83C12.5 17.87 12.44 17.9 12.38 17.92C12.32 17.95 12.26 17.97 12.19 17.98C12.13 17.99 12.06 18 12 18C11.94 18 11.87 17.99 11.8 17.98C11.74 17.97 11.68 17.95 11.62 17.92C11.56 17.9 11.5 17.87 11.44 17.83C11.39 17.79 11.34 17.75 11.29 17.71C11.11 17.52 11 17.26 11 17C11 16.74 11.11 16.48 11.29 16.29C11.34 16.25 11.39 16.21 11.44 16.17C11.5 16.13 11.56 16.1 11.62 16.08C11.68 16.05 11.74 16.03 11.8 16.02C11.93 15.99 12.07 15.99 12.19 16.02C12.26 16.03 12.32 16.05 12.38 16.08C12.44 16.1 12.5 16.13 12.56 16.17C12.61 16.21 12.66 16.25 12.71 16.29C12.89 16.48 13 16.74 13 17C13 17.26 12.89 17.52 12.71 17.71Z" fill="white"/>
            </svg>
        `;
        this.render();
    }
}

customElements.define('jumat-modal-alert', ModalAlert);

class ModalInfo extends Modal {
    constructor() {
        super();
        this._color = "#0264AD";
        this._icon = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM11.2 7.99998V6.38398H12.8V7.99998H11.2ZM12.8 11.2V16H14.4V17.6H9.6V16H11.2V12.8H9.6V11.2H12.8Z" fill="white"/>
            </svg>
        `;
        this.render();
    }
}

customElements.define('jumat-modal-info', ModalInfo);

class ModalDanger extends Modal {
    constructor() {
        super();
        this._color = "#A74032";
        this._icon = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM6.97909 6.97909C7.39565 6.56253 8.07102 6.56253 8.48758 6.97909L12 10.4915L15.5124 6.97909C15.929 6.56253 16.6044 6.56253 17.0209 6.97909C17.4375 7.39565 17.4375 8.07102 17.0209 8.48758L13.5085 12L17.0209 15.5124C17.4375 15.929 17.4375 16.6044 17.0209 17.0209C16.6044 17.4375 15.929 17.4375 15.5124 17.0209L12 13.5085L8.48758 17.0209C8.07102 17.4375 7.39565 17.4375 6.97909 17.0209C6.56253 16.6044 6.56253 15.929 6.97909 15.5124L10.4915 12L6.97909 8.48758C6.56253 8.07102 6.56253 7.39565 6.97909 6.97909Z" fill="white"/>
            </svg>
        `;
        this.render();
    }
}

customElements.define('jumat-modal-danger', ModalDanger);