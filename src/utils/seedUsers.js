import bcrypt from 'bcrypt';
import userRepository from '../repositories/UserRepository.js';
import roleRepository from '../repositories/RoleRepository.js';

export default async function seedUsers() {
    const adminEmail = 'admin@gmail.com';

    const existingAdmin = await userRepository.findByEmail(adminEmail);

    if (existingAdmin) {
        console.log('Admin ya existe');
        return;
    }

    let adminRole = await roleRepository.findByName('admin');

    if (!adminRole) {
        adminRole = await roleRepository.create({ name: 'admin' });
    }

    let userRole = await roleRepository.findByName('user');

    if (!userRole) {
        userRole = await roleRepository.create({ name: 'user' });
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);
    const hashedPassword = await bcrypt.hash('Admin123@', saltRounds);

    await userRepository.create({
        name: 'Administrador',
        lastName: 'Principal',
        email: adminEmail,
        password: hashedPassword,
        phoneNumber: '999999999',
        birthdate: new Date('1995-01-01'),
        url_profile: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        address: 'Lima, Perú',
        roles: [adminRole._id, userRole._id]
    });

    console.log('Usuario admin creado correctamente');
}