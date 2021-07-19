function padronizarForm(){
    const form = window.document.querySelector(`.form`);
    form.addEventListener(`submit`,function (event){
        event.preventDefault();
    });
}

padronizarForm();

function ValidaCPF(cpfEnviado) {
    Object.defineProperty(this, 'cpfLimpo', {
        enumerable: true,
        get: function() {
            return cpfEnviado.replace(/\D+/g, '');
        }
    });
}

ValidaCPF.prototype.valida = function() {
    if(typeof this.cpfLimpo === 'undefined') return false;
    if(this.cpfLimpo.length !== 11) return false;
    if(this.isSequencia()) return false;

    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial + digito1);

    const novoCpf = cpfParcial + digito1 + digito2;
    return novoCpf === this.cpfLimpo;
};

ValidaCPF.prototype.criaDigito = function(cpfParcial) {
    const cpfArray = Array.from(cpfParcial);

    let regressivo = cpfArray.length + 1;
    const total = cpfArray.reduce((ac, val) => {
        ac += (regressivo * Number(val));
        regressivo--;
        return ac;
    }, 0);

    const digito = 11 - (total % 11);
    return digito > 9 ? '0' : String(digito);
};

ValidaCPF.prototype.isSequencia = function() {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;
};

function validar() {
    const campo = document.querySelector(`input`);
    const h31 = document.querySelector(`.h31`);
    const h32 = document.querySelector(`.h32`);
    const cpf = new ValidaCPF(campo.value);
    if (cpf.valida()) {
        h31.style.display = `block`;
        h32.style.display = `none`;
    } else {
        h31.style.display = `none`;
        h32.style.display = `block`;
    }
}

/*const cpf = new ValidaCPF('070.987.720-03');

if(cpf.valida()) {
    console.log('Cpf válido');
} else {
    console.log('Cpf inválido');
}*/
