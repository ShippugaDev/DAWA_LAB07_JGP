document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const user = {
        name: document.getElementById('name').value,
        lastName: document.getElementById('lastName').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        birthdate: document.getElementById('birthdate').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        url_profile: document.getElementById('url_profile').value,
        address: document.getElementById('address').value
    };

    const response = await fetch('/api/auth/signUp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    const data = await response.json();

    if (!response.ok) {
        document.getElementById('error').innerText = data.message || 'Error al registrar usuario';
        document.getElementById('success').innerText = '';
        return;
    }

    document.getElementById('success').innerText = 'Usuario registrado correctamente. Redirigiendo al login...';
    document.getElementById('error').innerText = '';

    setTimeout(() => {
        window.location.href = '/signIn';
    }, 1500);
});