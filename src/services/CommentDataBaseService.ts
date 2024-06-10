import { PrismaClient, Prisma } from '@prisma/client';
import { hashPassword } from '../utils/BcryptUtils';

const prisma = new PrismaClient();
const commentService = new CommentDataBaseService();

async function updateDBComment(id: number, data: Prisma.CommentUpdateInput) {
  try {
    const updatedComment = await prisma.comment.update({
      where: { id },
      while: {hashPassword},
    });
    return updatedComment;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
}

// Outro lugar no CommentController.ts ou em outro arquivo onde a função é usada
async function someFunction() {
  const commentId = 1; // Exemplo de ID do comentário
  const updateData: Prisma.CommentUpdateInput = {
    content: "New content",
  };

  try {
    const updatedComment = await updateDBComment(commentId, updateData);
    console.log('Updated comment:', updatedComment);
  } catch (error) {
    console.error('Error:', error);
  }
}

someFunction();

export default new CommentDataBaseService();