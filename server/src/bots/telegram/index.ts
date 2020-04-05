import * as dotenv from 'dotenv';
import {countriesResponse, countries, countriesByContinent} from "./botResponse/countriesResponse";
import {showCountries, showCountryByFlag, showCountryByName} from "./botResponse/countryResponse";
import {UserMessages, UserRegExps, Continents} from "../../models/constants";
import {showAdvicesHowToBehave} from "./botResponse/advicesResponse";
import {showHelpInfo} from "./botResponse/helpResponse";
import {Express} from "express";
import {MessageRegistry} from "./utils/messageRegistry";
import {getAvailableCountries,} from "../../services/domain/covid19";
import {Country} from "../../models/country";
import {flag} from 'country-emoji';
import {answerOnQuestion, assistantStrategy, showAssistantFeatures} from "./botResponse/quetionResponse";
import * as TelegramBot from 'node-telegram-bot-api';
import {environments} from "../../environments/environment";
import {logger} from "../../utils/logger";
import { startResponse } from './botResponse/startResponse';

function runTelegramBot(app: Express, ngRokUrl: string) {
    dotenv.config({path: `${__dirname}/.env`});

    // replace the value below with the Telegram token you receive from @BotFather
    const token = environments.TELEGRAM_TOKEN ?? '';

    // Create a bot that uses 'polling' to fetch new updates
    const bot = new TelegramBot(token, {polling: true});

    // This informs the Telegram servers of the new webhook
    bot.setWebHook(`${ngRokUrl}/bot${token}`);

    // We are receiving updates at the route below!
    app.post(`/bot${token}`, (req, res) => {
        bot.processUpdate(req.body);
        res.sendStatus(200);
    });

    const registry = new MessageRegistry(bot);
    registry
        .Register(UserRegExps.Start, startResponse)
        .Register(UserMessages.AllCountries, countries)
        .Register(UserRegExps.All, countries)
        .Register(UserMessages.CountriesAvailable, showCountries)
        .Register(UserRegExps.Countries, showCountries)
        .Register(UserRegExps.Country, showCountryByName)
        .Register(UserMessages.GetAdvicesHowToBehave, showAdvicesHowToBehave)
        .Register(UserRegExps.Advices, showAdvicesHowToBehave)
        .Register(UserMessages.Help, showHelpInfo)
        .Register(UserRegExps.Help, showHelpInfo)
        .Register(UserMessages.Assistant, assistantStrategy)
        .Register(UserRegExps.Assistant, assistantStrategy);

    registry.RegisterCallBackQuery();

    for(let item in Continents){
        console.log(item);
        registry.RegisterCallBackQueryHandler(item, countriesByContinent(item));
    }

    getAvailableCountries()
        .then((countries: Array<Country>) => {
            const single = countries
                .map(c => flag(c.name))
                .join('|');
            registry.Register(`[${single}]`, showCountryByFlag);
        });

    bot.on('message', (message) => logger.log('info', message));
    bot.on("polling_error", (err) => logger.log('error', err));
    bot.on("webhook_error", (err) => logger.log('error', err));
    bot.on("error", (err) => logger.log('error', err));
}

export {runTelegramBot};