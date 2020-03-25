import {getCountriesSituation} from "../../../api/covid19";
import {OverallCountrySituationResponse, Situation} from "../../../models/covid";
import {getChatId} from "../utils/chat";
import {getMessageForCountry} from "../utils/covid19";

export const countries = (bot, message) => {
    getCountriesSituation()
        .then((countriesSituation: Array<[string, Array<Situation>]>) => {
            let worldTotalConfirmed = 0;
            let worldTotalRecovered = 0;
            let worldTotalDeaths = 0;

            const countriesResult: Array<OverallCountrySituationResponse> = [];

            countriesSituation
                .forEach(([countryName, situations]: [string, Array<Situation>]) => {

                    let totalConfirmed = 0;
                    let totalRecovered = 0;
                    let totalDeaths = 0;

                    situations.forEach(({confirmed, deaths, recovered}: Situation) => {
                        totalRecovered += recovered;
                        totalConfirmed += confirmed;
                        totalDeaths += deaths;
                    });

                    worldTotalConfirmed += totalConfirmed;
                    worldTotalRecovered += totalRecovered;
                    worldTotalDeaths += totalDeaths;

                    countriesResult.push({
                        date: situations[situations.length - 1].date,
                        countryName,
                        totalConfirmed,
                        totalDeaths,
                        totalRecovered
                    });
                });

            const portionSize: number = 40;

            bot.sendMessage(getChatId(message), `Total confirmed: ${worldTotalConfirmed}, recovered: ${worldTotalRecovered}, death: ${worldTotalDeaths} in ${countriesResult.length} countries based on last available information.`);

            let portionMessage = [];
            countriesResult
                .forEach((countryResult, idx) => {
                    const {
                        countryName,
                        date,
                        totalConfirmed,
                        totalRecovered,
                        totalDeaths
                    } = countryResult;

                    portionMessage
                        .push(
                            getMessageForCountry(countryName, totalConfirmed, totalRecovered, totalDeaths, date)
                        );

                    if (idx % portionSize === 0 || idx === countriesResult.length - 1) {
                        bot.sendMessage(
                            getChatId(message),
                            portionMessage.join('\n')
                        );

                        portionMessage = [];
                    }
                });
        });
};
