import { CallBackQueryHandlerWithCommandArgument, CallBackQueryParameters } from '../../models';
import * as TelegramBot from 'node-telegram-bot-api';
import { logger } from '../../../../utils/logger';
import { noResponse } from '../../botResponse/noResponse';
import { getParameterAfterCommandFromMessage } from './getParameterAfterCommandFromMessage';
import { LogCategory } from '../../../../models/constants';

/**
 * This function is wrapper around the original User's query handler
 * It adds an additional parameter (if such exist) to original handler,
 * which will be an parameter following after command
 */
export const withSingleParameterAfterCommand = (
    handlerFn: CallBackQueryHandlerWithCommandArgument,
): CallBackQueryHandlerWithCommandArgument => {
    return ({
                bot,
                message,
                chatId,
                user,
                messageHandlerRegistry,
                commandParameter,
            }: CallBackQueryParameters): Promise<TelegramBot.Message> => {
        try {
            const userEnteredArgumentAfterCommand: string = getParameterAfterCommandFromMessage(
                messageHandlerRegistry.singleParameterAfterCommands,
                (commandParameter ?? message.text).toLocaleLowerCase(),
            );

            return handlerFn.call(messageHandlerRegistry, {
                bot,
                message,
                chatId,
                user,
                messageHandlerRegistry,
                commandParameter: userEnteredArgumentAfterCommand,
            });
        } catch (err) {
            logger.error(
                `Error happend inside withSingleParameterAfterCommand() for ${chatId} with message: ${message.text} and ikCbData: ${ikCbData}`,
                err,
                LogCategory.Command,
                chatId,
            );

            return noResponse({ bot, message, chatId, user, messageHandlerRegistry });
        }
    };
};
