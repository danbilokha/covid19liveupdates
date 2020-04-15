import {getCovidTrends} from '../../../services/api/api-chart'
import {addDays, Now} from '../../../utils/dateUtils'
import {CountrySituationInfo} from '../../../models/covid19.models';
import {Country} from '../../../models/country.models';
import {getCountriesSituation} from '../../../services/domain/covid19';
import {Transform} from '../../../services/domain/chart';

export const showTrendsByCountry = async (bot, message, chatId, requestedCountry): Promise<unknown> => {
    const allCountries: Array<[Country, Array<CountrySituationInfo>]> = await getCountriesSituation();
    const foundCountrySituations: [Country, Array<CountrySituationInfo>] = allCountries
        .find(([receivedCountry, situations]) =>
            receivedCountry.name === requestedCountry
        );
    if (!foundCountrySituations || !foundCountrySituations?.length
        || !foundCountrySituations[0]
        || !foundCountrySituations[1].length) {
        return bot.sendMessage(
            chatId,
            `Sorry, but I cannot find anything for ${requestedCountry}. I will save your request and will work on it`
        );
    }

    const [foundCountry, foundSituation] = foundCountrySituations;

    const lastWeekSituation = foundSituation.filter((c: CountrySituationInfo) => {
        const date = new Date(c.date);
        return date < Now && date > addDays(Now, -7);
    });

    return bot.sendPhoto(chatId, getCovidTrends(Transform(lastWeekSituation)))
}