export class CreateActionDto {
    userId: number;
    recipientId: number;
    action: 'LIKE' | 'DISLIKE';
}
