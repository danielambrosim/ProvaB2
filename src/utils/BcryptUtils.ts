import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function generateHash(password: string) : Promise<string | null>{
    try{
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }catch(error){
        console.log(error);
        return null;
    }

}


export async function validateHash(password: string, hash: string): Promise<boolean> {
    try {
        return await bcrypt.compare(password, hash);
    }catch(error){
        console.log(error);
        return false;
    }
}

const SALT_ROUNDS = 10; 

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};