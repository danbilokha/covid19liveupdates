import {
    CountrySituationInfo,
    WorldOverallInformation,
} from '../../../models/covid19.models';
import {
    getCountriesTableHTMLMessage,
    getCountriesWorldMessage,
    getTableCountryRowMessage,
    getTableHeader,
} from '../../../messages/feature/countriesMessages';
import { getContinentsInlineKeyboard } from '../services/keyboard';
import {
    CallBackQueryHandlerWithCommandArgument,
    CallBackQueryParameters,
} from '../models';
import {
    getContinentOverallInformation,
    getWorldOverallInformation,
} from '../../../services/domain/countries';

export const countriesByContinentResponse = (continent) => async ({
    bot,
    user,
    chatId,
}: CallBackQueryParameters) => {
    const {
        confirmed,
        recovered,
        deaths,
        countriesSituation,
    } = await getContinentOverallInformation(continent);

    const portionMessage = [getTableHeader(user.settings?.locale)];
    portionMessage.push();

    countriesSituation
        .sort((country1, country2) => country2.active - country1.active)
        .forEach(({ name, active, recovered, deaths }) =>
            portionMessage.push(
                getTableCountryRowMessage(name, active, recovered, deaths)
            )
        );

    return bot.sendMessage(
        chatId,
        getCountriesTableHTMLMessage(
            user.settings?.locale,
            continent,
            confirmed,
            recovered,
            deaths,
            countriesSituation,
            portionMessage
        ),
        { parse_mode: 'HTML' }
    );
};

export const countriesResponse: CallBackQueryHandlerWithCommandArgument = async ({
    bot,
    user,
    chatId,
}: CallBackQueryParameters) => {
    const {
        confirmed,
        recovered,
        deaths,
        continentCountriesSituations,
    }: WorldOverallInformation = await getWorldOverallInformation();

    // Send overall world info,
    return bot.sendMessage(
        chatId,
        getCountriesWorldMessage(
            user.settings?.locale,
            confirmed,
            recovered,
            deaths,
            Object.values(continentCountriesSituations).reduce(
                (acc: number, val: Array<CountrySituationInfo>): number =>
                    acc + val.length,
                0
            ) as number,
            Object.keys(continentCountriesSituations).length
        ),
        getContinentsInlineKeyboard()
    );
};
