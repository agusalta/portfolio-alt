var Typer = {
    text: '',
    accessCountimer: null,
    index: 0,
    speed: 2,
    file: '',
    accessCount: 0,
    deniedCount: 0,
    init: function () {
        accessCountimer = setInterval(function () {
            Typer.updLstChr();
        }, 500);
        $.get(Typer.file, function (data) {
            Typer.text = data;
            Typer.text = Typer.text.slice(0, Typer.text.length - 1);
        });
    },

    content: function () {
        return $('#console').html();
    },

    write: function (str) {
        $('#console').append(str);
        return false;
    },

    addText: function (key) {
        if (key.key == 18) {
            Typer.accessCount++;

            if (Typer.accessCount >= 3) {
                Typer.makeAccess();
            }
        } else if (key.key == 20) {
            Typer.deniedCount++;

            if (Typer.deniedCount >= 3) {
                Typer.makeDenied();
            }
        } else if (key.key == 27) {
            Typer.hidepop();
        } else if (Typer.text) {
            var cont = Typer.content();
            if (cont.substring(cont.length - 1, cont.length) == '|')
                $('#console').html(
                    $('#console')
                        .html()
                        .substring(0, cont.length - 1),
                );
            if (key.key != 8) {
                Typer.index += Typer.speed;
            } else {
                if (Typer.index > 0) Typer.index -= Typer.speed;
            }
            var text = Typer.text.substring(0, Typer.index);
            var rtn = new RegExp('\n', 'g');

            $('#console').html(text.replace(rtn, '<br/>'));
            window.scrollBy(0, 50);
        }

        if (key.preventDefault && key.key != 122) {
            key.preventDefault();
        }

        if (key.key != 122) {
            key.returnValue = false;
        }
    },

    updLstChr: function () {
        var cont = this.content();
        if (cont.substring(cont.length - 1, cont.length) == '|') {
            this.write('');
        }
    }


};

function replaceUrls(text) {
    var http = text.indexOf('http://');
    var space = text.indexOf('.me ', http);

    if (space != -1) {
        var url = text.slice(http, space - 1);
        return text.replace(url, '<a href="' + url + '">' + url + '</a>');
    } else {
        return text;
    }
}


Typer.speed = 3;
Typer.file = 'agus.txt';
Typer.init();

var timer = setInterval('t();', 30);
function t() {
    Typer.addText({ key: 123748 });

    if (Typer.index > Typer.text.length) {
        clearInterval(timer);
    }

}

document.onkeydown = function (e) {
    if (e.key == 27) {
        Typer.index = Typer.text.length;
    }
}

// 

const input = document.getElementById("terminal");
const span = document.getElementById("code");
let godmode = false;

document.getElementById("abc").classList.add("hidden");

function showABC() {
    document.getElementById("abc").classList.remove("hidden");
    input.classList.add("highlight");

    setTimeout(() => {
        input.classList.remove("highlight");
    }, 15000);
}

setTimeout(showABC, 16500);

let listaDeDirectorios = [];

input.addEventListener("keydown", function (event) {
    const intext = input.value.trim().toLowerCase();


    switch (intext) {
        case "clear":
            if (span) {
                const consoleElement = document.getElementById("console");
                if (consoleElement) {
                    consoleElement.style.display = "none";
                    input.value = " ";
                }
            }
            break;

        case "cat agus.txt":
            if (span) {
                const consoleElement = document.getElementById("console");
                if (consoleElement && consoleElement.style.display === "none") {
                    consoleElement.style.display = "block";
                    input.value = "";
                }
            }
            break;
        case "help":
            if (span) {
                let commands = [
                    { command: "CLEAR", description: "limpia la consola" },
                    { command: "HELP", description: "muestra los comandos disponibles" },
                    { command: "CONTACT", description: "ponerse en contacto conmigo" },
                    { command: "ABOUT", description: "saber más sobre mí" },
                    { command: "SKILLS", description: "ver mis habilidades" },
                    { command: "EDUCATION", description: "ver mi educación" },
                    { command: "PROJECTS", description: "ver mis proyectos" },
                    { command: "CAT AGUS.TXT", description: "mostrar .txt" },
                    { command: "PHOTO", description: "mostrar una foto mía" },

                ];

                commands.forEach(({ command, description }) => {
                    const listItem = document.createElement("div");
                    listItem.textContent = command + " - " + description;
                    span.appendChild(listItem);
                });

                const pitem = document.createElement("p");
                span.appendChild(pitem);
                pitem.textContent = "Hay muchos comandos ocultos ☺";
                pitem.style.color = "red";
                input.value = " ";
            }

            break;

        case "contact":
            if (span) {
                let contacts = [
                    { com: "LINKEDIN", URL: "https://t.ly/hz8jJ" },
                    { com: "CORREO", URL: "mailto:agusalta002@gmail.com" },
                    { com: "GITHUB", URL: "https://github.com/agusalta" },
                    { com: "TELEFONO", URL: "tel:+5491132405674" },
                ];

                contacts.forEach(({ com, URL }) => {
                    const listItem = document.createElement("div");
                    const link = document.createElement("a");
                    link.href = URL;
                    link.textContent = com;
                    link.target = "_blank";
                    listItem.appendChild(link);
                    span.appendChild(listItem);
                });

                input.value = " ";
            }
            break;

        case "about":
            if (span) {
                let about = [
                    { fact: "NOMBRE", description: "Agustín" },
                    { fact: "APELLIDO", description: "Altamirano" },
                    { fact: "EDAD", description: "21" },
                    { fact: "HOBBIE", description: "Escritura" },
                    { fact: "FAV_COLOR", description: "Naranja" },
                ];

                about.forEach(({ fact, description }) => {
                    const listItem = document.createElement("div");
                    listItem.textContent = fact + ": " + description;

                    span.appendChild(listItem);
                });

                input.value = " ";
            }
            break;

        case "skills":
            if (span) {
                let skills = [
                    { area: "WEB", language: "HTML, CSS, JAVASCRIPT" },
                    { area: "FRONTEND", language: "REACT, .NET" },
                    { area: "BACKEND", language: "NODEJS, JAVA, C#" },
                    { area: "DATABASE", language: "SQL, MONGODB" },
                    { area: "MISCELLANEOUS", language: "MATERIALUI, SCSS, ASTRO" },
                ];

                skills.forEach(({ area, language }) => {
                    const listItem = document.createElement("div");
                    listItem.textContent = area + ": " + language;

                    span.appendChild(listItem);
                });

                input.value = " ";
            }
            break;

        case "education":
            if (span) {
                let education = [
                    {
                        institute: "COLEGIO MALLINCKRODT",
                        degree: "Bachiller en Ciencias Sociales ",
                        time: "En 2008/En 2020",
                    },
                    {
                        institute: "CODERHOUSE",
                        degree: "Certificado en Desarrollo Web",
                        time: "38 horas totales",
                    },
                    {
                        institute: "UTN",
                        degree: "Desarrollo con ReactJs",
                        time: "105 horas totales",
                    },
                    {
                        institute: "UTN",
                        degree: "Desarrollo con NodeJs",
                        time: "45 horas totales",
                    },
                    {
                        institute: "ORT",
                        degree: "Analista de sistemas",
                        time: "En 2023/Dic 2024",
                    },
                ];

                education.forEach(({ institute, degree, time }) => {
                    const listItem = document.createElement("div");
                    listItem.textContent = institute + " - " + degree + " - " + time;

                    span.appendChild(listItem);
                });

                input.value = " ";
            }
            break;

        case "projects":
            if (span) {
                let projects = [
                    {
                        name: "Calculadora de tubos de cobre",
                        company: "Copper Development Association Inc.",
                        time: "2 Meses",
                        preview: "https://t.ly/Ly3EW",
                    },
                ];

                const listContainer = document.createElement("div");
                listContainer.style.display = "grid";
                listContainer.style.gridTemplateColumns = "repeat(2, 1fr)";
                listContainer.style.gap = "10px";

                projects.forEach(({ name, company, time, preview }) => {
                    const listItem = document.createElement("div");
                    listItem.style.padding = "10px";
                    listItem.innerHTML = `
              <p><strong>Nombre:</strong> ${name}</p>
              <p><strong>Compañía:</strong> ${company}</p>
              <p><strong>Tiempo:</strong> ${time}</p>
              <p><strong>Preview:</strong> <a href="${preview}" target="_blank">${preview}</a></p>
            `;

                    listContainer.appendChild(listItem);
                });

                span.appendChild(listContainer);
                input.value = " ";
            }
            break;

        case "god":
            if (span) {
                if (!godmode) {
                    span.textContent = "godmode ON";
                    godmode = true;
                } else {
                    span.textContent = "godmode OFF";
                    godmode = false;
                }
                input.value = " ";
            }
            break;
        case "photo":
            if (span) {
                const photo = document.createElement("img");
                photo.src = "yo.png";
                span.appendChild(photo);
                input.value = "";
            }
            break;

        default:
            if (span) {
                span.innerText = "";
            }

            if (intext.startsWith("mkdir")) {
                input.addEventListener("keypress", function (event) {
                    if (event.key === 'Enter') {
                        const nuevoDirectorio = input.value.substring(6).trim();

                        if (nuevoDirectorio) {
                            span.textContent = `Directorio creado: ${nuevoDirectorio}`;
                            listaDeDirectorios.push(nuevoDirectorio);
                            input.value = "";
                        }
                    }
                });
            } else if (intext.startsWith("rm")) {
                const eliminarDirectorio = intext.substring(3).trim();

                input.addEventListener("keypress", function (event) {
                    if (event.key === 'Enter') {
                        if (eliminarDirectorio) {
                            span.textContent = `Directorio eliminado: ${eliminarDirectorio}`;
                            const indice = listaDeDirectorios.indexOf(eliminarDirectorio);

                            if (indice !== -1) {
                                listaDeDirectorios.splice(indice, 1);
                            }
                            input.value = "";
                        }
                    }
                });

                listaDeDirectorios.forEach(nombre => {
                    const div = document.createElement("div");
                    div.textContent = nombre;
                    span.appendChild(div);
                });
            } else if (intext.startsWith("ls")) {
                span.innerHTML = "";
                listaDeDirectorios.forEach(nombre => {
                    const div = document.createElement("div");
                    div.textContent = nombre;
                    span.appendChild(div);
                });

                input.value = "";
            }


            if (intext.includes("cd")) {
                span.textContent = "cd: No such file or directory: /directorio/no/existente";
                input.value = "";
            }

            if (intext.includes("sudo")) {
                span.textContent = "echo '¡Che! ¡Mirá quién se hace el pillo usando sudo!'";
                input.value = "";
            }

            break;
    }
});




