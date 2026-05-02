document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/auth/signIn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
        document.getElementById('error').innerText = data.message || 'Error al iniciar sesión';
        return;
    }

    sessionStorage.setItem('token', data.token);

    if (data.roles.includes('admin')) {
        window.location.href = '/dashboard/admin';
    } else {
        window.location.href = '/dashboard/user';
    }
});