import { getFullMenuKeyboard } from '../services/keyboard';
import { greetUser } from '../../../messages/userMessage';
import { CallBackQueryHandlerWithCommandArgument } from '../models';
import * as TelegramBot from 'node-telegram-bot-api';
import { helpInfoResponse } from './helpResponse';
import { getUser, addUser } from '../../../services/domain/user'
import { logger } from '../../../utils/logger';

export const startResponse: CallBackQueryHandlerWithCommandArgument = async (
    bot: TelegramBot,
    message: TelegramBot.Message,
    chatId: number
): Promise<TelegramBot.Message> => {

    let user = await getUser(chatId);
    if (!user || Object.keys(user).length === 0 ) {
        user = {
            chatId,
            userName: message.chat.username || '',
            firstName: message.chat.first_name || '',
            lastName: message.chat.last_name || '',
            startedOn: Date.now()
        };
        try {
            addUser(user);
            logger.log('info', `New user ${user.chatId} was successfully added`)
        }
        catch (error) {
            logger.log('error', {
                error,
                message: `An error ocured while trying to add new user ${user.chatId}`
            });
        }
    }

    await bot.sendMessage(
        chatId,
        `${greetUser(message.from)}`,
        getFullMenuKeyboard(message)
    );
    return helpInfoResponse(bot, message, chatId);
};
