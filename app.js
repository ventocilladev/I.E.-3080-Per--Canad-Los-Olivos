/* =========================================================
   LA NAVEGACIÓN
   ========================================================= */

function showSection(sectionId, clickedButton = null) {

    // Ocultar todas las secciones
    const sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.remove("active-section");
    });


    // Mostrar sección seleccionada
    const selectedSection = document.getElementById(sectionId);

    if (selectedSection) {
        selectedSection.classList.add("active-section");
    }


    // Cambiar botón activo
    const menuButtons = document.querySelectorAll(".menu-item");

    menuButtons.forEach(button => {
        button.classList.remove("active");
    });


    if (clickedButton) {
        clickedButton.classList.add("active");
    } else {

        menuButtons.forEach(button => {

            const onclickValue = button.getAttribute("onclick");

            if (
                onclickValue &&
                onclickValue.includes(`'${sectionId}'`)
            ) {
                button.classList.add("active");
            }

        });

    }


    // Cerrar sidebar en celular
    const sidebar = document.querySelector(".sidebar");

    if (window.innerWidth <= 800) {
        sidebar.classList.remove("open");
    }


    // Regresar arriba
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   SIDEBAR MOBILE
   ========================================================= */

function toggleSidebar() {

    const sidebar = document.querySelector(".sidebar");

    sidebar.classList.toggle("open");

}


/* =========================================================
   MODAL
   ========================================================= */

function openModal() {

    const modal = document.getElementById("modal");

    modal.classList.add("show");

}


function closeModal() {

    const modal = document.getElementById("modal");

    modal.classList.remove("show");

}


/* Cerrar modal haciendo clic fuera */

document.getElementById("modal").addEventListener("click", function(event) {

    if (event.target === this) {
        closeModal();
    }

});


/* =========================================================
   REGISTRAR ESTUDIANTE
   ========================================================= */

function saveStudent(event) {

    event.preventDefault();


    const name = document.getElementById("newName").value.trim();


    if (!name) {
        return;
    }


    // Crear iniciales
    const words = name.split(" ");

    let initials = "";

    if (words.length >= 2) {

        initials =
            words[0].charAt(0) +
            words[1].charAt(0);

    } else {

        initials = words[0].substring(0, 2);

    }


    initials = initials.toUpperCase();


    // Crear fila
    const tableBody = document.querySelector("#studentTable tbody");

    const row = document.createElement("tr");

    row.innerHTML = `

        <td>

            <div class="person">

                <div class="person-avatar">
                    ${initials}
                </div>

                <div>

                    <strong>
                        ${name}
                    </strong>

                    <span>
                        Nuevo estudiante
                    </span>

                </div>

            </div>

        </td>

        <td>
            Pendiente
        </td>

        <td>
            Primaria
        </td>

        <td>
            5.º
        </td>

        <td>
            A
        </td>

        <td>
            <span class="status active">
                Activo
            </span>
        </td>

        <td>
            <button class="more">
                ⋮
            </button>
        </td>

    `;


    tableBody.prepend(row);


    // Cerrar modal
    closeModal();


    // Limpiar formulario
    document.querySelector("#modal form").reset();


    // Mostrar estudiantes
    showSection("estudiantes");


    // Notificación
    showNotification(
        "Estudiante registrado correctamente"
    );

}


/* =========================================================
   BUSCADOR DE ESTUDIANTES
   ========================================================= */

function filterStudents() {

    const input =
        document
            .getElementById("studentSearch")
            .value
            .toLowerCase();


    const rows =
        document.querySelectorAll(
            "#studentTable tbody tr"
        );


    rows.forEach(row => {

        const text =
            row.textContent.toLowerCase();


        if (text.includes(input)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}


/* =========================================================
   BUSCADOR GLOBAL
   ========================================================= */

function globalSearch() {

    const input =
        document
            .getElementById("globalSearch")
            .value
            .toLowerCase()
            .trim();


    if (input.length < 2) {
        return;
    }


    const studentsSection =
        document.getElementById("estudiantes");


    const studentRows =
        document.querySelectorAll(
            "#studentTable tbody tr"
        );


    let found = false;


    studentRows.forEach(row => {

        const text =
            row.textContent.toLowerCase();


        if (text.includes(input)) {

            found = true;

        }

    });


    if (found) {

        showSection("estudiantes");

        document.getElementById(
            "studentSearch"
        ).value = input;

        filterStudents();

    }

}


/* =========================================================
   NOTIFICACIONES
   ========================================================= */

function showNotification(message) {

    const notification =
        document.createElement("div");


    notification.style.position = "fixed";
    notification.style.bottom = "25px";
    notification.style.right = "25px";
    notification.style.background = "#111827";
    notification.style.color = "white";
    notification.style.padding = "13px 18px";
    notification.style.borderRadius = "8px";
    notification.style.fontSize = "11px";
    notification.style.fontWeight = "600";
    notification.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.2)";
    notification.style.zIndex = "9999";


    notification.textContent = "✓ " + message;


    document.body.appendChild(notification);


    setTimeout(() => {

        notification.style.opacity = "0";
        notification.style.transform =
            "translateY(10px)";

        notification.style.transition =
            ".3s";


        setTimeout(() => {

            notification.remove();

        }, 300);

    }, 2500);

}


/* =========================================================
   GRAFICO DE ESTUDIANTES
   ========================================================= */

const studentsCanvas =
    document.getElementById("studentsChart");


if (studentsCanvas) {

    new Chart(
        studentsCanvas,
        {

            type: "doughnut",

            data: {

                labels: [
                    "Inicial",
                    "Primaria",
                    "Secundaria"
                ],

                datasets: [

                    {
                        data: [
                            96,
                            521,
                            445
                        ],

                        borderWidth: 0,

                        backgroundColor: [
                            "#8b5cf6",
                            "#2563eb",
                            "#14b8a6"
                        ]
                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                cutout: "72%",

                plugins: {

                    legend: {

                        position: "bottom",

                        labels: {

                            boxWidth: 10,

                            padding: 15,

                            font: {
                                size: 9
                            }

                        }

                    }

                }

            }

        }

    );

}


/* =========================================================
   GRAFICO DE ASISTENCIA
   ========================================================= */

const attendanceCanvas =
    document.getElementById("attendanceChart");


if (attendanceCanvas) {

    new Chart(
        attendanceCanvas,
        {

            type: "line",

            data: {

                labels: [
                    "Mar",
                    "Abr",
                    "May",
                    "Jun",
                    "Jul",
                    "Ago"
                ],

                datasets: [

                    {
                        label: "Asistencia",

                        data: [
                            92.1,
                            93.4,
                            94.1,
                            93.7,
                            95.2,
                            94.7
                        ],

                        borderColor: "#2563eb",

                        backgroundColor:
                            "rgba(37,99,235,.08)",

                        fill: true,

                        tension: .4,

                        pointRadius: 3,

                        pointBackgroundColor:
                            "#2563eb"

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                },

                scales: {

                    y: {

                        min: 85,

                        max: 100,

                        ticks: {
                            font: {
                                size: 9
                            }
                        },

                        grid: {
                            color: "#f3f4f6"
                        }

                    },

                    x: {

                        ticks: {
                            font: {
                                size: 9
                            }
                        },

                        grid: {
                            display: false
                        }

                    }

                }

            }

        }

    );

}


/* =========================================================
   RELOJ / FECHA
   ========================================================= */

function updateDate() {

    const date = new Date();


    const options = {
        day: "2-digit",
        month: "long",
        year: "numeric"
    };


    console.log(
        date.toLocaleDateString(
            "es-PE",
            options
        )
    );

}


updateDate();


/* =========================================================
   CARGA INICIAL
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        showSection("dashboard");

        console.log(
            "EduGest 3080 iniciado correctamente."
        );

    }
);
