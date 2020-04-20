export const TIMES = {
    MILLISECONDS_IN_SECOND: 1000,
    MILLISECONDS_IN_MINUTE: 60000,
    MILLISECONDS_IN_HOUR: 3600000,
};
export const COVID19_FETCH_SALT = TIMES.MILLISECONDS_IN_MINUTE;

export const CONSOLE_LOG_EASE_DELIMITER: string = '==============> ';
export const CONSOLE_LOG_DELIMITER: string = '\n\n==============> ';

export enum CustomSubscriptions {
    SubscribeMeOn = `Subscribe me on`,
    UnsubscribeMeFrom = `Unsubscribe me from`,
}

export enum UserRegExps {
    Start = '/start',
    Assistant = '/assistant',
    CountriesData = '/countries',
    AvailableCountries = '/available',
    CountryData = '/country',
    Trends = '/trends',
    Advice = '/advice',
    Subscribe = '/subscribe',
    Unsubscribe = '/unsubscribe',
    Help = '/help',
}

export enum UserMessages {
    Assistant = 'Assistant 👦',
    CountriesData = 'Countries data 🌍',
    AvailableCountries = 'Countries we track',
    GetAdviceHowToBehave = 'Advice how not to 😷',
    SubscriptionManager = 'Subscriptions 💌',
    Existing = 'Existing',
    Unsubscribe = 'Unsubscribe',
    Help = 'ℹ What can you do?',
}

export enum Continents {
    Asia = 'Asia',
    Europe = 'Europe',
    Africa = 'Africa',
    Americas = 'Americas',
    Oceania = 'Oceania',
    Other = 'Other',
}

export enum Status {
    Confirmed = 'confirmed',
    Deaths = 'deaths',
    Recovered = 'recovered',
}

export enum LogLevel {
    //   Emerg = 'emerg',
    //   Alert = 'alert',
    //   Crit = 'crit',
    Error = 'error',
    Warning = 'warn',
    //   Notice = 'notice',
    Info = 'info',
    Debug = 'debug', // ????????
    //   Trace = 'trace'
}

export enum LogCategory {}
