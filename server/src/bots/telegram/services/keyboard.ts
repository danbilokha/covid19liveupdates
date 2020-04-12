import {Cache} from '../../../utils/cache';
import {Continents, CustomSubscriptions, UserMessages} from '../../../models/constants';
import {InlineKeyboard, ReplyKeyboard} from 'node-telegram-keyboard-wrapper';
import {UNSUBSCRIPTIONS_ROW_ITEMS_NUMBER} from '../models';

export const getFullMenuKeyboard = (chatId): unknown => {
    const rk = new ReplyKeyboard();
    const latestSelectedCountries = Cache
        .get(`${chatId}_commands_country`);

    if (latestSelectedCountries.length > 0) {
        rk.addRow.apply(rk, latestSelectedCountries);
    }

    rk
        .addRow(UserMessages.CountriesData, UserMessages.AvailableCountries)
        .addRow(UserMessages.Assistant, UserMessages.GetAdvicesHowToBehave)
        .addRow(UserMessages.SubscriptionManager, UserMessages.Help);

    return rk.open({resize_keyboard: true})
};

export const getAfterCountryResponseInlineKeyboard = (country: string): unknown => {
    const ik = new InlineKeyboard();
    ik
        .addRow(
            {
                text: `${CustomSubscriptions.SubscribeMeOn} ${country}`,
                callback_data: `${CustomSubscriptions.SubscribeMeOn} ${country}`
            },
        );

    return ik.build();
};

export const getSubscriptionMessageInlineKeyboard = (): unknown => {
    const ik = new InlineKeyboard();
    ik
        .addRow(
            {
                text: UserMessages.Existing,
                callback_data: UserMessages.Existing
            },
            {
                text: UserMessages.Unsubscribe,
                callback_data: UserMessages.Unsubscribe
            },
        );

    return ik.build();
};

export const getUnsubscribeMessageInlineKeyboard = (values: Array<string>): unknown => {
    const ik = new InlineKeyboard();

    let i: number = 0;
    while (i < values.length) {
        const rows = [];
        let rowItem: number = 0;
        while (!!values[i] && rowItem < UNSUBSCRIPTIONS_ROW_ITEMS_NUMBER) {
            rows.push(
                {
                    text: values[i],
                    callback_data: `${CustomSubscriptions.UnsubscribeMeFrom} ${values[i++]}`,
                }
            );
            rowItem += 1;
        }
        ik.addRow(...rows);
    }

    return ik.build();
};

export const getContinentsInlineKeyboard = (): unknown => {
    const ik = new InlineKeyboard();
    ik
        .addRow(
            {text: Continents.Europe, callback_data: Continents.Europe},
            {text: Continents.Asia, callback_data: Continents.Asia}
        )
        .addRow(
            {text: Continents.Africa, callback_data: Continents.Africa},
            {text: Continents.Americas, callback_data: Continents.Americas},
        )
        .addRow(
            {text: Continents.Other, callback_data: Continents.Other},
            {text: Continents.Oceania, callback_data: Continents.Oceania},
        );

    return ik.build();
};
