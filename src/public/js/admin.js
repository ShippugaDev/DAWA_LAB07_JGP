const DEFAULT_PROFILE_IMAGE = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

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

function formatDate(dateValue) {
    if (!dateValue) return 'Sin fecha';

    const date = new Date(dateValue);

    return date.toLocaleDateString('es-PE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

async function validateAdminAccess(token) {
    const response = await fetch('/api/users/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (response.status === 401) {
        sessionStorage.removeItem('token');
        window.location.href = '/signIn';
        return false;
    }

    if (!response.ok) {
        window.location.href = '/403';
        return false;
    }

    const user = await response.json();

    if (!user.roles || !user.roles.includes('admin')) {
        window.location.href = '/403';
        return false;
    }

    return true;
}

async function loadUsers() {
    const token = sessionStorage.getItem('token');

    if (!token) {
        window.location.href = '/signIn';
        return;
    }

    const hasAccess = await validateAdminAccess(token);

    if (!hasAccess) {
        return;
    }

    try {
        const response = await fetch('/api/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            sessionStorage.removeItem('token');
            window.location.href = '/signIn';
            return;
        }

        if (response.status === 403) {
            window.location.href = '/403';
            return;
        }

        const users = await response.json();
        const tbody = document.getElementById('usersTable');

        tbody.innerHTML = '';

        if (!users || users.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="center">No hay usuarios registrados</td>
                </tr>
            `;
            return;
        }

        users.forEach(user => {
            const imageUrl = getValidProfileImage(user.url_profile);
            const roles = user.roles && user.roles.length > 0
                ? user.roles.join(', ')
                : 'Sin rol';

            tbody.innerHTML += `
                <tr>
                    <td>
                        <div class="table-user-cell">
                            <img 
                                src="${imageUrl}" 
                                class="profile-avatar-small" 
                                alt="Foto de perfil"
                                onerror="this.src='${DEFAULT_PROFILE_IMAGE}'"
                            >
                            <div>
                                <strong>${user.name || ''} ${user.lastName || ''}</strong>
                                <small>ID: ${user.id}</small>
                            </div>
                        </div>
                    </td>
                    <td>${user.email || 'Sin email'}</td>
                    <td>${user.phoneNumber || 'Sin teléfono'}</td>
                    <td>${user.age || 'No calculado'}</td>
                    <td>${roles}</td>
                    <td>${formatDate(user.createdAt)}</td>
                    <td>
                        <a href="/user/${user.id}" class="btn-small blue">Ver</a>
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        console.error(error);

        const tbody = document.getElementById('usersTable');

        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="center red-text">
                    Error al cargar usuarios
                </td>
            </tr>
        `;
    }
}

loadUsers();