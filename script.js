const textInput = document.getElementById("textInput");
const sizeSelect = document.getElementById("sizeSelect");
const generateBtn = document.getElementById("generateBtn");
const qrContainer = document.getElementById("qrContainer");
const downloadBtn = document.getElementById("downloadBtn");
const colorDarkEl = document.getElementById("colorDark");
const colorLightEl = document.getElementById("colorLight");

let qrCode = null;

generateBtn.addEventListener("click", generateQRCode);

textInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        generateQRCode();
    }
});

downloadBtn.addEventListener("click", downloadQRCode);

function generateQRCode() {
    const text = textInput.value.trim();

    if (text === "") {
        alert("Por favor, ingrese un texto o URL");
        return;
    }

    const size = parseInt(sizeSelect.value);
    qrContainer.innerHTML = "";

    const colorDark = colorDarkEl.value;
    const colorLight = colorLightEl.value;

    qrCode = new QRCode(qrContainer, {
        text: text,
        width: size,
        height: size,
        colorDark: colorDark,
        colorLight: colorLight,
        correctLevel: QRCode.CorrectLevel.H,
    });
    downloadBtn.style.display = "block";
    console.log("codigo qr generado exitosamente");
}

function downloadQRCode() {
    const canvas = qrContainer.querySelector("canvas");
    if (!canvas) {
        alert("Primero debe generar un codigo QR");
        return;
    }

    const imageUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = imageUrl;
    downloadLink.download = "codigo-qr.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
