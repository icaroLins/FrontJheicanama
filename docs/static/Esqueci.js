form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    if (!email) {
        messageBox.textContent = "Por favor, insira seu e-mail.";
        messageBox.style.color = "red";
        return;
    }

    try {
        const url = "https://jheicanama-production.up.railway.app/api/password/forgot";
        console.log('Solicitando:', url);
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            messageBox.textContent = "Se o e-mail estiver cadastrado, você receberá instruções para redefinir a senha.";
            messageBox.style.color = "green";
            form.reset();
        } else {
            const text = await response.text();
            messageBox.textContent = `Erro ao enviar e-mail: ${response.status} ${text || ''}`;
            messageBox.style.color = "red";
        }
    } catch (error) {
        console.error("Erro:", error);
        messageBox.textContent = "Erro ao conectar com o servidor.";
        messageBox.style.color = "red";
    }
});
