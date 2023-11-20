import brycrpt from 'bcryptjs';
const salt = 10;
//hash password

export const hashPassword = (plainPass) => {
    return brycrpt.hashSync(plainPass, salt)
}

export const comparePassword = (plainPass, haspass) => {
    return brycrpt.compareSync(plainPass, haspass)
}