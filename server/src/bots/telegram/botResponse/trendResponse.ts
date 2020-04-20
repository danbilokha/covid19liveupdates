import { getCovidTrends } from '../../../services/api/api-chart';
import { addDays, Now } from '../../../utils/dateUtils';
import { CountrySituationInfo } from '../../../models/covid19.models';
import { Transform, enrichWithTitle } from '../../../services/domain/chart';
import { catchAsyncError } from '../../../utils/catchError';
import { getRequestedCountry } from '../../../services/domain/countries';
import { logger } from '../../../utils/logger';
import { CallBackQueryHandlerWithCommandArgument } from '../models';
import * as TelegramBot from 'node-telegram-bot-api';
import { Frequency } from './../../../models/constants';

export const trendsByCountryResponse: CallBackQueryHandlerWithCommandArgument = async (
    bot: TelegramBot,
    message: TelegramBot.Message,
    chatId: number,
    requestedCountry?: string | undefined,
    requestedFrequency?: Frequency | undefined
): Promise<TelegramBot.Message> => {
    requestedFrequency = requestedFrequency || Frequency.Weekly;

    const [err, [foundCountry, foundSituation]] = await catchAsyncError(
        getRequestedCountry(requestedCountry)
    );
    if (err) {
        logger.error(
            `Error ocured while trying to get requested country ${requestedCountry}`,
            err
        );

        return bot.sendMessage(chatId, err.message);
    }

    let startDate: Date;
    let hasFilter = true;
    switch (requestedFrequency) {
        case Frequency.Weekly:
            startDate = addDays(Now, -7);
            break;
        case Frequency.Monthly:
            startDate = addDays(Now, -30);
            break;
        case Frequency.WholePeriod:
            hasFilter = false;
            break;
    }

    let periodSituation = foundSituation;
    if (hasFilter) {
        periodSituation = periodSituation.filter((c: CountrySituationInfo) => {
            const date = new Date(c.date);
            return date < Now && date > startDate;
        });
    }

    const frequencyName =
        requestedFrequency === Frequency.WholePeriod
            ? 'Whole period'
            : capitalize(requestedFrequency);

    return bot.sendPhoto(
        chatId,
        getCovidTrends(
            enrichWithTitle(
                Transform(periodSituation),
                `${frequencyName} trends for ${capitalize(requestedCountry)}`
            )
        )
    );
};

const capitalize = (input: string): string =>
    input.charAt(0).toUpperCase() + input.substring(1).toLowerCase();
