/* ==========================================
   WEBSOLUTIONS 2026
   SCRIPT.JS PROFISSIONAL
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       ELEMENTOS
    ========================================== */

    const cadastroModal = document.getElementById("cadastroModal");
    const loginModal = document.getElementById("loginModal");

    const btnCadastro = document.getElementById("btnCadastro");
    const btnLogin = document.getElementById("btnLogin");

    const closeCadastro = document.querySelector(".closeCadastro");
    const closeLogin = document.querySelector(".closeLogin");

    const cadastrar = document.getElementById("cadastrar");
    const entrar = document.getElementById("entrar");

    const orcamentoForm = document.getElementById("orcamentoForm");

    const menuMobile = document.getElementById("menu-mobile");
    const menu = document.getElementById("menu");

    /* ==========================================
       MENU MOBILE
    ========================================== */

    if(menuMobile && menu){

        menuMobile.addEventListener("click", () => {

            menu.classList.toggle("active");

        });

    }

    /* ==========================================
       FECHAR MENU AO CLICAR
    ========================================== */

    const linksMenu = document.querySelectorAll(".menu a");

    linksMenu.forEach(link => {

        link.addEventListener("click", () => {

            if(menu){

                menu.classList.remove("active");

            }

        });

    });

    /* ==========================================
       ABRIR MODAIS
    ========================================== */

    if(btnCadastro){

        btnCadastro.addEventListener("click", () => {

            cadastroModal.style.display = "block";

        });

    }

    if(btnLogin){

        btnLogin.addEventListener("click", () => {

            loginModal.style.display = "block";

        });

    }

    /* ==========================================
       FECHAR MODAIS
    ========================================== */

    if(closeCadastro){

        closeCadastro.addEventListener("click", () => {

            cadastroModal.style.display = "none";

        });

    }

    if(closeLogin){

        closeLogin.addEventListener("click", () => {

            loginModal.style.display = "none";

        });

    }

    window.addEventListener("click", (e) => {

        if(cadastroModal && e.target === cadastroModal){

            cadastroModal.style.display = "none";

        }

        if(loginModal && e.target === loginModal){

            loginModal.style.display = "none";

        }

    });

    /* ==========================================
       CADASTRO
    ========================================== */

    if(cadastrar){

        cadastrar.addEventListener("click", () => {

            const nome = document.getElementById("cadNome").value.trim();
            const email = document.getElementById("cadEmail").value.trim();
            const senha = document.getElementById("cadSenha").value.trim();

            if(nome === "" || email === "" || senha === ""){

                alert("Preencha todos os campos.");
                return;

            }

            const utilizador = {

                nome,
                email,
                senha

            };

            localStorage.setItem(
                "websolutionsUser",
                JSON.stringify(utilizador)
            );

            alert("Conta criada com sucesso!");

            cadastroModal.style.display = "none";
            loginModal.style.display = "block";

        });

    }

    /* ==========================================
       LOGIN
    ========================================== */

    if(entrar){

        entrar.addEventListener("click", () => {

            const email =
            document.getElementById("loginEmail").value.trim();

            const senha =
            document.getElementById("loginSenha").value.trim();

            const utilizador = JSON.parse(

                localStorage.getItem(
                    "websolutionsUser"
                )

            );

            if(!utilizador){

                alert("Nenhuma conta encontrada.");
                return;

            }

            if(

                email === utilizador.email &&
                senha === utilizador.senha

            ){

                localStorage.setItem(
                    "loggedIn",
                    "true"
                );

                alert("Login realizado com sucesso!");

                loginModal.style.display = "none";

                atualizarInterface();

            }else{

                alert(
                    "Email ou palavra-passe incorretos."
                );

            }

        });

    }

    /* ==========================================
       LOGOUT
    ========================================== */

    window.logout = function(){

        localStorage.removeItem("loggedIn");

        atualizarInterface();

        alert("Sessão terminada.");

    }

    /* ==========================================
       INTERFACE
    ========================================== */

    function atualizarInterface(){

        const logado =
        localStorage.getItem("loggedIn");

        const utilizador = JSON.parse(

            localStorage.getItem(
                "websolutionsUser"
            )

        );

        const authButtons =
        document.querySelector(".auth-buttons");

        if(!authButtons) return;

        if(logado === "true" && utilizador){

            authButtons.innerHTML = `

                <span style="
                    color:#00CFFF;
                    font-weight:600;
                    margin-right:10px;
                ">
                    Olá, ${utilizador.nome}
                </span>

                <button
                    onclick="logout()"
                    class="btn-cadastro">

                    Sair

                </button>

            `;

        }else{

            authButtons.innerHTML = `

                <button
                    id="btnLogin"
                    class="btn-login">

                    Entrar

                </button>

                <button
                    id="btnCadastro"
                    class="btn-cadastro">

                    Criar Conta

                </button>

            `;

            adicionarEventosBotoes();

        }

    }

    /* ==========================================
       RECRIAR EVENTOS
    ========================================== */

    function adicionarEventosBotoes(){

        const novoBtnLogin =
        document.getElementById("btnLogin");

        const novoBtnCadastro =
        document.getElementById("btnCadastro");

        if(novoBtnLogin){

            novoBtnLogin.addEventListener("click", () => {

                loginModal.style.display = "block";

            });

        }

        if(novoBtnCadastro){

            novoBtnCadastro.addEventListener("click", () => {

                cadastroModal.style.display = "block";

            });

        }

    }

    /* ==========================================
       ORÇAMENTO
    ========================================== */

    if(orcamentoForm){

        orcamentoForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const logado =
            localStorage.getItem("loggedIn");

            if(logado !== "true"){

                alert(
                    "Faça login para solicitar orçamento."
                );

                loginModal.style.display = "block";

                return;

            }

            const nome =
            document.getElementById("nome").value;

            const email =
            document.getElementById("email").value;

            const telefone =
            document.getElementById("telefone").value;

            const tipoProjeto =
            document.getElementById("tipoProjeto").value;

            const descricao =
            document.getElementById("descricao").value;

            const mensagem =

`*NOVO PEDIDO DE ORÇAMENTO*

👤 Nome: ${nome}

📧 Email: ${email}

📱 Telefone: ${telefone}

💻 Projeto: ${tipoProjeto}

📝 Descrição:
${descricao}`;

            const url =

`https://wa.me/258871545619?text=${encodeURIComponent(mensagem)}`;

            window.open(url,"_blank");

            orcamentoForm.reset();

            alert(
                "Pedido enviado com sucesso!"
            );

        });

    }

    /* ==========================================
       BOTÃO HERO
    ========================================== */

    const btnHero =
    document.getElementById(
        "btnOrcamentoHero"
    );

    if(btnHero){

        btnHero.addEventListener("click", () => {

            const logado =
            localStorage.getItem("loggedIn");

            if(logado !== "true"){

                alert(
                    "Faça login para solicitar orçamento."
                );

                loginModal.style.display = "block";

                return;

            }

            const secao =
            document.getElementById(
                "orcamento"
            );

            if(secao){

                secao.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    }

    /* ==========================================
       ANIMAÇÃO AO SCROLL
    ========================================== */

    const elementos =
    document.querySelectorAll(

        ".card, .servico, .projeto"

    );

    const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if(entry.isIntersecting){

                    entry.target.classList.add(
                        "show"
                    );

                }

            });

        },

        {

            threshold:0.2

        }

    );

    elementos.forEach(el => {

        observer.observe(el);

    });

    /* ==========================================
       INICIAR
    ========================================== */

    atualizarInterface();

});

const menuMobile = document.querySelector(".menu-mobile");
const menu = document.querySelector(".menu");

menuMobile.addEventListener("click", () => {
    menu.classList.toggle("active");
});