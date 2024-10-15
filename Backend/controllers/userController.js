import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js'; // Certifique-se que o nome do arquivo está correto

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';

// Registro de usuário
export const registerUser = async (req, res) => {
  const { nome, email, senha, role = 'user' } = req.body;

  // Validação dos campos recebidos
  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Verifica se o usuário já existe
    const userExists = await Usuario.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    // Gera um salt e faz o hash da senha
    const salt = bcrypt.genSaltSync(10); // Geração explícita do salt
    const senha_hash = bcrypt.hashSync(senha, salt); // Hash da senha

    // Cria o novo usuário
    await Usuario.create({ nome, email, senha_hash, role });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
};

// Login de usuário
export const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  console.log('Dados recebidos:', req.body); // Verificar se os dados estão corretos

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const senhaValida = bcrypt.compareSync(senha, usuario.senha_hash);

    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, role: usuario.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};
