const DEFAULT_PROFILE_IMAGE = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

let currentRoles = [];
let currentUser = null;

function getValidProfileImage(url) {
    if (!url || url.trim() === '') {
        return DEFAULT_PROFILE_IMAGE;
    }

    return url.trim();
}

function logout() {
    sessionStorage.removeItem('token');
    window.location.href = '/signIn';
}

function goDashboard() {
    if (currentRoles.includes('admin')) {
        window.location.href = '/dashboard/admin';
    } else {
        window.location.href = '/dashboard/user';
    }
}

function showMessage(text, type = 'success') {
    const message = document.getElementById('message');

    if (type === 'error') {
        message.className = 'red-text center';
    } else {
        message.className = 'green-text center';
    }

    message.innerText = text;
}

function updateImagePreview(url) {
    const imageUrl = getValidProfileImage(url);

    const profileImage = document.getElementById('profileImage');
    const previewImage = document.getElementById('previewImage');

    profileImage.src = imageUrl;
    previewImage.src = imageUrl;
}

function fillProfileForm(user) {
    document.getElementById('profileName').innerText = `${user.name || ''} ${user.lastName || ''}`;
    document.getElementById('profileEmail').innerText = user.email || 'Sin correo';
    document.getElementById('profileRoles').innerText = `Rol: ${(user.roles || []).join(', ')}`;

    document.getElementById('name').value = user.name || '';
    document.getElementById('lastName').value = user.lastName || '';
    document.getElementById('phoneNumber').value = user.phoneNumber || '';
    document.getElementById('url_profile').value = user.url_profile || '';
    document.getElementById('address').value = user.address || '';

    updateImagePreview(user.url_profile);

    if (window.M && M.updateTextFields) {
        M.updateTextFields();
    }
}

async function loadProfile() {
    const token = sessionStorage.getItem('token');

    if (!token) {
        window.location.href = '/signIn';
        return;
    }

    try {
        const response = await fetch('/api/users/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            sessionStorage.removeItem('token');
            window.location.href = '/signIn';
            return;
        }

        if (!response.ok) {
            showMessage('No se pudo cargar el perfil', 'error');
            return;
        }

        const user = await response.json();

        currentUser = user;
        currentRoles = user.roles || [];

        fillProfileForm(user);

    } catch (error) {
        console.error('Error en loadProfile:', error);
        showMessage('Error al conectar con el servidor', 'error');
    }
}

document.getElementById('url_profile').addEventListener('input', function () {
    updateImagePreview(this.value);
});

document.getElementById('profileForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const token = sessionStorage.getItem('token');

    if (!token) {
        window.location.href = '/signIn';
        return;
    }

    const name = document.getElementById('name').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const url_profile = document.getElementById('url_profile').value.trim();
    const address = document.getElementById('address').value.trim();

    if (!name || !lastName || !phoneNumber) {
        showMessage('Nombre, apellido y teléfono no pueden estar vacíos', 'error');
        return;
    }

    const data = {
        name,
        lastName,
        phoneNumber,
        url_profile,
        address
    };

    try {
        const response = await fetch('/api/users/me', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (response.status === 401) {
            sessionStorage.removeItem('token');
            window.location.href = '/signIn';
            return;
        }

        const responseData = await response.json();

        if (!response.ok) {
            showMessage(responseData.message || 'Error al actualizar perfil', 'error');
            return;
        }

        currentUser = responseData;
        currentRoles = responseData.roles || currentRoles;

        fillProfileForm(responseData);

        showMessage('Perfil actualizado correctamente', 'success');

    } catch (error) {
        console.error('Error en update profile:', error);
        showMessage('Error al conectar con el servidor', 'error');
    }
});

loadProfile();