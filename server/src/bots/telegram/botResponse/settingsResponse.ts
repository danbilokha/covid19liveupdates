import { getLocalizationInlineKeyboard } from '../services/keyboard';
import {
    CallBackQueryHandlerWithCommandArgument,
    CallBackQueryParameters,
} from '../models';
import * as TelegramBot from 'node-telegram-bot-api';
import {
    cannotSetupLanguageMessage,
    chooseLanguageMessage,
    languageHasBeenSuccessfullySetup,
    languageIsNotSupportableMessage,
} from '../../../messages/feature/settingsMessages';
import { telegramUserService } from '../services/user';
import { logger } from '../../../utils/logger';
import { DEFAULT_LOCALE, LogCategory } from '../../../models/constants';
import { catchAsyncError } from '../../../utils/catchError';
import { runInterruptedCommandResponse } from './runInterruptedCommandReponse';

export const settingsLanguageResponse: CallBackQueryHandlerWithCommandArgument = async ({
    bot,
    message,
    chatId,
    user,
    messageHandlerRegistry,
    commandParameter,
}: CallBackQueryParameters): Promise<TelegramBot.Message> => {
    const locales: Array<string> = await telegramUserService.getAvailableLanguages();
    if (!commandParameter) {
        return bot.sendMessage(
            chatId,
            chooseLanguageMessage(user.settings?.locale),
            getLocalizationInlineKeyboard(
                locales,
                user.settings?.locale ?? DEFAULT_LOCALE
            )
        );
    }

    const availableLanguages: Array<string> = await telegramUserService.getAvailableLanguages();
    if (!availableLanguages.find((language) => language === commandParameter)) {
        return bot.sendMessage(
            chatId,
            languageIsNotSupportableMessage(user.settings?.locale),
            getLocalizationInlineKeyboard(
                locales,
                user.settings?.locale ?? DEFAULT_LOCALE
            )
        );
    }

    const [err, resultUser] = await catchAsyncError(
        telegramUserService.setUserLocale(user, commandParameter)
    );
    if (err) {
        logger.error(
            `Error occurred while setting up the language ${commandParameter} for ${chatId}`,
            err,
            LogCategory.SettingsLanguage,
            chatId
        );

        return bot.sendMessage(
            chatId,
            cannotSetupLanguageMessage(commandParameter)
        );
    }

    const updatedUser = await telegramUserService.getUser(user);
    const successFullySetupMessageResponse = await bot.sendMessage(
        chatId,
        // We cannot use "User" from parameter in the bot.sendMessage(
        // because that "User" still have an old locale, while this
        // "resultUser" has updated user settings
        languageHasBeenSuccessfullySetup(updatedUser.settings.locale)
    );

    return runInterruptedCommandResponse({
        message,
        messageHandlerRegistry,
        user: updatedUser,
    });
};
