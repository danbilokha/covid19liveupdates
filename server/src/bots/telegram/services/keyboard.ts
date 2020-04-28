import { Cache } from '../../../services/domain/cache';
import {
    Continents,
    CustomSubscriptions,
    Emojii,
    Frequency,
    UserActionsRegExps,
    UserInlineActions,
    UserMessages,
    UserRegExps,
    UserSettingsRegExps,
} from '../../../models/constants';
import { InlineKeyboard, ReplyKeyboard } from 'node-telegram-keyboard-wrapper';
import { UNSUBSCRIPTIONS_ROW_ITEMS_NUMBER } from '../models';
import * as TelegramBot from 'node-telegram-bot-api';
import { getLocalizedMessage } from '../../../services/domain/localization.service';

export const getFullMenuKeyboard = (
    chatId: number,
    locale: string
): TelegramBot.SendMessageOptions => {
    const rk = new ReplyKeyboard();
    const latestSelectedCountries: Array<string> = Cache.get(
        `${chatId}_commands_country`
    );

    if (latestSelectedCountries.length > 0) {
        rk.addRow.apply(rk, latestSelectedCountries);
    }

    rk.addRow(
        getLocalizedMessage(locale, UserMessages.CountriesData),
        getLocalizedMessage(locale, UserMessages.AvailableCountries)
    )
        .addRow(
            getLocalizedMessage(locale, UserMessages.Assistant),
            getLocalizedMessage(locale, UserMessages.GetAdviceHowToBehave)
        )
        .addRow(
            getLocalizedMessage(locale, UserMessages.SubscriptionManager),
            getLocalizedMessage(locale, UserMessages.Help)
        );

    return rk.open({ resize_keyboard: true });
};

export const getAfterCountryResponseInlineKeyboard = (
    country: string,
    locale: string
): TelegramBot.SendMessageOptions => {
    const ik = new InlineKeyboard();
    ik.addRow({
        text: `${getLocalizedMessage(locale, [
            CustomSubscriptions.SubscribeMeOn,
        ])} ${country}`,
        callback_data: `${getLocalizedMessage(locale, [
            UserRegExps.Subscribe,
        ])} ${country}`,
    }).addRow(
        {
            text: getLocalizedMessage(locale, 'Show weekly chart'),
            callback_data: `${UserRegExps.Trends} ${country}`,
        },
        {
            text: getLocalizedMessage(locale, 'Show monthly chart'),
            callback_data: `${UserRegExps.Trends} ${country} ${Frequency.Monthly}`,
        },
        {
            text: getLocalizedMessage(locale, 'Show whole period chart'),
            callback_data: `${UserRegExps.Trends} ${country} ${Frequency.WholePeriod}`,
        }
    );

    return ik.build();
};

export const getSubscriptionMessageInlineKeyboard = (
    locale: string
): TelegramBot.SendMessageOptions => {
    const ik = new InlineKeyboard();
    ik.addRow(
        {
            text: getLocalizedMessage(locale, UserMessages.Existing),
            callback_data: `${UserMessages.Existing}`,
        },
        {
            text: getLocalizedMessage(locale, UserMessages.Unsubscribe),
            callback_data: UserMessages.Unsubscribe,
        }
    );

    return ik.build();
};

export const getUnsubscribeMessageInlineKeyboard = (
    values: Array<string>
): TelegramBot.SendMessageOptions => {
    const ik = new InlineKeyboard();

    let i: number = 0;
    while (i < values.length) {
        const rows = [];
        let rowItem: number = 0;
        while (!!values[i] && rowItem < UNSUBSCRIPTIONS_ROW_ITEMS_NUMBER) {
            rows.push({
                text: values[i],
                callback_data: `${CustomSubscriptions.UnsubscribeMeFrom} ${
                    values[i++]
                }`,
            });
            rowItem += 1;
        }
        ik.addRow(...rows);
    }

    return ik.build();
};

export const getContinentsInlineKeyboard = (): TelegramBot.SendMessageOptions => {
    const ik = new InlineKeyboard();
    ik.addRow(
        { text: Continents.Europe, callback_data: Continents.Europe },
        { text: Continents.Asia, callback_data: Continents.Asia }
    )
        .addRow(
            { text: Continents.Africa, callback_data: Continents.Africa },
            { text: Continents.Americas, callback_data: Continents.Americas }
        )
        .addRow(
            { text: Continents.Other, callback_data: Continents.Other },
            { text: Continents.Oceania, callback_data: Continents.Oceania }
        );

    return ik.build();
};

export const getHelpProposalInlineKeyboard = (
    locale: string
): TelegramBot.SendMessageOptions => {
    const ik = new InlineKeyboard();

    ik.addRow({
        text: getLocalizedMessage(locale, UserMessages.Help),
        callback_data: UserMessages.Help,
    });

    return ik.build();
};

export const getLocalizationInlineKeyboard = (
    locales: Array<string>,
    currentLocale: string
): TelegramBot.SendMessageOptions => {
    const ik = new InlineKeyboard();

    ik.addRow(getCloseInlineKeyboardRow(currentLocale));

    let i: number = 0;
    while (i < locales.length) {
        const rows = [];
        let rowItem: number = 0;
        while (!!locales[i] && rowItem < UNSUBSCRIPTIONS_ROW_ITEMS_NUMBER) {
            rows.push({
                text:
                    currentLocale === locales[i]
                        ? `${locales[i]} ${Emojii.Check}`
                        : locales[i],
                callback_data: `${UserSettingsRegExps.Language} ${
                    locales[i++]
                }`,
            });
            rowItem += 1;
        }
        ik.addRow(...rows);
    }

    return ik.build();
};

const getCloseInlineKeyboardRow = (
    locale: string
): TelegramBot.InlineKeyboardButton => {
    return {
        text: getLocalizedMessage(locale, [UserInlineActions.Close]).join(),
        callback_data: `${UserActionsRegExps.Close}`,
    };
};
