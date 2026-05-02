import userRepository from '../repositories/UserRepository.js';

class UserService {

    calculateAge(birthdate) {
        if (!birthdate) return null;

        const today = new Date();
        const birth = new Date(birthdate);

        let age = today.getFullYear() - birth.getFullYear();
        const monthDifference = today.getMonth() - birth.getMonth();

        if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birth.getDate())
        ) {
            age--;
        }

        return age;
    }

    formatUser(user) {
        return {
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            birthdate: user.birthdate,
            age: this.calculateAge(user.birthdate),
            url_profile: user.url_profile,
            address: user.address,
            roles: user.roles.map(r => r.name),
            createdAt: user.createdAt
        };
    }

    async getAll() {
        const users = await userRepository.getAll();
        return users.map(user => this.formatUser(user));
    }

    async getById(id) {
        const user = await userRepository.findById(id);

        if (!user) {
            const err = new Error('Usuario no encontrado');
            err.status = 404;
            throw err;
        }

        return this.formatUser(user);
    }

    async update(id, data) {
        const cleanData = {};

        if (data.name !== undefined && data.name.trim() !== '') {
            cleanData.name = data.name.trim();
        }

        if (data.lastName !== undefined && data.lastName.trim() !== '') {
            cleanData.lastName = data.lastName.trim();
        }

        if (data.phoneNumber !== undefined && data.phoneNumber.trim() !== '') {
            cleanData.phoneNumber = data.phoneNumber.trim();
        }

        if (data.url_profile !== undefined) {
            cleanData.url_profile = data.url_profile.trim();
        }

        if (data.address !== undefined) {
            cleanData.address = data.address.trim();
        }

        delete cleanData.password;
        delete cleanData.roles;
        delete cleanData.email;
        delete cleanData.birthdate;

        const user = await userRepository.update(id, cleanData);

        if (!user) {
            const err = new Error('Usuario no encontrado');
            err.status = 404;
            throw err;
        }

        return this.formatUser(user);
    }
}

export default new UserService();